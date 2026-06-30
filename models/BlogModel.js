// -> BlogModel : save blog post and detail -> id,userId,title,content,image_url
import mongoose from "mongoose"

const BlogSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:true,
        default : 'https://img.magnific.com/free-photo/tablet-which-you-can-read-blog_1134-226.jpg?semt=ais_hybrid&w=740&q=80'
    }
},{
    timestamps : true
})

const Blog = mongoose.model('Blog', BlogSchema)
export default Blog