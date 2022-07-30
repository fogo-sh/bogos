-- name: CreatePhoto :one
INSERT INTO photos (path, title, creator_id, outing_id)
VALUES ($1, $2, $3, $4)
    RETURNING *;

-- name: ListPhotosForOuting :many
SELECT *
from photos
WHERE outing_id = $1;

-- name: UpdatePhoto :one
UPDATE photos
SET title      = $1,
    updated_at = NOW()
WHERE id = $2
    RETURNING *;