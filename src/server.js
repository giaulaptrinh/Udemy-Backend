require('dotenv').config()

const express = require('express');
const configViewEngine = require('./config/viewEngine');

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const fileUpload = require('express-fileupload');
const connection = require('./config/database');
const { MongoClient } = require('mongodb');
const app = express() ///app express
const port = process.env.PORT || 5000;
const hostname = process.env.HOST_NAME;

//config file upload
// default options
app.use(fileUpload());


//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data
//config template  engine
configViewEngine(app);

//khai bao routes
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);

//simple query
// connection.query(
//   'select * from Users u ',
//   function(err ,result ,fields){
//     console.log(">>result =",result);

//   }
// );

//test connection 


(async () => {
  try {
    //using mongoose
    await connection();
    //using mongodb driver
    const url = process.env.DB_HOST_WITH_DRIVER;

    const client = new MongoClient(url);
    //Database Name
    const dbName = process.env.DB_NAME;

    // await client.connect();
    // console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('customers');
    // collection.insertOne({"address":"Hà Nội"});
    //  collection.insertOne({"name":"Giàu",email:"levangiau20032020@gmail.com",address:"đn"});
    // collection.insertOne(
    //   {

    //     "name": "Hoi Dan IT",
    //     address: [
    //       {
    //         province: 'hn',
    //         country: {
    //           name: 'vietnam',
    //           code: 10000
    //         }
    //       },
    //       {
    //         province: 'hcm',
    //         country: {
    //           name: 'vietnam',
    //           code: 10000
    //         }
    //       }

    //     ]

    //   }

    // )
    // let a = await collection.findOne({ address: "hcm" })
    // console.log(a)
    app.listen(port, hostname, () => {
      console.log(`Backend zero app listening on port ${port}`)
    })
  } catch (error) {
    console.log(">>>Error connect to DB", error);
  }
})()
