const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin@ds223578.mlab.com:23578/database-1");

const userSchema = new Schema({
  name: String,
  username: {type: String, required: true},
  password: {type: String, required: true},
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});

userSchema.methods.manify = function(next) {
  this.name = this.name + "-boy";

  return next(null, this.name);
};

const User = mongoose.model("User", userSchema);

userSchema.pre("save", function(next) {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

const kenny = new User({
  name: "Kenny",
  username: "Kenny_the_boy",
  password: "password"
});

kenny.manify(function(err, name) {
  if (err) throw err;
  console.log("Your name is: " + name);
})

kenny.save(function(err) {
  if (err) throw err;
  console.log("User " + kenny.name + " has been saved");
});

const benny = new User({
  name: "Benny",
  username: "Benny_the_boy",
  password: "password"
});

benny.manify(function(err, name) {
  if (err) throw err;
  console.log("Your name is " + name);
});

const mark = new User({
  name: "Mark",
  username: "Mark_the_Boy",
  password: "password"
});

mark.manify(function(err, name) {
  if (err) throw err;
  console.log("Your name is " + name);
});

mark.save(function(err) {
  if (err) throw err;
  console.log("User " + mark.name + " has been saved");
});

const george = new User({
  name: "Georges",
  username: "George_the_Boy",
  password: "password"
});

george.manify(function(err, name) {
  if (err) throw err;
  console.log("Your name is " + name);
});

george.save(function(err) {
  if (err) throw err;
  console.log("User " + george.name + " has been saved");
});

User.find({}, function(err, res) {
  if (err) throw err;
  console.log("Actual database records are " + res);
});

const query = User.find({});
const promise = query.exec();
promise.then(function(records) {
  console.log("Actual database records are " + records);
});
promise.catch(function(reason) {
  console.log("Something went wrong: " + reason);
});

User.find({username: "Kenny_the_boy"}).exec(function(err, res) {
  if (err) throw err;
  console.log("Record you are looking for is " + res);
});

// const query = User.find({username: "Kenny_the_boy"});
// const promise = query.exec();

User.find({username: "Kenny_the_boy"}, function(err, user) {
  if (err) throw err;
  console.log("Old password is " + user[0].password);
  user[0].password = "newestPassword";
  console.log("New password is " + user[0].password);

  user[0].save(function(err) {
    if (err) throw err;
    console.log("User " + user[0].name + " has been updated");
  });
});

promise.then(function(record) {
  console.log("Record you are looking for is " + record);
});

User.find({username: "Mark_the_Boy"}, function(err, user) {
  if (err) throw err;
  user = user[0];
  user.remove(function(err) {
    if (err) throw err;
    console.log("User successfully deleted");
  });
});

// User.findOneAndRemove({username: "Kenny_the_boy"}, function(err) {
//   if (err) throw err;
//   console.log("User deleted!");
// });

Promise.all([kenny.save(), mark.save(), george.save(), benny.save()]);
