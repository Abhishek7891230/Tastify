# Tastify – Food Ordering Web Application

Tastify is a full-stack food ordering web application that allows users to browse a dynamic menu, add items to a cart, and place orders. The project demonstrates a complete frontend and backend workflow with modern tools, state management, authentication, and deployment.

---

## Features

- Fully responsive UI built with React.js and Tailwind CSS
- Global state management using Zustand
- Real-time cart updates and item management
- REST API for fetching menu items and handling orders
- Firebase Authentication for user sign-in
- Email notifications using EmailJS
- Frontend deployed on Netlify
- Backend deployed on Render

---

## 🛠 Tech Stack

### **Frontend**

- React.js
- JavaScript
- Tailwind CSS
- Zustand (State Management)

### **Backend**

- Node.js
- Express.js
- REST APIs
- JSON-based data storage

### **Tools & Services**

- Firebase Authentication
- EmailJS
- Netlify (Frontend Deployment)
- Render (Backend Deployment)

---

## 🔗 Live Demo

**Frontend:**  
https://tastify-app.netlify.app/

**Backend API:**  
https://tastify-tej1.onrender.com/api/products

---

## 📦 Installation & Setup (Local Development)

### **1. Clone the Repository**

git clone <repo-url>
cd project-root

---

## **Backend Setup**

cd backend
npm install
npm start

Backend runs on: **http://localhost:5000**

---

## **Frontend Setup**

cd frontend
npm install
npm run dev

Frontend runs on: **http://localhost:5173**

---

## Environment Variables

### **Backend (.env)**

PORT=5000
FRONTEND_URL=http://localhost:5173

### **Frontend (.env)**

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_API_BASE_URL=

---

## API Endpoints

### **GET Menu Items**

GET /api/products

### **POST New Order**

POST /api/orders

---

## Deployment

- **Frontend:** Deployed on Netlify using `npm run build` and `dist` folder
- **Backend:** Deployed on Render using Node.js web service

---
