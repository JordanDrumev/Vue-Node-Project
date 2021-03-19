import Vuex from 'vuex';

export default new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {
        loginUser(state){
            state.user.is_logged_in = true;
        },
        logoutUser(state) {
            state.user.is_logged_in = false ;
          }
    },
    actions: {
        loginUser({commit}) {
            commit('loginUser');
        },
        logoutUser({commit}) {
            commit('logoutUser');
        }
    },
    getters: {
        getLoggedinUser: (state) =>{
            return state.user;
        }
    }
})