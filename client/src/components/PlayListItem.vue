<template>
  <div class="playlist-item">
    <div class="title" v-bind:title="video.title">{{video.title}}</div>
    <div>{{video.duration}}</div>
  </div>
</template>

<script>
export default {
  props: ["video"]
};
</script>
<style lang="scss">
.playlist-item {
  padding: 10px 20px;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-between;
  .title {
    margin-right: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>