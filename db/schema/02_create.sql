DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(50),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  short_url VARCHAR(6),
  is_visible BOOLEAN DEFAULT false
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  question VARCHAR(255) NOT NULL,
  correct VARCHAR(255) NOT NULL,
  answer1 VARCHAR(255) NOT NULL,
  answer2 VARCHAR(255),
  answer3 VARCHAR(255),
  answer4 VARCHAR(255)
);
