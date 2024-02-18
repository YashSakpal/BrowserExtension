require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes/router");
const PORT = 5004;


app.use(express.json());
app.use(cors());

console.log('apppp')

app.use(router);
// get response
app.get("/",(req,res)=>{
    res.sendStatus(200)
});

// server start
app.listen(PORT,()=>{
    console.log(`server start at Port No ${PORT}`)
});