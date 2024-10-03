const BlogModel = require("../models/BlogModel")

const CreateBlog = async (req ,res) =>{
const imgid = req.imgid
 await BlogModel.create({
        title: req.body.title,
        content: req.body.content,
        blogfile: req.body.blogfilename,
        imgid : imgid

  })
  .then(data=>{ 
   return res.json({msg: "Blog Creted successfully" , data: data})
})
  .catch(err=>{return res.json({msg: err.message, code: 405})})
}

const GetBlogs = async (req ,res) =>{
   const blogs = await BlogModel.find({}).sort({_id: -1});
   if(blogs){
    return res.json({blogs: blogs , code: 200 , get: true})
   }
   return res.json({get:false , code: 405, msg:"Blog cannot "})
}

const PutBlogs = async () =>{
    
}
const DeleteBlog = async (req,res) =>{
const {id} =req.params;
try{
   await BlogModel.deleteOne({_id: id})
   .then(result=>{
      return res.json({
         msg: "Blog deleted successfully",
         data: result
      })
   })
}
catch(err){
   return res.json({
      msg: err.message
   })
}
}

const GetOneBlog = async(req, res)=>{
    const {id} =req.params

   const blogs = await BlogModel.find({_id: id}).limit(1);
   if(blogs){
    return res.json({blog: blogs , code: 200 , get: true})
   }
   return res.json({get:false , code: 405, msg:"Somthing went error"})
}

const GetPined = async (req ,res) =>{
try{
     await BlogModel.find({pined:true}).sort({_id: -1})
     .then(data=>{
           return res.json({
            data: data
           })
     })
     .catch(error=>{
      return res.json({
         msg:error.message
      })
     })
}
catch(err){
   return res.json({
      msg: err.message
,
blog:false   })
}
}

const MakePined = async(req,res) =>{
   const {id} =req.params
      try{
        await BlogModel.find({_id: id})
        .then(data=>{
         
          if(data[0].pined==true){
             BlogModel.updateOne({_id: id} , {$set:{pined:false}})
            .then(data=>{
               return res.json({
                    data: data,
                    msg: "Pined Blogs"
               })
            })
            .catch(error=>{
               return res.json({
                  msg: "Blog cannot be pinned"
               })
            })
          }

          else{
            BlogModel.updateOne({_id: id} , {$set:{pined:true}})
            .then(data=>{
               return res.json({
                    data: data,
                    msg: "Unpined Blog"
               })
            })
            .catch(error=>{
               return res.json({
                  msg: "Blog cannot be unpined"
               })
            })
          }

        })
      }
      catch(err){
         console.log(err.message)
         return res.json({msg:err.message})
      }
}


module.exports = {CreateBlog ,DeleteBlog, GetBlogs , PutBlogs , GetOneBlog , GetPined , MakePined}

