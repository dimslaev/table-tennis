-- Create Player table if not exists
CREATE TABLE IF NOT EXISTS Player (
  id uuid DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  PRIMARY KEY (id)
);

-- Create Game table if not exists
CREATE TABLE IF NOT EXISTS Game (
  id uuid DEFAULT uuid_generate_v4(),
  start_time TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  end_time TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  score_player_1 INT NOT NULL,
  score_player_2 INT NOT NULL,
  player_1 UUID NOT NULL REFERENCES Player(id),
  player_2 UUID NOT NULL REFERENCES Player(id),
  PRIMARY KEY (id)
);

-- Seed data for Player table
INSERT INTO Player (first_name, last_name, avatar_url) VALUES
  ('John', 'Doe', ''),
  ('Jane', 'Smith', ''),
  ('Alice', 'Johnson', '');

-- Seed data for Game table
INSERT INTO Game (score_player_1, score_player_2, player_1, player_2) VALUES
  (11, 9, 
   (SELECT id FROM Player WHERE first_name = 'John' AND last_name = 'Doe'), 
   (SELECT id FROM Player WHERE first_name = 'Jane' AND last_name = 'Smith')),
  (10, 12, 
   (SELECT id FROM Player WHERE first_name = 'Jane' AND last_name = 'Smith'), 
   (SELECT id FROM Player WHERE first_name = 'Alice' AND last_name = 'Johnson')),
  (11, 7, 
   (SELECT id FROM Player WHERE first_name = 'Alice' AND last_name = 'Johnson'), 
   (SELECT id FROM Player WHERE first_name = 'John' AND last_name = 'Doe'));