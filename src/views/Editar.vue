<template>Editar{{ $route.params.id }} - {{tarea}}</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
     computed: {
         ...mapState(['tarea'])
     },
     methods: {
         ...mapActions(['setTarea'])
     },
     created(){
         this.setTarea(this.$route.params.id)
     }
};
</script>


<style>
</style>