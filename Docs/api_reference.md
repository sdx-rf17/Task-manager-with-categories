---

#  API Documentation

This document describes the available endpoints for the **Tasks** and **Categories** APIs.  
All endpoints are prefixed with `/api/`.

---

## 📘 Base URL

```
http://localhost:5000/api
```

---

## ✅ Tasks Endpoints

### 1. **Get All Tasks**

**Endpoint:**

```
GET /api/tasks
```

**Description:**  
Returns a list of all tasks.

---

### 2. **Create a New Task**

**Endpoint:**

```
POST /api/tasks
```

**Description:**  
Creates a new task.

**Response Example:**



---

### 3. **Get Specific Task**

**Endpoint:**

```
GET /api/tasks/{id}
```

**Description:**  
Retrieves details of a specific task by its ID.

**Example:**  
`GET /api/tasks/3`

---

### 4. **Update a Task**

**Endpoint:**

```
PUT /api/tasks/{id}
```

**Description:**  
Updates a specific task.

**Request Body Example:**

```json
{
  "title": "Updated Task",
  "description": "Updated task description",
  "status": "completed"
}
```

**Response Example:**

```json
{
  "message": "Task updated successfully"
}
```

---

### 5. **Delete a Task**

**Endpoint:**

```
DELETE /api/tasks/{id}
```

**Description:**  
Deletes a specific task by ID.

**Response Example:**

```json
{
  "message": "Task deleted successfully"
}
```

---

## 📗 Category Endpoints

### 1. **Get All Categories**

**Endpoint:**

```
GET /api/category
```

**Description:**  
Returns a list of all categories.

**Response Example:**

```json
[
  { "id": 1, "name": "Work" },
  { "id": 2, "name": "Personal" }
]
```

---

### 2. **Create a New Category**

**Endpoint:**

```
POST /api/category
```

**Description:**  
Creates a new category.

**Request Body Example:**

```json
{
  "name": "New Category"
}
```

**Response Example:**

```json
{
  "message": "Category created successfully",
  "category": {
    "id": 3,
    "name": "New Category"
  }
}
```

---

### 3. **Get Specific Category**

**Endpoint:**

```
GET /api/category/{id}
```

**Description:**  
Retrieves details of a specific category by ID.

**Example:**  
`GET /api/category/2`

**Response Example:**

```json
{
  "id": 2,
  "name": "Personal"
}
```

---

### 4. **Update a Category**

**Endpoint:**

```
PUT /api/category/{id}
```

**Description:**  
Updates a specific category.

**Request Body Example:**

```json
{
  "name": "Updated Category"
}
```

**Response Example:**

```json
{
  "message": "Category updated successfully"
}
```

---

### 5. **Delete a Category**

**Endpoint:**

```
DELETE /api/category/{id}
```

**Description:**  
Deletes a specific category by ID.

**Response Example:**

```json
{
  "message": "Category deleted successfully"
}
```

---

