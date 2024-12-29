const mongoose = require('mongoose');
const chalk =require('chalk');
const CONNECTION_STRING=process?.env?.CONNECTION_STRING
// console.log(chalk.bgBlue(`CONNECTION STRING ${CONNECTION_STRING}`))

const connectDb=async()=>{
    try{
        const connect= await mongoose.connect(CONNECTION_STRING)
         console.log(chalk.bgYellow("CONNECTIOS RES",connect?.connection?.name))

    }catch(err){
        console.log(chalk.bgRed('ERROR IN ESTABLISH CONNECTION: ',err))
    }
}

module.exports=connectDb