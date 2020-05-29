<template>
  <div id="app">
    <transition name="bounce">
      <keep-alive exclude="Init" >
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
  html,body {
    height: 100%;
  }
  #app {
    height: 100%;
  }
  body{
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    color: #333;
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  button{
    position:relative;
    z-index:50;
  }
  .el-select__tags{
      z-index:55 !important; /*!important指定优先*/
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
  p {
    margin: 0;
  }
  .query{
    display: flex;
    justify-content: space-between;
    line-height: 28px;
    margin-bottom: 8px;
  }
  .query-left {
    display: flex;
    align-items: center;
  }
  .line {
    margin-right: 6px;
    width:4px;
    height:18px;
    background:#6cb33e;
  }
  .searchbar.el-form .el-form-item--mini.el-form-item {
    margin-bottom: 4px;
  }
  .link {
    font-size: 12px;
    color: #409EFF;
    cursor: pointer;
  }
  .link:focus,
  .link:hover {
    color: #66b1ff;
  }
  /* element ui 扩展样式*/
  .el-table th,
  .el-table th.is-leaf{
    color: #1f2d3d;
    background-color: #eef1f6;
  }
  .el-table.el-table--mini td,
  .el-table.el-table--mini th {
    padding: 3px 0;
  }
  .el-pagination {
    margin-top: 4px;
  }
  .el-dialog__wrapper .el-dialog__header {
    padding: 10px 12px;
  }
  .el-dialog__wrapper .el-dialog__title {
    font-size: 14px;
    font-weight: bold;
  }
  .el-dialog__wrapper .el-dialog__headerbtn {
    top: 12px;
  }
  .el-dialog__wrapper .el-dialog__body {
    padding: 16px 10px;
  }
  .el-form .el-form-item__label {
    font-size: 12px;
  }
  .el-bread .el-breadcrumb__inner a,
  .el-bread .el-breadcrumb__inner.is-link {
    color: #7a7b7e;
  }
  .el-bread .el-breadcrumb__item:last-child .el-breadcrumb__inner,
  .el-bread .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
  .el-bread .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
  .el-bread .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    color: #20a1ff;
  }
  .el-pagination.is-background {
    padding: 2px 0;
  }
  .home .el-pagination.is-background .btn-next,
  .home .el-pagination.is-background .btn-prev,
  .home .el-pagination.is-background .el-pager li {
    margin: 0 2px;
  }
  body .el-loading-mask {
    background: rgba(0,0,0,.4);
  }

  ::-webkit-scrollbar {/*滚动条整体样式*/
    width: 10px;
    height: 1px;
  }

  ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;

  }

  ::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
  }

  .el-icon-question {
    color: #31546554;
    font-size: 17px;
  }

  .myIcon {
    width: 1.2em;
    height: 1.2em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
