// db.js
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();
// Configuración de la conexión a la base de datos MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3308,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'products',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// Función para verificar la conexión
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos establecida con éxito');
connection.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:',
            error);
    }
}
testConnection();
module.exports = pool;