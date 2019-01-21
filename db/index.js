const pg = require('pg')
const dotenv = require('dotenv');

// load in .env config
dotenv.config();

// postgres db connection 
// pool takes the object below -pgConfig- as parameter
const pgConfig = {
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    max: 50,
    password: process.env.DB_PASSWORD,
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