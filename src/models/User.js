import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { fchown } from "fs"

class User {
    constructor(id, email, password, role, courses){
        this.id = id
        this.email = email
        this.password = password,
        this.role = role,
        this.courses = courses
    }
}

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user", enum: ["user", "administrator", "teacher"]},
    courses: [{type: mongoose.Schema.ObjectId, ref: "Course"}]
})

UserSchema.pre("save", async function(next){
    const user = this
    if (!user.isModified("password" ))
        return next()

    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test(user.email))
        throw new Error("Invalid email")
    regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (!regex.test(user.password))
        throw new Error("Password invalid")

    try {
        const hash = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS))
        user.password = hash
        next()
    } catch (error) {
        throw new Error(error)
    }
})

UserSchema.methods.comparePassword = async function(candidatePassword, callback){
    const user = this
    try {
        const result = await bcrypt.compare(candidatePassword, user.password)
        return result
    } catch (error){
        throw new Error(error)
    }
}

UserSchema.statics.getByToken = async function(token, callback){
    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    if (!id)
        return null
    const userInstance = await this.findOne({_id: id})
    return userInstance
}

UserSchema.statics.getRole = async function(token, callback){
    const {id} = jwt.verify(token, process.env.JWT_SECRET)
    if (!id)
        return null
    const userInstance = await this.findOne({_id: id})
    if (userInstance)
        return userInstance.role
    return null
}

export const UserModel = mongoose.model("User", UserSchema)
export default User