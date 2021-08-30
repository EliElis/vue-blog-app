import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import url from '../api/url';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        cats: [],
        tags: [],
    },
    mutations: {
        getPosts(state, posts) {
            state.posts = posts;
        },
        getCats(state, cats) {
            state.cats = cats;
        },
        getTags(state, tags) {
            state.tags = tags;
        },
    },
    actions: {
        getPosts({commit}, cb) {
            api.getContentType(url.posts, (response) => {
                commit('getPosts', response.data);
                if (cb) {
                    cb();
                }
            });
        },
        getCats({commit}, cb) {
            api.getContentType(url.cats, (response) => {
                commit('getCats', response.data);
                if (cb) {
                    cb();
                }
            });
        },
        getTags({commit}) {
            api.getContentType(url.tags, (response) => {
                commit('getTags', response.data);
            });
        },
    },
})
