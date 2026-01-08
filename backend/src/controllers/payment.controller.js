import pool from "../config/db.js";
import { nanoid } from "nanoid";
import {
  validateVPA,
  luhnCheck,
  detectCardNetwork,
  validateExpiry
} from "../services/validation.service.js";

/* ======================================================
   1️⃣ MERCHANT PAYMENT (AUTH REQUIRED) – KEEP THIS
====================================================== */
export async function createPayment(req, res) {
  try {
    const { order_id, method, vpa, card } = req.body;
    const merchant = req.merchant;

    const orderResult = await pool.query(
      `SELECT * FROM orders WHERE id = $1 AND merchant_id = $2`,
      [order_id, merchant.id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        error: {
          code: "NOT_FOUND_ERROR",
          description: "Order not found"
        }
      });
    }

    let paymentData = {};

    if (method === "upi") {
      if (!validateVPA(vpa)) {
        return res.status(400).json({
          error: { code: "INVALID_VPA" }
        });
      }
      paymentData.vpa = vpa;
    }

    if (method === "card") {
      if (!luhnCheck(card.number)) {
        return res.status(400).json({
          error: { code: "INVALID_CARD" }
        });
      }

      if (!validateExpiry(card.expiry_month, card.expiry_year)) {
        return res.status(400).json({
          error: { code: "EXPIRED_CARD" }
        });
      }

      paymentData.card_network = detectCardNetwork(card.number);
      paymentData.card_last4 = card.number.slice(-4);
    }

    const paymentId = "pay_" + nanoid(16);

    await pool.query(
      `INSERT INTO payments
       (id, order_id, merchant_id, amount, currency, method, status, vpa, card_network, card_last4)
       VALUES ($1,$2,$3,$4,$5,$6,'processing',$7,$8,$9)`,
      [
        paymentId,
        order_id,
        merchant.id,
        orderResult.rows[0].amount,
        orderResult.rows[0].currency,
        method,
        paymentData.vpa || null,
        paymentData.card_network || null,
        paymentData.card_last4 || null
      ]
    );

    await new Promise(r => setTimeout(r, 2000));

    const success = Math.random() > 0.3;

    await pool.query(
      `UPDATE payments SET status = $1 WHERE id = $2`,
      [success ? "success" : "failed", paymentId]
    );

    return res.status(201).json({
      id: paymentId,
      order_id,
      amount: orderResult.rows[0].amount,
      currency: orderResult.rows[0].currency,
      method,
      status: success ? "success" : "failed",
      ...paymentData
    });

  } catch (err) {
    console.error("Merchant payment error:", err);
    return res.status(500).json({
      error: { code: "INTERNAL_SERVER_ERROR" }
    });
  }
}

/* ======================================================
   2️⃣ PUBLIC CHECKOUT PAYMENT (NO AUTH) – THIS FIXES UI
====================================================== */
export async function createPublicPayment(req, res) {
  try {
    const { order_id, method, vpa, card } = req.body;

    // ✅ Fetch order WITHOUT merchant auth
    const orderResult = await pool.query(
      `SELECT * FROM orders WHERE id = $1`,
      [order_id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        error: { code: "ORDER_NOT_FOUND" }
      });
    }

    const order = orderResult.rows[0];
    let paymentData = {};

    if (method === "upi") {
      if (!vpa || !vpa.includes("@")) {
        return res.status(400).json({
          error: { code: "INVALID_VPA" }
        });
      }
      paymentData.vpa = vpa;
    }

    if (method === "card") {
      if (!card || card.number.length < 12) {
        return res.status(400).json({
          error: { code: "INVALID_CARD" }
        });
      }
      paymentData.card_last4 = card.number.slice(-4);
      paymentData.card_network = "visa";
    }

    const paymentId = "pay_" + nanoid(12);

    // ✅ Insert payment
    await pool.query(
      `INSERT INTO payments
       (id, order_id, merchant_id, amount, currency, method, status, vpa, card_network, card_last4)
       VALUES ($1,$2,$3,$4,$5,$6,'processing',$7,$8,$9)`,
      [
        paymentId,
        order.id,
        order.merchant_id,
        order.amount,
        order.currency,
        method,
        paymentData.vpa || null,
        paymentData.card_network || null,
        paymentData.card_last4 || null
      ]
    );

    // ✅ Decide result immediately (IMPORTANT FIX)
    const success = Math.random() > 0.3;

    await pool.query(
      `UPDATE payments SET status = $1 WHERE id = $2`,
      [success ? "success" : "failed", paymentId]
    );

    // ✅ SEND RESPONSE → frontend will update UI
    return res.status(201).json({
      id: paymentId,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      method,
      status: success ? "success" : "failed",
      ...paymentData
    });

  } catch (err) {
    console.error("Public payment error:", err);
    return res.status(500).json({
      error: { code: "PAYMENT_FAILED" }
    });
  }
}
