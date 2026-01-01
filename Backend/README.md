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