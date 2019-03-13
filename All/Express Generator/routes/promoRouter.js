const express=require('express');
const bodyparser=require('body-parser');

const promoRouter=express.Router();
promoRouter.use(bodyparser.json());


promoRouter.route('/')
.all((req,res,next)=>{
	res.statusCode=200;
	res.setHeader('Content-Type','text/plain');
	next();
})
.get((req,res,next)=>{
	res.send('Will send all details of promotions');
})
.post((req,res,next)=>{
	res.send('Will update the detail of promotions : '+req.body.name+' with description '+req.body.description);
})
.put((req,res,next)=>{
	res.statusCode=403;
	res.send('PUT operation is not supported /promotions');

})
.delete((req,res,next)=>{
	res.send('will delete all details');
});

promoRouter.route('/:promoId')
    .all((req, res, next)=>{
       	res.statusCode=200;
		res.setHeader('Content-Type','text/plain');
		next();
    })

    .get((req, res, next)=>{
        res.end('Will send details of the promotions : ' + req.params.promoId + ' to you!');
    })

    .post((req, res, next) => {
 		 res.statusCode = 403;
 		 res.end('POST operation not supported on /promotions/ '+ req.params.promoId);
		})

    .put((req, res, next)=> {
        res.write('Updating the promotions : ' + req.params.promoId + '\n');
        res.end('Will update the promotions : ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete((req, res, next)=> {
        res.end('Deleting promotions : ' + req.params.promoId);
    })
module.exports=promoRouter;

