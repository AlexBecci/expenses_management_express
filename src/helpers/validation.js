//mensaje de erro para cuando faltan campos en las funciones de los controladores
export function validateRequiredFields(fields, body) {
    for (const field of fields) {
        if (!body[field]) {
            return `El campo '${field}' es requerido`
        }
    }
    return null
}

