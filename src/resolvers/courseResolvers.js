import {CourseModel} from "../models"
import {UserModel} from "../models"
import jwt from "jsonwebtoken"

const courseResolvers = {
    Query: {
        course: async (_, {id}, context) => {
            try {
                const courseInstance = await CourseModel.findOne({id})
                if (!courseInstance)
                    throw `Course ${id} not found`
                return courseInstance
            } catch (error) {
                throw new Error(error)
            }
        }
    },
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