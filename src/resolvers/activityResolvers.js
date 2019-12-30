import {ActivityModel} from "../models"

const activityResolvers = {
    Query : {
        activities: async () => {
            try {
                const activities = await ActivityModel.find({})
                return activities
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation : {
        createActivity: async (_, {activity}) => {
            try {
                const activityModel = new ActivityModel(activity)
                const activityInstance = await activityModel.save()
                return activityInstance
            } catch (error) {
                throw new Error(error)
            }
        },
        deleteActivity: async (_, {id}) => {
            try {
                const activity = ActivityModel.findByIdAndDelete(id)
                return activity !== null
            } catch (error) {
                throw new Error(error)
            }
        },
        editActivity: async(_, {activity}) => {
            try {
                const activityModel = ActivityModel.findById(activity.id)
                if (!activityModel)
                    throw "This activity does not exist."
                activityModel.title = activity.title
                activityModel.save()
                return activityModel
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

export default activityResolvers