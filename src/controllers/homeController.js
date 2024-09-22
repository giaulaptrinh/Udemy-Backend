
const connection = require('../config/database');

const User = require('../models/user');

const { getAllUsers, getUserById, updateUserById,deleteUserById} = require('../services/CRUDServices');

const getHomePage = async (req, res) => {
    // let results = await getAllUsers();
    let results = await User.find({});
    return res.render('home.ejs', { listUsers: results });
}

const getABC = (req, res) => {
    res.send('Check ABC');
}
const getGiaulee = (req, res) => {
    res.render('sample');
}
const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    // let email,name,city = req.body 
    // Insert INTO Users (email,name,city) VALUES("levangiau@gmail.com","Le Van Giau","Da Nang");
    console.log(">>>email =", email, "name =", name, "city =", city);
    // connection.query(   
    //     ` Insert INTO Users (email,name,city) VALUES(?,?,?)`,
    //     [email,name,city],
    //     function (err, results) {
    //       res.send("created user succeed!");
    //     }
    //   );
    // let [result, fields] = await connection.query(` Insert INTO Users  (email,name,city) VALUES(?,?,?)`, [email, name, city]);
    await User.create({
        email:email,
        name :name ,
        city:city,
    })
    res.send("Created user succeed!");
}
const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    const userId = req.body.userId; 
    // await updateUserById(email, name, city, userId);
    await User.updateOne({_id :userId} ,{name:name,email:email,city:city});
    res.redirect('/');
}
const getCreatePage = (req, res) => {
    res.render('create.ejs');
}
const getUpdatePage = async (req, res) => {
    const userId = req.params.id;
    // let user = await getUserById(userId);
    let user = await User.findById(userId).exec();
    res.render('edit.ejs', { userEdit: user });
}
const postDeleteUser =async(req,res)=>{
    const userId = req.params.id;
    // let user = await getUserById(userId);
    let user = await User.findById(userId).exec();
    res.render('delete.ejs',{ userEdit: user });
}
const postHandleRemoveUser =async(req,res)=>{
    const userId = req.body.userId;
    // await deleteUserById(userId);
    await User.deleteOne({_id :userId});
    res.redirect('/');
}
module.exports = {
    getHomePage, getABC, getGiaulee, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser,postDeleteUser ,postHandleRemoveUser
}