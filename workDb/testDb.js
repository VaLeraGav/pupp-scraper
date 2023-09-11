import db from './db.js';

const query = `
  SELECT *
  FROM
  mp_category
  `;

(async () => {
  try {
    const client = await db.connect();
    const res = await client.query(query);

    for (let row of res.rows) {
      console.log(row);
    }
  } catch (err) {
    console.error(err);
  }
})();
