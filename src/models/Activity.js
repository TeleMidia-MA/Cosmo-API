import mongoose from "mongoose"
import autopopulate from "mongoose-autopopulate"

class Activity {
    constructor(id, title, grades){
        this.id = id
        this.title = title
        this.grades = grades
    }
}

const ActivitySchema = new mongoose.Schema({
    title: {type: String, required: true},
    grades: {type: [mongoose.Schema.ObjectId], ref: "Grade", autopopulate: true}
})

ActivitySchema.plugin(autopopulate)

export const ActivityModel = mongoose.model("Activity", ActivitySchema)
export default Activity