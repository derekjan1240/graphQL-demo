const express = require("express");
const mongoose = require("mongoose");
const graaphqlHttp = require('express-graphql');
const scheme = require('./scheme/scheme');
const keys = require('./config/keys');
const Author = require('./models/author-model');
const Book = require('./models/book-model');

const app = express();

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  connectTimeoutMS: 5000
}).then(
  () => { console.log('connected to mongodb'); },
  err => { console.log(err); }
);

app.get('/',(req, res)=>{
  res.send('graphQL-demo!');
});

app.use('/graphql', graaphqlHttp({
  schema: scheme,
  graphiql: true
}));

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});