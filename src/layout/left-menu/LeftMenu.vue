<template>

  <div class="left" :style="{'height':win_size.height,'width':$store.state.leftmenu.width}" id='admin-left'>
    <!--<div class="acm">应用配置管理 ACM</div>-->
    <div id='left-menu'>
        <el-row class="tac">
          <el-col :span="24">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              active-text-color="#20a1ff"
              >

              <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />

              <!-- 旧的侧边栏 -->
              <!--<div v-for="item in menu_list" :key="item.id">-->
                <!--&lt;!&ndash; :index="$store.state.router.headerCurRouter+'/'+item.path" &ndash;&gt;-->
                <!--<el-menu-item v-if="!item.children && !item.hidden" :index="item.path" @click.native="routerGo(item.path,item)">-->
                  <!--&lt;!&ndash;<i :class="'fa fa-'+item.icon"></i>&ndash;&gt;-->
                  <!--&lt;!&ndash;<img class="icon" :src="item.icon?item.icon:'/static/images/menu/DOC_on.png'" onerror="this.style.display='none'"/>&ndash;&gt;-->
                  <!--<svg class="myIcon" aria-hidden="true" style="cursor:pointer;">-->
                    <!--<use :xlink:href="'#'+item.icon"></use>-->
                  <!--</svg>-->
                  <!--<span v-if="$store.state.leftmenu.menu_flag" slot="title">{{getMenuName(item)}}</span>-->
                <!--</el-menu-item>-->

                <!--<el-submenu v-else-if="!item.hidden" :index="item.path">-->
                  <!--<div slot="title">-->
                    <!--<div>-->
                      <!--&lt;!&ndash;<img class="icon" :src="item.icon?item.icon:'/static/images/menu/DOC_on.png'" onerror="this.style.display='none'"/>&ndash;&gt;-->
                      <!--<svg class="myIcon" aria-hidden="true" style="cursor:pointer;">-->
                        <!--<use :xlink:href="'#'+item.icon"></use>-->
                      <!--</svg>-->
                      <!--<span>{{getMenuName(item)}}</span>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<template v-for="child in item.children">-->
                    <!--<el-menu-item :index="child.path" @click.native="routerGo(child.path,child)">-->
                      <!--&lt;!&ndash;<img class="icon" :src="child.icon?child.icon:'/static/images/menu/DOC_on.png'" onerror="this.style.display='none'"/>&ndash;&gt;-->
                      <!--<svg class="myIcon" aria-hidden="true" style="cursor:pointer;">-->
                        <!--<use :xlink:href="'#'+child.icon"></use>-->
                      <!--</svg>-->
                      <!--<span slot="title">{{getMenuName(child)}}</span>-->
                    <!--</el-menu-item>-->
                  <!--</template>-->
                <!--</el-submenu>-->
              <!--</div>-->


            </el-menu>
          </el-col>
        </el-row>
      <div class="toggle-menu"
           @click='toggleMenu'
           :style='{left:$store.state.leftmenu.width}'>
        <i
          :class='[{"el-icon-arrow-left":$store.state.leftmenu.menu_flag},{"el-icon-arrow-right":!$store.state.leftmenu.menu_flag}]'></i>
      </div>
    </div>
  </div>
</template>

<script>
  import LeftMenu from './LeftMenu.js'

  export default LeftMenu
</script>

<style scoped lang='less'>
  @import url(./LeftMenu.less);
  .acm{
    background: #324057;
    color: #fff;
    text-align: center;line-height: 46px;
  }

</style>
<style lang="less">
  .left-fixed-right-auto .left .el-menu{
    background-color: #eae8e4;
    border-right: 0 none;
  }
  .left-fixed-right-auto .left .el-menu-item,
  .left-fixed-right-auto .left /deep/ .el-submenu__title{
    height: 48px;
    line-height: 48px;
  }
  .left-fixed-right-auto .left  .el-menu-item:focus,
  .left-fixed-right-auto .left  .el-menu-item:hover,
  .left-fixed-right-auto .left  .el-menu-item.is-active{
    color: #20a1ff;
    background-color: #fff;
  }
  .left-fixed-right-auto .left  .el-submenu__title:hover {
    background-color: #fff;
  }
  .left-fixed-right-auto .left  .el-menu-item .icon,
  .left-fixed-right-auto .left  .el-submenu__title .icon {
    margin-right: 8px;
  }
  .el-menu a:hover {
    text-decoration: none;
  }
  .el-menu .svg-icon {
    margin-right: 6px;
  }
</style>
