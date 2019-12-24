import "dotenv/config"
import {UserModel} from "../models"
import jwt from "jsonwebtoken"

const userResolvers = {
    Query: {
        login: async (_, {email, password}, context) => {            
            try {
                const userInstance = await UserModel.findOne({email})
                if (!userInstance)
                    throw new Error("Email or password incorrect")
                const loginResult = await userInstance.comparePassword(password)
                if (!loginResult)
                    throw new Error("Email or password incorrect")
                const token = jwt.sign({id: userInstance._id}, process.env.JWT_SECRET, {
                    expiresIn: 1440
                })
                context.response.cookie("token", token, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: false
                })
                return token
            } catch (error) {
                throw new Error(error)        
            }
        }
    },
    Mutation: {
        register: async (_, {user}, context) => {
            try {
                if (!context.request.cookies.token)
                    user.role = "user"
                else {
                    const role = await UserModel.getRole(context.request.cookies.token)
                    if (role !== "administrator")
                        user.role = "user"
                }
                    
                const userModel = new UserModel(user)
                const userInstance = await userModel.save()
                return userInstance
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default userResolvers