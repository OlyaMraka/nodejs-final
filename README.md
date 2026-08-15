# Car Marketplace API

REST API for a car marketplace built with Node.js, TypeScript, Express, and MongoDB Atlas.

The application supports car advertisements, JWT authentication, roles and permissions, basic and premium seller accounts, advertisement moderation, statistics, currency conversion, dealerships, and requests for missing car brands or models.

## Architecture

```text
router -> middleware -> controller -> service -> repository -> MongoDB Atlas
```

- `routers` - API endpoints.
- `middleware` - JWT, permissions, validation, and ownership checks.
- `controllers` - HTTP request and response handling.
- `services` - business logic.
- `repositories` - MongoDB queries.
- `models` - Mongoose schemas.
- `seeders` - initial roles, users, brands, models, ads, and rates.

## Technologies

- Node.js 20, TypeScript, Express
- MongoDB Atlas, Mongoose
- JWT, bcrypt, Joi
- Nodemailer, Handlebars, node-cron
- Docker and Docker Compose

## Environment Variables

Create a `.env` file in the project root. It must not be committed to Git.

```dotenv
PORT=7000
MONGO_URL=mongodb+srv://<atlas-username>:<url-encoded-password>@<cluster-host>/AutoRia?retryWrites=true&w=majority

ACCESS_TOKEN_SECRET=replace_with_a_long_random_access_secret
REFRESH_TOKEN_SECRET=replace_with_a_different_long_random_refresh_secret
JWT_ACCESS_LIFETIME=900
JWT_REFRESH_LIFETIME=604800

EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-email-app-password
```

| Variable | Meaning | Where to get it |
| --- | --- | --- |
| `PORT` | API port inside the current environment. | Use `7000` for Docker; use `3000` for a direct local run. |
| `MONGO_URL` | MongoDB Atlas connection string. | Atlas Dashboard → **Database** → **Connect** → **Drivers**. |
| `ACCESS_TOKEN_SECRET` | Secret for access JWTs. | Generate a long random value. |
| `REFRESH_TOKEN_SECRET` | Secret for refresh JWTs. | Generate a different long random value. |
| `JWT_ACCESS_LIFETIME` | Access-token lifetime in seconds. | `900` = 15 minutes. |
| `JWT_REFRESH_LIFETIME` | Refresh-token lifetime in seconds. | `604800` = 7 days. |
| `EMAIL_USER` / `EMAIL_PASSWORD` | Mailbox used for notifications. | SMTP provider credentials; use an App Password for Gmail. |

If the Atlas password contains special characters, URL-encode them. For example, `@` becomes `%40`.
LIFETIME veriables are used in cron which deletes old tokens from DB(so better to set n minutes, for correct work)!!!

Before starting the API, open MongoDB Atlas → **Network Access** and add the public IP address of the machine that runs the API. For AWS, allow the application’s configured outbound IP or VPC connection.

## Run with Docker (recommended)

### Step 1 — Install Docker

Install Docker Desktop, then verify:

```bash
docker --version
docker compose version
```

### Step 2 — Create `.env`

Create `.env` in the project root using the example above. Keep these Docker values:

```dotenv
PORT=7000
MONGO_URL=mongodb+srv://<atlas-username>:<url-encoded-password>@<cluster-host>/AutoRia?retryWrites=true&w=majority
```

### Step 3 — Start the API

```bash
docker compose up --build
```

Run in the background instead:

```bash
docker compose up --build -d
```

### Step 4 — Check logs and open the API

```bash
docker compose logs -f app
```

The API is available at:

```text
http://localhost:5555
```

The API container connects directly to MongoDB Atlas. The `db` service in `docker-compose.yml` is optional local development infrastructure and is not required when Atlas is configured.

### Step 5 — Stop the application

```bash
docker compose down
```

## Run Locally Without Docker

### Step 1 — Install dependencies

```bash
npm ci
```

### Step 2 — Configure MongoDB Atlas

Create `.env` as described above, but set:

```dotenv
PORT=3000
MONGO_URL=mongodb+srv://<atlas-username>:<url-encoded-password>@<cluster-host>/AutoRia?retryWrites=true&w=majority
```

### Step 3 — Export variables in the terminal

`src/configs/config.ts` currently reads `process.env` and does not load `.env` automatically. In PowerShell, run:

```powershell
$env:PORT = "3000"
$env:MONGO_URL = "mongodb+srv://<atlas-username>:<url-encoded-password>@<cluster-host>/AutoRia?retryWrites=true&w=majority"
$env:ACCESS_TOKEN_SECRET = "your_access_secret"
$env:REFRESH_TOKEN_SECRET = "your_refresh_secret"
$env:JWT_ACCESS_LIFETIME = "900"
$env:JWT_REFRESH_LIFETIME = "604800"
$env:EMAIL_USER = "your-email@gmail.com"
$env:EMAIL_PASSWORD = "your-email-app-password"
```

### Step 4 — Start the API

```bash
npm start
```

Open:

```text
http://localhost:3000
```

## Seed Data

On a new database, the application seeds roles, users, brands, models, advertisements, and exchange rates.

| Role | Email | Password |
| --- | --- | --- |
| Administrator | `admin1@gmail.com` | `Password123!` |
| Manager | `manager1@gmail.com` | `Password123!` |
| Premium seller | `premium1@gmail.com` | `Password123!` |

These accounts are for development only.

## Main Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/auth/sign-up` | Register a seller. |
| `POST` | `/auth/sign-in` | Sign in and receive JWT tokens. |
| `GET` | `/auth/me` | Get the current user. |
| `GET` | `/carAds` | Get advertisements. |
| `POST` | `/carAds` | Create an advertisement. |
| `GET` | `/carAds/:id/statistics` | Get premium ad statistics. |
| `PATCH` | `/users/:id/ban` | Ban a seller; manager/admin permission required. |
| `POST` | `/communications/sendCarBrandRequestFax` | Request a missing brand. |
| `POST` | `/communications/sendCarModelRequestFax/:id` | Request a model for a brand ID. |

For protected endpoints, send:

```http
Authorization: Bearer <access_token>
```

## Common Problems

**MongoDB connection fails**

- Check that `MONGO_URL` is a valid Atlas URI.
- Check Atlas **Network Access** and database-user credentials.
- URL-encode special password characters.

**Docker API is not available on port 5555**

- Ensure `.env` contains `PORT=7000`.
- Run `docker compose logs -f app`.

**Emails are not sent**

- Check `EMAIL_USER` and `EMAIL_PASSWORD`.
- For Gmail, use an App Password rather than your normal account password.

## Production Note

MongoDB Atlas is the project’s cloud database. The current Dockerfile and Compose setup are intended for development. Before AWS deployment, use a production image that builds TypeScript during `docker build`, runs compiled JavaScript without watch mode, has a health check, does not mount source files, and retrieves secrets from AWS Secrets Manager.
