<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Beat the Hunger"
      title="Beat the Hunger"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Pickup Details',
            icon: 'ni ni-basket text-danger',
            path: '/PickupDetails'
          }"
        />

        <sidebar-item :link="{name: 'Bazar', icon: 'ni ni-cart text-blue', path: '/bazar'}"/>
        <sidebar-item :link="{name: 'Transport & Redeem', icon: 'ni ni-delivery-fast  text-success', path: '/transportNredeem'}"/>
        
        <sidebar-item :link="{name: 'Manage Parcel', icon: 'ni ni-archive-2 text-indigo', path: '/manageParcel'}"/>
        <!-- <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>
        <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/> -->

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
