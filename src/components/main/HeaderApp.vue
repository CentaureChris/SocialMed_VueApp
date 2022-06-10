<template>
  <header class="header-app-component section">
      <p
        v-if="!$store.getters.userinfo"
      >
        header-app-component: is not connected
      </p>
      
      <p 
        v-else
      >
        <button 
          class="button"
          v-text="`Logout`"
          @click.prevent="$emit('onLogout', true)"
       />
      </p>

      <p 
        v-if="$store.getters.snapshootlist.length"
      >
        Nombre de photos <b>{{$store.getters.snapshootlist.length}}</b>
      </p>

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
      }
    //
  }
//
</script>