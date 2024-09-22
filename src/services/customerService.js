const Customer = require("../models/customer");
const aqp = require('api-query-params');

const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            decription: customerData.decription,
            image: customerData.image
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;
    } catch (error) {
        console.log(">>>error", error);
        return null;
    }
}
const getAllCustomerService = async (limit, page, name, queryString) => {
    try {
        let customers = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            // const { filter } = aqp(queryString);
            // delete filter.page;
            // console.log(">>check filter:", filter);
            customers = await Customer.find(filter).skip(offset).limit(limit).exec();
        }
        else {
            customers = await Customer.find({});
        }

        return customers;
    } catch (error) {
        console.log(">>>error", error);
        return null;
    }
}
const putUpdateCustomerService = async (customerId, name, email, address) => {
    try {
        let customers = await Customer.updateOne({ _id: customerId }, { name, email, address });
        return customers;
    } catch (error) {
        console.log(">>>error", error);
        return null;
    }
}
const deleteACustomerService = async (id) => {
    try {
        let customers = await Customer.deleteById({ _id: id });
        return customers;
    } catch (error) {
        console.log(">>>error", error);
        return null;
    }
}
const deleteArrayCustomerService = async (arrIds) => {
    try {
        let customers = await Customer.delete({ _id: { $in: arrIds } });
        return customers;
    } catch (error) {
        console.log(">>>error", error);
        return null;
    }
}
module.exports = {
    createCustomerService, createArrayCustomerService, getAllCustomerService, putUpdateCustomerService, deleteACustomerService, deleteArrayCustomerService
}