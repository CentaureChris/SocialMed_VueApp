/* eslint-disable no-unused-vars */

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
        snapshootlist( state, payload){ 
            state.snapshootlist.push(payload.data) 
        },
    },

    // Define actions
    actions: {
        // Action to save snapshoot
        saveSnapshootOperation( { commit, dispatch, state }, data ){
            console.log('[DEBUG] saveSnapshootOperation()', data)
        },

        // Action to add new snapshoot in list
        pushSnapshootOperation( { commit, dispatch, state }, data ){
            // Commit 'snapshootlist' mutation
            commit( 'snapshootlist', { data: data } )
        },

    }
}