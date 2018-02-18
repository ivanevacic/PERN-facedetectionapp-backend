const express = require('express');

//  Create app buy running express
const app = express();

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
  res.send('this is working');
})

app.post('/signin', (req, res) => {
  //  We get json string
  res.json('signin route works');
})

app.listen(3000, () => {
  console.log('App is running on port 3000');
})

/*
  TASKS
--------------------------
'/' => res=this is working
'/signin' => POST request,respond with success or fail
'/register' => POST request,returns new user object
'/profile/:userId' => GET request,return user
'/image' => PUT,user exists there is an update on user profile,return updated info

*/