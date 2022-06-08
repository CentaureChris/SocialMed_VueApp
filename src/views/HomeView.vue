<template>
  <section class="home-view-component section">
    <article class="box">
      <!-- Inject value to child compoenent has a HTML property -->
      <BaseForm 
        class="mb-4"
        :formvalue="cmpStep === 'login' ? cmpLoginForm : cmpRegisterForm"
      />

      <!-- Bind DOM event: @Event -->
      <BaseCallToAction 
        :item="{
          type: `button`,
          content: 
            cmpStep === 'login'
            ? `Don't have an account? Create one now.`
            : `Got an account? Go to login.`,
          isfull: false,
          isprimary: false,
          action: cmpStep === 'login' ? 'register' : 'login'
        }"
        @onClick="cmpStep = $event"
      />
    </article>
  </section>
</template>

<script>
/* 
  [IMPORT] Modules/components
*/
  import BaseForm from '../components/base/BaseForm.vue';
  import BaseCallToAction from '../components/base/BaseCallToAction.vue';
//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'HomeView',

    // Used to define properties class
    data(){
      return {
        // Basic values
        cmpStep: 'login',

        // Form values
        cmpLoginForm: {
          title: `Connect to your account`,
          submit: `Login`,
          fieldsets: [
            {
              label: `Email`,
              type: `email`,
              required: true,
              min: 5,
            },
            {
              label: `Password`,
              type: `password`,
              required: true,
              min: 5,
            }
          ]
        },
        cmpRegisterForm: {
          title: `Create your account`,
          submit: `Register`,
          fieldsets: [
            {
              label: `Name`,
              type: `text`,
              required: true,
              min: 2,
            },
            {
              label: `Email`,
              type: `email`,
              required: true,
              min: 5,
            },
            {
              label: `Password`,
              type: `password`,
              required: true,
              min: 5,
            },
            {
              label: `Repeate password`,
              type: `password`,
              required: true,
              min: 5,
            }
          ]
        }
      }
    },

    /* 
      [VUE] Methods
      Used to add functionnalies
    */
      methods: {
        onSubmit: function(event){
          /* 
            - Call 'onSubmit' methof on each form
            - Check event to login or register user
          */
          console.log('[DEBUG] onSubmit()', event)
        },
      },
    //

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        BaseForm, BaseCallToAction
      }
    //
  }
//
</script>