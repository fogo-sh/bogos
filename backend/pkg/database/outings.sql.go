// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.15.0
// source: outings.sql

package database

import (
	"context"
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
INSERT INTO outings (title, date, slug)
VALUES ($1, $2, $3)
RETURNING id, title, date, created_at, updated_at, slug
`

type CreateOutingParams struct {
	Title string
	Date  time.Time
	Slug  string
}

func (q *Queries) CreateOuting(ctx context.Context, arg CreateOutingParams) (Outing, error) {
	row := q.db.QueryRowContext(ctx, createOuting, arg.Title, arg.Date, arg.Slug)
	var i Outing
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Date,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Slug,
	)
	return i, err
}

const getOuting = `-- name: GetOuting :one
SELECT id, title, date, created_at, updated_at, slug
from outings
WHERE id = $1
LIMIT 1
`

func (q *Queries) GetOuting(ctx context.Context, id int32) (Outing, error) {
	row := q.db.QueryRowContext(ctx, getOuting, id)
	var i Outing
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Date,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Slug,
	)
	return i, err
}

const getOutingBySlug = `-- name: GetOutingBySlug :one
SELECT id, title, date, created_at, updated_at, slug
from outings
WHERE slug = $1
LIMIT 1
`

func (q *Queries) GetOutingBySlug(ctx context.Context, slug string) (Outing, error) {
	row := q.db.QueryRowContext(ctx, getOutingBySlug, slug)
	var i Outing
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.Date,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Slug,
	)
	return i, err
}

const listOutings = `-- name: ListOutings :many
SELECT id, title, date, created_at, updated_at, slug
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
			&i.Slug,
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

const listUserOutings = `-- name: ListUserOutings :many
SELECT outings.id, outings.title, outings.date, outings.created_at, outings.updated_at, outings.slug
FROM outings
         JOIN outing_users ou on outings.id = ou.outing_id
WHERE ou.user_id = $1
`

func (q *Queries) ListUserOutings(ctx context.Context, userID int32) ([]Outing, error) {
	rows, err := q.db.QueryContext(ctx, listUserOutings, userID)
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
			&i.Slug,
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
RETURNING id, title, date, created_at, updated_at, slug
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
		&i.Slug,
	)
	return i, err
}

const userInOuting = `-- name: UserInOuting :one
SELECT EXISTS(
               SELECT 1
               FROM outing_users
               WHERE outing_users.outing_id = $1
                 AND outing_users.user_id = $2
           )
`

type UserInOutingParams struct {
	OutingID int32
	UserID   int32
}

func (q *Queries) UserInOuting(ctx context.Context, arg UserInOutingParams) (bool, error) {
	row := q.db.QueryRowContext(ctx, userInOuting, arg.OutingID, arg.UserID)
	var exists bool
	err := row.Scan(&exists)
	return exists, err
}
