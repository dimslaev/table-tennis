CREATE VIEW statistics AS

WITH player_games AS (
    SELECT
        player_1 AS player_id,
        score_player_1 AS player_score,
        score_player_2 AS opponent_score
    FROM
        game
    UNION ALL
    SELECT
        player_2 AS player_id,
        score_player_2 AS player_score,
        score_player_1 AS opponent_score
    FROM
        game
), player_stats AS (
    SELECT
        player_id,
        COUNT(*) AS games_played,
        SUM(CASE WHEN player_score > opponent_score THEN 1 ELSE 0 END) AS games_won,
        SUM(CASE WHEN player_score < opponent_score THEN 1 ELSE 0 END) AS games_lost,
        SUM(player_score) AS total_score
    FROM
        player_games
    GROUP BY
        player_id
)
SELECT
    p.id,
    p.first_name,
    p.last_name,
    COALESCE(ps.games_played, 0) AS games_played,
    COALESCE(ps.games_won, 0) AS games_won,
    COALESCE(ps.games_lost, 0) AS games_lost,
    COALESCE(ps.total_score, 0) AS total_score
FROM
    player p
LEFT JOIN
    player_stats ps ON p.id = ps.player_id;