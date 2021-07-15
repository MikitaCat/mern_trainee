const {Router} = require("express")
const bcrypt = require("bcryptjs")
const config = require("../config/default.json")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const User = require("../models/User")
const router = Router()


router.post(
    '/register', 

    //Validation data from Front End part I
    [
        check("email", "Incorrect email").isEmail(),
        check("password", "Minimal password length is 6 symbols").isLength({min: 6})
    ],

    async (req, res) => {
    try {
        //Validation data from Front End part II 
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Not all the fields are filled correctly"
            })
        }

        //Get data from Front End
        const {email, password} = req.body

        //checking user existense (if user is already exist it can't register again)
        const candidate = await User.findOne({email})

        if(candidate) {
           return res.status(400).json({message: "This user is already exist"})
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        //Creating new user
        const user = new User({email, password: hashedPassword})
        await user.save()
        res.status(201).json({message: "User has been creatd successfully"})

    } catch (e) {
        res.status(500).json({message: "Something went wrong. Try again"})
    }
})

router.post(
    '/login',

    //Validators array
    [
        check("email", "Enter correct email").normalizeEmail().isEmail(),
        check("password", "Enter correct password").exists()
    ],
 async (req, res) => {
    try {
        //Validation data
        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Not all the fields are filled correctly"
            })
        }

        //Get Data from request body
        const {email, data} = req.body

        //Checking user existense (if user is not exist, it can't login)
        const user = User.findOne({email})

        if(!user) {
            return res.status(400).json({message: "User is undefined"})
        }

        //Checking passwords matching
        const isMatch = bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(400).json({message: "Incorrect password"})
        }

        //Token creating
        const token = jwt.sign(
            {userId: user.id},   //user id
            config.get('jwtSecret'),  //secret string
            {expiresIn: "1h"}  //token lifetime
        )
        res.json({token, userId: user.id})
    } catch (e) {
        res.status(500).json({message: "Something went wrong. Try again"})
    }
})



module.exports = router