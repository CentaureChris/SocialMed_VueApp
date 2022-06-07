<template>
  <form action="*" class="base-form-component">
      <p>base-form-component</p>
      
      <BaseCallToAction />
  </form>
</template>


<script>
/* 
  [IMPORT] Modules/components
*/
  import BaseCallToAction from './BaseCallToAction.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'BaseForm',

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