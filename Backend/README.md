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

# User Profile

---

## Endpoint

### **GET /users/profile**

---

## Description

Retrieves the authenticated user's profile information.  
Requires a valid JWT token sent via cookies or the Authorization header.  
The token is verified, checked against the blacklist, and the associated user is returned.

---

## Success Response (JSON)

```json
{
  "_id": "694ccf472118289710c9b03e",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com"
}
```

---

## Possible Errors

### **401 Unauthorized**
- No token provided
- Invalid token
- Expired token
- Token blacklisted

---

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

### location (optional)

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

# Captain Profile

---

## Endpoint

### **POST /captain/profile**

---

## Description

Retrieves the authenticated captain's profile.  
Requires a valid JWT token supplied via cookies or Authorization header.  
Token is verified, checked against blacklist, and captain details are returned.

---

## Success Response (JSON)

```json
{
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
```

---

## Possible Errors

### **401 Unauthorized**
- No token provided
- Token blacklisted
- Invalid token
- Expired token

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

