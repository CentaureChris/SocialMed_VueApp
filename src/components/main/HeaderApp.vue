<template>
  <header class="header-app-component section">
      <div id="logout-login_button" v-if="cmpUserinfo">
      Logged as: {{ cmpUserinfo.name }}

        <button 
          
          class="button"
          v-text="`Logout`"
          @click.prevent="$emit('onLogout', true)"
       />

      </div>
      <!-- 
        [LINK] Never use <a>
        To define a basic link use the <router-link> directive has below

        <router-link :to="{ name: 'HomeView' }" >Home</router-link>
        <router-link :to="{ name: 'DashboardView' }" >Dashboard</router-link>
        <router-link :to="{ name: 'SnapshootView' }" >Snapshoot</router-link>
       -->
  </header>
</template>
<style>
  @import '../../assets/css/header.css';
</style>
<script>
/* 
  [CTRL] App.vue
  Define compoenent controller
*/
  export default {
    name: 'HeaderApp',

    /* 
      [VUE] Props
      Data binding from parent component
    */
      props: {
        userinfo: {
          type: Object,
          required: false,
          default: () => null
        },
        snapshootlist: {
          type: Array,
          required: false,
          default: () => []
        }
      },
    //

    /* 
      [VUE] Computed
      Used to have version of property value
    */
      computed: {
        cmpUserinfo: function(){ return this.userinfo },
        cmpSnapshootlist: function(){ return this.snapshootlist },
      },
    //
  }
//
</script>