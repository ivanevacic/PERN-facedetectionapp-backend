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

//  Create app buy running express
const app = express();

//  Middleware
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
  res.json(database.users);
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash').from('login')  //  Select email and hash values from login table
    .where('email', '=', req.body.email)  // Validation
    .then(data => {
        //  Array because we get array returned(only one,so index is zero)
          //  Test only
            //console.log(data[0]);
      //  We get returned hash from 'login' table in DB,therefor the line below
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if(isValid) {
        //  Return because we either want to show res.json(user[0]) or catch the error
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          //  Error handling
          .catch(err => res.status(400).json('Unable to get user1'))
      } else { 
        //  Email is correct,password is wrong
        res.status(400).json('Wrong credentials2');
      }
    })
    //  If email and password are both wrong
    .catch(err => res.status(400).json('Wrong credentials3'));
})

app.post('/register', (req, res) => {
  //  Using destructuring to grab values from req.body
  const { email, name, password } = req.body;
  const hash = bcrypt.hashSync(password);
    //  Use transaction when we have to do more than 1 thing
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          //  Built-in knex.js function(returns all users in table)
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date()
          })
          //  Send promise to frontend
            .then(user => {
              //  Array because we get array returned(only one,so index is zero)
              res.json(user[0]);
            })
      })
      //  If all of this passes,commit to DB
      .then(trx.commit)
      //  If something doesn't pass we rollback changes
      .catch(trx.rollback)
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
      //  Array because we get array returned(only one,so index is zero)
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})  //  Short for id: id
    .then(user => {
    if(user.length) { //  If user exists
      //  Array because we get array returned(only one,so index is zero)
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
