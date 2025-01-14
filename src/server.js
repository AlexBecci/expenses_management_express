// Importar librerías necesarias
import express from 'express';
import morgan from 'morgan';
import path, { dirname } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { testConnection } from './database/db.js';
import { authenticateToken } from './controller/auth.controller.js';

// Importar rutas
import UserRoutes from './routes/user.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import CategoryRoutes from './routes/category.routes.js';
import TransactionRoutes from './routes/transaction.routes.js';
import SalarysHistoricsRoutes from './routes/salary_history.routes.js';

// Configuración dotenv
dotenv.config();

// Inicializar Express
const app = express();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de CORS
const corsOptions = {
    origin: /* process.env.FRONTEND_URL ||  */'http://localhost:4000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors(corsOptions));

// Rutas de API
app.use('/api', AuthRoutes);
app.use('/api', authenticateToken, UserRoutes);
app.use('/api', authenticateToken, CategoryRoutes);
app.use('/api', authenticateToken, TransactionRoutes);
app.use('/api', authenticateToken, SalarysHistoricsRoutes);

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Rutas frontend (asegurarte de que las rutas de API tengan prioridad)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});

// Función para iniciar el servidor
async function startServer() {
    try {
        // Probar conexión a la base de datos
        await testConnection();

        // Iniciar servidor
        const PORT = process.env.PORT || 2000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(
            'Error en la conexión a la base de datos. No se puede levantar el servidor',
            error
        );
    }
}

startServer();

export default app;
