-- MyJourney sample/seed data for the schema in db/schema.sql
--
-- Run AFTER schema.sql:
--   mysql --host <host> --port <port> --user <user> --password \
--         --ssl-ca=ca.pem <database> < db/seed.sql
--
-- These are throwaway demo accounts. The password hashes are bcrypt hashes of
-- simple demo passwords (e.g. the `admin@mj.com` account's password is `admin`).

-- Users --------------------------------------------------------------------
INSERT INTO user (user_id, email, password_hash) VALUES
    (1, 'admin@mj.com',     '$2b$10$XAOzDZsHTwuIGTY.dGfwVuz1frGffJzmxD0dMSkDAdkQ1zF6XaYR6'),
    (2, 'testadmin@mj.com', '$2b$10$KZRvspPC9P5QNhwGJ3ESROMUlkMEwFb87eiQXh0dRcR1Pm0tnuc2O'),
    (3, 'testca@mj.com',    '$2b$10$eh0271zk/ciUAf35snHnq.4gd0JdA5J2bX8pa/cur44zd1qWWVsu.'),
    (4, 'testv4@mj.com',    '$2b$10$1YDiuYJ5EGLyW/1g6PK/q.ab.tkHNih8xxSYGW7PE//MQ.DxfB.Dm'),
    (5, 'testv5new@mj.com', '$2b$10$jeeE4zDI/EhKCZm3NXCjfeqh9KpLT5OCF1PWnEDWxacqb6OXMMOke');

-- Profiles (1:1 with user) -------------------------------------------------
INSERT INTO profile (user_id, age, gender, height_cm, weight_kg, daily_calorie_target, fitness_goals, weight_goal_kg) VALUES
    (1, 22, 'female', 165, 57.00, 1400, 'Slim down', 54.00),
    (2, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (3, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (4, 20, 'male', 179, 68.00, 1000, NULL, NULL),
    (5, 23, NULL, NULL, NULL, NULL, NULL, NULL);

-- Workouts -----------------------------------------------------------------
INSERT INTO workout (workout_id, user_id, title, video_url, duration_min, is_completed, created_at) VALUES
    (4,  1, 'Cardio Fitness', 'https://www.youtube.com/watch?v=tpwRmyzyiwM', 4, 0, '2024-09-18 00:00:00'),
    (5,  1, 'Cardio Fitness Marshall Test', 'https://www.youtube.com/watch?v=tpwRmyzyiwM', 4, 0, '2024-09-18 00:00:00'),
    (20, 4, 'Do This Everyday To Lose Weight | 2 Weeks Shred Challenge', 'https://www.youtube.com/watch?v=2MoGxae-zyo', 14, 0, '2024-10-01 00:00:00'),
    (21, 4, 'Best Full Body Workout to Lose Fat 20 mins | 28 Day Challenge', 'https://www.youtube.com/watch?v=CGmr02bfHUo', 21, 0, '2024-10-01 00:00:00'),
    (22, 4, '15 min Intense HIIT for Fat Burn | Standing & No Equipment', 'https://www.youtube.com/watch?v=9rQ5wxssQss', 16, 0, '2024-10-02 00:00:00'),
    (23, 4, 'Get Shredded for the Summer! 15 min Standing HIIT Workout', 'https://www.youtube.com/watch?v=JDgc6CxwEMI', 15, 0, '2024-10-02 00:00:00'),
    (24, 5, 'Zumba', 'https://www.youtube.com/watch?v=mZeFvX3ALKY', 31, 0, '2024-10-06 00:00:00'),
    (30, 1, 'Test Workout', 'https://www.youtube.com/watch?v=kuH-RRf6WP0', 21, 1, '2024-10-17 00:00:00'),
    (32, 3, '20 MIN FULL BODY WORKOUT // No Equipment | Pamela Reif', 'https://www.youtube.com/watch?v=UBMk30rjy0o', 20, 0, '2024-11-19 00:00:00'),
    (34, 1, 'Test Workout', 'https://www.youtube.com/watch?v=kuH-RRf6WP0', 21, 1, '2024-10-17 00:00:00'),
    (35, 1, '20 Minute Full body cardio', 'https://www.youtube.com/watch?v=M0uO8X3_tEA', 29, 1, '2024-11-20 00:00:00'),
    (36, 1, '10MIN everyday full body hourglass pilates workout // no equipment // beginner friendly', 'https://www.youtube.com/watch?v=u3UjeyPOjoU', 11, 1, '2024-12-11 00:00:00'),
    (39, 1, 'Zumba 30-Minute Beginners Latin Dance Mini-Workout', 'https://www.youtube.com/watch?v=mZeFvX3ALKY', 30, 0, '2024-12-12 00:00:00'),
    (40, 1, '12 MIN DAILY STRETCH (full body) - for tight muscles, mobility & flexibility', 'https://www.youtube.com/watch?v=itJE4neqDJw', 14, 0, '2024-12-15 00:00:00'),
    (41, 1, '20 Min BEDTIME YOGA | Full Body Stretch | Tension Relief, Relaxation, Flexibility, Beginner Friendly', 'https://www.youtube.com/watch?v=6CueZ4zujMk', 20, 0, '2024-12-15 00:00:00'),
    (42, 1, '10MIN everyday full body hourglass pilates workout // no equipment // beginner friendly', 'https://www.youtube.com/watch?v=u3UjeyPOjoU&t=4s', 11, 0, '2024-12-16 00:00:00'),
    (43, 1, 'FULL BODY WORKOUT', 'https://www.youtube.com/watch?v=73NEi4HzHPs', 33, 1, '2025-01-02 00:00:00'),
    (48, 1, '10mn Shoulders exercise', 'https://www.youtube.com/watch?v=jXm0y-csiuE', 11, 1, '2025-01-10 00:00:00'),
    (49, 1, 'Get Abs in 2 WEEKS | Abs Workout Challenge', 'https://www.youtube.com/watch?v=2pLT-olgUJs', 11, 0, '2025-01-10 00:00:00'),
    (50, 1, 'Booty Burn Workout', 'https://www.youtube.com/watch?v=hpoj6MA_KVE', 16, 1, '2025-01-23 00:00:00');
