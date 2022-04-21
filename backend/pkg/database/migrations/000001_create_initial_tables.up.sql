BEGIN;

CREATE TABLE IF NOT EXISTS outings
(
    id         serial PRIMARY KEY,
    title      text      NOT NULL,
    date       date      NOT NULL,

    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp
);

CREATE TABLE IF NOT EXISTS users
(
    id            serial PRIMARY KEY,
    username      text      NOT NULL UNIQUE,
    password_hash bytea     NOT NULL,
    display_name  text,
    avatar_url    text,

    created_at    timestamp NOT NULL DEFAULT NOW(),
    updated_at    timestamp
);

CREATE TABLE IF NOT EXISTS outing_users
(
    outing_id int
        REFERENCES outings (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    user_id   int
        REFERENCES users (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,

    CONSTRAINT outing_users_pkey PRIMARY KEY (outing_id, user_id)
);

CREATE TABLE IF NOT EXISTS photos
(
    id         serial PRIMARY KEY,
    path       text      NOT NULL,
    title      text,

    created_at timestamp NOT NULL DEFAULT NOW(),
    updated_at timestamp,

    creator_id int       NOT NULL
        REFERENCES users (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    outing_id  int       NOT NULL
        REFERENCES outings (id)
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

COMMIT;
