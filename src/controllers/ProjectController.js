const ProjectModel = require("../models/ProjectsModel")

const NewProject = async(req ,res)=>{
    try{
        await ProjectModel.create({
            title: req.body.title,
            language: req.body.language,
            style: req.body.style,
            database: req.body.database,
            repolink: req.body.repolink,
            github: req.body.github,
            bloglink: req.body.bloglink,
            livelink: req.body.livelink,
            photos: JSON.stringify(Array(req.cloud)),
            desc: req.body.desc

        }).then(result=>{return res.json({msg:"Project created successfully"})})
    }
    catch(err){
        return res.json({
            msg:err.message,
            alert: "Project cannot be crated"
        })
    }
}


const GetAllProject = async (req ,res)=>{
    try{
      const data=  await ProjectModel.find({})

      if(data){
        return res.json({
            data: data,
            msg: 'found data'
        })
      }
    }
    catch(err){
        return res.json({
            msg:err.message
        })
    }
}

// update project



// exports modules

module.exports = {NewProject, GetAllProject}