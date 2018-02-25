const handleSignIn = (req, res, db, bcrypt) => {
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
  }

  module.exports = {
      //  In ES6 we can use this insted of handleProfileGet:handleProfileGet
      handleSignIn
  }