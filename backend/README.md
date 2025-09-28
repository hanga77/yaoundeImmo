# Immo Yaoundé Backend

This folder contains the Node.js, Express, and MongoDB backend for the Immo Yaoundé application.

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas/register) (Free tier is sufficient)

### 2. Installation

1.  Navigate into the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the required dependencies:
    ```bash
    npm install
    ```

### 3. Environment Configuration

1.  Create a `.env` file in the `backend` directory by copying the example:
    ```bash
    cp .env.example .env
    ```
2.  **Get your MongoDB Connection String:**
    - Log in to your MongoDB Atlas account.
    - If you don't have one, create a new cluster.
    - Go to `Database` -> `Connect` -> `Drivers`.
    - Select Node.js and copy the connection string.
3.  **Update your `.env` file:**
    - Open the `.env` file.
    - Set the `MONGO_URI` variable with the full string you copied from Atlas.
    - Add a long, random secret string for `JWT_SECRET`.

### 4. Seed the Database (First Time Only)

To populate the database with all the initial data for the application (properties, users, services, products, site configuration, etc.):

```bash
npm run seed
```
This script will clear existing collections and insert all the sample data.

### 5. Running the Application

This backend server exposes the API for the Immo Yaoundé application. For the best development experience, you should run the frontend and backend servers separately.

#### Development

1.  **Start the backend server:**
    From within the `backend` directory, run:
    ```bash
    npm run dev
    ```
    The API will be available at `http://localhost:5001`.
2.  **Start the frontend server:**
    Open a new terminal, go to the project's **root** directory, and follow the instructions in the main `README.md` file to start the Vite development server.

#### Production

In a production environment, this server is also configured to serve the compiled frontend static files. When deployed, you only need to run this server.
