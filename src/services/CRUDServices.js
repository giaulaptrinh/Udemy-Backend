const connection = require("../config/database");


const  getAllUsers =async() =>{
    let [results,fields] =await connection.query('select * from Users u');
    return results;
}
const getUserById =async(userId) =>{
    let [results, fields] = await connection.query('Select * from  Users where id =?', [userId]);
    let user =results && results.length >0 ?results[0]:{};
    return user;
}
const updateUserById =async(email,name,city,userId) =>{
    let [results, fields] = await connection.query('Update  Users set email =?,name =?,city=? where id=?', 
        [email,name,city,userId]);
}
const deleteUserById= async(userId) =>{
    let [result, fields] = await connection.query(` DELETE FROM Users where id =?` , [userId]);
}
module.exports ={
    getAllUsers,getUserById,updateUserById,deleteUserById
}