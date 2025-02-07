import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    avatar: {type: String}
})

export default model('User', UserSchema)