import {CourseModel, UserModel} from "../models"

const courseResolvers = {
    Query: {
        course: async (_, {id}) => {
            try {
                const courseInstance = await CourseModel.findOne({_id: id})
                if (!courseInstance)
                    throw `Course ${id} not found`
                return courseInstance
            } catch (error) {
                throw new Error(error)
            }
        },
        courses: async _ => {
            try {
                const courses = await CourseModel.find({})
                return courses
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
                const course = await CourseModel.findOneAndDelete({_id: id})
                return course !== null
            } catch (error) {
                throw new Error(error)
            }
        },
        editCourse: async (_, {id, course}) => {
            try {
                const courseInstance = await CourseModel.findOne({_id: id})
                if (!courseInstance)
                    throw "This course does not exist."
                if (course.title)
                    courseInstance.title = course.title
                if (course.description)
                    courseInstance.description = course.description
                courseInstance.save()
                return courseInstance
            } catch (error) {
                throw new Error(error)
            }
        },
        // courseEnrollment(course: ID!, user: ID!) : Boolean @hasRole(requires: user)
        courseEnrollment: async (_, {course, user}, context) => {
            try {
                const currentUser = await UserModel.getByToken(context.request.cookies.token)
                const userInstance = await UserModel.findOne({_id: user})
                if (!userInstance)
                    throw "This user does not exist."
                if (currentUser.role !== "administrator" && currentUser._id !== userInstance._id)
                    throw "You dont have permission for this."
                const courseInstance = await CourseModel.findOne({_id: course})
                if (!courseInstance)
                    throw "This course does not exist."
                

                if (courseInstance.participants.some(user => user._id.toString() === userInstance._id.toString()))
                    return false

                courseInstance.participants.push(userInstance)
                courseInstance.save()
                return true
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default courseResolvers