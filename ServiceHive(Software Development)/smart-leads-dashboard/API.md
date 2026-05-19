# API Documentation

## Base URL

Local Development:

```http
http://localhost:5000/api
```
# Authentication APIs

## Register User

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
  "name": "Sahil",
  "email": "sahil@example.com",
  "password": "password123",
  "role": "recruiter"
}
```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "_id": "665abc123",
    "name": "Sahil",
    "email": "sahil@example.com",
    "role": "recruiter"
  }
}
```

### Validation Rules

| Field | Required | Type |
|---------|---------|---------|
| name | Yes | String |
| email | Yes | Email |
| password | Yes | String |
| role | Yes | String |

---

## Login User

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "sahil@example.com",
  "password": "password123"
}
```

### Success Response

```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "_id": "665abc123",
    "name": "Sahil",
    "email": "sahil@example.com",
    "role": "recruiter"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## Get Current User

### Endpoint

```http
GET /auth/me
```

### Headers

```http
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

```json
{
  "success": true,
  "user": {
    "_id": "665abc123",
    "name": "Sahil",
    "email": "sahil@example.com",
    "role": "recruiter"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

# Lead Management APIs

All Lead APIs require authentication.

### Authorization Header

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Get All Leads

### Endpoint

```http
GET /leads
```

### Query Parameters

| Parameter | Type | Description |
|------------|---------|-------------|
| page | number | Pagination page |
| limit | number | Number of records |
| status | string | Lead status filter |
| search | string | Search by name/email |
| assignedTo | string | Assigned recruiter |

### Example

```http
GET /leads?page=1&limit=10&status=contacted
```

### Success Response

```json
{
  "success": true,
  "total": 50,
  "page": 1,
  "data": [
    {
      "_id": "665abc",
      "name": "John Doe",
      "email": "john@example.com",
      "status": "contacted"
    }
  ]
}
```

---

## Get Single Lead

### Endpoint

```http
GET /leads/:id
```

### Example

```http
GET /leads/665abc123
```

### Success Response

```json
{
  "success": true,
  "data": {
    "_id": "665abc123",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "status": "new"
  }
}
```

---

## Create Lead

### Endpoint

```http
POST /leads
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "company": "ABC Pvt Ltd",
  "status": "new"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "665abc123",
    "name": "John Doe"
  }
}
```

---

## Update Lead

### Endpoint

```http
PUT /leads/:id
```

### Request Body

```json
{
  "status": "qualified"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Lead updated successfully"
}
```

---

## Delete Lead

### Endpoint

```http
DELETE /leads/:id
```

### Example

```http
DELETE /leads/665abc123
```

### Success Response

```json
{
  "success": true,
  "message": "Lead deleted successfully"
}
```

---

## Export Leads CSV

### Endpoint

```http
GET /leads/export
```

### Description

Exports all lead records as a CSV file.

### Response

```text
text/csv
```

File download begins automatically.

---

# Authentication Flow

```text
Register
    ↓
Login
    ↓
Receive JWT Token
    ↓
Store Token in Local Storage
    ↓
Attach Token in Authorization Header
    ↓
Access Protected Routes
```

---

# Error Responses

## Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Validation Error

```json
{
  "success": false,
  "message": "Validation failed"
}
```

## Server Error

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

# Technology Stack

- React + TypeScript
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Axios
- Docker & Docker Compose

---

# Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
NODE_ENV=production
```