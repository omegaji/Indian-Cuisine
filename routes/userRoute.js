const express=require("express");
const router= express.Router();
userRoute=require("../controllers/userController")

router.get("/",userRoute.controller1)
router.get("/getDbSize",userRoute.dbCount)
router.get("/dbtest",userRoute.dbtest)
router.post("/getFlavorState",userRoute.getFlavorState)
router.post("/getReciepe",userRoute.dbGetReciepe)




module.exports=router