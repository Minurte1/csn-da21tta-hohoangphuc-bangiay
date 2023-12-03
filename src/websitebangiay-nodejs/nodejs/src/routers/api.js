const express = require("express");
const router = express.Router();
const { getAllProduct } = require('../controllers/ApiController');

router.get('/product', getAllProduct);




module.exports = router; // Di chuyển dòng này về cuối tệp của bạn