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
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        },
        {
          path: '/manageParcel',
          name: 'Manage Parcel',
          component: () => import(/* webpackChunkName: "demo" */ './views/manageParcel.vue')
        },
        {
          path: '/transportNredeem',
          name: 'Manage Transport and Bazzar',
          component: () => import(/* webpackChunkName: "demo" */ './views/transportNredeem.vue')
        },
        {
          path: '/BeatHunger',
          name: 'BeatHunger',
          component: () => import(/* webpackChunkName: "demo" */ './views/BeatHunger.vue')
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
          path: '/userDetails',
          name: 'userDetails',
          component: () => import(/* webpackChunkName: "demo" */ './views/userDetails.vue')
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
