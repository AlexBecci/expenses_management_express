//mensaje de erro para cuando faltan campos en las funciones de los controladores
export function validateRequiredFields(fields, body) {
    for (const field of fields) {
        if (!body[field]) {
            return `El campo '${field}' es requerido`
        }
    }
    return null
}


export function validateFields(fields, source, res) {
    const missingFields = fields.filter(field => !source[field]);///filtrar campos faltantes
    if(missingFields.length>0){
        const message = `Faltan los siguientes campos : ${missingFields.join(`, `)}`;
        res.status(400).json({message});
        return false // indica que la validacion fallo
    }
    return true// indica que la validacion fue exitosa
}

