//importamos la libreria q nos permite conectar
import mysql from 'mysql2/promise'
//importamos la url directamente para la conexion
import { MYSQL_URL } from '../config.js'

//configuramet la conexion a la base de datos usando MYSQL_URL
export const pool = mysql.createPool(MYSQL_URL)

//funcion que prueba la conexion a la base de datos
export async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('CONEXION A LA BASE DE DATOS ESTABLECIDA CORRECTAMENTE')
        return rows
    } catch (error) {
        console.error('Error conectando la bas de datos', error.stack);
        throw error;
    }
}
