import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddPost from '../views/AddPost'
import EditPost from '../views/EditPost'
import Post from '../views/Post'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/new-post',
        name: 'New Post',
        component: AddPost
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post
    },
    {
        path: '/post-edit/:id',
        name: 'Post Edit',
        component: EditPost
    },
    {
        path: '/cat/:id',
        name: 'Category',
        component: Home
    },
    {
        path: '*',
        redirect: {name: 'Home'}
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
