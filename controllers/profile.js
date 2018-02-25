const handleProfileGet = (req, res, db) => {
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
  }

module.exports = {
    //  In ES6 we can use this insted of handleProfileGet:handleProfileGet
    handleProfileGet
}