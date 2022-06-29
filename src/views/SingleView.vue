<template>
    <section class="box m-4" v-if="cmpSingleItem">
      <font-awesome-icon id="displayBtn" :icon="icon" @click="changeDisplay"/>
      <div class="box-head">
        <h1 class="title is-size-2">Title: {{ cmpSingleItem.title }} </h1>
        <button @click="toAddSnapshoot(cmpSingleItem.id)" class="button has-background-primary has-text-white">Add Snapshoot</button>
      </div>
      <small >Author: {{ cmpSingleItem.author }}</small>
      <div :class="display" class="item-list">
        <div v-for="snap in cmpAllSnap" :key="snap.id" >
          <div class="box m-4 item column" v-if="snap.album === $route.params.id">
            <div style="display: block; margin-left: auto; margin-right: auto" @click="toSnapshoot(snap.id)">
              <h2 class="is-size-4"> {{ snap.title }} </h2> 
              <img :src="snap.capture" alt="">
              <p><small class=""> {{ snap.caption }} </small></p>
              <!-- <p class="is-size-6"> {{ snap.author }} </p> -->
            </div>
            <div>
              <font-awesome-icon icon="fa-solid fa-trash-can" class="red" @click.prevent="deleteSnapshoot(snap.id)"/>
            </div>
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
        display:'columns is-multiline',
        icon: 'fa-solid fa-table-list'
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {
        changeDisplay: function(){
          if(this.display == "columns is-multiline"){
            this.display = "";
            this.icon = "fa-solid fa-table-cells-large"

          }else{
            this.display = "columns is-multiline";
            this.icon = "fa-solid fa-table-list"
          }
        },
        toSnapshoot: function(id){
          this.$router.push({name: "BasePushAlbum", params: { id: id}})
        },
        toAddSnapshoot: function(id){
          this.$router.push({name: 'CreateView', params:{type: 'snapshoot', id:id}})
        },
        deleteSnapshoot: function (snapid){
          if(confirm('confirm delete')){
            dexieDb.snapshoots.delete(snapid)
            this.$toast.error('snapshoot deleted')
            this.$router.go()
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

        this.cmpAllSnap = await dexieDb.snapshoots.toArray();

        this.cmpSingleItem = await dexieDb.albums.get( +this.$route.params.id );
        if(!this.cmpSingleItem){
          this.$router.push({ name: 'DashboardView' })
        }

      //
    }
  }
//
</script>