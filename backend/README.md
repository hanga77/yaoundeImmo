# Helios DB Admin - Backend

This directory contains the Node.js, Express, and MariaDB backend for the Helios admin panel.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- Access to the `helios` MariaDB database.

## Setup and Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    This command reads the `package.json` file and installs all the required libraries (Express, cors, mysql2, etc.), including `nodemon` for development.
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Copy the example environment file to a new file named `.env`.
    ```bash
    cp .env.example .env
    ```

4.  **Configure your database connection:**
    Open the newly created `.env` file in a text editor and fill in the details for your MariaDB database.
    ```
    DB_HOST=127.0.0.1
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=helios
    PORT=3001
    ```

## Running the Server

### For Development (CRITICAL - PLEASE READ)

**This is the most important step to avoid errors.**

Your backend server needs to be restarted every time you make a code change. To do this automatically, this project now uses `nodemon` by default. Using `nodemon` will prevent "Cannot GET" or "Cannot POST" errors that happen when the server is running an old version of the code.

**Always use this command to start the server for development:**
```bash
npm start
```
You will see messages from `nodemon` indicating that it's watching for file changes. The server will automatically reload whenever you save a file in the `backend` directory. This ensures your API is always up-to-date and is the definitive fix for the issues you've been experiencing.

## File Visualization

To enable the visualization of reports from the `fichectrl` table:

1.  Create a directory named `CTRL` at the root of this `backend` directory.
2.  Place all your report files (e.g., PDFs, images) inside this `backend/CTRL` directory.

The application will automatically serve these files when you click the "view" link in the table.