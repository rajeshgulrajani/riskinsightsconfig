const db = require("../models");                                             
const Config = db.config;                                                    
const Op = db.Sequelize.Op;                                                  
                                                                             
// Create and Save a new Tutorial                                            
exports.create = (req, res) => {                                             
  console.log(req);                                                          
    // Validate request                                                      
    if (!req.body.data) {                                                    
      res.status(400).send({                                                 
        message: "Content can not be empty!"                                 
      });                                                                    
      return;                                                                
    }                                                                                                          
                                                                                                               
    // Create a Tutorial                                                                                       
    const config = {                                                                                           
     /* title: req.body.title,                                                                                 
      description: req.body.description,                                                                       
      status: req.body.status */                                                                               
      type: req.body.type,                                                                                     
      data: req.body.data                                                                                      
    };                                                                                                         
                                                                                                               
    // Save Tutorial in the database                                                                           
    Config.create(config)                                                                                      
      .then(data => {                                                                                          
        res.send(data);                                                                                        
      })                                                                                                       
      .catch(err => {                                                                                          
        res.status(500).send({                                                                                 
          message:                                                                                             
            err.message || "Some error occurred while creating the Tutorial."                                  
        });                                                                                                    
      });                                                                                                      
  };                           
  // Retrieve all Tutorials from the database.                                 
exports.findAll = (req, res) => {                                            
    const type = req.query.type;                                             
    var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;      
                                                                             
    Config.findAll({ where: condition })                                     
      .then(data => {                                                        
        res.send(data);                                                      
      })                                                                     
      .catch(err => {                                                        
        res.status(500).send({                                               
          message:                                                           
            err.message || "Some error occurred while retrieving tutorials."                                   
        });                                                                                                    
      });                                                                                                      
  };                                                                                                           
  exports.findAllRiskSub = (req, res) => {                                            
    const type = req.query.RiskCategory;   
    console.log("Query:"+type)                                          
    var condition = "" 
                                                                             
    Config.findAll({ 
      where: {
        data: {
          [Op.contains]: {
            
              riskCategory: type
            
          }
        }
      }
    })                                     
      .then(data => {                                                        
        res.send(data);                                                      
      })                                                                     
      .catch(err => {                                                        
        res.status(500).send({                                               
          message:                                                           
            err.message || "Some error occurred while retrieving tutorials."                                   
        });                                                                                                    
      });                                                                                                      
  };                                                                                                               
// Find a single Tutorial with an id                                                                           
exports.findOne = (req, res) => {                                                                              
    const id = req.params.id;                                                                                  
                                                                                                               
    Config.findByPk(id)                                                                                        
      .then(data => {                                                                                          
        res.send(data);                                                                                        
      })                                                                                                       
      .catch(err => {                                                                                          
        res.status(500).send({                                                                                 
          message: "Error retrieving Tutorial with id=" + id                                                   
        });                                                                                                    
      });                                                                                                      
  };                    

  // Update a Tutorial by the id in the request                                
exports.update = (req, res) => {                                             
    const id = req.params.id;                                                
                                                                             
    Config.update(req.body, {                                                
      where: { id: id }                                                      
    })                                                                       
      .then(num => {                                                         
        if (num == 1) {                                                      
          res.send({                                                         
            message: "Tutorial was updated successfully."                    
          });                                                                
        } else {                                                                                               
          res.send({                                                                                           
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });                                                                                                  
        }                                                                                                      
      })                                                                                                       
      .catch(err => {                                                                                          
        res.status(500).send({                                                                                 
          message: "Error updating Tutorial with id=" + id                                                     
        });                                                                                                    
      });                                                                                                      
  };                                                                                                           
                        
  // Delete a Tutorial with the specified id in the request                                                      
exports.delete = (req, res) => {                                                                               
    const id = req.params.id;                                                                                  
                                                                                                               
    Config.destroy({                                                                                           
      where: { id: id }                                                                                        
    })                                                                                                         
      .then(num => {                                                                                           
        if (num == 1) {                                                                                        
          res.send({                                                                                           
            message: "Tutorial was deleted successfully!"                                                      
          });                                                                                                  
        } else {                                                                                               
          res.send({                                                                                           
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`                     
          });                                                                                                  
        }                                                                                                      
      })                                                                                                       
      .catch(err => {                                                                                          
        res.status(500).send({                                                                                 
          message: "Could not delete Tutorial with id=" + id                                                   
        });                                                                                                    
      });                                                                                                      
  };         
  