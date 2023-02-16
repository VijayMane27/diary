const Detail = require('../models/detailmodel')
const mongoose = require('mongoose')

//get all detail
const getDetails = async (req,res) => {
    const detail = await Detail.find({}).sort({createdAt: -1})

    res.status(200).json(detail)
}

// get a single detail

const getDetail = async(req, res) =>{
const {id} = req.params

if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such detail' })
}

const detail = await Detail.findById(id)

if (!detail){
    return res.status(400).json({ error: 'No such detail'})
}

res.status(200).json(detail)

}
//create a new detail

const createDetail = async (req , res) => {
    const {name, designation, Department, qualification, dob, basicPay, languages, employeeNo, aadharNo, panNo, phoneNo, address, bloodGroup  } = req.body
   
    //add doc to db

    try{
    const detail = await Detail.create({name, designation, Department, qualification, dob, basicPay, languages, employeeNo, aadharNo, panNo, phoneNo, address, bloodGroup  })
    res.status(200).json(detail)
    }catch(error){
       res.status(400).json({error: error.message})
    }
}


//delete a detail

const deleteDetail = async(req, res) => {

    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such detail' })
}

    const detail = await Detail.findOneAndDelete({_id: id})

    if (!detail){
        return res.status(400).json({ error: 'No such detail'})
    }

    res.status(200).json(detail)
}

// update a detail

const updateDetail = async (req, res) => {

    const {id} = req.params


    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such detail' })
}

const detail = await Detail.findOneAndUpdate({_id: id}, {

    ...req.body

})

if (!detail){
    return res.status(400).json({ error: 'No such detail'})
}

res.status(200).json(detail)

}

module.exports ={
    getDetails,
    getDetail,
    createDetail,
    deleteDetail,
    updateDetail
}