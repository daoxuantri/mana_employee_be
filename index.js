const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConfig = require('./config/db');
const auth=require('./middlewares/auth');
const {unless} = require('express-unless');
const middleware = require('./middlewares/error')
const app = express();
dotenv.config();
const cors = require("cors");


app.use(
    cors({
        credentials: true,
        origin: true,
    }),
);



mongoose.connect(dbConfig.db).then(
    () => {
        console.log("Database Connected");
    },(error) =>{
        console.log("Database can't be connected" + error);
    }
)
app.use(express.json());
app.use("/banners", require("./routes/banners.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/checkins", require("./routes/checkins.routes"));
app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send({
      success: false,
      message: err.message
    });
  });
app.listen(process.env.PORT || 4000 ,()=> {
    console.log("Ready!!");
} )









// const sql = require('mssql/msnodesqlv8');


// var config = {

//        server : "TRIDANGIU\\SQLEXPRESS", 
//       database: "mana_employee",
//       user :'sa',     
//       password:"123456789",   
//      options :{
//        trustedConnection:true,
//      },
//     driver:"msnodesqlv8",
//  }


// sql.connect(config,function(err){
//     if(err)conole.log(err)
//     var request = new sql.Request();
//     request.query("select * from [user]", function(err, records){
//         if(err)console.log(err);
//         else console.log(records);
//     })

// })

