<template>
  <header class="header-app-component">
      <p>header-app-component</p>

      <BaseCallToAction />

      <!-- 
        [LINK] Never use <a>
        To define a basic link use the <router-link> directive has below

        <router-link :to="{ name: 'HomeView' }" >Home</router-link>
        <router-link :to="{ name: 'DashboardView' }" >Dashboard</router-link>
        <router-link :to="{ name: 'SnapshootView' }" >Snapshoot</router-link>
       -->
  </header>
</template>

<script>
/* 
  [IMPORT] Modules/components
*/
  import BaseCallToAction from '../base/BaseCallToAction.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'HeaderApp',

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseCallToAction
      }
    //
  }
//
</script>