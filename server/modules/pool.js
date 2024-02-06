const pg = require('pg')
let pool;
let databaseName = 'weekend-to-do-list'

if (process.env.NODE_ENV === 'test') {
  databaseName = 'prime_testing'
}
if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}
else {
  pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: databaseName,
    allowExitOnIdle: true
  })
};
module.exports = pool
