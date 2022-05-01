// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.13.0
// source: outings.sql

package database

import (
	"context"
	"database/sql"
	"time"
)

const addUserToOuting = `-- name: AddUserToOuting :exec
INSERT INTO outing_users (outing_id, user_id)
VALUES ($1, $2)
`

type AddUserToOutingParams struct {
	OutingID int32
	UserID   int32
}

func (q *Queries) AddUserToOuting(ctx context.Context, arg AddUserToOutingParams) error {
	_, err := q.db.ExecContext(ctx, addUserToOuting, arg.OutingID, arg.UserID)
	return err
}

const createOuting = `-- name: CreateOuting :one
INSERT INTO outings (id, title, date)
VALUES ($1, $2, $3)
RETURNING id
`

type CreateOutingParams struct {
	ID    int32
	Title string
	Date  time.Time
}

func (q *Queries) CreateOuting(ctx context.Context, arg CreateOutingParams) (int32, error) {
	row := q.db.QueryRowContext(ctx, createOuting, arg.ID, arg.Title, arg.Date)
	var id int32
	err := row.Scan(&id)
	return id, err
}

const createPhoto = `-- name: CreatePhoto :one
INSERT INTO photos (path, title, creator_id, outing_id)
VALUES ($1, $2, $3, $4)
RETURNING id
`

type CreatePhotoParams struct {
	Path      string
	Title     sql.NullString
	CreatorID int32
	OutingID  int32
}

func (q *Queries) CreatePhoto(ctx context.Context, arg CreatePhotoParams) (int32, error) {
	row := q.db.QueryRowContext(ctx, createPhoto,
		arg.Path,
		arg.Title,
		arg.CreatorID,
		arg.OutingID,
	)
	var id int32
	err := row.Scan(&id)
	return id, err
}

const listOutings = `-- name: ListOutings :many
SELECT id, title, date, created_at, updated_at
from outings
`

func (q *Queries) ListOutings(ctx context.Context) ([]Outing, error) {
	rows, err := q.db.QueryContext(ctx, listOutings)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Outing
	for rows.Next() {
		var i Outing
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.Date,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listPhotosForOuting = `-- name: ListPhotosForOuting :many
SELECT id, path, title, created_at, updated_at, creator_id, outing_id
from photos
WHERE outing_id = $1
`

func (q *Queries) ListPhotosForOuting(ctx context.Context, outingID int32) ([]Photo, error) {
	rows, err := q.db.QueryContext(ctx, listPhotosForOuting, outingID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Photo
	for rows.Next() {
		var i Photo
		if err := rows.Scan(
			&i.ID,
			&i.Path,
			&i.Title,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.CreatorID,
			&i.OutingID,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const listUsersForOuting = `-- name: ListUsersForOuting :many
SELECT users.id, users.username, users.password_hash, users.display_name, users.avatar_url, users.created_at, users.updated_at
FROM users
         JOIN outing_users ou on users.id = ou.user_id
WHERE ou.outing_id = $1
`

func (q *Queries) ListUsersForOuting(ctx context.Context, outingID int32) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, listUsersForOuting, outingID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []User
	for rows.Next() {
		var i User
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.PasswordHash,
			&i.DisplayName,
			&i.AvatarUrl,
			&i.CreatedAt,
			&i.UpdatedAt,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const removeUserFromOuting = `-- name: RemoveUserFromOuting :exec
DELETE
FROM outing_users
WHERE outing_id = $1
  AND user_id = $2
`

type RemoveUserFromOutingParams struct {
	OutingID int32
	UserID   int32
}

func (q *Queries) RemoveUserFromOuting(ctx context.Context, arg RemoveUserFromOutingParams) error {
	_, err := q.db.ExecContext(ctx, removeUserFromOuting, arg.OutingID, arg.UserID)
	return err
}

const updateOuting = `-- name: UpdateOuting :one
UPDATE outings
SET date       = $1,
    title      = $2,
    updated_at = NOW()
WHERE id = $3
RETURNING id, title, date, created_at, updated_at
`

type UpdateOutingParams struct {
	Date  time.Time
	Title string
	ID    int32
}

func (q *Queries) UpdateOuting(ctx context.Context, arg UpdateOutingParams) (Outing, error) {
	row := q.db.QueryRowContext(ctx, updateOuting, arg.Date, arg.Title, arg.ID)
	var i Outing
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Date,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const updatePhoto = `-- name: UpdatePhoto :one
UPDATE photos
SET title      = $1,
    updated_at = NOW()
WHERE id = $2
RETURNING id, path, title, created_at, updated_at, creator_id, outing_id
`

type UpdatePhotoParams struct {
	Title sql.NullString
	ID    int32
}

func (q *Queries) UpdatePhoto(ctx context.Context, arg UpdatePhotoParams) (Photo, error) {
	row := q.db.QueryRowContext(ctx, updatePhoto, arg.Title, arg.ID)
	var i Photo
	err := row.Scan(
		&i.ID,
		&i.Path,
		&i.Title,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.CreatorID,
		&i.OutingID,
	)
	return i, err
}
