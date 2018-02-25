const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
      .increment('entries', 1)  //  Increment 
      .returning('entries')
      .then(entries => {
        //  Array because we get array returned(only one,so index is zero)
        res.json(entries[0]);
      })
      .catch(err => res.status(400).json('Unable to get entries'));
  }

  module.exports = {
      handleImage
  }