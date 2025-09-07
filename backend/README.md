# OAuth Backend Server (Google & LinkedIn)

This is a Node.js/Express backend for handling user authentication using **Google OAuth2.0** and **LinkedIn OpenID Connect** via **Passport.js**. It uses MongoDB to persist user data and manages sessions with `express-session`.

---

## Features

- Login with Google
- Login with LinkedIn (OIDC)
- MongoDB integration for user storage
- Session-based authentication
- Passport.js strategies for both providers

---

## Tech Stack

- Node.js & Express
- Passport.js (Google & LinkedIn OIDC)
- MongoDB (Mongoose)
- dotenv
- express-session

---

## Setup

Create a .env file in /backend and configure like so to run locally:

    SESSION_SECRET=value in word document, I will create a random secret specifically for you so we aren't using the same one
    GOOGLE_CLIENT_ID=value in word document
    GOOGLE_CLIENT_SECRET=value in word document
    LINKEDIN_CLIENT_ID=value in word document
    LINKEDIN_CLIENT_SECRET=value in word document
    MONGO_URI=value in word document

## Run the App

You can start the development server like so:
```bash
npm run start
```

For running this I have to configure users in the google and linkedin apps for this to work so this may not work locally for you but I have proven in the video, this does work

