# Mailer App
Mailer App is a web application that allows users to easily send emails. The application is built using the NestJS framework for the backend and Next.js for the frontend. It implements the Nodemailer library to handle email sending.

# Technologies Used
- Backend: NestJS
- Frontend: Next.js
- Email Library: Nodemailer

# How to Use
1. Clone this repository to your local machine.
2. Install dependencies for both the backend and frontend:
```
# Install backend dependencies
cd mailer-app-be
npm install

# Install frontend dependencies
cd mailer-app-fe
npm install
```

3. Run the application:
```
# Run the backend (NestJS)
npm run start # or npm run start:dev

# Run the frontend (Next.js)
npm run dev
```

4. Configure Nodemailer and database by adjusting the `.env.tempalate` to `.env` file in the backend folder:
```
SMTP_HOST=<Your_SMTP_Host>
SMTP_PORT=<Your_SMTP_Port>
SMTP_USER=<Your_SMTP_User>
SMTP_PASS=<Your_SMTP_Password>

# Cloudinary for upload file or you can use other service
CLOUD_NAME=<cloud-name>
API_KEY=<api-key>
API_SECRET=<api-secret>
CLOUD_FOLDER=<cloud-folder>

DATABASE_URL="postgresql://username:password@localhost:5432/dbname?schema=public"
```

5. Create `.env` file in frontend folder
```
# Add this config
API_URL="http://localhost:8000"
```

# Libraries and Tools
- NestJS: A framework for the backend that provides a modular and scalable structure.
- Next.js: A React framework for server-side rendering on the frontend.
- Nodemailer: A library for email sending that supports various sending protocols.
