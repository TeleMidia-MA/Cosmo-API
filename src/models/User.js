import "dotenv/config"
import mongoose from "mongoose"
import bcrypt from "bcrypt" 

const Schema = mongoose.Schema

class User {
    constructor(id, email, password){
        this.id = id
        this.email = email
        this.password = password
    }
}

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true}
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

export const UserModel = mongoose.model("User", UserSchema)
export default User