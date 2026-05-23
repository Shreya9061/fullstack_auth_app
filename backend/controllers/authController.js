const {generateToken} = require("../utils/jwt");
const bcrypt = require("bcrypt");
const authRepository = require("../repository/authRepository");

//register api
exports.registerUser = async(req,res) => {
    try {
        const { name,email,password,phone } =req.body;
        //step 1: validate input
        if(!name || !email || !password || !phone){
            return res.status(400).json({ 
                success:false,
                message:"All fields are required"
                });
        }

// step 2: check if user already exists
const existingUser = await authRepository.findUserByEmail(email);
if(existingUser){
    return res.status(400).json({     
        success:false,
        message:"User already exists"
    });
}
//step 3: hashing password
const hashedPassword = await bcrypt.hash(password,10);

//step 4: create user
const user= await authRepository.createUser({
    name,
    email,
    password:hashedPassword,
    phone
});

return res.status(201).json({
    message:"User registered successfully",
    user
});

    } catch (error) {

        res.status(500).json({
            message:"Server error",
        
        });
    }
};

// Login API
exports.loginUser = async(req,res) => {
    try {
        const { email,password } =req.body;

        //step 1: validate request
        if(!email || !password){
            return res.status(400).json({
                message:"Email and password are required"
            });
        }

        //step 2:check user exists
        const user = await authRepository.findUserByEmail(email);
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }
        //step 3: compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }
            //token payload
        const payload = {
            userId:user._id,
            email:user.email,
            name:user.name
        };

        //generate token
        const token = generateToken(payload);

        return res.status(200).json({
            message:"Login successful",
            token,
            user
        });
    }
        catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                message:"internal server error"
            });
        }
    };
