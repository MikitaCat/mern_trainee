const {Router} = require("express")
const User = require("../models/User")
const router = Router()


router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate) {
           return res.status(400).json({message: "This user is already exist"})
        }
    } catch (e) {
        res.status(500).json({message: "Something went wrong. Try again"})
    }
})

router.post('/login', async (req, res) => {

})



module.exports = router