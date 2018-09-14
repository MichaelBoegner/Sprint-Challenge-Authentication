const axios = require('axios');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate } = require('./middlewares');
const db = require('../database/dbConfig');
const jwtKey = require('../_secrets/keys').jwtKey;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const secret = jwtKey;
function generateToken(user) {
    const payload = {
        username: user.username
    };
    const options = {
        expiresIn: '1h',
        jwtid: '123456',
    };
    return jwt.sign(payload, secret, options); 
}

function register(req, res) {
  const credentials = req.body; 
  const hash = bcrypt.hashSync(credentials.password, 10);
  credentials.password = hash; 
  
  db('users')
      .insert(credentials)
      .then(ids => {
          const id = ids[0];
      
          db('users')
              .where({id})
              .first()
              .then(user => {
                  const token = generateToken(user); 
                  res.status(201).json({id: user.id, token});
              }) 
              .catch(err => {
                  res.status(500).json({error: "Could not register the given user."})
              })
      })
}

function login(req, res) {
  const credentials = req.body; 

  db('users')
  .where({username: credentials.username})
  .first()
  .then(user => {
      if(user && bcrypt.compareSync(credentials.password, user.password)) {
          const token = generateToken(user); 
          res.status(201).json({token});
      } else {
          res.status(401).json({error: "Authorization not granted!"})}
      }) 
  .catch(err => {
      res.status(500).json({error: "Could not login with the given information."});
  })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
