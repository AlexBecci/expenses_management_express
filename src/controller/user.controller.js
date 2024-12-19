import { getUsersService } from "../service/user.service.js";

export async function getUsers(req, res) {
    const result = getUsersService(req, res)
    return result
}

