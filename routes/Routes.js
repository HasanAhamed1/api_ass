const express = require("express")
const router = express.Router();
const fs = require('fs');

const infoRoutes = require('./info.js')
router.use(infoRoutes)

module.exports = router;