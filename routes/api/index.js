const express = require("express")
const router = express.Router()
const authRoute = require("./auth.js")
const postRoute = require("./post.js")
const uploadRoute = require("./upload.js")

router.use("/auth", authRoute)
router.use("/post", postRoute)
router.use("/upload", uploadRoute)

module.exports = router