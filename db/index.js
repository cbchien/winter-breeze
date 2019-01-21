const pg = require('pg')
// const dotenv = require('dotenv');

// dotenv.config();

// postgres db connection 
// pool takes the object below -pgConfig- as parameter
const pgConfig = {
    user: 'postgres',
    database: 'winter-breeze',
    max: 50,
    password: 'root',
    port: 5432
};
const pool = new pg.Pool(pgConfig)

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}