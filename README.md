# Skill Connect

### Developed by **Rashi Gupta** (GitHub: [rxz33](https://github.com/rxz33))

Skill Connect is a full‑stack platform designed to connect customers directly with skilled household service providers such as electricians, plumbers, carpenters, cleaners, appliance technicians, and more.

The goal of the platform is to give users **fast, reliable, location-based access** to trusted service providers while ensuring **fair pricing and transparent communication**.

---

## 🚀 Features

### 👥 User Roles

* **Customer** – Browse services, view provider profiles, book services, and submit reviews.
* **Service Provider** – Register skills, set availability, accept bookings, and manage tasks.

---

## 💡 Core Functionalities

* 🔐 **User Authentication** (Signup/Login for customers & providers)
* 📋 **Service Listings** with categories & filters
* 📅 **Real-time booking & scheduling**
* 💬 **Direct chat/request system** between users & providers
* ⭐ **Ratings & Reviews**
* 🧾 **Booking history & invoice generation**
* 📍 **Location-based search** for nearby providers
* ⚙️ Optional **Admin Dashboard** for managing users & bookings

---

## 🏗️ Tech Stack

| Layer               | Technologies                                              |
| ------------------- | --------------------------------------------------------- |
| **Frontend**        | EJS Templates, HTML, CSS, JavaScript, Bootstrap, Tailwind |
| **Backend**         | Node.js, Express.js                                       |
| **Database**        | MongoDB (Mongoose ORM)                                    |
| **Authentication**  | Passport.js (Local Strategy)                              |
| **Deployment**      | Render                                                    |
| **Version Control** | Git & GitHub                                              |

---

## 📁 Folder Structure

```
Skill-Connect/
│
├── app.js
├── package.json
├── controllers/
├── models/
├── routes/
├── middleware.js
├── cloudConfig.js
├── uploads/
├── public/
│   ├── css/
│   ├── js/
│
├── views/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
└── utility/
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```
git clone https://github.com/rxz33/Skill-Connect.git
```

### 2. Install Dependencies

```
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
SESSION_SECRET=your_secret_key
```

### 4. Start the Server

```
npm start
```

Your app will run at:

```
http://localhost:3000
```

---

## 🌐 Deployment (Render)

### Build Command:

```
npm install
```

### Start Command:

```
npm start
```

### Root Directory:

*(Leave empty)*

Add environment variables in Render dashboard under **Environment**.

---

## 🧩 API Endpoints (Examples)

| Method | Endpoint             | Description                  |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/auth/register` | Register a new user/provider |
| POST   | `/api/auth/login`    | Login to the platform        |
| GET    | `/api/services`      | Fetch all services           |
| POST   | `/api/bookings`      | Create a booking             |
| GET    | `/api/bookings/:id`  | Get booking details          |
| POST   | `/api/reviews`       | Submit a review              |

---

## 🤝 Contributing

Contributions are always welcome! Feel free to fork the repo, make improvements, and create a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## ✨ Future Enhancements

* 📱 Mobile App Version (React Native / Flutter)
* 💳 Integrated Payment Gateway (Razorpay / Stripe)
* 🌐 Multi-language support
* 🧠 AI-based skill/provider matching system
* 🔔 Push notifications for real-time updates

---

### 🚀 Developed with ❤️ by **Rashi Gupta**
