import mongoose from "mongoose"

class Activity {
    constructor(id, title){
        this.id = id
        this.title = title   
    }
}

const ActivitySchema = new mongoose.Schema({
    title: {type: String, required: true}
})

export const ActivityModel = mongoose.model("Activity", ActivitySchema)
export default Activity