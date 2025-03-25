# User API Spec

## Register User
Endpoint : POST /auth/register

Request Body
```json
{
    "email": "email",
    "name": "fullname",
    "password": "password",
}
```

Response Body (Success)
```json
{
    "email": "email",
    "name": "fullname"
}
```

Response Body (Failed)
```json
{
    "errors": "Email must not blank, ..."
}
```
## Login User
Endpoint : POST /auth/login

Request Body
```json
{
    "email": "email",
    "password": "password"
}
```

Response Body (Success)
```json
{
    data: {
        "email": "email",
        "name": "fullname",
        "token": "token"
    }
}
```

Response Body (Failed)
```json
{
    "errors": "Email must not blank, ..."
}
```
## Get User
Endpoint : GET /users/session

Request Header :
- Authorization : token

Response Body (Success)
```json
{
    "data": {
        "username": "username",
        "name": "fullname"
    }
}
```