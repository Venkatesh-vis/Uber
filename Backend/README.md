# User Registration

---

## Endpoint

### **POST /users/register**

---

## Description

Registers a new user by creating a user account with the provided information.  
Validates input fields, hashes the password, saves the user, and returns a JWT token.

---

## Request Body (JSON)

The request body must contain the following fields:

### **fullname** (object)
Wrapper object containing user's first and last name.
- **Required:** Yes
- **Type:** Object

#### fullname.firstname
- **Description:** User's first name
- **Type:** String
- **Required:** Yes
- **Validation:** Minimum 4 characters

#### fullname.lastname
- **Description:** User's last name
- **Type:** String
- **Required:** Yes
- **Validation:** Minimum 4 characters

---

### **email**
- **Description:** User's email address
- **Type:** String
- **Required:** Yes
- **Validation:** Must be a valid and unique email

---

### **password**
- **Description:** User’s password (will be hashed before saving)
- **Type:** String
- **Required:** Yes
- **Validation:** Minimum 6 characters

---

## Example Request Body

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "mypassword123"
}
```

# User Login

---

## Endpoint

### **POST /users/login**

---

## Description

Authenticates an existing user using their email and password.  
Validates the input fields, checks the hashed password, and returns a JWT token along with the user details.

---

## Request Body (JSON)

The request body must contain the following fields:

### **email**
- **Description:** User's registered email address  
- **Type:** String  
- **Required:** Yes  
- **Validation:** Must be a valid email  

---

### **password**
- **Description:** User’s password  
- **Type:** String  
- **Required:** Yes  
- **Validation:** Minimum 6 characters  

---

## Example Request Body

```json
{
    "email": "john@example.com",
    "password": "mypassword123"
}
```

# User Logout

---

## Endpoint

### **GET /users/logout**

---

## Description

Logs out the authenticated user by clearing the JWT cookie and blacklisting the token.  
This ensures the token cannot be reused for future authenticated requests.

---

## Success Response (JSON)

```json
{
    "message": "Logged out"
}
```

---

## Possible Errors

### **401 Unauthorized**
- No token provided
- Invalid token
- Expired token
- Token already blacklisted  

# Captain Registration

## Endpoint

### POST /captain/register

---

## Description

Registers a new captain by validating the provided details, hashing the password, saving the captain in the database, and returning a JWT authentication token.

This endpoint performs:

- Validation of all input fields
- Ensures the email is unique
- Hashes password using bcrypt
- Creates a new captain record
- Generates a JWT token
- Returns captain details and token

---

## Request Body (JSON)

### fullname (object)

#### fullname.firstname
- Type: String
- Required: Yes
- Minimum: 4 characters

#### fullname.lastname
- Type: String
- Required: Yes
- Minimum: 4 characters

---

### email
- Type: String
- Required: Yes
- Must be a valid email
- Must be unique

---

### password
- Type: String
- Required: Yes
- Minimum: 6 characters

---

### vehicle (object)

#### vehicle.color
- Type: String
- Required: Yes
- Minimum: 3 characters

#### vehicle.plate
- Type: String
- Required: Yes
- Minimum: 6 characters

#### vehicle.capacity
- Type: Number
- Required: Yes
- Minimum: 1

#### vehicle.vehicleType
- Type: String
- Required: Yes
- Allowed values:
    - car
    - motorcycle
    - auto

---

### location

#### location.lat
- Type: Number
- Optional

#### location.long
- Type: Number
- Optional

---

## Example Request Body

```json
{
  "fullname": {
    "firstname": "Rahul",
    "lastname": "Sharma"
  },
  "email": "rahul.captain@example.com",
  "password": "securepass123",
  "vehicle": {
    "color": "Black",
    "plate": "MH09123456",
    "capacity": 3,
    "vehicleType": "car"
  },
  "location": {
    "lat": 19.076,
    "long": 72.8777
  }
}
```

## Success Response

```json
{
  "token": "jwt-token-here",
  "captain": {
    "_id": "695a12b41ed98c88dfd4413a",
    "fullname": {
      "firstname": "Rahul",
      "lastname": "Sharma"
    },
    "email": "rahul.captain@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "MH09123456",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive"
  }
}
```

## Possible Errors
### **400 Bad Request**

```json
{
  "errors": [
    {
      "msg": "first name must must be at least 4 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}

```
### **Example: Email Exists**

```json
{
  "message": "Captain already exists"
}

```

# Captain Login

---

## Endpoint

### **POST /captain/login**

---

## Description

Authenticates a captain using email and password.  
Validates input, checks stored hashed password, and returns a JWT token along with captain details.

---

## Request Body (JSON)

### **email**
- **Description:** Captain’s registered email
- **Type:** String
- **Required:** Yes
- **Validation:** Must be a valid email

---

### **password**
- **Description:** Captain’s password
- **Type:** String
- **Required:** Yes
- **Validation:** Minimum 6 characters

---

## Example Request Body

```json
{
  "email": "rahul.captain@example.com",
  "password": "securepass123"
}
```

---

## Success Response (JSON)

```json
{
  "token": "jwt-token-here",
  "captain": {
    "_id": "695a12b41ed98c88dfd4413a",
    "email": "rahul.captain@example.com"
  }
}
```

---

## Possible Errors

### **400 Invalid Credentials**

```json
{
  "message": "Invalid mail or password"
}
```

### **400 Bad Request – Validation Error**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

# Captain Logout

---

## Endpoint

### **POST /captain/logout**

---

## Description

Logs out the captain by clearing the JWT cookie and blacklisting the token so it cannot be reused.

---

## Success Response (JSON)

```json
{
  "message": "Logged out"
}
```

---

## Possible Errors

### **401 Unauthorized**

```json
{
  "message": "Unauthorized"
}
```

# Fare Estimation

---

## Endpoint

**POST /fare**

---

## Description

Calculates fare estimates for all available vehicle types based on the provided pickup and drop coordinates.

The system:

* Validates coordinates
* Calculates straight-line distance using the Haversine formula
* Estimates ride duration
* Applies surge multiplier
* Applies dynamic discount logic
* Returns fare breakdown for each vehicle type

This endpoint only provides fare estimates.
No ride is created at this stage.

---

## Request Body (JSON)

### pickup (object)

* **Type:** Object
* **Required:** Yes
* **Description:** Pickup location coordinates

#### pickup.lat

* **Type:** Number
* **Required:** Yes
* **Description:** Latitude in degrees

#### pickup.lng

* **Type:** Number
* **Required:** Yes
* **Description:** Longitude in degrees

---

### drop (object)

* **Type:** Object
* **Required:** Yes
* **Description:** Drop location coordinates

#### drop.lat

* **Type:** Number
* **Required:** Yes
* **Description:** Latitude in degrees

#### drop.lng

* **Type:** Number
* **Required:** Yes
* **Description:** Longitude in degrees

---

## Example Request Body

```json
{
  "pickup": {
    "lat": 17.4939602,
    "lng": 78.4008412
  },
  "drop": {
    "lat": 17.4364734,
    "lng": 78.3735921
  }
}
```

---

## Success Response (200 OK)

```json
{
  "surgeMultiplier": "1.15",
  "rideOptions": [
    {
      "vehicleType": "motorcycle",
      "distance": "8.42 km",
      "duration": "15 mins",
      "originalFare": 210.45,
      "discountPercent": 25,
      "discountAmount": 52.61,
      "finalFare": 157.84
    },
    {
      "vehicleType": "auto",
      "distance": "8.42 km",
      "duration": "15 mins",
      "originalFare": 268.90,
      "discountPercent": 20,
      "discountAmount": 53.78,
      "finalFare": 215.12
    },
    {
      "vehicleType": "car",
      "distance": "8.42 km",
      "duration": "15 mins",
      "originalFare": 345.60,
      "discountPercent": 18,
      "discountAmount": 62.21,
      "finalFare": 283.39
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request

Returned when required fields are missing or invalid.

```json
{
  "message": "Pickup and drop locations are required"
}
```

or

```json
{
  "message": "Invalid pickup or drop coordinates"
}
```

---

### 500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

---

## Notes

* Distance is calculated using the Haversine formula.
* Duration is estimated based on average city speed.
* Fare includes:

  * Base fare
  * Per kilometer charge
  * Surge multiplier
  * Dynamic discount

# WebSocket (Real-Time Ride System)

---

## Overview

Implements real-time ride communication using Socket.IO.

It enables:
- Instant ride requests to captains
- Real-time ride acceptance
- Live captain location tracking
- Ride cancellation broadcasting

---

## Architecture

### Room Strategy

Each socket joins a role-based room:

- user:<userId>
- captain:<captainId>

This allows targeted event emission instead of broadcasting to all clients.

---

## Connection Lifecycle

### Event: connection

Triggered when a client connects to the server.

---

### Event: disconnect

Triggered when a client disconnects.

---

## Join Room

### Event: join

### Description

Associates a socket with a user or captain room.

### Payload

```json
{
"userId": "string",
"role": "user | captain"
}
```

### Behavior

- Stores socket.userId
- Stores socket.role
- Joins room: `${role}:${userId}`
- Prevents duplicate joins

---

## Ride Request

### Event: ride:request

### Description

Triggered when a user requests a ride.

### Flow

1. Find nearby captains
2. Create ride in database
3. Notify all nearby captains
4. Confirm ride creation to user

### Payload

```json
{
"userId": "string",
"pickup": { "lat": 17.2, "lng": 78.4 },
"drop": { "lat": 17.3, "lng": 78.5 },
"vehicleType": "car",
"pickupAddressName": "string",
"dropAddressName": "string",
"userName": "string"
}
```

### Emits

→ To Captains  
Event: ride:request

```json
{
"rideId": "string",
"userId": "string",
"pickup": {},
"drop": {},
"vehicleType": "string"
}
```

→ To User  
Event: ride:created

```json
{
"rideId": "string"
}
```

---

## Ride Accept

### Event: ride:accept

### Payload

```json
{
"rideId": "string"
}
```

### Behavior

- Atomically updates ride:
  requested → accepted
- Assigns captain
- Prevents race conditions

### Emits

→ To User  
Event: ride:accepted

```json
{
"rideId": "string",
"captainId": "string",
"pickup": {},
"drop": {},
"vehicleType": "string"
}
```

→ To Captain  
Event: ride:accepted

```json
{
"rideId": "string"
}
```

→ To Other Captains  
Event: ride:cancelled

```json
{
"rideId": "string"
}
```

---

## Ride Cancel

### Event: ride:cancel

### Description

Cancels a ride and notifies all captains.

### Payload

```json
{
"rideId": "string"
}
```

### Emits

Event: ride:cancelled

```json
{
"rideId": "string"
}
```

---

## Captain Location Update

### Event: captain:location

### Description

Updates captain's real-time location in database.

### Payload

```json
{
"captainId": "string",
"lat": 17.3,
"lng": 78.5
}
```

---

### Atomic Ride Acceptance

findOneAndUpdate({ _id: rideId, status: "requested" })

Prevents:
- Multiple captains accepting same ride
- Race conditions

---

### notifiedCaptains Field

Used for:
- Broadcasting cancellation
- Cleaning up pending ride requests

---

### Room-Based Emission

io.to(`captain:${captainId}`).emit(...)

Ensures:
- Efficient communication
- No unnecessary broadcasts

---

# Payment Integration

---

## Overview

The backend uses Razorpay test-mode checkout for ride payments.

Payment is handled in two steps:
- create a Razorpay order for a ride
- verify the payment signature after checkout succeeds

The backend is responsible for:
- creating the Razorpay order
- storing payment records in MongoDB
- preventing duplicate successful payments
- marking the ride as completed only after verification
- resetting captain availability after ride completion

---

## Required Environment Variables

Add these variables in `Backend/.env`:

```env
RAZORPAY_TEST_KEY_ID=your_razorpay_test_key_id
RAZORPAY_TEST_KEY_SECRET=your_razorpay_test_key_secret
```

---

## Payment Routes

### **POST /payment/create-order**

Creates a Razorpay order for the specified ride.

### Auth

- Protected route
- Allowed role: `user`

### Request Body

```json
{
  "rideId": "ride_mongodb_object_id"
}
```

### Backend Flow

1. Find the ride by `rideId`
2. Check whether the ride has already been paid
3. Convert `ride.fare` into paise using `fare * 100`
4. Create a Razorpay order with currency `INR`
5. Save a `Payment` document with status `created`
6. Return the created Razorpay order to the client

### Success Response

```json
{
  "order": {
    "id": "order_xxx",
    "amount": 25000,
    "currency": "INR"
  }
}
```

### Possible Errors

#### 404 Not Found

```json
{
  "message": "Ride not found"
}
```

#### 400 Bad Request

```json
{
  "message": "Ride already paid"
}
```

#### 500 Internal Server Error

```json
{
  "message": "Failed to create order"
}
```

---

### **POST /payment/verify-payment**

Verifies the Razorpay payment after checkout succeeds.

### Auth

- Protected route
- Allowed role: `user`

### Request Body

```json
{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "rideId": "ride_mongodb_object_id"
}
```

### How Payment Verification Is Done

1. The backend finds the ride using `rideId`
2. It confirms the ride belongs to the authenticated user
3. It creates the signature base string:

```text
razorpay_order_id + "|" + razorpay_payment_id
```

4. It generates an HMAC SHA256 hash using `RAZORPAY_TEST_KEY_SECRET`
5. It compares that generated hash with `razorpay_signature`
6. If both signatures match, the payment is treated as valid

This ensures the payment confirmation actually came from Razorpay and was not modified on the client.

### Backend Flow After Successful Verification

1. Load the payment record using `razorpay_order_id`
2. Return success immediately if it was already marked as paid
3. Check if another successful payment already exists for the same ride
4. If a duplicate successful payment exists, refund the new payment
5. Otherwise:
- save `razorpayPaymentId`
- save `razorpaySignature`
- set payment status to `paid`
- update ride status to `completed`
- set the captain status back to `active`
- emit `ride:completed` to the ride chat room
- close sockets in the ride chat room

### Success Response

```json
{
  "success": true
}
```

### Duplicate Payment Response

```json
{
  "success": true,
  "message": "Duplicate payment detected, refunded"
}
```

### Possible Errors

#### 403 Unauthorized

```json
{
  "message": "Unauthorized"
}
```

#### 400 Bad Request

```json
{
  "message": "Invalid signature"
}
```

#### 404 Not Found

```json
{
  "message": "Payment not found"
}
```

#### 500 Internal Server Error

```json
{
  "message": "Payment verification failed"
}
```

---

## Payment Model

The `Payment` collection stores:
- `userId`
- `captainId`
- `rideId`
- `razorpayOrderId`
- `razorpayPaymentId`
- `razorpaySignature`
- `amount`
- `currency`
- `status`

### Supported Status Values

- `created`
- `paid`
- `failed`
- `refunded`

---

## Important Notes

- Amount is sent to Razorpay in paise, not rupees.
- Ride completion happens only after payment verification succeeds.
- Duplicate successful payments for the same ride are refunded.
- This implementation is configured for Razorpay test credentials.

---

