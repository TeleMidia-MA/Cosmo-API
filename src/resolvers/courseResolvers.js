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
        course: async (_, {id}) => {
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
        createCourse: async (_, {course}) => {
            try {
                const courseModel = new CourseModel(course)
                const courseInstance = await courseModel.save()
                return courseInstance
            } catch (error) {
                throw new Error(error)
            }
        },
        deleteCourse: async (_, {id}) => {
            try {
                const course = await CourseModel.findOneAndDelete({id})
                if (!course)
                    return false
                return true
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default courseResolvers