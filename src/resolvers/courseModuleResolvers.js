import { CourseModel } from "../models";

const courseModuleResolvers = {
    Mutation: {
        createCourseModule: async (_, {courseModule}) => {
            try {
                const courseModuleModel = new CourseModel(courseModule)
                const courseModuleInstance = await courseModuleModel.save()
                return courseModuleInstance
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default courseModuleResolvers