import { createStore } from 'vuex';
// import VueCookies from 'vue-cookies';

export default new createStore({
    state: {
        user: {
            loggedIn: false,
            data: null,
        },
    },
    mutations: {
        setLoggedIn(state, value) {
            state.user.loggedIn = value;
        },
        setUser(state, data) {
            state.user.data = data;
            // VueCookies.set('', data.accessToken);
        },
        logoutUser(state) {
            state.user.loggedIn = false;
            state.user.data = null;
            // VueCookies.remove('');
        },
        updateProfileComplete(state, value) {
            state.user.data.profileComplete = value;
            // VueCookies.set('', value);
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
    actions: {},
    modules: {
        // Add your modules here
    },
});
