import "dotenv/config"
import {UserModel, CourseModel} from "../models"
import jwt from "jsonwebtoken"

const userResolvers = {
    Query: {
        user: async(_, {email}, context) => {
            try {
                if (!context.request.cookies.token)
                    throw "You must be logged for this."
                const userLogged = await UserModel.getByToken(context.request.cookies.token)
                if (!userLogged)
                    throw "You must be logged for this."
                if (userLogged.role !== "administrator")
                    if (userLogged.email !== email)
                        throw "You dont have permission for this."
                    
                return userLogged
            } catch (error) {
                throw new Error(error)
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
        },
        // enrollment(user: ID!, course: String!) : Course
        enrollment: async (_, {user, course}, context) => {
            try {
                if (!context.request.cookies.token)
                    throw "You must be logged for this"
                const userLogged = await UserModel.getByToken(context.request.cookies.token)
                if (!userLogged)
                    throw "You must be logged for this"
                if (userLogged.role !== "administrator")
                    if (userLogged._id.toString() !== user)
                        throw "You dont have permission for this."
                course = await CourseModel.getById(course)
                if (!course)
                    throw "Invalid course."
            
                if (!userLogged.courses.includes(course) && !course.participants.includes(userLogged)){
                   userLogged.courses.push(course)
                   course.participants.push(userLogged)
                }

                userLogged.save()
                course.save()
                return course
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default userResolvers