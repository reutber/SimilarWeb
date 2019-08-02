import playlist from './playlist.module';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    playlist: playlist
  }
});

export default store;
