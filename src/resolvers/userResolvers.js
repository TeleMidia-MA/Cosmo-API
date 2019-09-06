import "dotenv/config"
import {User, UserModel} from "../models"
import jwt from "jsonwebtoken"

const userResolvers = {
    Query: {
        login: async (_, {email, password}) => {
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
                return token
            } catch (error) {
                throw new Error(error)        
            }
        }
    },
    Mutation: {
        register: async (_, {user}) => {
            try {
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