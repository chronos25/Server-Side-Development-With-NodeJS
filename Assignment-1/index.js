const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');

const app=express();

const http=require('http');
const host='localhost';
const port=3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

const dishRouter=require('./routes/dishRouter');
app.use('/dishes',dishRouter);

const promoRouter=require('./routes/promoRouter');
app.use('/promotions',promoRouter);

const leaderRouter=require('./routes/leaderRoute');
app.use('/leaders',leaderRouter);
 
app.use(express.static(__dirname+'/public'));

const Server=http.createServer(app);
Server.listen(port,host,()=>{
	console.log(`Server is running at http://${host}:${port}`);
});