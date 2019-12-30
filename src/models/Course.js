import mongoose from "mongoose"
import autopopulate from "mongoose-autopopulate"

class Course {
    constructor(id, title, description, participants){
        this.id = id
        this.title = title
        this.description = description
        this.participants = participants
    }
}

const CourseSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, index: true, dropDups: true },
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

CourseSchema.statics.getByObjectId = async function(id, callback){
    const courseInstance = await this.findOne({_id: id})
    return courseInstance
}

CourseSchema.statics.getById = async function(id, callback){
    const courseInstance = await this.findOne({id: id})
    return courseInstance
}

export const CourseModel = mongoose.model("Course", CourseSchema)
export default Course