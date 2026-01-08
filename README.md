# 💳 Payment Gateway with Hosted Checkout

A full-stack **Payment Gateway system** inspired by platforms like **Razorpay / Stripe**, built as part of the **Partnr Network – Global Placement Program**.

This project demonstrates real-world fintech concepts such as merchant authentication, order management, multi-method payment processing (UPI & Cards), hosted checkout flow, database persistence, and Dockerized deployment.

---

## 🚀 Features

### Backend
- Merchant authentication using **API Key & API Secret**
- Order creation and management
- Payment processing for:
  - UPI (VPA validation)
  - Cards (Luhn algorithm, expiry check, network detection)
- Payment lifecycle:
processing → success / failed

markdown
Copy code
- PostgreSQL database with proper schema & relationships
- Auto-seeded test merchant
- Health check endpoint

### Frontend
- **Hosted Checkout Page (Port 3001)**
- UPI & Card payment forms
- Processing state
- Success / Failure result
- **Merchant Dashboard (Port 3000)**
- Displays API credentials
- Transaction overview

### Deployment
- Fully **Dockerized**
- All services start with a single command:
```bash
docker compose up -d
🧱 Tech Stack
Backend: Node.js, Express.js

Database: PostgreSQL

Frontend: HTML, CSS, JavaScript

Containerization: Docker, Docker Compose

API Testing: Postman

📂 Project Structure
pgsql
Copy code
payment-gateway/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── Dockerfile
│
├── checkout-page/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│   └── Dockerfile
│
├── screenshots/
├── postman_collection.json
├── docker-compose.yml
├── .env.example
└── README.md
⚙️ Environment Configuration
Create a .env file inside backend/ using the template below:

env
Copy code
DATABASE_URL=postgresql://gateway_user:gateway_pass@postgres:5432/payment_gateway
PORT=8000

# Test merchant credentials
TEST_API_KEY=key_test_abc123
TEST_API_SECRET=secret_test_xyz789

# Payment simulation
TEST_MODE=false
TEST_PAYMENT_SUCCESS=true
TEST_PROCESSING_DELAY=1000
.env is intentionally excluded from GitHub for security reasons.

🧪 Test Merchant (Auto-Seeded)
The application seeds a test merchant on startup:

Name: Test Merchant

Email: test@example.com

API Key: key_test_abc123

API Secret: secret_test_xyz789

🔌 API Endpoints
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
▶️ How to Run the Project
1. Clone the repository
bash
Copy code
git clone https://github.com/Vennetianusha/payment-gateway.git
cd payment-gateway
2. Start all services
bash
Copy code
docker compose up -d --build
3. Access the application
Service	URL
Health Check	http://localhost:8000/health
Backend API	http://localhost:8000
Merchant Dashboard	http://localhost:3000
Checkout Page	http://localhost:3001

💳 Hosted Checkout Flow
Create an order using Postman or API

Open checkout page:

ruby
Copy code
http://localhost:3001/?order_id=order_xxxxxxxxxxxxxxxx
Select payment method (UPI / Card)

Complete payment

View success or failure result

🧪 Postman Collection
A complete Postman collection is included:

pgsql
Copy code
postman_collection.json
Import it into Postman to test:

Health check

Order creation

Payment processing

Checkout flow

📸 Screenshots
Screenshots demonstrating:

Docker services running

API testing

Hosted checkout page

Payment success & failure

are available in the screenshots/ folder.

🎯 Learning Outcomes
Built a real-world FinTech payment system

Implemented secure API authentication

Designed payment validation logic

Worked with Docker & PostgreSQL

Created a hosted checkout experience

Followed industry-level backend architecture

👩‍💻 Author
Anusha Pavani Venneti
Aspiring Backend / Full-Stack Developer
