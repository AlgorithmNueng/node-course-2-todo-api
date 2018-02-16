const MongoClient = require('mongodb').MongoClient;
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

var user = { name: 'andrew' , age: 25};
var { name } = user;

// NOTE: response -> error, client
MongoClient.connect(mongoURL, function(err, client) {
  if (err) {
    console.log('error', err);
    console.log("Unable to connect to MongoDB serve");
  }
  console.log("Connected to MongoDB successfully to server");

  const db = client.db(dbName);
  // db.collection('Todos').insertOne({text: 'Someting to do', completed: false}, function(err, result){
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({ name: 'Andrew', age: 25, location: 'Philadephia'}, function(err, result){
  //   if (err) {
  //     return console.log('Unable to insert user', err);
  //   }
  //
  //   console.log(result.ops[0]._id.getTimestamp());
  // });

  client.close();
});
