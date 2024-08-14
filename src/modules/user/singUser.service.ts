import { TSingUpUser } from "./singUser.interface"
import { UserModel } from "./singUser.model"

const createUser = async (payload: TSingUpUser) => {
    const result = await UserModel.create(payload)
    return result
}
export const UserService = {
    createUser
}