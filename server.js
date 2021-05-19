const express = require("express");
const app = express();

app.use(express.urlencoded());

app.use(express.json());
app.use("/appstart/",require("./routes/userRoute"))
app.listen(3001,()=>{
    console.log("server has started")
})