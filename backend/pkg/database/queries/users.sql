-- name: CreateUser :one
INSERT INTO users (username, password_hash, display_name, avatar_url)
VALUES ($1, $2, $3, $4)
RETURNING id;

-- name: GetUserByUsername :one
SELECT *
FROM users
WHERE username = $1
LIMIT 1;

-- name: UpdateUser :one
UPDATE users
SET display_name  = $1,
    avatar_url    = $2,
    password_hash = $3,
    updated_at    = NOW()
WHERE id = $4
RETURNING *;

-- name: ListUsers :many
SELECT *
FROM users;
