<template>
  <div class="app-shell-component">
    <!-- Header -->
    <HeaderApp />

    <!-- Main -->
    <main>
      <!-- User router-view directive -->
      <router-view
        v-slot="{ Component }"
        :key="$route.name"
      >
        <!-- Inject path component in a "component" directive -->
        <component :is="Component" />
      </router-view>
    </main>

    <!-- Footer -->
    <FooterApp />
  </div>
</template>

<script>
/* 
  [IMPORT] Modules/components
*/
  import DexieDb from './services/dexie.service';
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
        HeaderApp, FooterApp
      },

      // Used to define properties class
      data(){
        return {
          cmpDexieDb: new DexieDb('insta-clone'),
        }
      },

      mounted: async function(){
        // Create Dexie collection (table) for users
        await this.cmpDexieDb.setIndexDbTable( 1, 'users', [ 'name', 'email', 'password' ] );
        await this.cmpDexieDb.setIndexDbTable( 1, 'snapshoots', [ 'title', 'caption', 'base64' ] );
      }
    //
  }
//
</script>

<!-- Import CSS -->
<style src="@/assets/css/main.css"></style>
<style src="@/assets/css/transition.css"></style>