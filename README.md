# 🏥 Healthcare Dashboard

A full-stack healthcare dashboard where admins can manage patient records, filter and search them, and provide prior authorization for treatments. The application includes:

- **Frontend**: Built with Vite, React, and TypeScript.
- **Backend**: Uses Node.js, Express, MongoDB, and JWT for secure authentication.

---

## 📁 Folder Structure

```bash
📦project-root
 ┣ 📂backend
 ┣ 📂frontend
 ┣ 📜README.md
---
```
## 🔧 Prerequisites

Before you begin, ensure you have the following tools installed:

- **Node.js** 
- **MongoDB** 
- **Git** 
- **Vite** 
```
---

### 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SujeetPawar/HealthCare.git
cd HealthCare
```

---

### 2. Backend Setup

- Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```
---

### 3. Creating the `.env` File

- **Backend Environment Variables:**
  
  In the `backend` folder, create a `.env` file with the following contents:

  ```env
  MONGO_URL=your mongo db url
  JWT_SECRET=<your_secret_key>
  PORT=3000
```

---
- start banckend server:
```bash
npm run dev
```
---

### 4. frontend Setup

- Navigate to the frontend folder and install dependencies.

```bash
cd ../frontend
npm install
```
---

- start frontend server:
```bash
npm run dev
```
---

### 5. Usage
-Open your browser and navigate to http://localhost:3000 (backend) and http://localhost:5173 (frontend).

-Admin can log in, add patients, and submit authorization requests.
-Use the search and filter functionalities to manage patients efficiently.
```
---
### 6. 🔐 Authentication and Protected Routes
-The backend uses JWT for authentication.
-To protect frontend routes, a middleware that checks for the existence of a valid JWT token could be added to the routes, ensuring only authenticated users can access certain pages (e.g., the dashboard).
a
```
---

### 7. 💡 Future Improvements
-Add loading states and animations for better user experience.
-🔒 Protected Routes: Implement a middleware in the frontend to protect routes. For example, use react-router with PrivateRoute components that check for valid JWT tokens.
-🛡 Middleware Improvements: Improve error handling in the backend using custom error middleware. Ensure that all routes return consistent error messages and handle token expiration properly.
-📱 UI Enhancements: Improve the UI/UX by adding a more intuitive design for authorization workflows. You can also add more status indicators (approved, pending, rejected) for each patient.

---
```

### 8. 🧩 Technologies Used
-Frontend: Vite, React, TypeScript
-Backend: Node.js, Express, JWT
-Database: MongoDB (Mongoose)
-Authentication: JSON Web Tokens (JWT)
