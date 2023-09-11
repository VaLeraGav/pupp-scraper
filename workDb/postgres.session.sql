
CREATE DATABASE test_db;

-- create main table
CREATE TABLE mp_category (
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING(30) NOT NULL,
  url_img TEXT NOT NULL,
  status CHAR(1) NOT NULL,
  type VARCHAR(4) NOT NULL,
  parent_id integer,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE mp_product (
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING(30) NOT NULL,
  category_id integer REFERENCES mp_category(id),
  article integer NOT NULL,
  property jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
--create function trigger to change a timestamp value upon an update
CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
--create a trigger to execute the function
CREATE TRIGGER set_timestamp BEFORE
UPDATE ON public.mp_product FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
CREATE TRIGGER set_timestamp BEFORE
UPDATE ON public.mp_category FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();
-- insert
INSERT INTO mp_category
VALUES (
    default,
    'одежда',
    'url_картинки',
    'Y',
    'wb',
    1
  );
INSERT INTO mp_product
VALUES (
    default,
    'платье',
    1,
    1,
    '{"name": "Paint house", "tags": ["Improvements", "Office"], "finished": true}'
  );
