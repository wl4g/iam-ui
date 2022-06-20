<template>
  <div>
    <div id="container" ref="container" />
    <div className="operation-container" v-if="showOperation">
      <div className="operation-item">
        添加子节点
      </div>
      <div className="operation-item">
        添加前置节点
      </div>
      <div className="operation-item">
        转换节点
      </div>
      <div className="operation-item">
        上移节点
      </div>
      <div className="operation-item">
        下移节点
      </div>
      <div className="operation-item">
        删除本节点
      </div>
    </div>
  </div>
</template>

<script>
import RuleEngineDetail from "./ruleEngineDetail.js"
export default RuleEngineDetail
</script>

<style scoped>
.container {
  width: 100%;
  height: 500px;
}
</style>