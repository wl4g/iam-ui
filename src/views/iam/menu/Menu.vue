/**
 * Created by Penn Peng on 2018/10/01.
 */
<template>
  <div class="">
    <el-button class="top-level-btn" type="primary" @click="addTopLevelModule()">AddTopLevel</el-button>
      <el-button class="top-level-btn" type="primary" @click="onGetList()">Refresh</el-button>
   <tree-table
      border
      :data="data"
      :columns="columns"
      :BtnInfo="btn_info"
      @onClickBtnAdd="onClickBtnAdd"
      @onClickBtnDelete="onClickBtnDelete"
      @onClickBtnUpdate="onClickBtnUpdate"
    >
    </tree-table>

    <el-dialog :close-on-click-modal="false" :title="windowTitle" :visible.sync="dialogVisible" width="100%">
      <el-form ref="menuForm" :label-position="labelPosition" :model="formFields" label-width="100px">

          <el-row>
              <el-col :span="12">
                  <el-form-item label="name:" prop="name">
                      <el-input v-model="formFields.name"></el-input>
                  </el-form-item>
              </el-col>

              <el-col :span="12">
                  <el-form-item label="displayName:" prop="displayName">
                      <el-input v-model="formFields.displayName"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="12">
                  <el-form-item label="permission:" prop="permission">
                      <el-input v-model="formFields.permission"></el-input>
                  </el-form-item>
              </el-col>

              <el-col :span="12">
                  <el-form-item label="accessUri:" prop="accessUri">
                      <el-input v-model="formFields.accessUri"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>

          <el-row>
              <el-col :span="18">
                  <el-form-item label="icon:" prop="icon">
                      <el-input v-model="formFields.icon"></el-input>
                  </el-form-item>
              </el-col>

              <el-col :span="6">
                  <el-form-item label="sort:" prop="sort">
                      <el-input v-model="formFields.sort"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
     </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="dialogSubmitBtnSwith" type="primary" @click="save">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import Menu from './Menu.js'

  export default Menu
</script>

<style scoped lang='less'>
  .top-level-btn{
    margin-bottom: 10px;
  }
</style>
