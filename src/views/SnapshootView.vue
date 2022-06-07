<template>
  <section class="snapshoot-view-component">
      <p>snapshoot-view-component</p>

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
    name: 'SnapshootView',

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