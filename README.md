# 🍕 FlavorFusion - Full Stack Food Delivery App

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

A modern, responsive food delivery application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features user authentication, menu browsing, shopping cart, order management, and admin panel.

## 🚀 Live Demo

**Frontend URL:** `http://localhost:5173`  
**Backend API:** `http://localhost:5000`  
**Admin Panel:** `http://localhost:5174`

## ✨ Features

### 🛍️ Customer Features
- **User Authentication** - Secure registration/login with OTP verification
- **Menu Browsing** - Filter foods by categories with beautiful UI
- **Shopping Cart** - Add/remove items with real-time quantity updates
- **User Profile** - Personal profile management with image upload
- **Order Tracking** - View order history and status
- **Responsive Design** - Mobile-first approach for all devices

### 👨‍💼 Admin Features
- **Food Management** - Add, edit, delete menu items
- **Order Management** - Process and track customer orders
- **User Management** - View and manage user accounts
- **Analytics Dashboard** - Sales and performance metrics

### 🔒 Security Features
- JWT-based authentication
- Password encryption with bcrypt
- OTP verification for email
- Protected routes and API endpoints
- Input validation and sanitization

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management
- **CSS3** - Custom styling with modern features
- **React Icons** - Beautiful icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

cd backend

# Install dependencies
npm install

# Environment Configuration
cp .env.example .env

# Edit .env file with your configurations:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000

# Start development server
npm run dev

cd ../frontend

# Install dependencies
npm install

# Environment Configuration
cp .env.example .env

# Edit .env file:
REACT_APP_API_URL=http://localhost:5173/api/v1

# Start development server
npm start

FOOD_APP/
├── backend/
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Database & email config
│   ├── uploads/          # Image storage
│   ├── templates/        # Email templates
│   ├── utils/            # Utility functions
│   └── server.js         # Entry point
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   ├── assets/       # Images & icons
│   │   └── App.jsx       # Main app component
│   └── package.json
└── README.md


