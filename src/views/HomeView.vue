<template>
  <section class="home-view-component">
      <p>home-view-component</p>

      <!-- Display login form -->
      <BaseForm />

      <!-- Display register form -->
      <BaseForm />
  </section>
</template>

<script>
/* 
  [IMPORT] Modules/components
*/
  import BaseForm from '../components/base/BaseForm.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'HomeView',

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseForm
      }
    //
  }
//
</script>