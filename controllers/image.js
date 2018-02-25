//  Import 'Clarifai' API
const Clarifai = require('clarifai');

//  Clarifai API key 
const app = new Clarifai.App({
  'apiKey': 'e505bb6a9fbe4e65886915c57181243d'
});

const handleAPICall = (req, res) => {
  //  https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection
  app.models.predict(Clarifai.FACE_DETECT_MODEL, //  https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
    req.body.input) //  URL we put in input field
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

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
      handleImage,
      handleAPICall
  }