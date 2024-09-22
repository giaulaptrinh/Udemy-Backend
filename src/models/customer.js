const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const customerSchema = new mongoose.Schema(
    {
    name: {
        type :String,
        required:true
    },
    address :String,
    phone:String,
    email:String,
    image :String,
    decription :String,
  },
  {timestamps:true}//createdAt,updateAt
);


customerSchema.plugin(mongoose_delete,{ overrideMethods:'all'});
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;