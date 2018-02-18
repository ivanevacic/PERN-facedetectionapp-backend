const express = require('express');
const bodyParser = require('body-parser');


//  Create app buy running express
const app = express();

app.use(bodyParser.json());

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
      res.json('success');
    } else {
      res.status(400).json('error logging in');
    }
})

app.post('/register', (req, res) => {
  //  Using destructuring to grab values from req.body
  const { email, name, password } = req.body;
  database.users.push({
      id: '45632',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()   
  })
  //  Grabs the last user in array(last one added)
  res.json(database.users[database.users.length-1]);
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  //  let -> because it's reassigned
  let found = false;
  database.users.forEach(user => {
    //  If user is found
    if(user.id === id)  {
      found = true;
      //  If user submits image,his entries count increases
      user.entries++;
      return res.json(user.entries);
    } 
  })
  //  Needs to be like this,if not,only 'sees' first user,not all of them
  if(!found) {
    res.status(400).json('Not found');
  }
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  //  let -> because it's reassigned
  let found = false;
  database.users.forEach(user => {
    //  If user is found
    if(user.id === id)  {
      found = true;
      return res.json(user);
    } 
  })
  //  Needs to be like this,if not,only 'sees' first user,not all of them
  if(!found) {
    res.status(400).json('Not found');
  }
})

app.listen(3000, () => {
  console.log('App is running on port 3000');
})

/*
  TASKS
--------------------------
'/' => res=this is working
'/signin' => POST request,respond with success or fail  /FINISHED
'/register' => POST request,returns new user object   /FINISHED
'/profile/:userId' => GET request,return user /FINISHED
'/image' => PUT,user exists there is an update on user profile,return updated info  /FINISHED

*/