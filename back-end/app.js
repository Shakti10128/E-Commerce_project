const express = require("express");
const productRoute = require("./routes/productRoute");
const errorMiddleware = require("./middleware/error")



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes
app.use('/api/v1',productRoute);


app.use(errorMiddleware);


module.exports = app;