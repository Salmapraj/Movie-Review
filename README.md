# Movie-Review

A full-stack web application that allows users to explore movies, rate them, and share reviews.  
It integrates data from TMDB (The Movie Database) API and includes authentication, searching, pagination, reviewing, movie listings.

---

## Features

- User authentication (login / signup)
- Browse movies and detailed info from TMDB API
- Rate movies from (0-10) ratings
- Write reviews and view reviews from other users
- Responsive UI using React + TailwindCSS
- Restful API backend

## Tech Stack

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React Icons

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- dotenv, bcrypt, cors,nodemon

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Salmapraj/Movie-Review.git
cd Movie-Review

2. Install backend dependencies:
 cd backend
 npm install

Environment Variables
Create a .env file in the backend directory:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_BEARER_TOKEN=your_tmdb_token
PORT=3000

Start the backend server:
cd backend
npm start

In a new terminal, start the frontend development server:
cd frontend
npm run dev

Open your browser and navigate to http://localhost:5173

Usage
Register or login as a user
Browse trending or popular movies
Click on a movie to view details and cast
Add your review and rating
See other users’ review



Author
Salma - Salmapraj

## Screenshots
###H## Screenshots

### Homepage
![Home page](https://raw.githubusercontent.com/Salmapraj/Movie-Review/main/screenshots/home.png)

### Login page
![Login page](https://raw.githubusercontent.com/Salmapraj/Movie-Review/main/screenshots/login.png)

### Movie page
![Movie page](https://raw.githubusercontent.com/Salmapraj/Movie-Review/main/screenshots/movies.png)

### Movie Details page
![Movie Detail page](https://raw.githubusercontent.com/Salmapraj/Movie-Review/main/screenshots/MovieDetails.png)

### Profile page
![Profile page](https://raw.githubusercontent.com/Salmapraj/Movie-Review/main/screenshots/profile.png)

### Reviews page
![Review page](https://raw.githubusercontent.com/Salmapraj/Movie-Review/main/screenshots/castAndReviews.png)


```
