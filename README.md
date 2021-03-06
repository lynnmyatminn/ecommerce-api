# Ecommerce API

RESTful API for e-commerce web application. Developed with NodeJS, Express and MongoDB.

## Badges

![ts](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
[![CircleCI](https://img.shields.io/badge/circleci-343434?style=for-the-badge&logo=circleci&logoColor=white)](https://circleci.com/gh/lynnmyatminn/ecommerce-api/tree/master)

<!-- [![Heroku](https://pyheroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat)](https://haru-fashion.herokuapp.com/) -->

[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://github.com/facebook/jest)
[![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)](https://github.com/prettier/prettier)

## Demo

[🚀 API Demo]()  
[📖 API Docs]()

## Features

Here are some of the project's features

- CRUD Operations
- Authentication
- Authorization and RBAC
- Forgot/Reset Password
- Full-Text Search (for products)

## Tech Stack

**Backend:** Node, Express  
**Database:** MongoDB  
**Testing:** Jest  
**Containerization:** Docker  
**CI/CD:** CircleCI

## Running Locally

Clone the project

```bash
git clone https://github.com/lynnmyatminn/nodeshoptest.git
```

Go to the project directory

```bash
cd nodeshoptest
```

Remove remote origin

```bash
git remote remove origin
```

Install dependencies

```bash
npm install
```

Add Environment Variables  
_add the following environment variables to .env file. (some env var include example values)_

<details>
  <summary>Click to expand!</summary>
  
  - `NODE_ENV`  
  - `PORT`  
  - `POSTGRES_USER=testuser`
  - `POSTGRES_PASSWORD=test123`
  - `POSTGRES_DB=haru`
  - `JWT_SECRET`
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASS`
  - `FROM_NAME`
  - `FROM_MAIL`
  - `DATABASE_URL="postgresql://testuser:test123@postgres:5432/haru?schema=public"`
</details>

Migrate and seed database

```bash
npm run seeder
```

<details>
  <summary>Can't reach database server Error ?</summary>

- _Change_ **@postgres** _to_ **@localhost** _in_ `DATABASE_URL` _inside .env **for a while**_

```bash
DATABASE_URL="postgresql://testuser:test123@postgres:5432/test_db?schema=public"
```

<p align="center">⬇️</p>

```bash
DATABASE_URL="postgresql://testuser:test123@localhost:5432/test_db?schema=public"
```

</details>

Start the server

```bash
npm run dev
```

Stop the server

```bash
npm run dev:down
```

## Running Tests

To run tests, create a file called **.env.test** at the root of the project.
Then add the following environment variables.  
`NODE_ENV=testing`  
`DATABASE_URL="postgresql://prisma:prisma@localhost:5437/tests"`

Note! dotenv-cli must be installed globally before running any test

```bash
sudo npm install -g dotenv-cli
```

Run the test

```bash
npm run test
```

<details>
  <summary>Can't reach database server Error ?</summary>

- Run the test again

</details>

Stop the test

```bash
npm run test:down
```
