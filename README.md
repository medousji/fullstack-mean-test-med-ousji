
```markdown
# 🧩 Fullstack MEAN Blog Platform (Technical Test)

🚀 **Modern Fullstack Blog Application built with Angular 20, Node.js, Express, and MongoDB.**  
Includes authentication (JWT), article & comment CRUD, and real-time updates with Socket.io.  

[![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular)](https://angular.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

---

## 👤 Candidate

**Name:** Med Ousji  
**Role:** Fullstack Developer  
**Test:** Blog Platform – MEAN Stack Technical Test (Angular 20 + Node.js + MongoDB)

---

## 🧠 Overview

This project is a **collaborative multi-author blog platform** built as part of a technical test.  
It features full authentication, CRUD for articles and comments, real-time updates, and modern Angular 20 standalone components using the new `@if` / `@for` syntax.

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | Angular 20, TypeScript, Bootstrap 5 |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT, Bcrypt |
| Real-Time | Socket.io |
| Security | Helmet, Rate Limiting, CORS |
| UX | SweetAlert2 |

---

## 📁 Project Structure

```

project-root/
├── backend/
│   ├── src/
│   │   ├── models/        → User, Article, Comment
│   │   ├── routes/        → Auth, Articles, Comments
│   │   ├── middleware/    → authMiddleware.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
├── src/app/
│   ├── auth/          → Login, Register, AuthService
│   ├── articles/      → ArticleList, ArticleCreate, ArticleDetail
│   ├── comments/      → CommentList, CommentService
│   └── app.routes.ts
├── angular.json
├── package.json
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/fullstack-mean-test.git
cd fullstack-mean-test
````

---

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/blog
PORT=4000
JWT_SECRET=supersecretkey
```

Start the backend server:

```bash
npm run dev
# or nodemon server.js
```

The API will run on **[http://localhost:4000](http://localhost:4000)**

---

### 3️⃣ Frontend setup

```bash
cd ../frontend
npm install
ng serve
```

The app will run on **[http://localhost:4200](http://localhost:4200)**

---

## 🔐 Authentication Flow

| Endpoint             | Method | Description                 |
| -------------------- | ------ | --------------------------- |
| `/api/auth/register` | POST   | Create a new user           |
| `/api/auth/login`    | POST   | Login & receive JWT         |
| `/api/articles`      | CRUD   | Manage articles             |
| `/api/comments`      | CRUD   | Manage comments per article |

The JWT token is stored in `localStorage` and automatically attached to HTTP requests through an interceptor.

---

## ✍️ Features Implemented

| Feature          | Description                                             |
| ---------------- | ------------------------------------------------------- |
| 👤 **User Auth** | Register, login, logout using JWT                       |
| 📰 **Articles**  | List, create, edit, delete (with author ownership)      |
| 💬 **Comments**  | Inline CRUD operations for each article                 |
| 🔒 **Security**  | Password hashing (bcrypt), Helmet, CORS, Rate limiting  |
| ⚡ **Realtime**   | Socket.io updates new comments instantly                |
| 🎨 **Frontend**  | Angular 20 standalone components with `@if/@for` syntax |
| 💡 **UX**        | SweetAlert2 modals for feedback & confirmation          |

---

## 🧱 Backend Scripts

| Command       | Description                      |
| ------------- | -------------------------------- |
| `npm start`   | Run server normally              |
| `npm run dev` | Run with Nodemon for development |

---

## 🧩 Frontend Notes

* Uses Angular 20 **standalone components** (no `NgModule`)
* Includes **AuthGuard** and **TokenInterceptor**
* Uses **Bootstrap 5** for responsive styling
* Comments and articles integrated with backend API

---

## 💻 How to Use the App

1. Register a new account and log in.
2. Create an article using the “+ Create New” button.
3. View the article list and open article details.
4. Add comments (if logged in) and edit/delete your own.
5. Logout and test role restrictions.

---

## 📸 (Optional) Screenshots

*(Add later if needed — for example)*

```markdown
![Login Page](./frontend/src/assets/screens/login.png)
![Article List](./frontend/src/assets/screens/articles.png)
![Comments Section](./frontend/src/assets/screens/comments.png)
```

---

## 🧾 License

This project is licensed under the **MIT License**.
© 2025 — Med Ousji

---

## 📬 Contact

* **👨‍💻 Name:** Med Ousji
* **✉️ Email:** [med.ousji@gmail.com](mailto:med.ousji@gmail.com)
* **🔗 LinkedIn:** [linkedin.com/in/med-ousji](https://linkedin.com/in/mohamed-ousji)
* **🌍 GitHub:** [github.com/medousji](https://github.com/medousji)

---

## 🏁 Final Notes for Recruiters

This project demonstrates:

* A complete end-to-end MEAN stack setup
* Modern Angular 20 best practices (standalone + signals + @if/@for)
* RESTful API design with JWT authentication
* Real-time communication via Socket.io
* Clean, modular structure following the test requirements
* Production-ready architecture for scalability


