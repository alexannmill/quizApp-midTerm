-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  result SMALLINT,
  grade VARCHAR(1)
);