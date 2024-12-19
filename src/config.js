import { config } from 'dotenv'

//llamamos a la funcion config para que todo siga un flujo correcto en el proyecto internamente
config();

//exportamos las variablers que permiten la conexion a la base de datos llamandola primero desde una variable .env en caso de contemplar produccion 
export const PORT = process.env.DB_PORT || '3000'
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || '1234'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'expenses_management'
export const DB_PORT = process.env.DB_PORT || 3306
export const MYSQL_URL = process.env.MYSQL_URL || 'mysql://root:1234@localhost:3306/expenses_management'
export const SECRET_KEY = process.env.SECRET_KEY || 'my_secret_key'
export const NODE_ENV = process.env.NODE_ENV || 'developed' // or 'production'


