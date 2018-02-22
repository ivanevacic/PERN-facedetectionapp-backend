const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
//  Require knex.js 
const knex = require('knex')

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

//  Test query
db.select('*').from('users').then(data => {
  console.log(data);
});


//  Create app buy running express
const app = express();

//  Middleware
app.use(bodyParser.json());
app.use(cors());

//  Mock DB varible
const database = {
  users: [
    {
      id: '123',
      name: 'Ivan',
      email: 'ivanevacicweb@gmail.com',
      password: 'cookies',
      //  How many times user submitted photo
      entries: 0,
      //  Date when user joined
      joined: new Date()
    },
    {
      id: '456',
      name: 'Marko',
      email: 'marko1@gmail.com',
      password: 'bananas',
      entries: 1,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res)=>{
  res.json(database.users);
})

app.post('/signin', (req, res) => {
  if(req.body.email === database.users[0].email &&
     req.body.password === database.users[0].password) {
      //res.json('success');
      res.json(database.users[0]);
    } else {
      res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
  //  Using destructuring to grab values from req.body
  const { email, name, password } = req.body;
  //  Put form-register data into our DB
  db('users')
  //  Built-in knex.js function(returns all users in table)
  .returning('*')
  .insert({
    email: email,
    name: name,
    joined: new Date()
  })
  //  Send promise to frontend
    .then(user => {
      //  Return first user(when we register user,there should only be one)
      res.json(user[0]);
    })
    //  Error handling
    .catch(err => res.status(400).json('Unable to register'));
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)  //  Increment 
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})  //  Short for id: id
    .then(user => {
    if(user.length) { //  If user exists
      res.json(user[0])
    } else  {
      res.status(400).json('Not found!')
    }    
  })
  .catch(err => res.status(400).json('Error getting user'))
})

app.listen(3000, () => {
  console.log('App is running on port 3000');
})
