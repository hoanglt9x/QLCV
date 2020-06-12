<!-- =========================================================================================
  File Name: TheNavbar.vue
  Description: Navbar component
  Component Name: TheNavbar
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="relative">

    <div class="vx-navbar-wrapper" :class="classObj">

      <vs-navbar class="vx-navbar navbar-custom navbar-skelton" :color="navbarColorLocal" :class="textColor">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer p-2" icon="MenuIcon" @click.stop="showSidebar" />

        <!-- <bookmarks :navbarColor="navbarColor" v-if="windowWidth >= 992" /> -->
        <!-- <div v-if="$store.state.hienThi">
         <vs-chip color="danger" class="product-order-status">{{'Quá hạn: ' + $store.state.giaTri[0]}}</vs-chip>
         <vs-chip color="warning" class="product-order-status">{{'Cảnh báo: ' + $store.state.giaTri[1]}}</vs-chip>
         <vs-chip color="primary" class="product-order-status2">{{'Đang thực hiện: ' + $store.state.giaTri[2]}}</vs-chip>
         <vs-chip color="success" class="product-order-status">{{'Hoàn thành: ' + $store.state.giaTri[3]}}</vs-chip>
        </div> -->
        <vs-spacer />

        <!-- <search-bar />

        <notification-drop-down /> -->

        <profile-drop-down />

      </vs-navbar>
    </div>
  </div>
</template>


<script>
// import Bookmarks            from "./components/Bookmarks.vue"
//import SearchBar            from "./components/SearchBar.vue"
//import NotificationDropDown from "./components/NotificationDropDown.vue"
import ProfileDropDown      from "./components/ProfileDropDown.vue"

export default {
  name: "the-navbar-vertical",
  props: {
    navbarColor: {
      type: String,
      default: "#fff",
    },
    giaTri: {
      type: Array,
      default: ()=>[0,0,0,0]
    }
  },
  components: {
    // Bookmarks,
    //SearchBar,
    //NotificationDropDown,
    ProfileDropDown,
  },
  computed: {
    navbarColorLocal() {
      return this.$store.state.theme === "dark" && this.navbarColor === "#fff" ? "#10163a" : this.navbarColor
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth
    },
    textColor() {
      return {'text-white': (this.navbarColor != '#10163a' && this.$store.state.theme === 'dark') || (this.navbarColor != '#fff' && this.$store.state.theme !== 'dark')}
    },
    windowWidth() {
      return this.$store.state.windowWidth
    },

    // NAVBAR STYLE
    classObj() {
      if (this.verticalNavMenuWidth == "default")      return "navbar-default"
      else if (this.verticalNavMenuWidth == "reduced") return "navbar-reduced"
      else if (this.verticalNavMenuWidth)              return "navbar-full"
    },
  },
  methods: {
    showSidebar() {
      this.$store.commit('TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE', true);
    }
  }
}
</script>
<style scoped>
/* .product-order-status{
  width: 150px;
  font-weight: 700;
  margin-right: 15px;
}
.product-order-status2{
  width: 170px;
  font-weight: 700;
  margin-right: 15px;
} */
</style>

