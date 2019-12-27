import {UserModel, CourseModel} from "../models"

const courseResolvers = {
    Query: {
        courses: async() => {
            try {
                const courses = await CourseModel.find({})
                return courses
            } catch (error) {
                throw new Error(error)
            }
        },
        course: async (_, {id}, context) => {
            try {
                const courseInstance = await CourseModel.findOne({id})
                if (!courseInstance)
                    throw `Course ${id} not found`
                    
                for await (const value of courseInstance.participants){
                    const user = await UserModel.getByObjectId(value.toString())
                    user.password = ""
                    const index = courseInstance.participants.indexOf(value)
                    courseInstance.participants[index] = user
                }

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
                else {
                    const role = await UserModel.getRole(context.request.cookies.token)
                    if (role !== "administrator")
                        throw "You dont have permission for this."
                }

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