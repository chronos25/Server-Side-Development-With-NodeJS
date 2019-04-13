const express=require('express');
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
const dishes = require('../model/dish');

const dishRouter=express.Router();
dishRouter.use(bodyparser.json());

dishRouter.route('/')
.get((req,res,next)=>{
    dishes.find({})
    .then((dishes)=>{ 
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },(err)=> next(err))
    .catch((err)=>next(err));	 
})

.post((req,res,next)=>{
    dishes.create(req.body)
    .then((dish)=>{
        console.log('Dish Created',dish);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>next(err))
    .catch((err)=>next(err));
	})

.put((req,res,next)=>{
	res.statusCode=403;
	res.send('PUT operation will not be supported on /dishes')
})

.delete((req,res,next)=>{
    dishes.deleteMany({})
    .then((resp)=>{
        res.statusCode=200;
        // res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
	 
});

dishRouter.route('/:dishId')
    .get((req, res, next)=>{
         dishes.findById(req.params.dishId)
         .then((dish)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
         },(err)=>next(err))
         .catch((err)=>next(err));
        })

    .post((req, res, next) => {
 		 res.statusCode = 403;
 		 res.end('POST operation not supported on /dishes/ '+ req.params.dishId);
		})

    .put((req, res, next)=> {
        dishes.findByIdAndUpdate(req.params.dishId,{
            $set:req.body
        },
        {new:true})
        .then((dish)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(dish);
        },(err)=>next(err))
        .catch((err)=>next(err));
     
    })

    .delete((req, res, next)=> {

        dishes.findByIdAndRemove(req.params.dishId)
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));
            res.end('Deleting dishes : ' + req.params.dishId);
    });

module.exports=dishRouter;
