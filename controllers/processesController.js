const mongoose = require("mongoose");
const ProcessModel = require("../models/Processes");
const { processValidate } = require("./validate");


const processController = {
    create: async function(req,res){

        const { error } = processValidate(req.body);
        if(error){
            return res.status(400).send(error.message)
        }

        //validade CPF 
        const numberpacient = await ProcessModel.findOne({
            npacient: req.body.npacient
        })
        if (numberpacient) return res.status(400).send('Pacient Number already exists!');

        const process = new ProcessModel({
            npacient: req.body.npacient,
            nprocess: req.body.nprocess,
            optionTerm: req.body.optionTerm,
            lastAccess: req.body.lastAccess,
            status: req.body.status  
        });

        try{
            const savedProcess = await process.save();
            res.send(savedProcess);
        }catch(err){
            res.status(400).send(err);
        }
    },
    all: function(req,res){

        ProcessModel.find((err,data)=>{
                        if(err){
                            res.send(err);
                        }else{
                            res.send(data);
                        }
                    })
            
    },
    getForParams: (req, res)=>{
        ProcessModel.findById((req.params.id),
        (err,data)=>{
            if(err){
                console.log(err)
            }else{
                res.send(data);
            }
        })
    }
};


module.exports = processController;

