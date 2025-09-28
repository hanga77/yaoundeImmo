# Immo Yaoundé - Full-Stack Real Estate Application

This project is a modern, full-stack web application for a real estate agency, built with React for the frontend and Node.js/Express for the backend.

## Project Structure

- `/`: Contains the frontend React application source code.
- `/backend`: Contains the backend Node.js, Express, and MongoDB server.
- `/api`: Contains the serverless entry point for Vercel deployment.

## 🚀 Development Workflow

To run the application in development mode, you need to run **two** servers simultaneously in separate terminals.

### 1. Run the Backend Server

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Make sure you have installed dependencies (`npm install` in the root folder) and configured your `.env` file (see `backend/README.md` for details).
3.  Start the backend server:
    ```bash
    npm run dev
    ```
4.  The API server will be running on `http://localhost:5001`.

### 2. Run the Frontend Server

1.  Open a **new terminal** and navigate to the project's **root directory**.
2.  Start the Vite development server:
    ```bash
    npm run dev
    ```
3.  The frontend will be available at `http://localhost:3000`.

### 3. Access the Application

Open your browser and navigate to **`http://localhost:3000`**.

The frontend development server is now configured to automatically forward all API requests (anything starting with `/api`) to the backend server running on port 5001.

## 🌐 Deployment to Vercel

This project is configured for easy deployment to [Vercel](https://vercel.com).

### 1. Push to GitHub

Push your project to a GitHub repository.

### 2. Import Project on Vercel

- Sign up or log in to Vercel.
- Import your GitHub repository.
- Vercel should automatically detect the project settings from `vercel.json` and `package.json`.

### 3. Configure Environment Variables (CRITICAL STEP)

Your deployed application will fail to load data if you skip this step. Vercel does not use your local `.env` file.

1.  In your Vercel project dashboard, go to the **Settings** tab.
2.  Click on **Environment Variables** in the left sidebar.
3.  Add the following two variables:
    - **`MONGO_URI`**: Your complete MongoDB connection string.
    - **`JWT_SECRET`**: The long, random string you use for signing tokens.

4.  Click **Save**.

### 4. Deploy

- Go to the **Deployments** tab in Vercel.
- Trigger a new deployment (Redeploy). Vercel will build and deploy your application.

Once the deployment is complete, your full-stack application will be live!
