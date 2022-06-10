<template>
  <section class="single-view-component section" v-if="cmpSingleItem">
    
     <p>{{ cmpSingleItem }}</p>
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
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {},
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
        this.cmpSingleItem = await dexieDb.snapshoots.get( +this.$route.params.id );
        if(!this.cmpSingleItem){
          this.$router.push({ name: 'DashboardView' })
        }
      //
    }
  }
//
</script>