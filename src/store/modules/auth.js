/* eslint-disable no-unused-vars */

import { dexieDb } from "@/services/dexie.service"

export default{
    // Define state
    state: {
        userinfo: JSON.parse( localStorage.getItem('userinfo') ) || null,
    },

    // Define getters
    getters: {
        userinfo: (state) => state.userinfo,
    },

    // Define mutation (eq. setters)
    mutations: {
        userinfo( state, payload){ state.userinfo = payload.data }
    },

    // Define actions
    actions: {
        // Action to register user
        async registerOperation( { commit, dispatch, state }, data ){
            /* 
                [DEXIE] Save
                Save API response in Dexie
            */
                // Save new snapshot in IndexDB with Dexie.js
                const newUserId = await dexieDb['users'].add( data );

                // Get new created snapshoot
                const newUser = await dexieDb['users'].get(newUserId);
            //

            /* 
                [AUTH] Simulation
                Save user TOKEN in local storage
            */
                localStorage.setItem('userinfo', JSON.stringify(newUser))
            //

            /* 
                [STORE] Update
                Commit new state with indexed object
            */
                commit( 'userinfo', { data: newUser } )
            //
        },

        // Action to login user
        loginOperation( { commit, dispatch, state }, data ){
            console.log('[DEBUG] loginOperation()', data)
        },

        // Action to check user connection
        authguardOperation( { commit, dispatch, state }, data ){
            console.log('[DEBUG] authguardOperation()', data)
        }
    }
}