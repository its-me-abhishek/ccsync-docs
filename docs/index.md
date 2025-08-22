# Developing for CCSync

This section provides a comprehensive guide to setting up CCSync for development or deployment.

If you have any further questions, feel free to contact us on [GitHub](https://github.com/its-me-abhishek/ccsync-docs).

---

## Environment Architecture

The diagram below illustrates how various components are connected to enable synchronization on the CCSync website and the [Taskwarrior Flutter App](https://github.com/CCExtractor/taskwarrior-flutter).

<img src="./images/architecture.jpg">

---

## Setting Up CCSync for Personal Use

---

### Prerequisites

- Docker
- Google OAuth Keys

### Steps to Run CCSync for Personal Use

1. Clone the CCSync repository and switch to the `docker-prod` branch.
2. Navigate to the production directory using the command: `cd production`.
3. Create a file named `.backend.env` with the following attributes:

        CLIENT_ID="client_ID" # Google Auth Secret from Prerequisites
        CLIENT_SEC="client_SECRET" # Google Auth Secret from Prerequisites
        REDIRECT_URL_DEV="http://localhost:8000/auth/callback" 
        SESSION_KEY="generate a secret key using 'openssl rand -hex 32'"
        FRONTEND_ORIGIN_DEV="http://localhost" # URL of the web frontend to avoid CORS errors
        CONTAINER_ORIGIN="http://YOUR_CONTAINER_NAME:8080/" # Deployed taskchampion-sync-server container, default is production-syncserver-1

4. Run `docker-compose pull` to pull the CCSync images.
5. Run `docker-compose up` to start the project.
6. The frontend should now be available at `localhost:80`, the backend at `localhost:8000`, and the sync server at `localhost:8080`.

---

## Setting Up a Development Environment

---

### Prerequisites

- Docker
- Google OAuth Keys

### Steps to Set Up the Frontend

1. Navigate to the frontend directory and run the following command:

        npm install

2. Create a `.env` file in the same directory.
3. If you want to use Docker, set the environment variables in `.env` as follows:

        VITE_BACKEND_URL="http://localhost:8000/" # Backend URL for app or web frontend interaction
        VITE_FRONTEND_URL="http://localhost:80" # Web frontend URL to avoid CORS errors
        VITE_CONTAINER_ORIGIN="http://localhost:8080/" # URL of the deployed taskchampion-sync-server container

4. Otherwise, set the environment variables in `.env` as follows:

        VITE_BACKEND_URL="http://localhost:8000/" # Backend URL for app or web frontend interaction
        VITE_FRONTEND_URL="http://localhost:5173" # Web frontend URL to avoid CORS errors
        VITE_CONTAINER_ORIGIN="http://localhost:8080/" # URL of the deployed taskchampion-sync-server container

5. Run the frontend container only:

        docker-compose build frontend
        docker-compose up

---

### Steps to Set Up the Backend

1. Navigate to the backend directory and run the following commands:

        go mod download
        go mod tidy

2. Create a `.env` file in the same directory.
3. Go to the [Google Cloud Credentials page](https://console.cloud.google.com/apis/credentials) to generate a client ID and secret.
4. If you want to use Docker, set the environment variables in `.env` as follows:

        CLIENT_ID="client_ID" # Google Auth Secret
        CLIENT_SEC="client_SECRET" # Google Auth Secret
        REDIRECT_URL_DEV="http://localhost:8000/auth/callback" 
        SESSION_KEY="generate a secret key using 'openssl rand -hex 32'"
        FRONTEND_ORIGIN_DEV="http://localhost" # Web frontend URL to avoid CORS errors
        CONTAINER_ORIGIN="http://YOUR_CONTAINER_NAME:8080/" # URL of the deployed taskchampion-sync-server container

5. Otherwise, set the environment variables in `.env` as follows:

        CLIENT_ID="client_ID" # Google Auth Secret
        CLIENT_SEC="client_SECRET" # Google Auth Secret
        REDIRECT_URL_DEV="http://localhost:8000/auth/callback"
        SESSION_KEY="generate a secret key using 'openssl rand -hex 32'"
        FRONTEND_ORIGIN_DEV="http://localhost:5173" # Web frontend URL to avoid CORS errors
        CONTAINER_ORIGIN="http://localhost:8080/" # URL of the deployed taskchampion-sync-server container

6. Run the backend container only:

        docker-compose build backend
        docker-compose up

**Note:** If you plan to run the backend without Docker, it is recommended to run it as a `root` user, preferably on `WSL` or any Linux distribution with elevated permissions. This is because the server requires permissions to update your `taskrc` file based on the logged-in user.

**Note:** The Taskchampion sync server is currently being pulled from the repository [here](https://github.com/GothenburgBitFactory/taskchampion-sync-server).

---

### Steps to Set Up the Taskwarrior Flutter App with CCSync

1. For development or personal use, you only need to set up the backend and the sync server. Setting up the frontend is optional.
2. Go to **Settings** -> Turn on **Taskchampion Sync**.
3. Navigate back to the menu, click on **CCSync Credentials**, and paste the credentials from the frontend as specified.
4. Click **Save**.
5. Refresh the tasks. CCSync should now be synced with your Taskwarrior Flutter App.

---

### Troubleshooting

If the sync breaks, it is often due to incorrect `.env` variables. Ensure that your Docker containers are visible and accessible by using the `ping <container_address>` command.

---

## Testing

- To test the backend, navigate to the backend directory and run:

        cd backend
        go test <package_name>

  Replace `<package_name>` with the name of the test suite you want to run.

- To test the frontend, navigate to the frontend directory and run:

        cd frontend
        npm test

**Note:** To set up or run tests for pages with URLs (e.g., `HomePage.tsx`), toggle the `isTesting` variable to `true` in `frontend/src/components/utils/URLs.ts`.

---

## Google OAuth Keys

Before starting the frontend, go to the [Google Cloud Credentials page](https://console.cloud.google.com/apis/credentials) to generate a client ID and secret. Read [this guide](https://developers.google.com/identity/protocols/oauth2) for more information on these credentials and how they work. These keys are required to generate a consistent Client ID and Encryption Secret for using Taskchampion. If you already have your own keys, you can skip this step.

### Steps to Generate Google OAuth Keys:

1. Go to the Google Developer Console.
2. Create a new project.
3. Within your project, create a new "Client ID" by navigating to **APIs & Auth** > **Credentials** and clicking on **Create New Client ID**.
4. Select **Web Application**.
5. Enter the following for **Authorized JavaScript Origins**:

        http://127.0.0.1
        http://localhost

6. Enter the following for **Authorized Redirect URI**:

        http://127.0.0.1:8000/callback/

7. Save your changes.
8. You will be presented with your newly generated credentials, which are required for setting up the backend.

---