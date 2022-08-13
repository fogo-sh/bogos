BEGIN;

ALTER TABLE outings
    ADD slug text;

UPDATE outings
SET slug = LOWER(REPLACE(title, ' ', '-'));

ALTER TABLE outings
    ALTER COLUMN slug SET NOT NULL;

ALTER TABLE outings ADD CONSTRAINT slug_unique UNIQUE (slug);

COMMIT;