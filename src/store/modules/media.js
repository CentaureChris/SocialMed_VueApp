/* eslint-disable no-unused-vars */
import { dexieDb } from "@/services/dexie.service"

export default{
    // Define state
    state: {
        snapshoot: null,
        snapshootlist: [],
    },

    // Define getters
    getters: {
        snapshoot: (state) => state.snapshoot,
        snapshootlist: (state) => state.snapshootlist,
    },

    // Define mutation (eq. setters)
    mutations: {
        snapshoot( state, payload){ state.snapshoot = payload.data },
        snapshootmap( state, payload){ state.snapshootlist = payload.data },
        snapshootlist( state, payload){ 
            state.snapshootlist.push(payload.data) 
        },
    },

    // Define actions
    actions: {
        // Action to save snapshoot
        mapSnapshootOperation( { commit, dispatch, state }, data ){
            console.log('[DEBUG] mapSnapshootOperation()', data)
            commit('snapshootmap', { data })
        },

        // Action to save snapshoot
        saveSnapshootOperation( { commit, dispatch, state }, data ){
            console.log('[DEBUG] saveSnapshootOperation()', data)
        },

        // Action to add new snapshoot in list
        async pushSnapshootOperation( { commit, dispatch, state }, data ){
            // TODO: create item within an API

            /* 
                [DEXIE] Save
                Save API response in Dexie
            */
                // Save new snapshot in IndexDB with Dexie.js
                const newSnapshootId = await dexieDb.snapshoots.add( data );

                // Get new created snapshoot
                const newSnapshoot = await dexieDb.snapshoots.get(newSnapshootId);
            //

            /* 
                [STORE] Update
                Commit new state with indexed object
            */
                commit( 'snapshootlist', { data: newSnapshoot } )
            //
        },

    }
}