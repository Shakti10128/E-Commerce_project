const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handling UnCaught Exception

process.on("uncaughtException",err=>{
    console.log(`Error ${err.message}`);
    console.log("Shutting down the server due to UnCaught Exception");

        process.exit(1);
})

dotenv.config({
    path:"back-end/config/config.env"
})

connectDatabase();


const server = app.listen(process.env.PORT,()=>{
    console.log("server is working on ",process.env.PORT)
})


// unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    });
});



