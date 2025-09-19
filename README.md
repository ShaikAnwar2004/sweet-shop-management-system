# 🍬 Sweet Shop Management System

A full-stack web application to manage sweet inventory, track sales, and generate reports. Built with **Spring Boot (Java)** for the backend and **React.js** for the frontend.

---

## 🚀 Features

- ✅ Add, update, and delete sweets from inventory
- 🛒 Record sales with buyer info and date
- 📊 View inventory, sales, and profit reports
- 🔐 Login system (basic or JWT-based)
- 🎨 Responsive UI with custom CSS and Bootstrap

---

## 🛠️ Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | React.js, Axios, CSS, Bootstrap |
| Backend    | Spring Boot, Java, MySQL |
| Testing    | JUnit (backend), Manual (frontend) |
| Deployment | Localhost (demo), GitHub |

---

## 📂 Project Structure

### Backend (`sweetshop`)
- `controller/` – REST endpoints
- `service/` – Business logic
- `repository/` – Data access
- `model/` – Entity classes

### Frontend (`sweetshop-frontend`)
- `components/` – Forms and report viewer
- `pages/` – Dashboard and login
- `services/` – API integration
- `App.js` – Routing
- `index.js` – Entry point

---

## 🧪 How to Run

### Backend
```bash
cd sweetshop
mvn spring-boot:run
