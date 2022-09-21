const express = require("express");
const processController = require("../controllers/processesController");
const router = express.Router();

//get
router.get("/", processController.all);

// router.get("/processos/:id", processController.getForParams);

// patch and post 
// router.patch("/processos", processController.update);
// router.post("/processos", processController.update);

//post
router.post("/novo", processController.create);

// //delete
// router.delete("/processos/:id", processController.delete);

module.exports = router;