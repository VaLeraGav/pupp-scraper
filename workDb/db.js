import pg from 'pg';
const { Pool } = pg;

export default new Pool({
  user: "valera",
  host: "127.0.0.1",
  database: "test_db",
  password: "6579",
  port: 5432,
});
