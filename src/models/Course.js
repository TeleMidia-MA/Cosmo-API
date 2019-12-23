import mongoose from "mongoose"

class Course {
    constructor(id, title, description){
        this.id = id
        this.title = title
        this.description = this.description
    }
}

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
})

export const CourseModel = mongoose.model("Course", CourseSchema)
export default Course