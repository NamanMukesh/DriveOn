# DriveOn – Car Rental Platform

![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-MongoDB-yellow)
![Hosting](https://img.shields.io/badge/Hosting-Vercel-blue)

**Live Demo:** [https://drive-on-mocha.vercel.app](https://drive-on-mocha.vercel.app)

DriveOn is a modern car rental platform where car owners can list their vehicles for daily rental and customers can easily find and rent cars based on their preferences.

---

## 🚗 Features

- **Owner Dashboard**
  - List new cars with details and daily rental prices
  - Manage active listings and view booking history
  - Edit or remove vehicles from the platform

- **Customer Interface**
  - Search and filter cars by type, location, and availability
  - View detailed information and photos of each vehicle
  - Book cars for desired dates and manage reservations

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Hosting:** Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm

---

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/driveon.git
   cd driveon

2. Install frontend dependencies:
   ```bash
    cd client
    npm install
3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
4. Setup environment variables in server/.env:
   ```bash
   MONGO_DB_URL=your-database-uri
   JWT_SECRET=your-jwt-secret
   IMAGE_KIT_PUBLIC_KEY=your-imagekit-public-key 
   IMAGE_KIT_PRIVATE_KEY=your-imagekit-private-key
   IMAGE_URL_ENDPOINT=your-imagekit-url-endpoint
5. Setup environment variables in client/.env:
   ```bash
   VITE_CURRENCY=Rs.
   VITE_BASE_URL=you-server-url
6. Run the application:
   ```bash
   # Backend (New Terminal)
   cd server
   npm run server
    
   # Frontend (New Terminal)
   cd client
   npm run dev

---

## 📄 Usage

- For Owners: Sign up, add cars, manage listings, and track bookings.
- For Customers: Browse cars, filter based on preference, view details, and book rentals.
