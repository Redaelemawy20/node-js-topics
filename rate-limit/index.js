const express = require('express');
const expressRateLimit = require('express-rate-limit');

const app = express();

const rateLimiter = expressRateLimit({
  max: 3,
  windowMs: 10 * 1000,
  message: 'Too many requests, try after 10 second',
});
// app.use(rateLimiter); // apply it globally

app.get('/api', (req, res) => {
  res.send('hello');
});
app.get('/api/secure/', rateLimiter, (req, res) => {
  res.send('this is secure route');
});

app.listen(3000, () => {
  console.log('app rate limit is running ');
});
