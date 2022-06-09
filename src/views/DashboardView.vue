<template>
  <section class="dashboard-view-component section">
      <!-- Display list of snapshoot -->
      <ul>
        <li 
          class="mb-4 box"
          v-for="(item, idx) in $store.getters.snapshootlist" 
          :key="`item-${idx}`"
        >
            {{ item }}
          <BaseImage />
        </li>
      </ul>
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