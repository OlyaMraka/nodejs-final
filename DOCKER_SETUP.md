# Docker Setup

## Prerequisites

* Docker
* Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```

---

## Build Containers

```bash
docker compose build
```

---

## Start Application

```bash
docker compose up
```

Run in detached mode:

```bash
docker compose up -d
```

---

## Stop Application

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

---

## Rebuild After Changes

```bash
docker compose up --build
```

or

```bash
docker compose build
docker compose up
```

---

## Application Ports

| Service | Host Port | Container Port |
| ------- | --------- | -------------- |
| API     | 5555      | 7000           |
| MongoDB | 1234      | 27017          |

API URL:

```text
http://localhost:5555
```

MongoDB URL:

```text
mongodb://localhost:1234
```

---