const express = require('express')
const router = express.Router()

const {handleScreenRecord} = require('../controller/screenRecordController')

router.route('/').post(handleScreenRecord)

module.exports = router