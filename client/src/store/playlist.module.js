import serviceApi from '../services/serviceApi';

export const ACTIONS = {
  PLAYLIST_FETCH_PAGE_DATA: 'playlist/actions/fetchPagedata',
  ADD_NEW_ITEM: 'playlist/actions/addNewItem',
  REMOVE_ITEM: 'playlist/actions/removeItem',
  POLLING: 'playlist/actions/polling'
};

export const COMMIT = {
  SET_PLAYLIST_DATA: 'playlist/commit/setPlaylistData',
  ADD_NEW_ITEM: 'playlist/commit/AddNewItem',
  REMOVE_ITEM: 'playlist/commit/removeItem'
};

export const GETTERS = {
  GET_PLAYLIST_ITEMS: 'playlist/getters/getPlaylistItems'
};

const delay = async time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
export default {
  state: {
    playlistItems: []
  },
  mutations: {
    [COMMIT.REMOVE_ITEM](state) {
      if (state.playlistItems.length > 0) {
        state.playlistItems.shift();
      }
    },
    [COMMIT.SET_PLAYLIST_DATA](state, { data }) {
      const { playlistItems } = state;
      if (playlistItems.length === 0) {
        state.playlistItems = data;
      } else {
        const lastItem = playlistItems[playlistItems.length - 1];
        const newItems = data.filter(
          item =>
            new Date(item.date).getTime() > new Date(lastItem.date).getTime() //add new items only
        );
        state.playlistItems = [...playlistItems, ...newItems];
      }
    },
    [COMMIT.ADD_NEW_ITEM](state, { videoItem }) {
      const array = state.playlistItems;
      array.push(videoItem);
      state.playlistItems = array;
    }
  },
  actions: {
    [ACTIONS.REMOVE_ITEM]: async ({ commit, getters }) => {
      const items = getters[GETTERS.GET_PLAYLIST_ITEMS];
      const itemToRemove = items[0];
      try {
        await serviceApi.removeItem(itemToRemove);
        commit({
          type: COMMIT.REMOVE_ITEM
        });
      } catch (e) {
        console.log('error to remove item (server error)');
      }
    },
    [ACTIONS.ADD_NEW_ITEM]: async ({ commit }, { videoItem }) => {
      try {
        const { data } = await serviceApi.addVideoItem(videoItem);
        commit({
          type: COMMIT.ADD_NEW_ITEM,
          videoItem: data
        });
      } catch (e) {
        console.log('error to add new item (server error)');
      }
    },
    [ACTIONS.POLLING]: async ({ commit }) => {
      while (true) {
        const { data } = await serviceApi.getPlaylistData();
        commit({
          type: COMMIT.SET_PLAYLIST_DATA,
          data
        });
        await delay(3000);
      }
    },
    [ACTIONS.PLAYLIST_FETCH_PAGE_DATA]: async ({ commit }) => {
      try {
        const { data } = await serviceApi.getPlaylistData();
        commit({
          type: COMMIT.SET_PLAYLIST_DATA,
          data
        });
      } catch (e) {
        console.log('error to get the playlist data from server');
      }
    }
  },
  getters: {
    [GETTERS.GET_PLAYLIST_ITEMS](state) {
      return state.playlistItems;
    }
  }
};
