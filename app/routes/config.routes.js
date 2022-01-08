module.exports = app => {
    const config = require("../controllers/config.controller.js");

    var router = require("express").Router();
  // a middleware function with no mount path. This code is executed for every request to the router
    router.use(function (req, res, next) {
      //console.log('Time:', Date.now() + req)
      next()
    })
    // Create a new Tutorial
    router.post("/", config.create);

    // Retrieve all Tutorials
    router.get("/", config.findAll);

    // Retrieve all published Tutorials
    router.get("/find", config.findOne);

    // Retrieve a single Tutorial with id
    router.get("/id/:id", config.findOne);

    // Update a Tutorial with id
    router.put("/:id", config.update);

    // Delete a Tutorial with id
    router.delete("/:id", config.delete);

    
 // Retrieve all published Tutorials
 router.get("/findAllRiskSub", config.findAllRiskSub);
    app.use('/config', router) ;
  };