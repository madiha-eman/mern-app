const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbConnect = require('./config/db.js');
var cors = require('cors')
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const userRoute  = require('./routes/api/users.js')
const postRoute =  require('./routes/api/posts.js')
const productRoute =  require('./routes/api/products.js')



const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '50mb'}));
const MAX_AGE = 1000 * 60 * 60 * 3;
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000
///connect to db
dbConnect();
///to start app
app.listen(PORT, (req,res)=>{
console.log('server is running at', PORT)
})


// Express-Session
const mongostore = new MongoDBStore({
    uri: 'mongodb+srv://madiha-eman:Blue123Moon@@cluster0.ngzij.mongodb.net/PostsApp?retryWrites=true&w=majority',
    collection: "mySessions"
  });

app.use(
    session({
      name: 'usersession', //name to be put in "key" field in postman etc
      secret: 'abcd',
      resave: true,
      saveUninitialized: false,
      store: mongostore,
      cookie: {
        secure: true
      }
    })
  );

///Routes
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/products', productRoute)


