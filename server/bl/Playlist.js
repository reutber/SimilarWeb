const axios = require('axios');
const helper = require('./helper');

//todo move key to environment variables
const GOOGLE_URL =
  'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&key=AIzaSyAaPadyhJ6yWeTLMLjbWL-RmN68RTxJj88';

class PlayList {
  constructor() {
    this.playlist = [];
  }

  get playList() {
    return this.playlist;
  }

  removeItem(item) {
    const index = this.playlist.findIndex(
      videoItem =>
        new Date(videoItem.date).getTime() === new Date(item.date).getTime()
    );
    if (index > -1) {
      this.playlist.splice(index, 1);
    }
  }

  async addNewItem(item) {
    try {
      const { data } = await this.getVideoDetailes(item.id);
      const { snippet, contentDetails } = data.items[0];
      const title = snippet.title;
      let secounds = helper.convert_time(contentDetails.duration);
      const duration = helper.secoundsToHHMMSS(secounds);
      const newItem = { ...item, title, duration, date: new Date() };
      this.playlist.push(newItem);

      return newItem;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  getVideoDetailes(id) {
    const url = `${GOOGLE_URL}&id=${id}`;
    return axios.get(url);
  }
}

module.exports = PlayList;
