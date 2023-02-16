const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const authenticate = require('../middelwares/authenticate')



const router = express.Router()

router.post('/signin', async (req,res) => {
    try{
        const { email, password} = req.body

        if(!email || !password){
            return res.status(400).json({ error: 'Please fill in all fields' })
        }

        const userLogin = await User.findOne({ email: email })
    

        if(!userLogin){
            res.status(404).json({ error : "Not found" })
        }else{
            if(userLogin){
                const isMatch = await bcrypt.compare(password, userLogin.password)

                const token = await userLogin.generateAuthToken()
                              
                if(!isMatch){
                    res.status(400).json({ error : "Invalid credentials" })
                }else{
                    res.status(200).json({ message : "Signin successful", token, account: userLogin })
                }
            }
        }

    }catch(error){
        res.status(400).json({ error: error.message })
    }

})

router.get('/', authenticate, (req,res) => {
    res.send(req.user)
})

module.exports = router