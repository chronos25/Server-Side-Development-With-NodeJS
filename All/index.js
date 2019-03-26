const mongoose=require('mongoose');
const dishes = require('./model/dishes');

const url='mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url); 

connect.then((db)=>{
	console.log("Connected Successfully");

	var newDish =dishes({
		name :'Pizza',
		description :'test'
	});

	newDish.save()
	.then((dish)=>{
		console.log(dish);

		return dishes.find({}).exec();
	})
	.then((dishes)=>{
		console.log(dishes);
	})
	.then(()=>{
		return mongoose.connection.close();
	})
	.catch((err)=>{
		console.log(err);
	})
});