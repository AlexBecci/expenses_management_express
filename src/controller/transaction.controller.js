import { handleError } from "../error/message.js";
import { validateRequiredFields } from "../helpers/validation.js";
import { createTransactionService, getTransactionById, getTransactionsByUser } from "../service/transaction.service.js";

//funcion que trae las transacciones por id usuario o id transaccion
export async function getTransactions(req, res) {
    const { user_id, id } = req.query;
    //verificamos is se paso el id del usuario o el id de la transaccion
    try {
        if (user_id) {
            //sis e pasa el use_id llamammos a la funcion correspondiente
            const transactions = await getTransactionsByUser(user_id);
            if (transactions.length === 0) {
                return res.status(204).json({ message: 'No se encontraron transaccinoes para este usuario' })
            }
            return res.json(transactions)
        }
        if (id) {
            //si se pasa el id llamamos a su funcion correspondiente que trae uno por uno por id de transaccion no general como la de usuario 
            const transactions = await getTransactionById(id);
            if (transactions.length === 0) {
                return res.json(204).json({ message: 'No se econtro la transaccion con ese id ' })
            }
            return res.json(transactions);
        }
        //si no se pasa ni user_id ni id se devuelve un error
        return res.json(400).json({ message: 'Se debe proporcionr un ID de usuario o un ID de transaccion' })
    } catch (error) {
        handleError(error)
    }
}

//funciton que crea la transaccion desde el controller
export async function createTransaction(req, res) {
    /* 
    if (!user_id || !date || !amount || !type || !description || !category_id || !period) {
        return res.status(400).json({ message: 'TODOS LOS CAMPOS SON REQUERIDOs' })
    } */
    const requiredFields = ["user_id", "date", "amount", "type", "description", "category_id", "period"];
    const validationError = validateRequiredFields(requiredFields, req.body);
    if (validationError) {
        return res.status(400).json({ message: validationError })
    }
    try {
        const { user_id, date, amount, type, description, category_id, period } = req.body
        const result = await createTransactionService(user_id, date, amount, type, description, category_id, period);
        return res.status(201).json(result)
    } catch (error) {
        handleError(res, error)
    }
}



