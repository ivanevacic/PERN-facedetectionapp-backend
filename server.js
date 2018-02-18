const express = require('express');
//  Create app buy running express
const app = express();

app.get('/', (req, res)=>{
  res.send('this is working');
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