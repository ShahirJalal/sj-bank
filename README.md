# SJ Bank

Full-stack banking application deployed as one Docker Compose stack. Live at [bank.shahirjalal.com](https://bank.shahirjalal.com).

## Features

- User registration and login
- View account balance
- Deposit, withdraw, and transfer funds
- View transaction history

## Tech Stack

- **Frontend:** Angular 16, PrimeNG
- **Backend:** Spring Boot 3.3, Java 17
- **Database:** PostgreSQL 16
- **Deployment:** Docker Compose, Nginx, Cloudflare Tunnel, Jenkins

## Architecture

```text
bank.shahirjalal.com
        |
Cloudflare Tunnel
        |
localhost:8086
        |
Nginx + Angular
        |
     /api/*
        |
Spring Boot + PostgreSQL
```

The frontend uses relative `/api` URLs. Angular's development proxy forwards these requests to the local backend, while Nginx forwards them inside the production Docker network.

## Local development

Requirements: Java 17, Node.js, npm, and PostgreSQL running locally.

Start the backend from IntelliJ by running `BackendApplication`, or run:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The backend runs at `http://localhost:8081`.

In another terminal, start the Angular development server:

```powershell
cd frontend
npm ci
ng serve
```

Open `http://localhost:4200`. The local proxy forwards `/api` requests to the backend.

## Docker deployment

On the Ubuntu server, create the deployment environment file from the template:

```bash
cp .env.example .env
nano .env
```

Set a strong `POSTGRES_PASSWORD`, then start the stack:

```bash
docker compose up -d --build
```

The application is available locally on port `8086`.

## Cloudflare Tunnel

Add this ingress rule to `~/.cloudflared/config.yml` on the Ubuntu server:

```yaml
- hostname: bank.shahirjalal.com
  service: http://localhost:8086
```

Create a proxied CNAME DNS record named `bank` in the `shahirjalal.com` Cloudflare zone, targeting the tunnel's `*.cfargotunnel.com` hostname. Then restart cloudflared:

```bash
sudo systemctl restart cloudflared
```

## CI/CD

The `Jenkinsfile` rebuilds and starts the Docker Compose stack, then checks the frontend health endpoint. Configure a Jenkins Pipeline job that uses this repository and builds the `main` branch.
