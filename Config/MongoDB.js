require('dotenv').config()
const { MongoClient } = require('mongodb');
// Connection URL
const url = process.env.MONGO_URL
const client = new MongoClient(url);


client
  .connect()
  .then(async (res) => {
    console.log('Connectou ao Mongo');
    // Write your own code here
  })
  .catch((err) => {
    console.log('err happened' + err);
  });
// Database Name
const dbName = 'Cluster0';

  const db = client.db(dbName);
  const collection = db.collection('documents');


module.exports = collection