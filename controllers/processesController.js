const mongoose = require("mongoose");
const ProcessModel = require("../models/Processes");



const processController = {

    all: (req, res)=>{
        
        ProcessModel.find((err,data)=>{
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        })

    }
    ,
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
    ,
    create: async (req, res)=>{
        const newProcess = new ProcessModel({
            cpfpacient: req.body.cpfpacient,
            nprocess: req.body.nprocess,
            optionTerm: req.body.optionTerm,
            lastAccess: req.body.lastAccess,
            status: req.body.status           
            });

            try{
                const savedProcess = await newProcess.save();
                res.status(201).send("Process Created!");
            }catch(error){
                res.status(400).send(error.message);
            }


    },
    update:(req, res)=>{

        const ID = req.body.id;

        const options = {
            cpfpacient: req.body.cpfpacient,
            nprocess: req.body.nprocess,
            optionTerm: req.body.optionTerm,
            lastAccess: req.body.lastAccess,
            status: req.body.status    
            };

            ProcessModel.findByIdAndUpdate(ID,
                options, (err,data)=>{
                    if(!err){
                        res.status(201).sens("Process Update!");
                    }else{
                        res.status(404).send("Invalid Data");
                    }
            })
    },

    delete: async (req, res)=>{
        const ID = req.params.id;

        if(!ID){
            ID = req.body.id;
        }
    
        try{
         await ProcessModel.findByIdAndDelete(ID);
         res.status(200).send("Deleted!");
        }
        catch(error){
            res.status(404).send(error); 
        }
        
    }
}




module.exports = processController;