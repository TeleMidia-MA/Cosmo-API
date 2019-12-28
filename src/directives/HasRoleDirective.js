import { UserModel } from "../models"

const roles = {
    user: 1,
    teacher: 2,
    administrator: 3
}

export default async (next, src, args, context) => {
    try {
        if (!context.request.cookies.token)
            throw "You must be logged for this."
        
        const role = await UserModel.getRole(context.request.cookies.token)

        if (roles[args.requires] > roles[role])
            throw "You dont have permission for this."

        const result = await next()
        return result
    } catch (error){
        throw new Error(error)
    }
}