/**
 * Created by Penn Peng on 2018/10/01.
 */
<template>
  <div class="">
    <el-button class="top-level-btn" type="primary" @click="addTopLevelModule()">Add Root</el-button>
    <el-button class="top-level-btn" type="primary" @click="onGetList()" :loading="loading">{{ $t('message.common.search') }}</el-button>

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
    <el-dialog :close-on-click-modal="false" :title="windowTitle" :visible.sync="dialogVisible" width="820">
      <el-form ref="menuForm" :label-position="labelPosition" :model="formFields" label-width="100px" :rules="rules" >
          <el-row>
              <el-col :span="12">
                  <el-form-item :label="$t('message.common.name')" prop="name">
                      <el-input v-model="formFields.name"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item :label="$t('message.common.displayName')" prop="displayName">
                    <el-col :span="22">
                      <el-input v-model="formFields.displayName"></el-input>
                    </el-col>
                    <el-col :span="2" class="text-center">
                      <el-tooltip placement="top">
                        <div slot="content">在系统不同语言版本切换时使用</div>
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </el-col>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item :label="$t('message.iam.permission')" prop="permission">
                    <el-col :span="22">
                      <el-input v-model="formFields.permission"></el-input>
                    </el-col>
                    <el-col :span="2" class="text-center">
                      <el-tooltip placement="top">
                        <div slot="content">菜单权限标识,如:ci:pipe:list*,ci:pipe:edit</div>
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </el-col>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item :label="$t('message.common.type')" prop="type">
                    <el-col :span="22">
                      <el-select v-model="formFields.type" placeholder="Type">
                        <el-option
                                v-for="item in dictutil.getDictListByType('menu_type')"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="2" class="text-center">
                      <el-tooltip placement="top">
                        <div slot="content">菜单的类型,点击时表现效果不同，具体与页面地址、路由地址相关,见相关说明</div>
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </el-col>
                  </el-form-item>
              </el-col>

          </el-row>
          <el-row>
              <el-col :span="12">
                  <el-form-item :label="$t('message.common.icon')" prop="icon">
                    <el-col :span="22">
                      <el-input v-model="formFields.icon"></el-input>
                    </el-col>
                    <el-col :span="2" class="text-center">
                      <el-tooltip placement="top">
                        <div slot="content">菜单图标地址,如:http://xx.com/a.icon或/img/a.png</div>
                        <i class="el-icon-warning"></i>
                      </el-tooltip>
                    </el-col>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item :label="$t('message.common.sort')" prop="sort">
                      <el-input v-model.number="formFields.sort"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('message.iam.routePath')" prop="routePath">
              <el-col :span="22">
                <el-input v-model="formFields.routePath">
                  <template slot="prepend">/#</template>
                </el-input>
              </el-col>
              <el-col :span="2" class="text-center">
                <el-tooltip placement="top">
                  <div slot="content">点击菜单时请求的路由的地址,如:/#/ci/pipeline</div>
                  <i class="el-icon-warning"></i>
                </el-tooltip>
              </el-col>
            </el-form-item>
          </el-col>

          <el-col :span="12">
              <el-form-item :label="$t('message.iam.pageLocation')" prop="pageLocation">
                <el-col :span="22">
                  <el-input v-model="formFields.pageLocation"></el-input>
                </el-col>
                <el-col :span="2" class="text-center">
                  <el-tooltip placement="top">
                    <div slot="content">点击菜单时实际打开的页面地址,与路由地址对应,<br/>当类型为:静态菜单时,表示vue页面文件路径,如:/ci/pipeline.vue;<br/>当类型为:动态菜单时,表示内容页面地址,如:http://google.com;</div>
                    <i class="el-icon-warning"></i>
                  </el-tooltip>
                </el-col>
              </el-form-item>
          </el-col>

        </el-row>
     </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="dialogSubmitBtnSwith" type="primary" @click="save">{{$t('message.common.save')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('message.common.cancel')}}</el-button>
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
