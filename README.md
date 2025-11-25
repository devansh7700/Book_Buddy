## Book Buddy API Library Management.
A books management, due date, late fees, email-alerts and Firebase Firestore-based database Node.js + TypeScript REST API.

## Features
- CRUD operations for books
- Borrow / return system
- Cron job: Late fee auto-calculation.
- Nodemailer with email notifications.
- Firebase Firestore data store.
- API Key security middleware
- Swagger API documentation

## Setup & Installation
Follow these steps to run this project locally after cloning:

1. Clone the repository
- git clone <your-repository-url>
- cd Book_Buddy

2. Install dependencies
- npm install

3. Create a .env file

Inside the project root, create a .env file:

NODE_ENV=development
PORT=3000

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_account_email
FIREBASE_PRIVATE_KEY="your_private_key"

# Swagger
SWAGGER_SERVER_URL=http://localhost:3000/api/v1

# Email SMTP
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

## Important

- Keep the firebase key in the quotes
- EMAIL_PASS is required to be an App Password and not your Gmail log-in.

## Firebase Setup
You must use a Service Account Key:

Go to Firebase Console

Open your project

Navigate to
Project Settings → Service Accounts → Generate Private Key

Copy credentials into .env

## Start the server 
- npm start

## API Documentation (Swagger)

Once running, open:
http://localhost:3000/api-docs

## Authentication
Use api key to fetch the id token to to use protected routes

## Testing Email (Nodemailer)

Any book that becomes overdue will trigger email sending inside the cron job.

You can try it by:
- Creating a book with an old dueDate.
- Wait for cron job (runs every minute by default).
- Check your email inbox.