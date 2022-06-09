<template>
  <section class="snapshoot-view-component section">
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

      <!-- Inject value to child compoenent has a HTML property -->
      <article class="box">
        <BaseForm 
          class="mb-4"
          :formvalue="cmpSnapshootForm"
          @onSubmit="onSubmit($event)"
        />
      </article>
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
        // Dispatch store action
        this.$store.dispatch('pushSnapshootOperation', event)
      },
    }
  }
//
</script>