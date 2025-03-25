# Bookmark API Spec

## Create Bookmark
Endpoint : POST /bookmarks

Request Header :
- Authorization : token

Request Body :
```json
{
    "title": "Hono Framework",
    "url": "https://hono.dev/",
    "category_id": 3,
    "user_id": 2
}
```

Response Body :
```json
{
    "data": {
        "id": 1,
        "title": "Hono Framework",
        "url": "https://hono.dev/",
        "category": {
            "id": 3,
            "name": "Web Framework"
        },
        "user": {
            "id": 2,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "created_at": "2025-03-25T10:00:00.000Z",
        "updated_at": "2025-03-25T10:05:00.000Z"
    }
}
```

---

## Get Bookmark
Endpoint : GET /bookmarks/{bookmark_id}

Request Header :
- Authorization : token

Response Body :
```json
{
    "data": {
        "id": 1,
        "title": "Hono Framework",
        "url": "https://hono.dev/",
        "category": {
            "id": 3,
            "name": "Web Framework"
        },
        "user": {
            "id": 2,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "created_at": "2025-03-25T10:00:00.000Z",
        "updated_at": "2025-03-25T10:05:00.000Z"
    }
}
```

---

## Update Bookmark
Endpoint : PUT /bookmarks/{bookmark_id}

Request Header :
- Authorization : token

Request Body :
```json
{
    "title": "Updated Title",
    "url": "https://updated-url.dev/",
    "category_id": 4
}
```

Response Body :
```json
{
    "data": {
        "id": 1,
        "title": "Updated Title",
        "url": "https://updated-url.dev/",
        "category": {
            "id": 4,
            "name": "Updated Category"
        },
        "user": {
            "id": 2,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "created_at": "2025-03-25T10:00:00.000Z",
        "updated_at": "2025-03-25T10:10:00.000Z"
    }
}
```

---

## Delete Bookmark
Endpoint : DELETE /bookmarks/{bookmark_id}

Request Header :
- Authorization : token

Response Body :
```json
{
    "data": true
}
```

