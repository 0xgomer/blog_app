import {model, Schema} from "mongoose";

const ArticleSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: "User", required: true},
    preview: {type: String, default: ''},
    title: {type: String, required: true},
    content: {type: String, default: ''},
    tags: [{type: String}],
    views: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        viewedAt: {
            type: Date,
            default: Date.now
        }
    }],
}, {timestamps: true})

export default model('Article', ArticleSchema)