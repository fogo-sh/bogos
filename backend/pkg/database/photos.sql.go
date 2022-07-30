// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.13.0
// source: photos.sql

package database

import (
	"context"
	"database/sql"
)

const createPhoto = `-- name: CreatePhoto :one
INSERT INTO photos (path, title, creator_id, outing_id)
VALUES ($1, $2, $3, $4) RETURNING id, path, title, created_at, updated_at, creator_id, outing_id
`

type CreatePhotoParams struct {
	Path      string
	Title     sql.NullString
	CreatorID int32
	OutingID  int32
}

func (q *Queries) CreatePhoto(ctx context.Context, arg CreatePhotoParams) (Photo, error) {
	row := q.db.QueryRowContext(ctx, createPhoto,
		arg.Path,
		arg.Title,
		arg.CreatorID,
		arg.OutingID,
	)
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

const deletePhoto = `-- name: DeletePhoto :exec
DELETE
FROM photos
WHERE id = $1
`

func (q *Queries) DeletePhoto(ctx context.Context, id int32) error {
	_, err := q.db.ExecContext(ctx, deletePhoto, id)
	return err
}

const getPhoto = `-- name: GetPhoto :one
SELECT id, path, title, created_at, updated_at, creator_id, outing_id
from photos
WHERE id = $1
LIMIT 1
`

func (q *Queries) GetPhoto(ctx context.Context, id int32) (Photo, error) {
	row := q.db.QueryRowContext(ctx, getPhoto, id)
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

const listUserPhotos = `-- name: ListUserPhotos :many
SELECT id, path, title, created_at, updated_at, creator_id, outing_id
from photos
WHERE creator_id = $1
`

func (q *Queries) ListUserPhotos(ctx context.Context, creatorID int32) ([]Photo, error) {
	rows, err := q.db.QueryContext(ctx, listUserPhotos, creatorID)
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

const updatePhoto = `-- name: UpdatePhoto :one
UPDATE photos
SET title      = $1,
    updated_at = NOW()
WHERE id = $2 RETURNING id, path, title, created_at, updated_at, creator_id, outing_id
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
