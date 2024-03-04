Forum Website

Frontend made with Sveltekit and TailwindCSS

Backend made with ExpressJS and Prisma with SQLite3

To run locally:
- npm install on both ./frontend and ./backend
- Setup .env files on frontend and backend
./frontend/.env
  PUBLIC_API_ADDRESS='Your_localhost_backend_server'

./backend/.env
  DATABASE_URL="file:../path/to/db"
  SESSION_SECRET="ANY SECRET FOR EXPRESS SESSION COOKIES"

- Setup Prisma with SQLite3
