const handleRegister = (req, res, db, bcrypt) => {
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
  }

  module.exports = {
      //  In ES6 we can use this insted of handleProfileGet:handleProfileGet
    handleRegister
  };