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
