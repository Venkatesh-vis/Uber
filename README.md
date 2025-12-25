# Uber-Style Ride-Hailing Application (MERN + Socket.IO)

A full-stack Uber-style ride-hailing platform built with the MERN stack, featuring real-time ride updates, live location tracking, and secure authentication. The project demonstrates strong skills in scalable API design, real-time systems, and full-stack architecture.

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

### Database (MongoDB)
- Collections for Users, Drivers, Rides, Vehicles, and Location Streams.

## Summary

This project demonstrates:
- Real-time WebSocket architecture
- Secure JWT authentication and role-based access
- Scalable REST API design
- Geolocation + ride-matching algorithms
- Full MERN-stack proficiency for production-level systems
