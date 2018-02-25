const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
//  Require knex.js 
const knex = require('knex')

//  Require controllers
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

//  Initialize knex.js,URL:'http://knexjs.org/'
const db = knex({
  client: 'pg', //  PostgreSQL
  connection: {
    host: '127.0.0.1',  //  localhost
    user: 'postgres',
    password: 'ivanevacic',
    database: 'facedetectionapp'
  }
});

//  Create app buy running express
const app = express();

//  Middleware
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { res.send(database.users) })


//  Dependency injection(we inject dependencies this handle.Register and other functions need)
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageURL', (req, res) => {image.handleAPICall(req, res)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.listen(3000, () => {
  console.log('App is running on port 3000');
})
