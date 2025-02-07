import mongoose, {model, Schema} from "mongoose";

const CommentSchema = new mongoose.Schema({
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    avatar: {type: String},
    name: {type: String, required: true},
    content: {type: String, required: true},
    articleId: {type: Schema.Types.ObjectId, ref: "Article", required: true},
}, {timestamps: true})

export default model('Comment', CommentSchema)