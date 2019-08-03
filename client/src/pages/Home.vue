<template>
    <div><PlayList/></div>
</template>
<script>
import PlayList from '../components/PlayList'

export default { 
    name: 'Home',       
    methods:{
       
    },      
    components:{
        PlayList
    }
}
</script>
<style>

 html,body {
    overflow: hidden;
    margin: 0;  
    height: 100%; 
}
</style>