const path=require("path");
const express=require("express");
const router=express.Router();
const searchController=require("../controllers/searchController");

router.route('/data')
    .get(searchController.handleSearch);


module.exports=router;
