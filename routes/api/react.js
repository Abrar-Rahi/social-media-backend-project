const express = require("express")
const router = express.Router()
const {authecticationUser} = require("../../middlewire/authentication")
const { reactPost, getAllReacts } = require("../../controllers/reactController")


router.put("/reactPost", authecticationUser, reactPost  )
router.get("/getAllReacts/:id", authecticationUser, getAllReacts  )


module.exports = router