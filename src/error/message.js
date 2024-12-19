//mensajes de error para los controller para que sepan que hubo un erro en la consulta 
export function handleError(res, error, customMessage = 'Error en la consulta a la base de datos') {
    console.error(error)
    res.status(500).json({ message: customMessage })
}

//mensaje de error para los services asi retornan esto en caso de error de base de datos
export function handleDatabaseError(error) {
    console.error("Error en la consulta a la base de datos: ", error);
    throw new Error("Error en la consulta a la base de datos");
}

