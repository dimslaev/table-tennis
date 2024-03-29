-- Create Player table if not exists
CREATE TABLE IF NOT EXISTS Player (
  id uuid DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Create Game table if not exists
CREATE TABLE IF NOT EXISTS Game (
  id uuid DEFAULT uuid_generate_v4(),
  datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  score_player_1 INT NOT NULL,
  score_player_2 INT NOT NULL,
  player_1 UUID NOT NULL REFERENCES Player(id),
  player_2 UUID NOT NULL REFERENCES Player(id),
  PRIMARY KEY (id)
);

-- Seed data for Player table
INSERT INTO Player (first_name, last_name, avatar_url) VALUES
  ('John', 'Doe', 'https://ui-avatars.com/api/John+Doe'),
  ('Jane', 'Smith', 'https://ui-avatars.com/api/Jane+Smith'),
  ('Alice', 'Johnson', 'https://ui-avatars.com/api/Alice+Johnson');

-- Seed data for Game table
INSERT INTO Game (datetime, score_player_1, score_player_2, player_1, player_2) VALUES
  ('2024-01-01 12:00:00', 2, 1, 
   (SELECT id FROM Player WHERE first_name = 'John' AND last_name = 'Doe'), 
   (SELECT id FROM Player WHERE first_name = 'Jane' AND last_name = 'Smith')),
  ('2024-01-02 14:30:00', 3, 2, 
   (SELECT id FROM Player WHERE first_name = 'Jane' AND last_name = 'Smith'), 
   (SELECT id FROM Player WHERE first_name = 'Alice' AND last_name = 'Johnson')),
  ('2024-01-03 16:45:00', 1, 1, 
   (SELECT id FROM Player WHERE first_name = 'Alice' AND last_name = 'Johnson'), 
   (SELECT id FROM Player WHERE first_name = 'John' AND last_name = 'Doe'));