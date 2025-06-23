# 📝 Blog Management System

> 🎓 Final project of our **30-Day Node.js Workshop** — built with XAMPP & MySQL!

---

## 🌟 Overview

The **Blog Management System** is a full-stack Node.js project designed to manage blog posts with user authentication, session-based login, and a beautiful modern frontend using Tailwind CSS. Data is stored and managed using **MySQL**, powered via **XAMPP**.

---

## ✨ Features

- 🧑‍💻 **User Registration & Login** (with session handling)
- ✨ **Clean Dashboard UI**
- 📰 **Add / Edit / Delete Blog Posts**
- 🖼️ **Single Blog View with Full Content**
- 🗂️ **Categorized Posts**
- ✅ **Access Control** (only authors can edit/delete)
- 🌐 **EJS templating** for dynamic content rendering
- 🪄 **Tailwind CSS** for beautiful UI
- 🔐 **Secure Routes** with Login Required Middleware

---

## 🛠️ Tech Stack

| Purpose            | Technology                  |
|--------------------|-----------------------------|
| Backend Runtime     | Node.js                    |
| Web Framework       | Express.js                 |
| Database            | MySQL (via Sequelize ORM)  |
| Local Server        | XAMPP (Apache + MySQL)     |
| Templating Engine   | EJS                        |
| Styling             | Tailwind CSS               |
| Auth Management     | express-session, bcrypt    |

---

## 🚀 Getting Started

### 1. 📦 Clone the Repository
```bash
git clone https://github.com/nisxant69/Blog_Management_System.git
cd Blog_Management_System
```

### 2. 📁 Set Up XAMPP

- Install XAMPP and start **Apache** and **MySQL**
- Open **phpMyAdmin** and create a new database:
  ```
  blog_system
  ```

### 3. ⚙️ Configure `.env`

Create a `.env` file in the root directory:
```env
DB_NAME=blog_system
DB_USER=root
DB_PASS=
DB_HOST=localhost
SESSION_SECRET=your_secret_key
```

### 4. 📦 Install Dependencies
```bash
npm install
```


### 5. 🏃 Run the Server
```bash
node --watch app.js
```

App runs at:  
`http://localhost:3000`

---

## 🗂️ Project Structure

```
📦 Blog_Management_System
├── 📁 views           # EJS templates
├── 📁 public          # Static files (CSS, images)
├── 📁 routes          # Express routes
├── 📁 controllers     # Route logic
├── 📁 models          # Sequelize models
├── 📁 middleware      # Auth middleware
├── 📁 config          # DB config
├── 📄 .env            # Environment config Rename .env.example to .env
├── 📄 app.js          # App entry point
└── 📄 package.json
```

---

## 🔐 Authentication Flow

- Register/Login with email & password
- Passwords hashed using `bcrypt`
- Session stored in memory (default, or optionally in DB)
- Middleware `isLoggedInOrNot.js` protects routes

---

## 🎓 Workshop Context

This system was developed as the **Final Project** of our  
📚 **30-Day Node.js Backend Development Workshop**, organized by [Digital Pathshala](https://www.facebook.com/digitalpathshala999).  

---

## 🤝 Contributing

You're welcome to contribute:

1. Fork
2. Create a feature branch (`git checkout -b feature/awesome`)
3. Commit changes ✅
4. Push to your fork 🚀
5. Open a PR 💡
