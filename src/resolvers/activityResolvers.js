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
        createActivity: async (_, {activity}, context) => {
            try {
                if (!context.request.cookies.token)
                    throw "You dont have permission for this."
                else {
                    const role = await UserModel.getRole(context.request.cookies.token)
                    if (role !== "administrator")
                        throw "You dont have permission for this."
                }

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