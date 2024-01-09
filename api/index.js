const express = require('express');
const bodyParser = require('body-parser');
const appRouter = require('./routers');
const { errorResponseHandler, boomErrorHandler } = require('./middlewares/error.handler');

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(bodyParser.json());
appRouter(server);
server.use(boomErrorHandler);
server.use(errorResponseHandler);

server.listen(PORT, () => {
  console.log('Listening on port: ' + PORT)
});
