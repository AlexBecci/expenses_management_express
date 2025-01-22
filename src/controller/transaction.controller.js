import { handleError } from "../error/message.js";
import { validateRequiredFields } from "../helpers/validation.js";
import { SalaryHistoryService } from "../service/salary_history.service.js";
import { TransactionService } from "../service/transaction.service.js";
import { getUserService, updateCurrentSalary } from "../service/user.service.js";

//creamos la instancia de la clase
const transactionService = new TransactionService();
const salaryService = new SalaryHistoryService();

//creamos clase del controlador
export class TransactionController {
    //funcion que trae las transacciones por id usuario o id transaccion
    async getTransactions(req, res) {
        const { user_id, id } = req.query;
        //verificamos is se paso el id del usuario o el id de la transaccion
        try {
            if (user_id) {
                //sis e pasa el use_id llamammos a la funcion correspondiente
                const transactions = await transactionService.getTransactionsByUser(user_id);
                if (transactions.length === 0) {
                    return res.status(204).json({ message: 'No se encontraron transaccinoes para este usuario' })
                }
                return res.json(transactions)
            }
            if (id) {
                //si se pasa el id llamamos a su funcion correspondiente que trae uno por uno por id de transaccion no general como la de usuario 
                const transactions = await transactionService.getTransactionById(id);
                if (transactions.length === 0) {
                    return res.status(204).json({ message: 'No se econtro la transaccion con ese id ' })
                }
                return res.json(transactions);
            }
            //si no se pasa ni user_id ni id se devuelve un error
            return res.json(400).json({ message: 'Se debe proporcionr un ID de usuario o un ID de transaccion' })
        } catch (error) {
            handleError(error)
        }
    }

    async getBalanceAll(req, res) {
        const { user_id } = req.query
        console.log('USERID', user_id)
        try {
            if (!user_id) {
                //si no se pasa ni user_id ni id se devuelve un error
                return res.status(400).json({ message: 'Se debe proporcionr un ID de usuario o un ID de transaccion' })
            }
            const balance = await transactionService.getMonthlyBalanceByUser(user_id);
            if (transactions.length === 0) {
                return res.status(204).json({ message: 'No se encontraron transaccinoes para este usuario' })
            }
            return res.json(balance)
        } catch (error) {
            handleError(error)
        }
    }

    // que me trae las transacciones por user_id donde hay un  limit que es una variable
/*     async getLastTransactions() {
        const { user_id } = req.query
        try {

        } catch (error) {
            handleError(error)
        }
    } */

    //funciton que crea la transaccion desde el controller
    async createTransaction(req, res) {
        const requiredFields = ["user_id", "date", "amount", "type", "description", "category_id", "period"];
        const validationError = validateRequiredFields(requiredFields, req.body);
        if (validationError) {
            return res.status(400).json({ message: validationError })
        }
        const { user_id, date, amount, type, description, category_id, period } = req.body
        try {
            const result = await transactionService.createTransactionService(user_id, date, amount, type, description, category_id, period);
            /*  return res.status(201).json(result) */
            //obtenemos el usuario actual
            const user = await getUserService(user_id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            }
            const previous_salary = parseFloat(user.current_salary);
            console.log(`salario previo del ${user.id} ---> ${previous_salary}`)
            let new_salary = 0;
            // Asegurarse de que amount también sea un número
            const amountValue = parseFloat(amount);
            console.log('prev->', previous_salary, 'amount->', amount)
            //actualizamos el salario segun el tipo de transaccino
            if (type === 'income') {
                new_salary = previous_salary + amountValue;
            }
            else if (type === 'expense') {
                new_salary = previous_salary - amountValue
            }
            else {
                throw new Error('Tipo de transacción inválido')
            }
            // Asegurarse de que new_salary es un número válido antes de aplicar toFixed()
            if (isNaN(new_salary)) {
                throw new Error("new_salary no es un número válido");
            }
            // Aplicar redondeo a dos decimales
            new_salary = parseFloat(new_salary.toFixed(2));  // Redondear a dos decimales
            console.log('Tipo de new_salary antes de toFixed:', typeof new_salary);
            console.log('valor a pasar al update salario dle usaurio ', new_salary)
            //comenzamos a actualizar el salrio y registrar historial
            //updatear en la tabla de user el campo current_salary
            await updateCurrentSalary(new_salary, user_id)
            //insertar en el historial de salario
            await salaryService.createSalaryHistory(user_id, previous_salary, new_salary)
            return res.status(201).json({ id: result.insertId, message: 'Transacción creada con éxito' })
        } catch (error) {
            handleError(res, error)
        }
    }
}





