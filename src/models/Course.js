import mongoose from "mongoose"

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
    participants: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
})


// CourseSchema.path("id").validate(async (value) => {
//     const count = await mongoose.model("Course").countDocuments({id: value})
//     return !count
// }, "ID must be unique")

CourseSchema.statics.getById = async function(id, callback){
    const courseInstance = await this.findOne({id: id})
    return courseInstance
}

export const CourseModel = mongoose.model("Course", CourseSchema)
export default Course