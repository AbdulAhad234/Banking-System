// bankDatabase.js
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Bank_Database',
    password: 'ahad5315',
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
