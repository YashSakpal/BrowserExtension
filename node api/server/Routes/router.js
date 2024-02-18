const express = require("express");
const router = new express.Router();
const {userPost} = require("../Controllers/linkControllers");
// routes
console.log('routteer')
router.post("/verify-urls",userPost);


module.exports = router;

