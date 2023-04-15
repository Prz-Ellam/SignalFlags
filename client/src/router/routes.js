import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Chat from '@/views/Chat.vue';
import Homework from '@/views/Homework.vue';
import HomeworkDetail from '@/views/HomeworkDetail.vue';
import Group from '@/views/Group.vue';
import Layout from '@/components/Layout.vue';
import Forum from '@/views/Forum.vue';
import Profile from '@/views/Profile.vue';

const routes = [
    {
        path: '/',
        component: Layout,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '/',
                component: Group,
                meta: {
                    requiresAuth: true
                }
            },
            { 
                path: '/chat', 
                component: Chat, 
                meta: {
                    requiresAuth: true
                } 
            },
            { 
                path: '/group', 
                component: Group, 
                meta: {
                    requiresAuth: true  
                }
            },
            { 
                path: '/homework', 
                component: Homework, 
                meta: {
                    requiresAuth: true
                }
            },
            { 
                path: '/homework-detail/:id', 
                component: HomeworkDetail, 
                meta: {
                    requiresAuth: true
                }
            },
            { 
                path: '/forum/:id', 
                component: Forum, 
                meta: {
                    requiresAuth: true 
                } 
            },
            {
                path: '/profile',
                component: Profile,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
    {
        path: '/home',
        component: Home,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/signup',
        component: Signup,
        meta: {
            requiresAuth: false
        }
    }
]

export default routes;