<template>
  <section class="dashboard-view-component">
      <p>dashboard-view-component</p>

      <BaseImage />
  </section>
</template>

<script>
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