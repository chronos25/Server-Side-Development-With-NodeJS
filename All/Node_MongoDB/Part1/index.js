const MongoClient= require("mongodb").MongoClient;
const assert= require("assert");

const url='mongodb://localhost:27017';
const dbName='conFusion';


MongoClient.connect(url,function(err,client){
	assert.equal(err,null);

	console.log("Connect successfully to server");
	const db=client.db(dbName);
	const collection=db.collection("dishes");

		collection.insertOne({
			"name":"Pizza",
			"description":"Domino's Pizza"
		 },(err,result)=>{
			assert.equal(err,null);
			console.log("After Insert :\n");
			console.log(result.ops);

				collection.find({}).toArray((err,docs)=>{
					assert.equal(err,null);
					console.log("Found : \n");
					console.log(docs);
							
							db.dropCollection("dishes",(err,result)=>{

									assert.equal(err,null);
									client.close();
							}); 
				});
		}); 
});
