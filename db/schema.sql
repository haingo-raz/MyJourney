-- MyJourney database schema (MySQL 8 / MariaDB 10.4+)
--
-- Schema-as-code. Run this against your database to create the tables:
--
--   mysql --host <host> --port <port> --user <user> --password \
--         --ssl-ca=ca.pem <database> < db/schema.sql
--
-- For Aiven, <host>/<port>/<user>/<database> come from the service overview
-- and --ssl-ca points at the downloaded CA certificate.

-- ---------------------------------------------------------------------------
-- user
-- ---------------------------------------------------------------------------
-- Surrogate integer primary key. Email is a natural key that can change, so it
-- is stored as a UNIQUE column rather than the PK and never propagates into
-- foreign keys. Passwords are stored as bcrypt hashes, never in clear text.
CREATE TABLE IF NOT EXISTS user (
    user_id       INT AUTO_INCREMENT PRIMARY KEY,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------------
-- profile  (1:1 with user)
-- ---------------------------------------------------------------------------
-- The UNIQUE constraint on user_id enforces the one-profile-per-user rule.
-- Units are encoded in the column names (cm, kg) so they are self-documenting.
-- `fitness_goals` is intentionally free-form text (a user-authored note), so it
-- stays a single TEXT column rather than a normalized lookup/join table.
CREATE TABLE IF NOT EXISTS profile (
    profile_id           INT AUTO_INCREMENT PRIMARY KEY,
    user_id              INT NOT NULL UNIQUE,
    age                  INT CHECK (age BETWEEN 13 AND 120),
    gender               ENUM('male', 'female', 'other', 'undisclosed'),
    height_cm            INT CHECK (height_cm BETWEEN 50 AND 300),
    weight_kg            DECIMAL(5, 2) CHECK (weight_kg BETWEEN 20 AND 500),
    daily_calorie_target INT,
    fitness_goals        TEXT,
    weight_goal_kg       DECIMAL(5, 2) CHECK (weight_goal_kg BETWEEN 20 AND 500),
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------------
-- workout
-- ---------------------------------------------------------------------------
-- `created_at` is a real timestamp so workouts can be sorted and range-queried
-- by date. Indexes cover the two hot lookups: by user, and by user + date.
CREATE TABLE IF NOT EXISTS workout (
    workout_id   INT AUTO_INCREMENT PRIMARY KEY,
    user_id      INT NOT NULL,
    title        VARCHAR(200) NOT NULL,
    video_url    VARCHAR(500),
    duration_min INT,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE,
    INDEX idx_workout_user (user_id),
    INDEX idx_workout_user_created (user_id, created_at)
);
