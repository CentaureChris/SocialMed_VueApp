/* eslint-disable no-unused-vars */

export default{
    // Define state
    state: {
        userinfo: null,
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
        registerOperation( { commit, dispatch, state }, data ){
            console.log('[DEBUG] registerOperation()', data)

            // Commit mutation
            commit('userinfo',  { data: data })
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