const { assert } = require('chai');
const Playlist = require('./Playlist');

describe('Playlist', function() {
  it('should add new item to list', async () => {
    const playlist = new Playlist();
    const newItem = await playlist.addNewItem({ id: 'f77SKdyn-1Y' });
    assert.lengthOf(playlist.playList, 1);
  });

  it('should remove item from list', async () => {
    const playlist = new Playlist();
    const newItem = await playlist.addNewItem({ id: 'f77SKdyn-1Y' });
    assert.lengthOf(playlist.playList, 1);
    playlist.removeItem({ date: newItem.date });
    assert.lengthOf(playlist.playList, 0);
  });
});
