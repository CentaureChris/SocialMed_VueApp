<!-- 
TODO: Display list of albums
- Get album list from the store
- Generate a loop 'v-for' on album list
- Display a child compoenent 'BasePushAlbum.vue':
- title
- nombers of snapshoots
- link to display album
-->
<template>
  <section class="dashboard-view-component section">
    <h1 class="is-size-2">Dashboard view</h1>
    <article>
      <a @click="toSnapshootList()">
        <ul >
          <li class="box" v-for="album in cmpAlbumItem" :key="album.id">
            <p>{{ album.title }}</p>
            <p>{{ album.author }}</p>
          </li>
        </ul>
      </a>
    </article>
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
import { dexieDb } from '@/services/dexie.service'

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

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {},
    //
    mounted: async function(){
    this.cmpAlbumItem = await dexieDb.albums.toArray()
    // console.log(this.cmpAlbumItem)
    },

    methods: {
      toSnapshootList: function(type){
        this.$router.push('/add/snapshoot')
      }
    }
  }
//
</script>