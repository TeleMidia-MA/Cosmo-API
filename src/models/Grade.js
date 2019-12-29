import mongoose from "mongoose"

class Grade {
    constructor(id, user, activity){
        this.id = id
        this.user = user
        this.activity = activity
    }
}

const GradeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    activity: { type: mongoose.Schema.ObjectId, ref: "Activity" }
})

export const GradeModel = mongoose.model("Grade", GradeSchema)
export default Grade