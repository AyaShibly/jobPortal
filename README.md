# 🎯 Job Portal

A full-stack job portal application built with React, TypeScript, Node.js, Express, and MongoDB. This application allows users to browse jobs, apply for positions, and provides an admin dashboard for managing jobs, candidates, and applications.

## ✨ Features

### User Features
- 🔐 User authentication (Login/Register)
- 🏠 Browse available job listings
- 📋 View job details and requirements
- 🔍 Filter jobs by category and type
- 📊 View statistics and featured jobs

### Admin Features
- 📊 Comprehensive admin dashboard
- 💼 Job management (Create, Read, Update, Delete)
- 👥 Candidate management
- 📋 Application tracking and status updates
- 📈 Real-time statistics and analytics
- 🔄 Application status workflow (Pending → Reviewed → Accepted/Rejected)

## 🛠️ Tech Stack

### Frontend
- **React** (v18) with TypeScript
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with modern animations
- Responsive design

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (running locally or remote connection)
- **npm** or **yarn**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AyaShibly/jobPortal.git
cd jobPortal
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/job_portal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** Change the `JWT_SECRET` to a strong, random value in production!

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
jobPortal/
├── backend/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── jobController.ts
│   │   ├── candidates.controller.ts
│   │   └── application.controller.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validateRequest.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── Job.ts
│   │   ├── candidates.ts
│   │   └── application.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── jobRoutes.ts
│   │   ├── candidates.routes.ts
│   │   └── application.routes.ts
│   ├── utils/
│   │   └── api.Features.ts
│   ├── app.ts
│   ├── server.ts
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── AdminDashboard.tsx
    │   │   ├── home.tsx
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── admin.css
    │   │   ├── home.css
    │   │   └── login.css
    │   ├── App.tsx
    │   └── index.js
    └── package.json
```

## 🗄️ Database Collections

The application uses 4 MongoDB collections:

1. **users** - User accounts for authentication
2. **jobs** - Job postings with details
3. **candidates** - Candidate profiles
4. **applications** - Job applications linking candidates to jobs

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (authenticated)
- `PUT /api/jobs/:id` - Update job (authenticated)
- `DELETE /api/jobs/:id` - Delete job (authenticated)

### Candidates
- `GET /api/candidates` - Get all candidates
- `GET /api/candidates/:id` - Get single candidate
- `POST /api/candidates` - Create candidate
- `PUT /api/candidates/:id` - Update candidate (authenticated)
- `DELETE /api/candidates/:id` - Delete candidate (authenticated)

### Applications
- `GET /api/applications` - Get all applications (authenticated)
- `GET /api/applications/:id` - Get single application (authenticated)
- `POST /api/applications` - Create application
- `PUT /api/applications/:id` - Update application status (authenticated)
- `DELETE /api/applications/:id` - Delete application (authenticated)

## 🎨 Features Showcase

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and API endpoints
- Automatic login state management

### Responsive Design
- Modern, clean UI with gradient backgrounds
- Smooth animations and transitions
- Mobile-friendly layout
- Glassmorphism effects

### Admin Dashboard
- Real-time statistics
- Interactive data tables
- Modal forms for CRUD operations
- Application status management
- Filtering and search capabilities

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- Input validation on both frontend and backend
- Error handling middleware
- Environment variable configuration

## 🚧 Future Enhancements

- [ ] Advanced search and filtering
- [ ] Email notifications
- [ ] Resume upload functionality
- [ ] Job application tracking for users
- [ ] User profile management
- [ ] Company profiles
- [ ] Job recommendations
- [ ] Analytics dashboard with charts

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributors

- [AyaShibly](https://github.com/AyaShibly)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For any questions or suggestions, please open an issue on GitHub.

---

Made with ❤️ using React, Node.js, and MongoDB
