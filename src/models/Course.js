import mongoose from "mongoose"
import autopopulate from "mongoose-autopopulate"

class Course {
    constructor(title, description, participants){
        this.title = title
        this.description = description
        this.participants = participants
    }
}

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    participants: [{ type: mongoose.Schema.ObjectId, ref: "User", autopopulate: true }]
})

CourseSchema.virtual("activities", {
    ref: "CourseModule",
    localField: "_id",
    foreignField: "course",
    autopopulate: true
})

CourseSchema.plugin(autopopulate)

export const CourseModel = mongoose.model("Course", CourseSchema)
export default Course