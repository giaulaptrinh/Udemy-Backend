const Task = require("../models/task");
const Project = require("../models/project");
const aqp = require('api-query-params');

module.exports = {
    createTask: async (data) => {
        if (data.type === "EMPTY-TASK") {
            let result = await Task.create(data);
            return result;
        }
        // if(data.type =="ADD-TASK"){
        //     let myProject= await Project.findById(data.projectId).exec();
        //     for (let i = 0; i < data.taskArr.length; i++) {
        //         myProject.tasks.push(data.taskArr[i]);

        //     }
        //     let newResult = await myProject.save();
        //     return newResult;
        // }
        // return null;
        
    },
    getTask : async(queryString) =>{
        const page = queryString.page ;
        // console.log(page);
        const {filter,limit,population} = aqp(queryString);
        delete filter.page;  
        let offset = (page - 1) * limit;
        let result = await Task.find(filter).populate(population).skip(offset).limit(limit).exec();
        return result;
    },
    uTask:async(data) =>{
        let result = await Task.updateOne({_id :data.id},{...data});
        return result ;
    },
    dTask:async(id)=>{
        let result=  await Task.deleteById(id);
        return result;
    }
}