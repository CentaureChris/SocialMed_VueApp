<!-- 
    TODO: Create 'BasePushAlbum'
    A "Push" component is used to display general item iformation.
    Add HTML tag to:
    - display album title
    - display snapshoot quentity

    Add functionality to:
    - open one single snapshoot in 'SingleView.vue'
 -->

<template>
  <section>
    <article class="box m-4" v-if="cmpSingleItem">
      <h1 class="is-size-2">Title: {{ cmpSingleItem.title }}</h1>
      <p >caption: {{ cmpSingleItem.caption }}</p>
      <small >Author: {{ cmpSingleItem.author }}</small>
      <Snapshoot :data="cmpSingleItem"/>
    </article>
  </section>

  <!-- <div class="modal" :class="{'is-active': showModalFlag}">
    <div class="modal-background"></div>
    <div class="modal-content">
      <button class="delete" aria-label="close" @click="cancelModal">></button>
      <p class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="">
      </p>
    </div>
  </div> -->
</template>

<script>
import { dexieDb } from '@/services/dexie.service'
import Snapshoot from '../components/base/SnapShoot.vue'
/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'BasePushAlbum',

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
      components: {
        Snapshoot
      },
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
    }
  }
//
</script>