const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
require("dotenv").config();

module.exports = {
    // untuk login
    login: async (req,res) => {
        try{
            const userLogin = req.body

            const user = await User.findOne({email: userLogin.email}).populate('order barberId')
            if(!user) 
            throw new Error("invalid user")

            const isPasswordValid = await bcrypt.compare(userLogin.password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }

        const token = jwt.sign({
            id:user._id,
            email: user.email
        },process.env.JWT_KEY )

        let orderData = null;
        if (user.order) {
          orderData = user.order;
        } else {
          orderData = null;
        }

        if (user.barberId) {
            barberData = user.barberId;
        } else {
            barberData = null
        }

        res.json({
            message:"login successfull",
            userId: user._id,
            token,
            username: user.username,
            order: orderData,
            role: user.role,
            barberId: barberData
        })


        } catch(error){
            res.status(500).json(error.message)
        }
        

    },


    // regis
    regis: async (req, res) => {
        try {
            const { email, password, username } = req.body;
    
            if (!email || !password || !username) {
                throw new Error('Email, username, and password harus terisi');
            }
    
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('Email already in use');
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = await User.create({
                email,
                password: hashedPassword,
                username,
            });
    
            res.status(201).json({
                message: 'Registration Success',
                newUser,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}