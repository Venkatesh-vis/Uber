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
