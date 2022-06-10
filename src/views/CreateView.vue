<template>
  <section class="snapshoot-view-component section">
      <template v-if="$route.params.type === 'snapshoot'">
        <article class="box">
          <BaseForm 
            class="mb-4"
            :formvalue="cmpSnapshootForm"
            @onSubmit="onSubmit($event)"
          />
        </article>
      </template>
      <template v-if="$route.params.type === 'album'">
        <article class="box">
          <BaseForm 
            class="mb-4"
            :formvalue="cmpAlbumForm"
            @onSubmit="onSubmit($event)"
          />
        </article>
      </template>
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
    name: 'SnapshootView',

     /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseForm
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
        cmpAlbumForm: {
          title: `Add new album`,
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
          ]
        },
      }
    },

    methods: {
      // Define method to bind form 'submit' event
      onSubmit: function(event){
        if( this.$route.params.type === 'snapshoot' ){
          // Dispatch store action
          this.$store.dispatch('pushSnapshootOperation', event)
        }
        else if( this.$route.params.type === 'album' ){
          // Add user id
          event.author = this.$store.getters.userinfo.id;
          
          // Dispatch store action
          this.$store.dispatch('saveAlbumOperation', event)
        }
      },
    }
  }
//
</script>