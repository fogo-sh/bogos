// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.13.0
// source: users.sql

package database

import (
	"context"
	"database/sql"
)

const createUser = `-- name: CreateUser :one
INSERT INTO users (username, password_hash, display_name, avatar_url)
VALUES ($1, $2, $3, $4)
RETURNING id
`

type CreateUserParams struct {
	Username     string
	PasswordHash []byte
	DisplayName  sql.NullString
	AvatarUrl    sql.NullString
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (int32, error) {
	row := q.db.QueryRowContext(ctx, createUser,
		arg.Username,
		arg.PasswordHash,
		arg.DisplayName,
		arg.AvatarUrl,
	)
	var id int32
	err := row.Scan(&id)
	return id, err
}

const getUserByUsername = `-- name: GetUserByUsername :one
SELECT id, username, password_hash, display_name, avatar_url, created_at, updated_at
FROM users
WHERE username = $1
LIMIT 1
`

func (q *Queries) GetUserByUsername(ctx context.Context, username string) (User, error) {
	row := q.db.QueryRowContext(ctx, getUserByUsername, username)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.PasswordHash,
		&i.DisplayName,
		&i.AvatarUrl,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const listUsers = `-- name: ListUsers :many
SELECT id, username, password_hash, display_name, avatar_url, created_at, updated_at
FROM users
`

func (q *Queries) ListUsers(ctx context.Context) ([]User, error) {
	rows, err := q.db.QueryContext(ctx, listUsers)
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

const updateUser = `-- name: UpdateUser :one
UPDATE users
SET display_name  = $1,
    avatar_url    = $2,
    password_hash = $3,
    updated_at    = NOW()
WHERE id = $4
RETURNING id, username, password_hash, display_name, avatar_url, created_at, updated_at
`

type UpdateUserParams struct {
	DisplayName  sql.NullString
	AvatarUrl    sql.NullString
	PasswordHash []byte
	ID           int32
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRowContext(ctx, updateUser,
		arg.DisplayName,
		arg.AvatarUrl,
		arg.PasswordHash,
		arg.ID,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.PasswordHash,
		&i.DisplayName,
		&i.AvatarUrl,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
