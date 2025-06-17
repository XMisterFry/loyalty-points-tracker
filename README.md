# Loyalty Points Tracker 🧾

This is a simple full-stack web application built with **Node.js**, **Express**, **MongoDB**, and **Vanilla HTML/CSS/JS** to track loyalty point earnings and redemptions for multiple distributors.

---

## 🌟 Features

- Add and redeem points for selected distributors.
- Maintain a ledger with date-wise transactions.
- Calculate running balance automatically.
- View ledgers for each distributor.
- Maroon-themed UI with top navigation.
- Data stored and managed in MongoDB.
- Points expire after 30 days (SMS reminder setup coming soon).

---

## 📁 Folder Structure

loyalty-points-tracker/
│
├── public/ # Frontend files
│ ├── add.html
│ ├── redeem.html
│ ├── ledger-list.html
│ ├── style.css

│
├── db.js # Mongoose schema and model
├── server.js # Express backend
├── .env # MongoDB connection string (not tracked in Git)
├── .gitignore
├── package.json
└── README.md # This file
|__ server,js

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/loyalty-points-tracker.git
cd loyalty-points-tracker
2. Install dependencies
bash
Copy
Edit
npm install
3. Configure environment
Create a .env file in the root and add your MongoDB URI:

env
Copy
Edit
MONGO_URI=your-mongodb-connection-string
⚠️ Make sure .env is added to .gitignore.

4. Start the server
bash
Copy
Edit
node server.js
The app will be available at: http://localhost:3000

🧪 Sample JSON Payloads
Add Points:
POST /add-points

json
Copy
Edit
{
  "distributor": "MS Brothers",
  "date": "2025-06-19",
  "invoice": "25-26/18",
  "points": 15
}
Redeem Points:
POST /redeem-points

json
Copy
Edit
{
  "distributor": "MS Brothers",
  "date": "2025-06-20",
  "invoice": "25-26/20",
  "points": 10
}
🚀 Upcoming Features
SMS reminders for points nearing expiry.

Authentication for admin access.

Export ledger to PDF or Excel.

Dashboard for total points & trends.

