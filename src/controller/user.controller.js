import { handleError } from "../error/message.js";
import { getUserService, getUsersService } from "../service/user.service.js";

//function que trae los usuarios
export async function getUsers(req, res) {
    const result = getUsersService(req, res)
    return result
}
//function que trae el usuario unico por user_id/id
export async function getUser(req, res) {
    const { id } = req.params;
    console.log('user_id',id)
    try {
        const user = await getUserService(id);
        res.status(200).json(user)
    } catch (error) {
        handleError()
    }
}

