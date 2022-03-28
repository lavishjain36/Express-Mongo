const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

let dbName='b31wd';

let dbUrl=`mongodb+srv://jainmonula:UKii2frHawCNy5n9@cluster0.ayp03.mongodb.net/test?authSource=admin&replicaSet=atlas-l5n5yl-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

module.exports={mongodb,MongoClient,dbUrl}