require('dotenv').config()
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client
  .connect()
  .then(async (res) => {
    console.log('Conectou ao Redis');
    // Write your own code here
  })
  .catch((err) => {
    console.log('err happened' + err);
  });

module.exports = client