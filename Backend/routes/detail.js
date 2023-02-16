const express = require('express')
const {
    createDetail,
    getDetails,
    getDetail,
    deleteDetail,
    updateDetail
} = require('../controllers/detailcontroller')



const router = express.Router()

//Get all detail

router.get('/', getDetails)

//Get single detail

router.get('/:id',getDetail)

//post a new detail

router.post('/', createDetail)

//Delete a detail

router.delete('/:id',deleteDetail)

//Update a detail
router.patch('/:id',updateDetail)


module.exports = router