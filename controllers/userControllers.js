const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidate, registerValidate } = require('./validate')

const userController = {
    register: async function(req,res){

        const { error } = registerValidate(req.body);
        if(error){
            return res.status(400).send(error.message)
        }

        //validade e-mail and CPF
        const selectedEmail = await User.findOne({
            email: req.body.email
        });
        const selectedCPF = await User.findOne({
            cpf: req.body.cpf
        })
        if (selectedEmail || selectedCPF) return res.status(400).send('Email or CPF already exists!');

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            cpf: req.body.cpf,
            admin: req.body.admin,
            password: bcrypt.hashSync(req.body.password)
        });

        try{
            const savedUser = await user.save();
            res.send(savedUser);
        }catch(err){
            res.status(400).send(err);
        }
    },
    login: async function(req,res){

        const { error } = loginValidate(req.body);
        if(error){
            return res.status(400).send(error.message)
        }

        //validade if user have a acount
        const selectedUser = await User.findOne({
            cpf: req.body.cpf
        });
        if (!selectedUser) return res.status(400).send('User or Password incorrect!');
        //compare password
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password,
            selectedUser.password);
        if(!passwordAndUserMatch) return res.status(400).send('User or Password incorrect!');
        
        const token = jwt.sign({
            _id: selectedUser._id,
            admin: selectedUser.admin
        },process.env.TOKEN_SECRET);

        res.header('authorization-token',token);
        res.status(200).send("User Logged")
    }
};

module.exports = userController;