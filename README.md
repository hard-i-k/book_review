Sure! Here's your updated README with the **Project Layout** section properly enclosed in a styled code block (box), while keeping the rest of the content exactly the same:

---

# ReviewShelf

Live Link – [https://reviewingshelf.netlify.app/](https://reviewingshelf.netlify.app/)

# **Note**: Since the backend is hosted on a free Render tier, it goes to sleep after a minute of inactivity. If you're visiting the live site, please wait \~59 seconds for the server to wake up.

ReviewShelf is a full‑stack book review platform built with React, Node.js/Express, and MongoDB. It lets readers add books, write reviews, and manage their profiles through a clean, mobile‑friendly interface. The frontend is deploy‑ready for Netlify, while the backend runs smoothly on Render.

---

## Why You’ll Love It

* Add & explore books – Upload covers, set prices, filter by genre, author, or rating, and browse an endless paginated list.
* Write authentic reviews – Share 1‑to‑5 star ratings, see the community average instantly, and keep every opinion tied to a real account.
* Secure by default – JWT‑based auth, bcrypt‑hashed passwords, and strict CORS rules keep data safe.
* Works everywhere – Built with Tailwind for a modern look.

---

## Architecture at a Glance

| Layer    | Key Tech                             | Highlights                                                                          |
| -------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| Frontend | React + Vite, React Router, Tailwind | Context keeps ratings in sync; Axios centralizes API calls; images sent as Base64   |
| Backend  | Express, Mongoose                    | Modular REST routes, JWT auth, dotenv‑driven config                                 |
| Database | MongoDB Atlas                        | Stores users, books, and reviews                                                    |
| Hosting  | Netlify + Render                     | Simple environment‑variable setup, SPA routing handled by a single \_redirects file |

---

# Setup Instructions

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd book_review/backend
   ```
2. **Install dependencies:**

   ```bash
   npm install
   ```
3. **Configure environment variables:**

   * Copy `.env.example` to `.env` and fill in the required values:

     * `PORT` (default: 5000)
     * `MONGO_URI` (your MongoDB connection string)
     * `JWT_SECRET` (a strong secret for JWT)
4. **Start the backend server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the frontend development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

4. **Deploy**

* Frontend: point Netlify to `frontend/` and set publish directory → `build`.
* Backend: connect Render to `backend/` and copy the same env vars.
* Add `/* /index.html 200` to `frontend/public/_redirects` so deep links work.

---

## Security Highlights

* JWT required on every protected route
* Passwords hashed with bcrypt (10 salt rounds)
* Owner‑only actions – only the uploader can delete a book
* Centralised error handler for clean status codes

---

## Form Checks

* Signup: name, valid email, strong password (8+ chars incl. upper, lower, digit)
* Login: email + password
* Add Book: title, author, genre, description, price > 0, and an image
* Add Review: 1–5 stars, optional text (length‑limited)

Disabled buttons and friendly error toasts keep the UX smooth.

---

# Project Layout

```
book_review/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   ├── README.md
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── _redirects
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── styles/
│   │   ├── utils/
│   │   └── App.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
└── README.md
```
## Limitations
*Images as Base64 will bloat the DB if covers are huge*

