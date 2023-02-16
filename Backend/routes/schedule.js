const express = require('express')
const {
    getSchedules,
    getSchedule,
    createShcedule,
    deleteSchedule,
    updateSchedule

    
} = require('../controllers/schedulecontroller')



const router = express.Router()

//Get all schedule

router.get('/', getSchedules)

//Get single schedule

router.get('/:id',getSchedule)

//post a new schedule

router.post('/', createShcedule)

//Delete a schedule

router.delete('/:id',deleteSchedule)

//Update a schedule
router.patch('/:id',updateSchedule)


module.exports = router