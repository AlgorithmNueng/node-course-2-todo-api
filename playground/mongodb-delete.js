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
  db.collection('Todos').findOneAndDelete({ completed: false}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  });

  client.close();
});
