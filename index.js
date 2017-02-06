require('dotenv').config();

let express = require('express');
let morgan = require('morgan');
let helmet = require('helmet');
let bodyParser = require('body-parser');

let api = require('./routes/api');

const app = module.exports = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', api);

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('*', (req, res) => res.redirect('/'));

app.listen(port, () => console.info('Ready on http://localhost:' + port));
