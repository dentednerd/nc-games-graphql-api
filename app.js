const express = require('express');
const cors = require('cors');
const graphqlRouter = require('./server');
const {
  handle404s,
  handle500s,
  handleCustomErrors,
  handlePSQLErrors
} = require('./server/errors');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use('/', graphqlRouter);
app.all("/*", handle404s);
app.use(handleCustomErrors);
app.use(handlePSQLErrors);
app.use(handle500s);

module.exports = app;
