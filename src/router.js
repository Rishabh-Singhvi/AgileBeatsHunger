import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'BeatHunger',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'BeatHunger',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/BeatHunger.vue')
        },
        {
          path: '/transportNredeem',
          name: 'Manage Transport and Bazzar',
          component: () => import(/* webpackChunkName: "demo" */ './views/transportNredeem.vue')
        },
        {
          path: '/PickupDetails',
          name: 'PickupDetails',
          component: () => import(/* webpackChunkName: "demo" */ './views/PickupDetails.vue')
        },
        {
          path: '/bazar',
          name: 'bazar',
          component: () => import(/* webpackChunkName: "demo" */ './views/bazar.vue')
        },
        {
          path: '/userDetails/:id',
          name: 'userDetails',
          component: () => import(/* webpackChunkName: "demo" */ './views/userDetails.vue')
        },
        {
          path: '/mp',
          name: 'userDetails',
          component: () => import(/* webpackChunkName: "demo" */ './views/mp.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
