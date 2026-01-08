import express from "express";
import { getPublicOrder } from "../controllers/public.controller.js";
import { createPublicPayment } from "../controllers/payment.controller.js";

const router = express.Router();

router.get("/orders/:order_id", getPublicOrder);
router.post("/payments", createPublicPayment);

export default router;
