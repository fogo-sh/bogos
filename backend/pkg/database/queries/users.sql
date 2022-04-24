-- name: CreateUser :one
INSERT INTO users (username, password_hash, display_name, avatar_url)
VALUES ($1, $2, $3, $4)
RETURNING id;

-- name: GetUserByUsername :one
SELECT *
FROM users
WHERE username = $1
LIMIT 1;