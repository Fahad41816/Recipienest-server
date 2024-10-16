# Recipe Sharing Website - Server

![Logo](https://i.ibb.co.com/PCRqJ6b/whitelogo.png)

This is the server-side code for the Recipe Sharing Website, a full-stack web application where users can share, discover, and interact with recipes. The backend handles user authentication, recipe management, admin control, and premium subscription features.

## Features

### User Features
- **User Authentication**: Secure sign-up, login, and JWT-based session management.
- **Recipe Management**: CRUD operations for user-created recipes.
- **Interactions**: Like, comment, and rate recipes.
- **Profile and Password Management**: Users can update profile details and reset/change passwords.
- **Premium Subscription**: Handles payment processing for premium users to access exclusive recipes.

### Admin Features
- **User Management**: Admins can manage all user accounts, including editing or deleting users, and promoting users to admin.
- **Recipe Control**: Admins can publish or unpublish recipes to manage content visibility.
- **Premium Recipe Management**: Admins control access to premium content for paid users.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose for data modeling
- **Authentication**: JWT (JSON Web Token) 
- **Payment Integration**: Payment gateway for handling premium subscriptions
- **Environment Variables**: Managed with dotenv for secure configuration

## Installation

1. Clone the repository:

   ```bash
   https://github.com/Fahad41816/Recipienest-server
