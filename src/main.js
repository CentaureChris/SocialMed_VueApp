/* 
    [IMPORTS] Vue.js
    Import main modules to define App
*/
    // Vue imports
    import { createApp } from 'vue';

    // App imports
    import App from './App.vue';
    import Approuter from './router';
//

/* 
    [APP] Launch
    Init new Vue.js App
*/
    createApp(App)
    .use( Approuter ) //=> Inject AppRouter has a middleware
    .mount('#insta-clone-app-vue');
//