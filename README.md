# Payment Gateway with Hosted Checkout

This project is a full-stack **Payment Gateway system** that simulates real-world payment platforms like Razorpay or Stripe.  
It focuses on backend API design, secure payment flows, validation logic, database modeling, and a hosted checkout experience.

The goal of this project is to demonstrate practical **FinTech engineering skills** rather than just CRUD operations.

---

## Project Overview

The system allows merchants to:
- Authenticate using API keys
- Create payment orders
- Accept payments via **UPI** and **Card**
- Track payment status

Customers can:
- Open a hosted checkout page
- Choose a payment method
- Complete a simulated payment
- See success or failure results

All services run in Docker and communicate with a PostgreSQL database.

---

## Key Features

### Backend
- Secure merchant authentication using **API Key & Secret**
- Order creation and management
- Multi-method payment processing:
  - UPI with VPA validation
  - Card payments with Luhn algorithm validation
- Payment lifecycle management:
processing → success / failed

markdown
Copy code
- PostgreSQL database with relational schema
- Automatic seeding of a test merchant
- Health check endpoint to verify system readiness

### Frontend
- Hosted checkout page for customers
- UPI and Card payment forms
- Clear processing, success, and failure states
- Simple merchant dashboard displaying credentials and transactions

### Infrastructure
- Fully Dockerized application
- All services start using a single command
- Clean separation between backend, frontend, and checkout services

---

## Technology Stack

- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Frontend:** HTML, CSS, JavaScript  
- **Containerization:** Docker, Docker Compose  
- **API Testing:** Postman  

---

## Project Structure

payment-gateway/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── config/
│ │ └── server.js
│ ├── Dockerfile
│ └── package.json
│
├── frontend/
│ ├── index.html
│ ├── script.js
│ ├── style.css
│ └── Dockerfile
│
├── checkout-page/
│ ├── index.html
│ ├── script.js
│ ├── style.css
│ └── Dockerfile
│
├── screenshots/
├── postman_collection.json
├── docker-compose.yml
├── .env.example
└── README.md

yaml
Copy code

---

## Environment Configuration

Create a `.env` file inside the `backend/` directory using the template below:

```env
DATABASE_URL=postgresql://gateway_user:gateway_pass@postgres:5432/payment_gateway
PORT=8000

TEST_API_KEY=key_test_abc123
TEST_API_SECRET=secret_test_xyz789

TEST_MODE=false
TEST_PAYMENT_SUCCESS=true
TEST_PROCESSING_DELAY=1000
The .env file is intentionally excluded from version control for security reasons.

Test Merchant Details
A test merchant is automatically created when the application starts:

Name: Test Merchant

Email: test@example.com

API Key: key_test_abc123

API Secret: secret_test_xyz789

This allows immediate testing without manual setup.

API Endpoints
Health Check
bash
Copy code
GET /health
Create Order (Authenticated)
bash
Copy code
POST /api/v1/orders
Headers:
X-Api-Key
X-Api-Secret
Create Payment (Authenticated)
bash
Copy code
POST /api/v1/payments
Public Checkout APIs
bash
Copy code
GET  /api/v1/public/orders/:order_id
POST /api/v1/public/payments
Running the Application
1. Clone the repository
bash
Copy code
git clone https://github.com/Vennetianusha/payment-gateway.git
cd payment-gateway
2. Start all services
bash
Copy code
docker compose up -d --build
3. Access the services
Service	URL
Health Check	http://localhost:8000/health
Backend API	http://localhost:8000
Merchant Dashboard	http://localhost:3000
Checkout Page	http://localhost:3001

Hosted Checkout Flow
Create an order using Postman or API

Open the checkout page with the order ID:

ruby
Copy code
http://localhost:3001/?order_id=order_xxxxxxxxxxxxxxxx
Select UPI or Card payment

Complete payment

View success or failure response

Testing
A complete Postman collection is included in the repository

It covers:

Health check

Order creation

Payment processing

Checkout flow testing

Screenshots
The screenshots/ folder contains images showing:

Docker services running

API responses

Hosted checkout page

Payment success and failure states

These screenshots serve as proof of working functionality.

What This Project Demonstrates
Understanding of real-world payment gateway architecture

Secure API authentication patterns

Input validation and transaction safety

Backend-driven state management

Docker-based deployment

Clean project structure suitable for production systems

Author
Anusha Pavani Venneti
Aspiring Backend / Full-Stack Developer
