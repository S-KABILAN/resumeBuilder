# Email/Password Authentication Implementation Guide

This guide explains the implementation of email/password authentication in the Resume Builder application.

## Features Added

- User registration with email and password
- User login with email and password
- Password hashing and security
- Integration with existing Google authentication
- Unified authentication service for the frontend

## Backend Implementation

### Models

- Updated the User model to support both Google and email/password authentication
- Added password hashing using bcryptjs
- Added password comparison method

### Controllers

- Added register endpoint for new users
- Added login endpoint for existing users
- Updated Google authentication to link accounts with same email

### Routes

- Added /api/auth/register endpoint
- Added /api/auth/login endpoint

## Frontend Implementation

### Services

- Created unified authService.js with functions for:
  - Register
  - Login
  - Google login
  - Logout
  - Authentication check

### Components

- Updated Login.jsx to include registration and login forms
- Added toggle between login and registration
- Added form validation and error handling
- Updated GoogleAuth.jsx to use the new authentication service

## Installation and Setup

1. **Backend Setup**

```bash
# Navigate to the backend directory
cd backend

# Install dependencies (if not already installed)
npm install

# Start the backend server
npm run dev
```

2. **Frontend Setup**

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the frontend development server
npm run dev
```

## API Endpoints

### Register

- **URL**: `/api/auth/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

### Login

- **URL**: `/api/auth/login`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

## Security Considerations

- Passwords are hashed using bcryptjs before storage
- JWT authentication tokens expire after 24 hours
- Error messages provide minimal information to prevent user enumeration
- Authentication state is stored in localStorage and managed through the auth service

## Testing

1. Open the application and navigate to the login page
2. Test registration by entering a name, email, and password
3. Test login using the registered email and password
4. Test Google authentication to ensure it still works
5. Test linking accounts by registering with an email already used with Google login
