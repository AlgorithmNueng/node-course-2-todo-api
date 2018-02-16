const { MongoClient, ObjectID } = require('mongodb');
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

  // db.collection('Todos').find({
  //    _id: new ObjectID('5a84da45e97754049f5197d4')
  //  }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Todos').find().count().then((count) => {
    console.log('Todos');
    console.log('count', count);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  client.close();
});
