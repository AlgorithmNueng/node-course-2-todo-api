const { MongoClient, ObjectID } = require('mongodb');
const mongoURL = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

// NOTE: response -> error, client
MongoClient.connect(mongoURL, function(err, client) {
  if (err) {
    console.log('error', err);
    console.log("Unable to connect to MongoDB serve");
  }
  console.log("Connected to MongoDB successfully to server");
  const db = client.db(dbName);

  // deleteMany
  db.collection('Users').findOneAndUpdate(
    {
      _id: new ObjectID('5a84dc3ccc56f00549460e0d')
    },
    {
      $set: { name: 'Nueng'},
      $inc: { age: 30}
    },
    {
      returnOriginal: false
    }
  ).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });

  client.close();
});
