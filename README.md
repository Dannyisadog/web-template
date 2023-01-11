This is a [Next.js](https://nextjs.org/) template project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [next-auth](https://next-auth.js.org/) signin and backend db initialized feature
## Getting Started

1. create .env file

```bash
cp .env.example .env
```

2. fill up basic info to .env

```
APP_NAME=YOUR_APP_NAME

NEXTAUTH_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

3. change your db name in ./docker_postgres_init.sql/00-create-default-db.sql

```
CREATE DATABASE "YOUR_DB_NAME";
```

4. setup environment

```bash
make setup
```

5. up service

```bash
make up
```

6. access web

```
http://localhost:3000
```