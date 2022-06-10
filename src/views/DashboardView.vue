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
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-unused-components */
/* 
  [IMPORT] Modules/components
*/
  import BaseImage from '../components/base/BaseImage.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'DashboardView',

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseImage
      }
    //
  }
//
</script>