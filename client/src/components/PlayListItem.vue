<template>
  <div class="playlist-item">
    <div class="title">{{video.title}}</div>
    <div> {{video.duration}}</div>
    </div>
</template>

<script> 
export default {
  props: ['video'] 
}
</script>
<style>
.playlist-item{
    padding: 10px 20px;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
}
.title {
  margin-right: 16px
}

</style>