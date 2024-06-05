const express = require("express")
const router = express.Router()
 const api = require("./api")

const apiUrl = process.env.BASE_API_URL

router.use(apiUrl, api)

module.exports = router