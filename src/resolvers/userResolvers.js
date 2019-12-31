import "dotenv/config"
import {UserModel, CourseModel} from "../models"
import jwt from "jsonwebtoken"

const userResolvers = {
    Query: {
        user: async (_, {id}, context) => {
            try {
                if (!context.request.cookies.token)
                    throw "You must be logged for this."
                const userLogged = await UserModel.getByToken(context.request.cookies.token)
                if (!userLogged)
                    throw "You must be logged for this."
                if (userLogged.role !== "administrator")
                    if (userLogged._id !== id)
                        throw "You dont have permission for this."

                return userLogged
            } catch (error) {
                throw new Error(error)
            }
        },
        users: async () => {
            try {
                const users = await UserModel.find()
                return users
            } catch (error) {
                return new Error(error)
            }
        },
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
        createUser: async (_, {user}) => {
            try {
                const userModel = new UserModel(user)
                const userInstance = await userModel.save()
                return userInstance
            } catch (error) {
                throw new Error(error)
            }
        },
        deleteUser: async (_, {id}) => {
            // TODO: De-enroll this student from all courses
            try {
                const user = await UserModel.findByIdAndDelete(id)
                return user !== null
            } catch (error) {
                throw new Error(error)
            }
        },
        editUser: async (_, {user}) => {
            try {
                const userInstance = UserModel.findById(user.id)
                if (!userInstance)
                    throw "Invalid user."
                if (user.email)
                    userInstance.email = user.email
                if (user.role)
                    userInstance.role = user.role
                user.save()
                return user
            } catch (error) {
                throw new Error(error)
            }
        },
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