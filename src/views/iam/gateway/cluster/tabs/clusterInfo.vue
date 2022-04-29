<template>
  <div>
    <div class="clusterInfo">集群信息</div>
    <div>
      <el-row :gutter="24">
        <el-col :span="4">
          <div class="grid-content-name">名称</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content-name">ClusterID</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content-name">状态</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content-name">网络类型</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content-name">实例类型</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content-name">IPS</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content-name">可用区</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content-name">标签</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
      </el-row>
    </div>
    <div class="line">

    </div>
    <div class="clusterInfo">
      其他信息
    </div>
    <div>
      <el-row :gutter="24">
        <el-col :span="4">
          <div class="grid-content-name">有效期</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content-value">123123</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.clusterInfo {
  font-size: 20px;
  font-weight: bold;
}
.el-col-4,
.el-col-8 {
  padding-top: 12px;
}
.grid-content-name {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
.grid-content-value {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
.line {
  width: 100%;
  height: 2px;
  background: rgb(224, 224, 224);
  margin: 20px 0;
}
</style>