# TODO: Implement Login and Registration Pages with Authentication

## Backend Authentication
- [x] Add dependencies to package.json: jsonwebtoken, bcryptjs, @types/bcryptjs, @types/jsonwebtoken
- [x] Install dependencies with npm install
- [x] Create User model (src/models/User.ts)
- [x] Create authController (src/controllers/authController.ts) with register and login
- [x] Create authRoutes (src/routes/authRoutes.ts)
- [x] Create auth middleware (src/middleware/auth.ts)
- [x] Update app.ts to include auth routes

## Frontend React App
- [x] Create React app in 'client' folder using npx create-react-app client
- [x] Implement Login component with styles (border radius, fonts)
- [x] Implement Register component with styles (border radius, fonts)
- [x] Add routing for login and register pages
- [x] Integrate authentication (JWT) in frontend

## Testing
- [x] Test backend auth endpoints (register works, login returns error for invalid credentials)
- [x] Test React frontend (compiled successfully, running on localhost:3000)
