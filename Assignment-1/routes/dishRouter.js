const express=require('express');
const bodyparser=require('body-parser');

const dishRouter=express.Router();
dishRouter.use(bodyparser.json());

dishRouter.route('/')
.all((req,res,next)=>{
	res.statusCode=200;
	res.setHeader('Content-Type','text/plain');
	next();
})
.get((req,res,next)=>{
	res.send('Will send the details about all dishes !');
})
.post((req,res,next)=>{
	res.send('Will add the dish '+ req.body.name + ' with details '+ req.body.description);
})
.put((req,res,next)=>{
	res.statusCode=403;
	res.send('PUT operation will not be supported on /dishes')

})
.delete((req,res,next)=>{
	res.send('Will delete all dishes ');
});
dishRouter.route('/:dishId')
    .all((req, res, next)=>{
       	res.statusCode=200;
		res.setHeader('Content-Type','text/plain');
		next();
    })

    .get((req, res, next)=>{
        res.end('Will send details of the dishes : ' + req.params.dishId + ' to you!');
    })

    .post((req, res, next) => {
 		 res.statusCode = 403;
 		 res.end('POST operation not supported on /dishes/ '+ req.params.dishId);
		})

    .put((req, res, next)=> {
        res.write('Updating the dishes : ' + req.params.dishId + '\n');
        res.end('Will update the dishes : ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete((req, res, next)=> {
        res.end('Deleting dishes : ' + req.params.dishId);
    });

module.exports=dishRouter;
