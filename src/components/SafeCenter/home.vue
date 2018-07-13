<template>
  <div class="main">
      <home-head></home-head>      
     <home-content></home-content>
    <home-footer></home-footer>
  </div>
</template>

<script>
  import homeHead from './homeHead.vue';
  import homeContent from './homeContent.vue';
  import homeFooter from './homeFooter.vue';
  export default {
    name: 'home',
    components: {
      homeHead,homeFooter,homeContent
    },
    data() {
      return {
        user: '',
        showData:[],
        locale:null,
      }
    },
    methods: {
      getUser() {
        this.user = localStorage.getItem("user");
        sessionStorage.clear();
      },
    },
    watch: {
      '$route': 'getUser',
    }
    // i18n
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import "../../assets/css/home.scss"
</style>