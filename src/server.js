// Importamos librerías necesarias
import express from 'express';
import morgan from 'morgan';
import path, { dirname } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
//routes
import UserRoutes from './routes/user.routes.js'
import AuthRoutes from './routes/auth.routes.js'
import CategoryRoutes from './routes/category.routes.js'
import { testConnection } from './database/db.js';
import { authenticateToken } from './controller/auth.controller.js';
// Inicializamos Express en la variable app
const app = express();

// Obtenemos __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const corsOptions = {
    origin: 'http://localhost:5173', // Asegúrate de que esta sea la URL correcta de tu frontend usar variable de env
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors(corsOptions));


//montar rutas con el prefijo api
app.use('/api', AuthRoutes)
app.use('/api', authenticateToken, UserRoutes)
app.use('/api', authenticateToken, CategoryRoutes)


// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

startServer()

//probar la conexion y luego levantar el servidor
async function startServer() {
    try {
        //probar la conexion a la base de datos
        await testConnection();
        //si la conexion es exitosa, iniciar el servidor
        app.listen(3000)
        console.log('SERVER ON')
    } catch (error) {
        //manejar errores de conexion
        console.error("Error en la conexion a la base de datos. No se puede levantar el servidor", error)
    }
}

export default app;
