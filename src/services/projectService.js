const Project = require("../models/project")
const aqp = require('api-query-params');
module.exports = {

    createProject: async (data) => {
        if (data.type === "EMPTY-PROJECT") {
            let result = await Project.create(data);
            return result;
        }
        if (data.type === "ADD-USERS") {
            let myProject = await Project.findById(data.projectId).exec();
            for (let i = 0; i < data.userArr.length; i++) {
                myProject.usersInfor.push(data.userArr[i]);

            }
            let newResult = await myProject.save();
            return newResult;
        }
        if(data.type ==="ADD-TASKS"){
            let myProject= await Project.findById(data.projectId).exec();
            for (let i = 0; i < data.taskArr.length; i++) {
                myProject.tasks.push(data.taskArr[i]);

            }
            let newResult = await myProject.save();
            return newResult;
        }    
        if(data.type === "REMOVE-USERS"){
            let myProject = await Project.findById(data.projectId).exec();
            for (let i = 0; i < data.userArr.length; i++) {
                myProject.usersInfor.pull(data.userArr[i]);
            }
            let newResult = await myProject.save();
            return newResult;
        }
        
        return null;
    },
    getProject:async(queryString) =>{
        const page = queryString.page;
        const {filter,limit,population} = aqp(queryString);
        console.log("before",filter);
        delete filter.page;
        console.log("after",filter);

        let offset = (page - 1) * limit;
       let  result= await Project.find(filter).populate(population).skip(offset).limit(limit).exec();

        return result;
    },
    uProject : async(data)=>{
        let result = await Project.updateOne({_id:data.id},{...data})
        return result;
    },
    dProject : async (id)=>{
        let result = await Project.deleteById(id);
        return result;
    }
    
}