import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '../_helpers/auth-guard'

import * as Public from '@/views/public'
import * as Admin from '@/views/admin'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'

const routes = [
    {
        path:'/',
        name:'public',
        component: Public.PublicLayout,
        children : [
            {path:'', name:'home', component: Public.Home},
            {path:'account', name:'account', component: Public.Account},
            {
                path:'/articles',
                name:'articles',
                children: [
                    {path:'', name:'index', component: Public.ArticlesIndex},
                    {path:'edit/:id(\\d+)', name:'edit', component: Public.ArticlesEdit, props:true},
                    {path:'add', name:'add', component: Public.ArticlesAdd},
                ]
            }
        ]
    },
    {
        path:'/admin',
        name:'admin',
        component: Admin.AdminLayout,
        children : [
            {path:'', name:'dashboard', component: Admin.Dashboard},
            {path:'users/index', name:'userIndex', component: Admin.UserIndex},
            {path:'users/edit/:id(\\d+)', name:'userEdit', component: Admin.UserEdit, props:true},
            {path:'articles/index', name:'articlesIndex', component: Admin.ArticlesIndex},
            {path:'articles/edit/:id(\\d+)', name:'articlesEdit', component: Admin.ArticlesEdit, props:true},
            {path:'articles/add', name:'articlesAdd', component: Admin.ArticlesAdd},

            {path:'/:pathMatch(.*)*', redirect: '/admin/dashboard'}
        ]
    },
    { path:'/login', name:'login', component: Login},
    { path:'/register', name:'register', component: Register},
    {
        path:'/:pathMatch(.*)*', redirect: '/'
    }
]

const router = createRouter({
    history : createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched[0].name == "admin"){
        authGuard(false);
    }
    next();
})

export default router