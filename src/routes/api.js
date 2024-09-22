const express = require('express');
const {getUsersAPI,postCreateUserAPI,putUpdateUser,deleteUserAPI,postUploadSingleFileAPi,postUploadMultipleFileAPi } =require('../controllers/apiController');
const { postCreateCustomer,postCreateArrayCustomer,getCustomerAPI,putUpdateCustomers,deleteACustomer,deleteArrayCustomer} =require('../controllers/custormerController');
const {postCreateProject,getAllProject,updateProject,deleteProject} = require("../controllers/projectController");
const {postCreateTask,getAllTask,updateTask,deleteTask} = require("../controllers/taskController");
const router = require('./web');
const routerAPI=  express.Router();
// khai bao route

routerAPI.get('/users',getUsersAPI) ;
routerAPI.post('/users',postCreateUserAPI);
routerAPI.put('/users',putUpdateUser);
routerAPI.delete('/users',deleteUserAPI );
routerAPI.post('/file',postUploadSingleFileAPi);
routerAPI.post('/mulfile',postUploadMultipleFileAPi);

routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many',postCreateArrayCustomer);
routerAPI.get('/customers',getCustomerAPI);
routerAPI.put('/customers',putUpdateCustomers);
routerAPI.delete('/customers',deleteACustomer);
routerAPI.delete('/customers-many',deleteArrayCustomer);

routerAPI.post('/projects',postCreateProject);
routerAPI.get('/projects',getAllProject);
routerAPI.put('/projects',updateProject);
routerAPI.delete('/projects',deleteProject);
routerAPI.post('/tasks',postCreateTask);
routerAPI.get('/tasks',getAllTask);
routerAPI.put('/tasks',updateTask);
routerAPI.delete('/tasks',deleteTask);


routerAPI.get('/info',(req,res)=>{
    console.log(">>>Check query string =",req.query);
    return res.status(200).json(
        {
            EC: 0,
            data: req.query
        });

});
routerAPI.get('/info/:name/:address',(req,res)=>{
    console.log(">>>Check params =",req.params);
    return res.status(200).json(
        {
            EC: 0,
            data: req.params
        });

});



module.exports = routerAPI;//export default
