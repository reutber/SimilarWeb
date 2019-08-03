<template>
  <div class="container-playlist">
    <div class="playlist-form">
      <div class="form">
        <input
          class="url-input"
          v-model="newItem.url"
          v-on:keyup.enter="handleAddNewItem"
          placeholder="Enter Video Id"
        />
        <button @click="handleAddNewItem" :disabled="!enableSubmitButton">Add</button>
      </div>
      <ul class="playlist">
        <li v-for="video in videoPlayList" :key="video.date">
          <play-list-item :video="video" />
        </li>
      </ul>
    </div>
    <youtube
      :video-id="firstVideo.id"
      :player-vars="playerVars"
      ref="youtube"
      v-show="renderComponent"
    ></youtube>
  </div>
</template>
<script>
import * as PLAYLIST_STORE from "../store/playlist.module.js";
import PlayListItem from "./PlayListItem";

export default {
  data() {
    return {
      newItem: {
        url: "",
        title: null,
        id: "",
        duration: null,
        date: null
      },
      playerVars: {
        autoplay: 1
      },
      renderComponent: true
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.addEnventOnVideoEnded();
  },
  beforeDestroy() {
    this.removeEnventOnVideoEnded();
  },
  methods: {
    play() {
      this.$refs.youtube.player.playVideo();
    },
    //This is a workaround, I used youtube component
    //which had issue to Play in sequence (the same video) - since it watch the videoId prop and only when
    //videoId changed it start to play the video. (according to playerVars config)
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
        this.play();
      });
    },
    fetchData() {
      this.$store.dispatch({ type: PLAYLIST_STORE.ACTIONS.POLLING });
    },
    handleAddNewItem() {
      if (this.newItem && this.newItem.url.length > 0) {
        this.newItem.id = this.$youtube.getIdFromUrl(this.newItem.url);
        this.$store.dispatch({
          type: PLAYLIST_STORE.ACTIONS.ADD_NEW_ITEM,
          videoItem: this.newItem
        });
      }
    },
    ended(event) {
      if (event.data === YT.PlayerState.ENDED) {
        this.$store.dispatch({ type: PLAYLIST_STORE.ACTIONS.REMOVE_ITEM });
        this.forceRerender();
      }
    },
    addEnventOnVideoEnded() {
      this.$refs.youtube.player.addEventListener("onStateChange", this.ended);
    },
    removeEnventOnVideoEnded() {
      this.$refs.youtube.player.removeEventListener(
        "onStateChange",
        this.ended
      );
    },
    getEmptyItem() {
      return {
        url: "",
        id: "",
        title: "",
        duration: null,
        date: null
      };
    }
  },
  computed: {
    videoPlayList() {
      return this.$store.getters[PLAYLIST_STORE.GETTERS.GET_PLAYLIST_ITEMS];
    },
    firstVideo() {
      return this.videoPlayList[0]
        ? this.videoPlayList[0]
        : this.getEmptyItem();
    },
    enableSubmitButton() {
      return this.newItem && this.newItem.url.length > 0;
    }
  },
  components: {
    PlayListItem
  }
};
</script>
<style lang="scss" scoped>
.container-playlist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 10px 20px;
  .playlist {
    overflow: auto;
    flex: 1;
    border: 1px solid black;
    list-style: none;
    padding-left: 0;
    li {
      list-style-type: none;
      padding-left: 0;
    }
  }
  .playlist-form {
    border: 1px solid black;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    width: 40%;
    margin-right: 40px;
    height: 80%;
    .form {
      padding: 10px 10px;
      margin-bottom: 16px;
      display: flex;
      .url-input {
        flex: 1;
        margin-right: 10px;
      }
    }
  }
}
</style>