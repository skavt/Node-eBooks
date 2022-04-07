require('dotenv').config();

const logger = require('./logger');
const routes = require('./routes');

const http = require('http');
const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const db = require('./db');


logger.info('Starting HTTP Server');
const server = http.createServer(app);

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bearerToken());
app.use('/', routes);

const port = parseInt(process.env.API_PORT) || 3000
server.listen(port);
logger.info(`Listening on *:${port}`);