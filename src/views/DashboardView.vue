<template>
  <section class="dashboard-view-component section">
    <div class="box">
      <div style="display:flex; justify-content: space-between">
      <h1 class="is-size-2" >Album Dashboard </h1>
      <button @click="addAlbum()" class="button has-background-primary has-text-white">Add new Album</button>
      </div>
      <article class="" v-for="album in cmpAlbumItem" :key="album.id" @click="toAlbum(album.id)">
        <div class="box m-2 item" v-if="userConnected.id == album.author">
          <div >
            <h2>{{ album.title }}</h2>
            <h3>{{ album.id }}</h3>
          </div>
          <div>
            <font-awesome-icon icon="fa-solid fa-trash-can" class="red ml-4"  @click.prevent="deleteAlbum(album.id)"/>
          </div>
        </div>
      </article>  
    </div>

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
        userConnected: JSON.parse(localStorage.getItem('userinfo')),
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