const MongoClient= require("mongodb").MongoClient;
const assert= require("assert");
const dboper=require('./operation');
const url='mongodb://localhost:27017';
const dbName='conFusion';

MongoClient.connect(url,function(err,client){
	assert.equal(err,null);

	console.log("Connect successfully to server");
	const db = client.db(dbName);
	const collection=db.collection("dishes");

			dboper.insertDocument(db,{name:'Vadonut',description:'test'},"dishes",(result)=>{
				console.log("Insert Document : \n",result.ops);

				dboper.findDocuments(db,"dishes",(docs)=>{
					console.log("Found Documents : \n ",docs);

					dboper.updateDocument(db,{name:'Pizza'},{description:'update test'},"dishes",(result)=>{
			 			console.log("Update Document \n",result.result);

			 			dboper.findDocuments(db,"dishes",(docs)=>{
							console.log("Found Documents : \n ",docs);
							
							db.dropCollection("dishes",(result)=>{
								console.log("Dropped Collection: ",result);
								client.close();

							});
						});
					});
				});
			});
});
