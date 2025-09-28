# Immo Yaoundé - Full-Stack Real Estate Application

This project is a modern, full-stack web application for a real estate agency, built with React for the frontend and Node.js/Express for the backend.

## Project Structure

- `/`: Contains the frontend React application source code.
- `/backend`: Contains the backend Node.js, Express, and MongoDB server.

## 🚀 Development Workflow

To run the application in development mode, you need to run **two** servers simultaneously in separate terminals.

### 1. Run the Backend Server

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Make sure you have installed dependencies (`npm install`) and configured your `.env` file (see `backend/README.md` for details).
3.  Start the backend server:
    ```bash
    npm run dev
    ```
4.  The API server will be running on `http://localhost:5001`.

### 2. Run the Frontend Server

1.  Open a **new terminal** and navigate to the project's **root directory**.
2.  Start the Vite development server:
    ```bash
    vite
    ```
    *(If you don't have Vite installed globally, you can install it with `npm install -g vite`)*
3.  The frontend will be available at `http://localhost:3000`.

### 3. Access the Application

Open your browser and navigate to **`http://localhost:3000`**.

The frontend development server is now configured to automatically forward all API requests (anything starting with `/api`) to the backend server running on port 5001.

## 🌐 Production

In production, the Node.js server (`backend/server.js`) is configured to handle everything. It serves both the API and the compiled frontend files. You only need to run the backend server.
