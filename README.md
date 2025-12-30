# Pastebin Frontend

This is the frontend for a Pastebin-like application where users can create text pastes and view them using a shareable link.

---

##  How to Run Locally

npm install
npm run dev


## The app will run on:

http://localhost:5173

## Create a .env file in the frontend root:

VITE_API_BASE_URL=http://localhost:3000

## Persistence Layer

The frontend does not store data locally.
All persistence is handled by the backend via REST APIs.

## Important Design Decisions

Built as a Single Page Application (SPA) using React

Uses HashRouter to ensure /p/:id works on static hosting (Netlify/Vercel)

Keeps frontend stateless; all business logic lives in the backend

Minimal UI focused on functionality rather than styling

Communicates with backend using a configurable API base URL


## Deployed Frontend

Frontend URL
https://illustrious-truffle-244cfd.netlify.app
