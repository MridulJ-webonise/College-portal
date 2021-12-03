const mysql = require("mysql2/promise")
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mridul23!',
    database: 'College',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

async function query(query, params)
{
    const [rows, fields] = await pool.execute( query, params);
    return rows;
}

module.exports = query;
