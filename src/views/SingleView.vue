<template>
    <section class="box m-4" v-if="cmpSingleItem">
      <div class="title">
        <h1 class="is-size-2">Title: {{ cmpSingleItem.title }} </h1><button @click="toAddSnapshoot(cmpSingleItem.id)" class="button has-background-primary has-text-white">Add Snapshoot</button>
      </div>
      <small >Author: {{ cmpSingleItem.author }}</small>

        <div v-for="snap in cmpAllSnap" :key="snap.id" @click="toSnapshoot(snap.id)">
          <div class="box m-2 item" v-if="snap.album === $route.params.id">
            <div>
              <h2 class="is-size-4"> {{ snap.title }} </h2> 
              <p class="is-size-5"> {{ snap.caption }} </p>
              <p class="is-size-6"> {{ snap.author }} </p>
            </div>
            <div>
              <button class="deletebtn button" @click.prevent="deleteSnapshoot(snap.id)">Delete</button>
            </div>
          </div>
        </div>
    </section>
</template>

<style>
  @import '../assets/css/dashboard.css';
</style>

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
        },
        deleteSnapshoot(snapid){
          if(confirm('confirm delete')){
            dexieDb.snapshoots.delete(snapid)
          }
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