-- name: CreateOuting :one
INSERT INTO outings (title, date, slug)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetOuting :one
SELECT *
from outings
WHERE id = $1
LIMIT 1;

-- name: GetOutingBySlug :one
SELECT *
from outings
WHERE slug = $1
LIMIT 1;

-- name: ListOutings :many
SELECT *
from outings;

-- name: ListUsersForOuting :many
SELECT users.*
FROM users
         JOIN outing_users ou on users.id = ou.user_id
WHERE ou.outing_id = $1;

-- name: UserInOuting :one
SELECT EXISTS(
               SELECT 1
               FROM outing_users
               WHERE outing_users.outing_id = $1
                 AND outing_users.user_id = $2
           );

-- name: AddUserToOuting :exec
INSERT INTO outing_users (outing_id, user_id)
VALUES ($1, $2);

-- name: RemoveUserFromOuting :exec
DELETE
FROM outing_users
WHERE outing_id = $1
  AND user_id = $2;

-- name: UpdateOuting :one
UPDATE outings
SET date       = $1,
    title      = $2,
    updated_at = NOW()
WHERE id = $3
RETURNING *;

-- name: ListUserOutings :many
SELECT outings.*
FROM outings
         JOIN outing_users ou on outings.id = ou.outing_id
WHERE ou.user_id = $1;
