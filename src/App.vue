<template>
  <div id="app" class="app-shell-component">
    
    <ScaleRotate>
        <router-link :to="{ name: 'HomeView' }" class="nav-item">Home</router-link>
        <router-link :to="{ name: 'DashboardView' }" class="nav-item">Dashboard</router-link>
    </ScaleRotate>

    <main id="page-wrap">
    <!-- Header -->
    <HeaderApp 
      :userinfo="$store.getters.userinfo"
      :snapshootlist="$store.getters.snapshootlist"
      @onLogout="onLogout"
    >
    
    </HeaderApp>

    <!-- 
      TODO: Create 'BaseFlashnote.vue'
      A flashnote is a modal that display success and error messages
      - Find a way to automaticaly display error message if:
        - User login error
        - User registration error: email MUST be unique
      - Find a way to automaticaly display success message if:
        - User is correctly connected
        - Album is created
    -->

    <!-- Main -->
      <!-- User router-view directive -->
      <router-view
        v-slot="{ Component }"
        :key="$route.name"
      >
        <!-- Inject path component in a "component" directive -->
        <component :is="Component" :snapshootlist="$store.getters.snapshootlist"/>
      </router-view>

    <!-- Footer -->
    <FooterApp />
    </main>

  </div>
</template>

<style>
  #insta-clone-app-vue{height: 100vh}
</style>

<script>
/* 
  TODO: Connected/not connected
  If a user is connected, the 'HomeView' is not usefull, the dashboard must be the home for a connected user
  - Find a way to display 'DashboardView' if the user is connected
*/

/* eslint-disable no-unused-vars */
/* 
  [IMPORT] Modules/components
*/
  import { dexieDb } from './services/dexie.service';
  import { ScaleRotate } from 'vue3-burger-menu'  // import the CSS transitions you wish to use, in this case we are using `ScaleRotate`
  import HeaderApp from './components/main/HeaderApp.vue';
  import FooterApp from './components/main/FooterApp.vue';

//

/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'App',

    /* 
      [VUE] Component
      Used to inject child components
    */
      components: {
        HeaderApp, FooterApp, ScaleRotate
      },

      // Used to define properties class
      data(){
        return {}
      },

      methods: {
        onLogout: function(event){
          // Save value in the store
          this.$store.dispatch('logoutOperation', event)
        },
      },

      created: function(){
        // Subscribe to store mutations
        this.$store.subscribe( mutations => {
          // Switch mutation
          switch( mutations.type ){
            case 'userinfo': 
              if( !mutations.payload.data ) this.$router.push({ name: 'HomeView' })
              break;
            
            default: break;
          }
        })
      },

      mounted: function(){}
    //
  }
//
</script>

<!-- Import CSS -->
<style src="@/assets/css/main.css"></style>
<style src="@/assets/css/transition.css"></style>