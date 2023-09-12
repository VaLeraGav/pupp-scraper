import db from './db.js';

async function exec(sql) {
  try {
    const client = await db.connect();
    await client.query(sql);
  } catch (err) {
    console.error(err);
  }
}
const createDb = `CREATE DATABASE mp_db`

const createTableCategory = `CREATE TABLE mp_category (
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING(30) NOT NULL,
  url_img TEXT NOT NULL,
  status CHAR(1) NOT NULL,
  type VARCHAR(4) NOT NULL,
  parent_id integer,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`

const createTableProduct = `CREATE TABLE mp_product (
  id SERIAL PRIMARY KEY,
  name CHARACTER VARYING(30) NOT NULL,
  category_id integer REFERENCES mp_category(id),
  article integer NOT NULL,
  property jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`

const createTrigger = `CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql`


// id SERIAL PRIMARY KEY,
// name CHARACTER VARYING(30) NOT NULL,
// url_img TEXT NOT NULL,
// status CHAR(1) NOT NULL,
// type VARCHAR(4) NOT NULL,
// parent_id integer,
// created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
// updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

// "id": 8141,
// "parent": 306,
// "url": "/catalog/zhenshchinam/odezhda/tuniki",
// "name": "Туники",
// "sheet": false

// var values = [
//   [7, 'john22', 'john22@gmail.com', '9999999922'],
//   [6, 'testvk', 'testvk@gmail.com', '88888888888']
// ];
// client.query(format('INSERT INTO users (id, name, url_img, phone) VALUES %L', values),[], (err, result)=>{
//   console.log(err);
//   console.log(result);
// });
