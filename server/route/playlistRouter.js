const express = require('express');
const PlaylistRouter = express.Router();
const Playlist = require('../bl/Playlist');

const playlist = new Playlist();

PlaylistRouter.route('/').post(async (req, res) => {
  const newItem = req.body;
  const result = await playlist.addNewItem(newItem);
  if (result === false) {
    res.status(500);
  }
  res.json(result);
});

PlaylistRouter.route('/').get((req, res) => {
  res.json(playlist.playlist);
});

PlaylistRouter.route('/').delete((req, res) => {
  const itemToRemove = req.body;
  playlist.removeItem(itemToRemove);
  res.send();
});

module.exports = PlaylistRouter;
