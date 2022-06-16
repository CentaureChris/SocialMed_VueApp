<template>
  <section>
    <article class="box m-4" v-if="cmpSingleItem">
      <h1 class="is-size-2">Title: {{ cmpSingleItem.title }} <button @click="toAddSnapshoot(cmpSingleItem.id)">Add Snapshoot</button></h1>
      
      <small >Author: {{ cmpSingleItem.author }}</small>
      <ul>
        <li v-for="snap in cmpAllSnap" :key="snap.id" @click="toSnapshoot(snap.id)">  
          <p class="box m-2" v-if="snap.album === $route.params.id"> {{ snap }} </p>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import { dexieDb } from '@/services/dexie.service'
/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'SingleView',

    // Used to define properties class
    data(){
      return {
        cmpSingleItem: null,
        cmpAllSnap: null,
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {
        toSnapshoot: function(id){
          this.$router.push({name: "BasePushAlbum", params: { id: id}})
        },
        toAddSnapshoot: function(id){
          this.$router.push({name: 'CreateView', params:{type: 'snapshoot', id:id}})
        }
      },
    //

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {},
    //

    mounted: async function(){
      /* 
        [DEXIE] Save
        Save API response in Dexie
      */
        // Save new snapshot in IndexDB with Dexie.js
        this.cmpSingleItem = await dexieDb.albums.get( +this.$route.params.id );
        if(!this.cmpSingleItem){
          this.$router.push({ name: 'DashboardView' })
        }
        this.cmpAllSnap = await dexieDb.snapshoots.toArray();
      //
    }
  }
//
</script>