<!-- 
TODO: Display list of albums
✅ - Get album list from the store
✅ - Generate a loop 'v-for' on album list
✅ - Display a child compoenent 'BasePushAlbum.vue':
✅ - title
- nombers of snapshoots
✅ - link to display album
-->
<template>
  <section class="dashboard-view-component section">
    <h1 class="is-size-2" >Album Dashboard <button @click="addAlbum()">Add new Album</button></h1>
    <article class="box item" v-for="album in cmpAlbumItem" :key="album.id" @click="toAlbum(album.id)">
      <div >
        <h2>{{ album.title }}</h2>
        <h3>{{ album.id }}</h3>
        <!-- <p >{{ cmpSnapshootlist.length }}</p> -->
      </div>
      <div>
        <button class="deletebtn button" @click.prevent="deleteAlbum(album.id)">Delete</button>
      </div>
    </article>  
  </section>
</template>


<script>
import { dexieDb } from '@/services/dexie.service'
/* eslint-disable no-unused-vars */

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'DashboardView',

    data() {
      return {
        cmpAlbumItem: null,
      }
    },

    methods: {
      toAlbum: function(id) {
        this.$router.push({name: "SingleView", params: {id: id}})
      },
      addAlbum: function(){
        this.$router.push({name: "CreateView", params:{type: "album", id: 1}})
      },
      deleteAlbum: function(albumId){
        if(confirm('confirm delete')){
          dexieDb.albums.delete(albumId)
        }
      }
    },

    mounted: async function(){
      /* 
        [DEXIE] Save
        Save API response in Dexie
      */
        // Save new snapshot in IndexDB with Dexie.js
        this.cmpAlbumItem = await dexieDb.albums.toArray();
     },
    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {},
    //
  }
//
</script>


<style>
  @import '../assets/css/dashboard.css';
</style>