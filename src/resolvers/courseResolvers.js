import {CourseModel} from "../models"

const courseResolvers = {
    Query: {},
    Mutation: {
        createCourse: async (_, {course}) => {
            try {
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