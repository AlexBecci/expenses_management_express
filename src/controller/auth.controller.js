import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//importamos las variables de mi archiovo config 
import { SECRET_KEY, NODE_ENV } from '../config.js'
import { createUserService, getUserByEmail } from '../service/user.service.js'
import { handleError } from '../error/message.js'
import cookieParser from 'cookie-parser'


/* -- Insert a user
INSERT INTO User (name, email, password, phone_number, initial_salary, current_salary)
VALUES ('John Doe', 'john.doe@example.com', 'encrypted_password', '1234567890', 1000.00, 900.00); */
export async function register(req, res) {
    const { email, password, name, phone_number } = req.body
    console.log('body que se espera', req.body)
    if (!email || !password || !name || !phone_number) {
        return res.status(400).json({
            message: 'TODOS LOS CAMPOS SON REQUERIDOS'
        })
    }
    const valid = await emailIsValid(email)
    if (!valid) {
        return res.status(409).json({
            message: 'El usuario ingresado ya esta en uso'
        })
    }
    try {
        const hash = await bcrypt.hash(password, 10);
        const result = await createUserService(email, hash, name, phone_number);
        return res.status(201).json(result)
    } catch (error) {
        handleError(res, error, 'Error en la creacion del user en la base de datos')
    }
}

//function para loguearse y guarda los valores q se necesitan en las cookies para validacion posteriores
export async function login(req, res) {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: 'TODOS LOS CAMPOS (email,password) SON REQUERIDO'
        })
    }
    try {
        const hast = await bcrypt.hash(password, 10);
        //validacion del mail
        //llamando al service que valida mi email si ya esta cen la base de datos
        const userFound = await getUserByEmail(email);
        if (userFound.length <= 0) {
            return res.status(404).json({ message: 'No se encontro usuario con esas credenciales' })
        }
        //validacion de la password
        const isMatch = await comparePassword(password, userFound[0].password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta/invalida' })
        }
        //generamos token
        const token = jwt.sign({ id: userFound[0].id, email: userFound[0].email }, SECRET_KEY, { expiresIn: '4h' })
        //variable de tiempo
        const fourHoursInMs = 4 * 3600000 // valor equivalente a 4 horas
        //configurar cookie
        const cookieOptions = {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: fourHoursInMs
        }
        //enviar cookie con el token
        res.cookie('authToken', token, cookieOptions)
        //respuesta
        return res.status(200).json({ message: 'Inicio de sesion valido', token: token, cookie: cookieOptions, userId: userFound[0].id });
    } catch (error) {
        handleError(res, error)
    }
}

//logout para cerrar sesion y elmiminar los valores de la cookie
export function logout(req, res) {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: 'Strict'
    })
    return res.status(200).json({ message: 'Usuario deslogueado con exito' })
}
//funcion que valida la session del usuario mediante un check_session
export function authenticateToken(req, res, next) {
    const token = req.cookies.authToken;
 /*    console.log('token recibido', token) */
    if (!token) {
        return res.status(401).json({ message: 'No Token Provider' })
    }
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' })
        }
    /*     console.log('Usuario autenticado', user)//log para verificar qu el usuario se verifico de forma correcta */
        req.user = user;
        next()
    })
}

//funcion que valida si encontro un mail
async function emailIsValid(email) {
    try {
        const result = await getUserByEmail(email);
        console.log(result)
        if (result.length > 0) {
            console.log('encontro user:', result)
            return false
        }
        console.log('email valido', result)
        return true
    } catch (error) {
        console.log(error)
    }
}

//function que compara las contrasena con el hash almacenado en la base de datos
async function comparePassword(password, nativePassword) {
    const boolean = await bcrypt.compare(password, nativePassword)
    return boolean
}
