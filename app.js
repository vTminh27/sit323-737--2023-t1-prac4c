const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Define JWT options and strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'MKEY' 
};

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  if (jwt_payload.username === 'minh') {
    done(null, { username: 'minh' });
  } else {
    done(null, false);
  }
}));

// Define route handlers with authentication and authorization middleware
app.get('/add/:num1/:num2', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Perform addition 
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Invalid input parameters');
  } else {
    const result = num1 + num2;
    res.send(`${result}`);
  }
});

app.get('/subtract/:num1/:num2', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Perform subtraction
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Invalid input parameters');
  } else {
    const result = num1 - num2;
    res.send(`${result}`);
  }
});

app.get('/multiply/:num1/:num2', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Perform multiplication
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Invalid input parameters');
  } else {
    const result = num1 * num2;
    res.send(`${result}`);
  }
});

app.get('/divide/:num1/:num2', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Perform division
  const num1 = Number(req.params.num1);
  const num2 = Number(req.params.num2);
  if (isNaN(num1) || isNaN(num2)) {
    res.status(400).send('Invalid input parameters');
  } else if (num2 === 0) {
    res.status(400).send('Cannot divide by zero');
  } else {
    const result = num1 / num2;
    res.send(`${result}`);
  }
});

// Generate JWT token
const token = jwt.sign({ username: 'minh' }, jwtOptions.secretOrKey, { expiresIn: '1h' });

app.listen(3000, () => {
  console.log(`Server is running on port 3000. Here is the JWT token for authentication: ${token}`);
});
