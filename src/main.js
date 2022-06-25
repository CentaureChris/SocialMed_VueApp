/* 
    [IMPORTS] Vue.js
    Import main modules to define App
*/
    // Vue imports
    import { createApp } from 'vue';

    // App imports
    import App from './App.vue';
    import Appstore from './store/index'
    import Approuter from './router';
    import Toaster from '@meforma/vue-toaster'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faEye } from '@fortawesome/free-solid-svg-icons'
    /* import font awesome icon component */
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(faEye)

//

/* 
    [APP] Launch
    Init new Vue.js App
*/
    createApp(App)
    .use( Appstore ) //=> Inject Appstore has a middleware
    .use( Approuter ) //=> Inject AppRouter has a middleware
    .use(Toaster,{
        position: 'top-right'
    })
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#insta-clone-app-vue');
//