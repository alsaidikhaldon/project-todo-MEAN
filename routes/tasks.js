const express = require('express');
const router = express.Router();
const passport = require('passport')
const Task = require('../models/task');




//Add new task
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let task = new Task ({
        name: req.body.name,
        done: req.body.done,
        owner: req.body.owner,
        disc: req.body.disc
    });

    task.save((err, task) =>{
        if (err){
            throw err;
            return res.send({
                success: false,
                message: "Error saving, tray again . . .  "
            });
        }
        if (!task){
            return res.send({
                success: false,
                message: "faield to save this new task  . . . "
            });
        }

        return res.send({
            success: true,
            message: "task saved   . . . "
        });
    });    
    

    
   

});

//List own task

router.post('/list', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const owner = req.body.owner;
    Task.find({ owner },(err, tasks) =>{
        if(err){
            return res.send({
              success: false,
              message: 'Erorr while retreiving the tasks, please try again . . .  '
            });
        }
        if(!tasks){
            return res.send({
            success: false,
              message: 'you have no tasks yet ..... . . .  '
            });
        }
        return res.send({
            success: true,
           tasks
        });
    });
});

//Delet Task

router.delete('/remove/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const taskId = req.params.id;
    Task.deleteOne({ _id: taskId }, (err) =>{
        if(err){
            return res.send({
              success: false,
              message: 'Erorr while delete , please try again . . .  '
            });
        }
        return res.send({
            success: true,
            message: 'task deleted'
        });
    });
});




module.exports = router;