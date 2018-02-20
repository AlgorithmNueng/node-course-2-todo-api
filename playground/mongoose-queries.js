const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a87c1c20848121251bab693';

//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not Valid');
// }

// // NOTE: reuturn array document
// Todo.find({_id: id})
// .then((todos) => {
//   console.log('Todos', todos);
// });
//
//
// // NOTE: return one document
// Todo.findOne({_id: id})
// .then((todos) => {
//   console.log('Todos', todos);
// });

// // NOTE: Find by ID Object
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

User.findById('5a87c1c20848121251bab693').then((user) => {
  if (!user) {
    return console.log('Unable to find User');
  }
  console.log(JSON.stringify(user, undefined, 2));
},(e) => {
  console.log(e);
});
