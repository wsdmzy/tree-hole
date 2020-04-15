<template>
  <div id="app">
    <navbar v-show="showNavbar" />
    <router-view/>
  </div>
</template>

<script>

import Navbar from '@/views/layout/Navbar'

import { mapState } from 'vuex'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      
    }
  },
  mounted() {

  },
  computed: mapState({
    showNavbar: 'showNavbar'
  })
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: rgb(30,30,30);
   color: rgb(169,169,179);
}
</style>
