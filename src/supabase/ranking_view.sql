WITH AllScores AS (
  SELECT p.id AS player_id, p.first_name AS player_first_name, p.last_name AS player_last_name, g.score_player_1 AS score
  FROM Player p
  JOIN Game g ON p.id = g.player_1
  UNION ALL
  SELECT p.id AS player_id, p.first_name AS player_first_name, p.last_name AS player_last_name, g.score_player_2 AS score
  FROM Player p
  JOIN Game g ON p.id = g.player_2
),
GamesPlayed AS (
  SELECT player_id, COUNT(*) AS games_played
  FROM (
    SELECT player_1 AS player_id FROM Game
    UNION ALL
    SELECT player_2 FROM Game
  ) AS AllPlayers
  GROUP BY player_id
)

SELECT a.player_id, a.player_first_name, a.player_last_name, a.score,
       ROW_NUMBER() OVER (ORDER BY a.score DESC) AS ranking,
       gp.games_played
FROM AllScores a
JOIN GamesPlayed gp ON a.player_id = gp.player_id
ORDER BY a.score DESC;
