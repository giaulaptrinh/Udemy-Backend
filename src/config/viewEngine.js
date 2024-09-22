const path = require('path');
const express= require('express');
const configViewEngine = (app)=>{
    console.log("check_path:",path.join("./src",'views'));
    app.set('views',path.join("./src",'views'));
    app.set('view engine','ejs');
    //config static file images/css/js
    app.use(express.static(path.join("./src", 'public')));

}
module.exports =configViewEngine;