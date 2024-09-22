const User = require('../models/user');

const { uploadSingleFile, uploadMultipleFiles } = require("../services/fileServices");

const getUsersAPI = async (req, res) => {
    let results = await User.find({});
    return res.status(200).json(
        {
            EC: 0,
            data: results
        });
}
const postCreateUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    const user = await User.create({
        email: email,
        name: name,
        city: city,
    })
    return res.status(200).json({
        ERROR: 0,
        data: user
    });
}
const putUpdateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.city;
    const userId = req.body.userId;
    let user = await User.updateOne({ _id: userId }, { name: name, email: email, city: city });
    return res.status(200).json({
        EC: 0,
        data: user
    });
}
const deleteUserAPI = async (req, res) => {
    const userId = req.body.userId;
    let result = await User.deleteOne({ _id: userId });
    return res.status(200).json({
        EC: 0,
        data: result
    });
}
const postUploadSingleFileAPi = async (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let result = await uploadSingleFile(req.files.image);
    return res.status(200).json({
        ERROR: 0,
        data: result
    });

}
const postUploadMultipleFileAPi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files);
    //upload single => files is an object
    //upload multiple => files is an array
    if (Array.isArray(req.files.image)) {
        //upload multiple
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            ERROR: 0,
            data: result
        });
    } else {

        //upload single
        return await uploadSingleFile(req, res);

    }
}
module.exports = {
    getUsersAPI, postCreateUserAPI, putUpdateUser, deleteUserAPI, postUploadSingleFileAPi, postUploadMultipleFileAPi
}