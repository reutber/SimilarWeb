const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PlayListRoute = require('././route/playlistRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/playlist', PlayListRoute);

server.listen(8000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
