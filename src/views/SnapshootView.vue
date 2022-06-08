<template>
  <section class="snapshoot-view-component">
      <p>snapshoot-view-component</p>
      <!-- 
        Add from to save new snapshoot
        - title: required, min 5
        - caption
        - UUID => generate with uuidv4
        - base64 (for image) (TODO: add dexie)
      -->
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

    data(){
      return {
        // Form values
      }
    },

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