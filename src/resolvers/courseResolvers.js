import {CourseModel} from "../models"
import {UserModel} from "../models"
import jwt from "jsonwebtoken"

const courseResolvers = {
    Query: {},
    Mutation: {
        createCourse: async (_, {course}, context) => {
            try {
                if (!context.request.cookies.token)
                    throw "You dont have permission for this."
                const role = await UserModel.getRole(context.request.cookies.token)
                if (role !== "administrator")
                    throw "You dont have permission for this."
                
                const courseModel = new CourseModel(course)
                const courseInstance = await courseModel.save()
                return courseInstance
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default courseResolvers