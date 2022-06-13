<template>
  <section class="single-view-component section" v-if="cmpAllItem">
    <template v-if="['snapshoot', 'album'].indexOf($route.params.type) != -1">
      <div v-if="$route.params.type === 'snapshoot'">
        <h1 class="is-size-2">Snapshoots View</h1>
        <article class="box"   v-for="item in cmpAllItem" :key="item.id">
          <p class="">{{ item }}</p>
          <button @click="showItem(item.id)">Details</button>
        </article>
      </div>
  
     <div v-if="$route.params.type === 'album'">
        <h1 class="is-size-2">Albums View</h1>
        <article class="box"   v-for="item in cmpAllItem" :key="item.id">
          <p class="">{{ item }}</p>
        </article>
      </div>
        
          <!-- TODO: Display list of album snapshoots
          - Get all lbum snapshoots
          - Generate a loop 'v-for' on snapshoot list
          - Display 'BaseImage' for each snapshoot
          - Link to display single snapshoot
         -->
         
    </template>
    <template v-else>
      <article class="box">
        <h1 class="is-size-2">404</h1>
      </article>
    </template>
  </section> 
</template>

<script>
import { dexieDb } from '@/services/dexie.service'
/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'GlobalView',

    // Used to define properties class
    data(){
      return {
        cmpAllItem: null,
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {
        showItem: function(item){
        this.$router.push({ name: 'SingleView', params: { id: item }})
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
        this.cmpAllItem = this.$route.params.type === 'snapshoot'?await dexieDb.snapshoots.toArray():await dexieDb.albums.toArray();
        if(!this.cmpAllItem){
          this.$router.push({ name: 'DashboardView' })
        }
      //
    }
  }
//
</script>