# Forum Website

Frontend made with Sveltekit and TailwindCSS

Backend made with ExpressJS and Prisma with SQLite3

## To run locally:
1. npm install on both ./frontend and ./backend
2. Setup .env files on frontend and backend
  
  - frontend/.env
```env
  PUBLIC_API_ADDRESS='Your_localhost_backend_server'
```
  - backend/.env
```env
  DATABASE_URL="file:../path/to/db"
  SESSION_SECRET="ANY SECRET FOR EXPRESS SESSION COOKIES"
```
3. Setup Prisma with SQLite3
