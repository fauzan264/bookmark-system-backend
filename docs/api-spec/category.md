# Contact API Spec

## Create Contact
Endpoint : POST /api/categories

Request Header :
- Authorization : token

Request Body :
```json
{
    "name": "category_name",
}
```

Response Body :
```json
{
    "data": {
        "id": 1,
        "name": "category_name",
    }
}
```

## Get Contact
Endpoint : GET /api/categories/{contact_id}

Request Header :
- Authorization : token

Response Body :
```json
{
    "data": {
        "id": 1,
        "name": "category_name",
    }
}
```

## Update Contact
Endpoint : PUT /api/categories/{contact_id}

Request Header :
- Authorization : token

Request Body :
```json
{
    "name": "category_name",
}
```

Response Body :
```json
{
    "data": {
        "id": 1,
        "name": "category_name",
    }
}
```

## Remove Contact
Endpoint : DELETE /api/categories/{contact_id}

Request Header :
- Authorization : token

Response Body :
```json
{
    "data": true
}
```