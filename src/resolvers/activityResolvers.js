import {UserModel, ActivityModel} from "../models"

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
        }
    }
}

export default activityResolvers