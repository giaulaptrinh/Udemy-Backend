
const { uploadSingleFile } = require("../services/fileServices");
const { createCustomerService, createArrayCustomerService, getAllCustomerService, putUpdateCustomerService, deleteACustomerService,
    deleteArrayCustomerService
} = require("../services/customerService");
const Joi = require('joi');
module.exports = {
    postCreateCustomer: async (req, res) => {

        let { name, address, phone, email, decription } = req.body;
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
        
            address: Joi.string(),
            // phone :Joi.string().pattern(new RegExp('^[0-9]{8,11}$')),
            // email:Joi.string().email,
            // description :Joi.string(),           
        })
        
        
        const {error} = schema.validate(req.body);
        return res.status(200).json({
            msg:error
        })
        if(error){
            // return error 
        }else{
            let imageUrl = "";
            if (!req.files || Object.keys(req.files).length === 0) {
    
            } else {
                let result = await uploadSingleFile(req.files.image);
                imageUrl = result.path;
                console.log(">>check result:path", result.path);
    
            }
            let customerData = {
                name, address, phone, email, decription,
                image: imageUrl
            }
            let customer = await createCustomerService(customerData);
            return res.status(200).json({
                EC: 0,
                data: customer
            });
        }
       
    },
    postCreateArrayCustomer: async (req, res) => {
        // console.log(">>>>Check data:",req.body.Customer);
        let customers = await createArrayCustomerService(req.body.customers);
        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers
            });
        } else {
            return res.status(200).json({
                EC: -1,
                data: customers
            });
        }

    },
    getCustomerAPI: async (req, res) => {
        console.log(">>>Check query", req.query);
        let limit = req.query.limit;
        let page = req.query.page;
        let name = req.query.name;
        let result = null;
        if (limit && page)
            result = await getAllCustomerService(limit, page,name,req.query);
        else
            result = await getAllCustomerService();
        return res.status(200).json(
            {
                EC: 0,
                data: result
            });
        // res.send("Get customers");
    },
    putUpdateCustomers: async (req, res) => {

        let customerId = req.body.customerId;
        // let name = req.body.name;
        // let email= req.body.email;
        // let  address = req.body.address;
        let { name, email, address } = req.body;
        console.log(name, email, address, customerId);
        let result = await putUpdateCustomerService(customerId, name, email, address);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            });
    },
    deleteACustomer: async (req, res) => {
        let id = req.body.id;
        // console.log(">>id=",id);
        let result = await deleteACustomerService(id);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            });
    },
    deleteArrayCustomer: async (req, res) => {
        let ids = req.body.customersId;
        //    console.log(">>>Check ids =",ids);
        let result = await deleteArrayCustomerService(ids);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            });


    }
}