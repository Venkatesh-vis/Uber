# Uber-Style Ride-Hailing Application (MERN + Socket.IO)

A full-stack Uber-style ride-hailing platform built with the MERN stack, featuring real-time ride updates, live location tracking, and secure authentication. The project demonstrates strong skills in scalable API design, real-time systems, and full-stack architecture.

<p align="center">
  <a href="https://portfolio-sigma-ten-auyltbzoy2.vercel.app/demo.mp4" target="_blank">
    <img src="https://img.shields.io/badge/▶_Watch_Full_Demo-7C3AED?style=for-the-badge&logo=play&logoColor=white" alt="Watch Demo" />
  </a>
</p>

---

## Features

### Real-Time & Core System
- Real-time ride updates using **Socket.IO**.
- Live driver location streaming with map integration.
- Ride-matching logic to assign nearest available drivers.
- Dynamic fare calculation based on distance and time.
- Ride history for both users and drivers.

### Authentication & Security
- JWT-based authentication for users and drivers.
- Role-based access control (RBAC).
- Password hashing with bcrypt.
- Secure and validated input across all endpoints.
- Protected API routes with middleware.

### Frontend (React)
- Responsive UI (mobile + desktop).
- Real-time live tracking map.
- Ride request flow (Pickup → Confirm → Track).
- User and driver dashboards.
- State management for auth & ride-flow.

### Backend (Node.js + Express)
- Modular, scalable REST API.
- Controllers, services, and model architecture.
- MongoDB models for users, drivers, rides, vehicles.
- WebSocket event channels for location & ride updates.
- Razorpay order creation and server-side payment verification.

### Database (MongoDB)
- Collections for Users, Drivers, Rides, and Payments .

### Payments
- Razorpay integration for ride checkout.
- Server-side signature verification before marking a ride as paid.
- Duplicate-payment protection for already paid rides.
- Payment records stored per ride with order, payment, and refund status.

## Payment Integration

This project includes a Razorpay-based payment flow for users to complete payment after a ride. The backend creates the Razorpay order, verifies the payment signature, stores the transaction in MongoDB, and then marks the ride as completed.

### Payment Flow
1. The user clicks the `Make Payment` button in the rider dashboard.
2. The frontend sends `rideId` to `POST /payment/create-order`.
3. The backend creates a Razorpay order in INR and stores a `Payment` document with status `created`.
4. Razorpay Checkout opens on the client using the public key from the frontend environment.
5. After a successful checkout, the frontend sends the Razorpay response to `POST /payment/verify-payment`.
6. The backend verifies the Razorpay signature using the secret key.
7. If verification succeeds:
- the payment is marked as `paid`
- the ride status is updated to `completed`
- the captain is set back to `active`
- a socket event is emitted so ride/chat state can close cleanly

### Required Environment Variables

Backend (`Backend/.env`)

```env
RAZORPAY_TEST_KEY_ID=your_razorpay_test_key_id
RAZORPAY_TEST_KEY_SECRET=your_razorpay_test_key_secret
```

Frontend (`Frontend/.env`)

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_test_key_id
```

### Payment Endpoints

`POST /payment/create-order`
- Auth required: `user`
- Request body:

```json
{
  "rideId": "ride_mongodb_object_id"
}
```

- Behavior:
- finds the ride
- prevents creating a new order if the ride is already paid
- creates a Razorpay order with amount in paise
- stores a payment record with status `created`

`POST /payment/verify-payment`
- Auth required: `user`
- Request body:

```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "rideId": "ride_mongodb_object_id"
}
```

- Behavior:
- verifies the ride belongs to the authenticated user
- validates the Razorpay signature
- marks the payment as `paid`
- completes the ride
- refunds duplicate successful payments for the same ride

### Payment Data Model

Each payment record stores:
- `userId`
- `captainId`
- `rideId`
- `razorpayOrderId`
- `razorpayPaymentId`
- `razorpaySignature`
- `amount`
- `currency`
- `status`

Supported payment statuses:
- `created`
- `paid`
- `failed`
- `refunded`

### Frontend Integration

The Razorpay checkout is triggered from the rider UI through `MakePaymentButton`. After success:
- the frontend verifies the payment with the backend

This keeps payment completion synchronized with ride completion and chat/session cleanup.

## Summary

This project demonstrates:
- Real-time WebSocket architecture
- Secure JWT authentication and role-based access
- Scalable REST API design
- Geolocation + ride-matching algorithms
- Payment gateway integration with verification and duplicate-payment handling
- Full MERN-stack proficiency for production-level systems
