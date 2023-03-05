import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import Chat from '../views/Chat.vue';
import Homework from '../views/Homework.vue';
import Group from '../views/Group.vue';
import Layout from '../components/Layout.vue';

const routes = [
    {
        path: '/',
        component: Layout
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/signup',
        component: Signup
    },
    {
        path: '/chat',
        component: Chat
    },
    {
        path: '/group',
        component: Group
    },
    {
        path: '/homework',
        component: Homework
    }
]

export default routes;