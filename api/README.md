# About

Node.js API for the [MyJourney](https://github.com/haingo-raz/MyJourney) web application.
MyJourney is a web application where users can create, save, and edit their workout journey. Furthermore, they have the option to chat with an AI or ask questions about their journey.

> This package lives inside the MyJourney monorepo under `api/`. To run the whole application (API + frontend) with a single command, see the [root README](../README.md). The instructions below are for running the API on its own.

# Functionalities

- Sign up a user
- Log in a user
- Delete an account
- Update a user's email
- Update a user's password
- Create a workout instance
- Get a list of workouts by user email and date
- Edit a workout instance by ID
- Delete a workout instance by ID
- Respond to predefined questions
- Chat with an AI

# Technology

- Node.js / Express
- MySQL (local)
- Gemini API (Get your own API key [here](https://ai.google.dev/gemini-api/docs/api-key), then add it to your `.env` file.)

# Database

The schema is defined as code in [db/schema.sql](../db/schema.sql), with sample
data in [db/seed.sql](../db/seed.sql). Users are identified by a surrogate
`user_id`; foreign keys reference `user_id` and cascade on delete.

#### `user`

- `user_id`: int, PRIMARY KEY, AUTO_INCREMENT
- `email`: varchar(255), NOT NULL, UNIQUE
- `password_hash`: varchar(255), NOT NULL (bcrypt hash)
- `created_at`: timestamp, default CURRENT_TIMESTAMP

#### `profile` (1:1 with `user`)

- `profile_id`: int, PRIMARY KEY, AUTO_INCREMENT
- `user_id`: int, NOT NULL, UNIQUE, FOREIGN KEY → `user.user_id` ON DELETE CASCADE
- `age`: int, CHECK 13–120
- `gender`: enum('male','female','other','undisclosed')
- `height_cm`: int
- `weight_kg`: decimal(5,2)
- `daily_calorie_target`: int
- `fitness_goals`: text
- `weight_goal_kg`: decimal(5,2)

#### `workout`

- `workout_id`: int, PRIMARY KEY, AUTO_INCREMENT
- `user_id`: int, NOT NULL, FOREIGN KEY → `user.user_id` ON DELETE CASCADE
- `title`: varchar(200), NOT NULL
- `video_url`: varchar(500)
- `duration_min`: int
- `is_completed`: boolean, NOT NULL, default false
- `created_at`: timestamp, default CURRENT_TIMESTAMP

# How to run the API on its own

1. From the `api/` folder, run `npm install` to install packages and dependencies.

## Local MySQL database

The API connects to a local MySQL instance.

1. Install MySQL and ensure it is running locally.
2. Copy `.env.example` to `.env` and fill in your connection details:
   - `DB_HOST`: typically `localhost`.
   - `DB_PORT`: typically `3306`.
   - `DB_USER` and `DB_PASSWORD`: your local MySQL credentials.
   - `DB_NAME`: the name of the database to use (e.g. `myjourney`).
   - `GEMINI_API_KEY`: your Google Gemini API key.
3. Create the database if it does not exist yet:
   ```sql
   CREATE DATABASE myjourney;
   ```
4. Create the tables by running [db/schema.sql](../db/schema.sql) against your database (and optionally [db/seed.sql](../db/seed.sql) for sample data). See the [root README](../README.md#applying-the-schema) for the exact `mysql` command.
5. Run `npm start` to execute the script `nodemon server.js`.
6. Access `localhost:8080` in your browser.

## Test

After ensuring that all dependencies are installed, run `npm run test` in the terminal.

### Running Unit Tests

1. Ensure that your MySQL database is set up and running.
2. Populate the database with test data if necessary.
3. Run `npm run test` to execute the unit tests. This command will run all test files located in the `test` directory.

## Code Formatting

To keep the code format neat, make use of Prettier. The following npm scripts are available:

- `format:check`: Checks the code format using Prettier.
- `format:write`: Formats the code using Prettier.

To check the code format, run:

```sh
npm run format:check
```

To format the code, run:

```sh
npm run format:write
```
