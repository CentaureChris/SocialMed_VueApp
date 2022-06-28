<template>
  <section class="home-view-component section">
    <article 
      class="box column is-three-fifths is-offset-one-fifth"
      v-if="!$store.getters.userinfo"
    >
      <!-- Inject value to child compoenent has a HTML property -->
      <BaseForm 
        class="mb-4 "
        :formvalue="cmpStep === 'login' ? cmpLoginForm : cmpRegisterForm"
        @onSubmit="onSubmit(cmpStep, $event)"
        :displayPass="displayPass" 
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
    <article 
      class="box"
      v-else
    >
      <h1 class="is-size-4">Bienvenue {{ $store.getters.userinfo.name }}</h1>
    </article>
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
/* 
  [IMPORT] Modules/components
*/
  import BaseForm from '../components/base/BaseForm.vue';
  import BaseCallToAction from '../components/base/BaseCallToAction.vue';
  import { dexieDb } from "@/services/dexie.service"
  
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
              name: `email`,
              required: true,
              min: 5,
              value: null
            },
            {
              label: `Password`,
              type: `password`,
              name: `password`,
              required: true,
              min: 5,
              value: null
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
              name: `name`,
              required: true,
              min: 2,
              value: null
            },
            {
              label: `Email`,
              type: `email`,
              name: `email`,
              required: true,
              min: 5,
              value: null
            },
            {
              label: `Password`,
              type: `password`,
              name: `password`,
              required: true,
              min: 5,
              value: null
            },
            {
              label: `Repeate password`,
              type: `password`,
              name: `password-repeat`,
              required: true,
              min: 5,
              value: null
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
        onSubmit: async function(step, event){
          // Check register form
          if( step === 'register' ){
            if( event.password === event['password-repeat'] ){
              // Delete unused property
              delete event['password-repeat'];

              // Use store action
              this.$store.dispatch('registerOperation', event)
              this.$toast.success('Your account have been registered!')
              this.cmpRegisterForm.fieldsets[0].value = null
              this.cmpRegisterForm.fieldsets[1].value = null
              this.cmpRegisterForm.fieldsets[2].value = null
              this.cmpRegisterForm.fieldsets[3].value = null
            }
            else{ 
              this.$toast.error(`Two password fields are not the same!`);
            }  
          }
          else{
            // Use store action
            let users = await dexieDb.users.toArray()
            let match;
            for (let user of users){
              if(user.email == event.email && user.password == event.password){
                this.$store.dispatch('loginOperation', event)
                match = true
                break;
              }else{
                match = false
              }
            }
            if(match == true){
                this.$toast.success("You' re logged in")
            }else{
                this.$toast.error('Your email or password must be incorrect! Please try again.')
            }
          }
        },
        displayPass: function() {
          if(this.cmpStep == 'login'){
            if(this.cmpLoginForm.fieldsets[1].type == 'password'){
              this.cmpLoginForm.fieldsets[1].type = 'text'
            }else{
              this.cmpLoginForm.fieldsets[1].type = 'password'
            }
          }else{
            if(this.cmpRegisterForm.fieldsets[2].type ===  'password'){
              this.cmpRegisterForm.fieldsets[2].type = 'text'
              this.cmpRegisterForm.fieldsets[3].type = 'text'
            }else{
              this.cmpRegisterForm.fieldsets[2].type = 'password'
              this.cmpRegisterForm.fieldsets[3].type = 'password'
            }
          }

          
        }
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