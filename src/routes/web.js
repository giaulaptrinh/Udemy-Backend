const express = require('express');
const {getHomePage,getABC,getGiaulee,postCreateUser,getCreatePage,getUpdatePage,postUpdateUser,postDeleteUser,postHandleRemoveUser} = require('../controllers/homeController');
const router=  express.Router();
// khai bao route
router.get('/',getHomePage) ;
router.get('/getABC',getABC);

router.get('/giaulee1',getGiaulee);
router.get('/update/:id',getUpdatePage);
router.get('/create',getCreatePage);   
router.post('/create-user',postCreateUser);
router.post('/update-user',postUpdateUser);
router.post('/delete-user/:id',postDeleteUser);
router.post('/delete-user',postHandleRemoveUser);
module.exports = router;//export default