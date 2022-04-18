<template>
  <div class="home">
    <head-nav></head-nav>
    <div class="left-fixed-right-auto">
      <left-menu></left-menu>
      <div
        class="right-content"
        :style="{ marginLeft: $store.state.leftmenu.width }"
      >
        <div class="content">
          <!-- <tabs></tabs> -->
          <bread></bread>
          <webview></webview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from "../head-nav/HeadNav.vue";
import LeftMenu from "../left-menu/LeftMenu.vue";
import Bread from "../bread/Bread.vue";
import Webview from "../../views/webview.vue"
export default {
    name: "DynamicPage",
    components: {
        HeadNav,
        LeftMenu,
        Bread,
        Webview,
    },
    mounted(){
      this.$nextTick(()=>{
        console.info('动态页面')
        this.$store.dispatch('set_menu_close' )
      })
    },
    beforeDestroy(){
      console.info("xiaohui")
        document.querySelector(".toggle-menu").style.display = ""
    }
};
</script>

<style lang="less" scoped>
.content {
  /*background: #f1f2f7;*/
  background: #fff;
  padding: 8px 16px;
}
.toggle-menu{
    display: none;
}
.right-content {
  padding-top: 50px;
  // margin-bottom: 60px;
}
</style>
