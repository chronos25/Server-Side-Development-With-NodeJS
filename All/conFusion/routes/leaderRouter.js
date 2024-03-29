const express=require('express');
const bodyParser=require('body-parser');
const leaderRouter=express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next)=>{
	res.statusCode=200;
	res.setHeader('Content-Type','text/plain');
	next();

})
.get((req,res,next)=>{
	res.send('Will send details about leaders !');
})
.post((req,res,next)=>{
	res.send('Will update the detail of leaders : '+req.body.name+' with description '+req.body.description);
})
.put((req,res,next)=>{
	res.statusCode=403;
	res.send('PUT operation is not supported /leaders');
})
.delete((req,res,next)=>{
	res.send('Will delete all leaders ');
});


leaderRouter.route('/:leaderId')
    .all((req, res, next)=>{
       	res.statusCode=200;
		res.setHeader('Content-Type','text/plain');
		next();
    })

    .get((req, res, next)=>{
        res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
    })

    .post((req, res, next) => {
 		 res.statusCode = 403;
 		 res.end('POST operation not supported on /promotions/ '+ req.params.leaderId);
		})

    .put((req, res, next)=> {
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
        res.end('Will update the leader: ' + req.body.name +
            ' with details: ' + req.body.description);
    })

    .delete((req, res, next)=> {
        res.end('Deleting leader: ' + req.params.leaderId);
    });

module.exports=leaderRouter;