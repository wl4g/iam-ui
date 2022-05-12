<template>
  <div style="    margin: 10px 32px 20px 12px;">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabsData" :key="item.name" :label="item.labelName" :name="item.name">
        <keep-alive>
          <component :is="currentTabComponent" @showTabs="showTabs"></component>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ClusterManageDetail from "./tabs.js"
export default ClusterManageDetail
</script>

<style>
</style>