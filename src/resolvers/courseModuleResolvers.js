import { CourseModuleModel } from "../models";

const courseModuleResolvers = {
    Query: {
        courseModules: async () => {
            try {
                const courseModules = await CourseModuleModel.find()
                return courseModules
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createCourseModule: async (_, {courseModule}) => {
            try {
                const courseModuleModel = new CourseModuleModel(courseModule)
                const courseModuleInstance = await courseModuleModel.save()
                return courseModuleInstance
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default courseModuleResolvers