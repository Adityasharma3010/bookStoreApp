# 📚 BookStore App — MERN Stack

A full-stack BookStore web application built with MongoDB, Express, React, and Node.js.

Users can sign up, log in, browse books/courses, and view free offerings. Authentication is handled securely using hashed passwords, and data is stored in MongoDB Atlas.

![MERN](https://img.shields.io/badge/Stack-MERN-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-brightgreen)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)
![Express](https://img.shields.io/badge/API-Express-lightgrey)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Production-success)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## 🚀 Live Demo

Frontend: https://book-store-app-rho-gules.vercel.app    
Backend API: https://bookstoreapp-qtuc.onrender.com  

---

## ✨ Features

- 🔐 User authentication (Signup / Login / Logout)
- 🔑 Secure password hashing with bcrypt
- 📖 Browse books from database
- 🎁 Free courses slider
- 🧭 Protected routes (Course page requires login)
- 🌙 Dark / Light theme toggle
- 📬 Contact form UI
- 🌐 REST API backend
- ☁️ MongoDB Atlas integration
- 🔔 Toast notifications

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- React Hook Form
- React Hot Toast
- React Slick Carousel

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- dotenv
- cors

---

## 📂 Folder Structure

📦 bookstore-app  
 ┣ 📂 backend/  
 ┃ ┣ 📂 controller/          # Business logic (auth, books)  
 ┃ ┃ ┣ 📜 book.controller.js  
 ┃ ┃ ┗ 📜 user.controller.js  
 ┃ ┣ 📂 model/               # Mongoose schemas  
 ┃ ┃ ┣ 📜 book.model.js  
 ┃ ┃ ┗ 📜 user.model.js  
 ┃ ┣ 📂 route/               # API routes  
 ┃ ┃ ┣ 📜 book.route.js  
 ┃ ┃ ┗ 📜 user.route.js  
 ┃ ┣ 📜 index.js             # Express server entry  
 ┃ ┗ 📜 .env                 # Environment variables  
 
 ┣ 📂 frontend/  
 ┃ ┣ 📂 public/  
 ┃ ┣ 📂 src/  
 ┃ ┃ ┣ 📂 api/               # Axios config  
 ┃ ┃ ┣ 📂 components/        # UI components  
 ┃ ┃ ┣ 📂 pages/             # Route pages  
 ┃ ┃ ┣ 📜 App.jsx            # Router setup  
 ┃ ┃ ┣ 📜 main.jsx           # Entry point  
 ┃ ┃ ┗ 📜 index.css          # Global styles  
 ┃ ┣ 📜 .env.local           # Frontend env vars  
 ┃ ┗ 📜 package.json  
 ┃
 ┣ 📜 README.md  
 ┗ 📜 package.json  

---

## ⚙️ Environment Variables

Backend (.env)

PORT=4001  
MONGODB_URI=your_mongodb_connection_string  
FRONTEND_URL=http://localhost:5173  

⚠️ Never commit real credentials.

Frontend (.env.local)

VITE_API_URL=http://localhost:4001  

(or your deployed backend URL)

---

## 🛠️ Installation & Setup

Clone repository:

git clone https://github.com/yourusername/bookstore-app.git  
cd bookstore-app  

Backend setup:

cd backend  
npm install  
npm run dev  

Server runs at:

http://localhost:4001  

Frontend setup:

cd frontend  
npm install  
npm run dev  

App runs at:

http://localhost:5173  

---

## 🔌 API Endpoints

User Routes

POST /user/signup → Register user  
POST /user/login → Login user  

Book Routes

GET /book → Get all books  

---

## 🔐 Authentication Flow

1. User signs up
2. Password hashed using bcrypt
3. User logs in
4. User stored in localStorage
5. Protected routes verify auth state

---

## 🧪 Testing

Use:

- Postman
- Thunder Client
- Browser DevTools

Test signup/login and book APIs.

---

## 🚀 Deployment

Backend — Render

1. Connect GitHub repo
2. Add environment variables
3. Deploy Node service

Frontend — Render / Vercel / Netlify

1. Set VITE_API_URL
2. Build and deploy

---

## 🧠 Future Improvements

- JWT authentication
- Refresh tokens
- Role-based access
- Admin dashboard
- Book CRUD operations
- Payment integration
- Search functionality
- Pagination
- Email verification
- Unit tests

---

## 🤝 Contributing

Fork → Create branch → Commit → Pull Request

---

## 📄 License

MIT License

---

## 👨‍💻 Author

Aditya Sharma  
Website: https://aditya-sharma.co.in  

---

⭐ If you like this project, please give it a star!
