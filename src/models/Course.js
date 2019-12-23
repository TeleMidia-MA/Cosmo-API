import mongoose from "mongoose"

class Course {
    constructor(id, title, description){
        this.id = id
        this.title = title
        this.description = description
    }
}

const CourseSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, index: true, dropDups: true },
    title: { type: String, required: true },
    description: { type: String, required: false }
})

CourseSchema.path("id").validate(async (value) => {
    const count = await mongoose.model("Course").countDocuments({id: value})
    return !count
}, "ID must be unique")

export const CourseModel = mongoose.model("Course", CourseSchema)
export default Course