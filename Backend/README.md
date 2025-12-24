# User Registration

- User Schema
- Service Layer (`createUser`)
- Controller (`registerUser`)
- Valid Request Format
- Example Success Response
- Example Error Responses


---

## 1. User Model

The `User` model stores:

- `fullname.firstname` (string, min length 4)
- `fullname.lastname` (string, min length 4)
- `email` (unique, required)
- `password` (hashed & hidden by default)
- `socketId` (optional)

It also includes password hashing and token generation.

### Example Request

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john@example.com",
    "password": "mypassword123"
}
