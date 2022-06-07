/* 
    [IMPORTS] Vue.js
    Import main modules to define router
*/
    import { createRouter, createWebHistory } from 'vue-router'
//

/* 
    [ROUTER] Paths
    Define a array of objects to configure router paths
*/
    const routerPaths = [
        {
            path: '/',
            name: 'HomeView',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/dashboard',
            name: 'DashboardView',
            component: () => import('../views/DashboardView.vue')
        },
        {
            path: '/snapshoot',
            name: 'SnapshootView',
            component: () => import('../views/SnapshootView.vue')
        }
    ];
//

/* 
    [ROUTER] Define
    Create new router with ve-router module
*/
    const AppRouter = createRouter({
        routes: routerPaths,
        history: createWebHistory(),
    })
//

/* 
    [EXPORT] Router
    Export router to use it in 'main.js'
*/
    export default AppRouter;
//