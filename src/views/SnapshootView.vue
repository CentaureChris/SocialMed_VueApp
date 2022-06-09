<template>
  <section class="snapshoot-view-component section">
      <!-- 
        Add from to save new snapshoot
        - title: required, min 5
        - caption
        - UUID => generate with uuidv4
        - base64 (for image) (TODO: add dexie)
      -->
      <!-- Inject value to child compoenent has a HTML property -->
      <article class="box">
        <BaseForm 
          class="mb-4"
          :formvalue="cmpSnapshootForm"
          @onSubmit="onSubmit($event)"
        />
      </article>
      <BaseImage />
  </section>
</template>

<script>
/* 
  [IMPORT] Modules/components
*/
  import BaseImage from '../components/base/BaseImage.vue';
  import BaseForm from '../components/base/BaseForm.vue';
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
        BaseImage, BaseForm
      },
    //

    data(){
      return {
        // Form values
        cmpSnapshootForm: {
          title: `Add new snapshoot`,
          submit: `Save`,
          fieldsets: [
            {
              label: `Title`,
              type: `text`,
              name: `title`,
              required: true,
              min: 5,
              value: null
            },
            {
              label: `Caption`,
              type: `text`,
              name: `caption`,
              required: false,
              min: false,
              value: null
            }
          ]
        },
      }
    },

    methods: {
      // Define method to bind form 'submit' event
      onSubmit: function(event){
        console.log('[DEBUG] SnapshootView onSubmit()', event)
      },
    }
  }
//
</script>