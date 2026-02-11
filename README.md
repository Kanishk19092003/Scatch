# 👜 Scatch – E-commerce Bag Website (Backend Focused)

Scatch is a backend-focused e-commerce web application built to demonstrate strong server-side development skills including authentication, authorization, database handling, and secure password management.

This project highlights backend logic building using Node.js, Express, and MongoDB while following MVC architecture.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS (Templating Engine)

---

## 📦 Dependencies Used

```json
{
  "bcrypt": "^6.0.0",
  "config": "^4.2.0",
  "connect-flash": "^0.1.1",
  "cookie-parser": "^1.4.7",
  "debug": "^4.4.3",
  "dotenv": "^17.2.4",
  "ejs": "^4.0.1",
  "express": "^5.2.1",
  "express-session": "^1.19.0",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.2.0",
  "multer": "^2.0.2"
}
```

---

## 🔐 Key Features

### ✅ Authentication & Authorization
- User registration & login
- Password hashing using bcrypt
- JWT token generation
- Session-based authentication
- Protected routes

### 🔒 Security Implementation
- Secure password storage
- Cookie-based token handling
- Environment variables using dotenv
- Express session management

### 📁 File Upload
- Product image upload using Multer

### 💾 Database Management
- MongoDB integration with Mongoose
- Schema & model creation
- CRUD operations
- Data validation

### 💬 Flash Messaging
- Success and error messages using connect-flash

---

## 📂 Project Structure

```
Scatch/
│
├── config/
│   ├── mongoose-connection.js
│   ├── multer-config.js
│
├── controllers/
│   ├── authController.js
│
├── models/
│   ├── user-model.js
│   ├── product-model.js
│
├── routes/
│   ├── usersRouter.js
│   ├── productsRouter.js
│   ├── ownersRouter.js
│
├── views/
│   ├── partials/
│   ├── ejs files
│
├── public/
│   ├── images/
│
├── app.js
├── .env
├── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-link>
cd scatch
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Create .env File

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_super_secret_key
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Application

```bash
nodemon app.js
```

Server runs at:
```
http://localhost:3000
```

---

## 🧠 Concepts Applied

- MVC Architecture
- RESTful Routing
- Middleware usage
- Session management
- Token-based authentication
- Password hashing
- Flash messaging
- Modular code structure

---

## 🎯 Purpose of the Project

This project was built to showcase backend development skills including:

- Authentication & Authorization
- Secure password handling
- Database integration
- Logic building
- Error handling
- Clean and scalable project structure

---

## 📈 Future Improvements

- Payment gateway integration
- Role-based access control
- Admin dashboard
- API documentation
- Deployment on cloud (Render / AWS)

---

## 👨‍💻 Author

Kanishk Yadav  
Backend Developer (MERN Stack)
