const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const app = express();
const bodyParse = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 8888;
const production = process.env.NODE_ENV;
const rfs = require('rotating-file-stream');
const path = require('path');

const accessStream = rfs.createStream('access.log', {
  interval: '1d',
  path: path.join(__dirname, 'log'),
});

app.use(helmet());
app.use(production === 'production' ? morgan('combined', { stream: accessStream }) : morgan('dev'));
app.use(cors());
app.use(bodyParse.json());
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.send('Welcome!');
});
app.use('/api', require('./routes/index'))

app.listen(PORT, function () {
  console.log(`Rest app back-end listen on port: http://localhost:${PORT}`);
});
