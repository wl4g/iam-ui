<template>
  <div id="app">
    <transition name="bounce">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'app',
    components: {},
    data () {
      return {}
    },
    methods: {
      onTestRestFulApi(){
        this.$$api_test_getArticle({
          pathParams:{
            id:1
          },
          fn:()=>{}
        });
      },
      onUpdateTabs() {
        this.$store.dispatch('update_tabs', {
          route: this.$route
        });
      },
      init () {
        this.onUpdateTabs();
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      $route (to, from) {
        this.init();
      }
    }
  }
</script>
<style lang="less">
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    z-index:50;
  }
  button{
    position: relative;
    z-index:10;
  }
  .el-pager{
    position: relative;
    z-index:50;
  }
  .left-menu{
    position: relative;
    z-index:50;
  }
  .el-dialog{
    position: relative;
    z-index:3000;
  }
  .bounce-enter-active {
    animation: bounce-in .5s;
    -webkit-animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-out .2s;
    -webkit-animation: bounce-out .2s;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes bounce-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(0);
    }
  }
</style>