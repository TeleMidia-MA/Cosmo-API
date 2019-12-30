import {CourseModel} from "../models"

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
                return course !== null
            } catch (error) {
                throw new Error(error)
            }
        },
        editCourse: async (_, {course}) => {
            try {
                const courseInstance = await CourseModel.findOne({id: course.id})
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
        }
    }
}

export default courseResolvers