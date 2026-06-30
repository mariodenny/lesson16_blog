import Blog from "../models/BlogModel.js";


// page
export const dashboard = async(req,res) =>{
    const posts = await Blog.findById(req.session._id).lean()
    res.render('dashboard', {
        title: 'Dashboard Blog',
        posts,
        name : req.session.name
    })
}
export const createForm = (req,res) =>{
    res.render('blog/create')
}
// logic
export const createPost = async(req,res)=>{
    const {title, content, image_url} = req.body
    const newPost = new Blog({
        title,
        content,
        image_url
    })

    await newPost.save()
    res.redirect('/blog')
}

