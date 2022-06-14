<template>
  <section class="dashboard-view-component section">
      <!-- 
        TODO: Display list of albums
        - Get album list from the store
        - Generate a loop 'v-for' on album list
        - Display a child compoenent 'BasePushAlbum.vue':
          - title
          - nombers of snapshoots
          - link to display album 
      -->
      <h1 class="is-size-2" >Album Dashboard</h1>
      <article class="box" v-for="album in cmpAlbumItem" :key="album.id" @click="toAlbum(album.id)">
        <h2>{{ album.title }}</h2>
        <h3>{{ album.id }}</h3>
      </article>
  </section>
</template>

<script>
import { dexieDb } from '@/services/dexie.service'

/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
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
      components: {}
    //
  }
//
</script>