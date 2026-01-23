# Habit Tracker API

## Description

Habit Tracker API integrate all functionality to manage user's daily habits information allowing client's applications to store client's data online.

## Requirements

- NodeJS +v20.
- Docker Desktop +v4.
- Database already configured (see [main documentation](https://github.com/HectorRubi/habit-tracker/blob/master/README.md)).

## Project setup

```bash
$ npm install
```

Generate `.env` file, use the example file as a template.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

Habit Tracker API is divided by modules, each one provides a series of endpoints which let's you track your daily habits. The list of modules and endpoints provided by the api are:

| Modules    | Endpoint                  | Description                     |
| ---------- | ------------------------- | ------------------------------- |
| Auth       | `POST /auth/signin`       | User login                      |
| Users      | `POST /users`             | User creation                   |
| Habits     | `GET /habits`             | Retrieve habit list per user    |
|            | `POST /habits`            | Habit creation                  |
|            | `GET /habits/:id`         | Retrieve single habit data      |
|            | `POST /habits/:id/check`  | Mark habit as done per day      |
|            | `GET /habits/:id/history` | Retrieve habit's history        |
| Categories | `GET /categories`         | Retrieve category list per user |
|            | `POST /categories`        | Category creation               |

## About me

- GitHub - [github.com/hectorRubi](https://github.com/hectorRubi)
- LinkedIn - [linkedin.com/in/hector-rubi-garcia/](https://www.linkedin.com/in/hector-rubi-garcia/)
- Website - [Hector Rubi](https://hector-rubi.vercel.app/)
