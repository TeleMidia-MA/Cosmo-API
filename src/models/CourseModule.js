import mongoose from "mongoose"

class CourseModule {
    constructor(id, activity, course){
        this.id = id
        this.activity = activity
        this.course = course
    }
}

const CourseModuleSchema = new mongoose.Schema({
    activity: {type: mongoose.Schema.ObjectId, required: true, ref: "Activity"},
    course: {type: mongoose.Schema.ObjectId, required: true, ref: "Course"},
})

export const CourseModuleModel = mongoose.model("CourseModule", CourseModuleSchema)
export default CourseModule