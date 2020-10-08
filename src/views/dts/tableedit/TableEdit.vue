<template>
    <section id="configuration" class="configuration">
        <!--step 1: select db & table-->
        <div v-if="!isEdit && !clickNext">
            <el-card class="box-card">
                <div slot="header">
                    <span>配置生成表</span>
                </div>
                <el-form ref="selectTableForm" :model="saveForm" label-width="135px" :rules="rules">
                    <el-form-item label="选择需要表" prop="tableName">
                        <el-select v-model="saveForm.tableName" filterable>
                            <el-option
                                    v-for="item in getFilterTables()"
                                    :key="item.tableName"
                                    :label="item.tableName+'  '+item.comments"
                                    :value="item.tableName">
                            </el-option>
                        </el-select>
                        <el-checkbox v-model="filterSysTable" style="margin-left: 20px"></el-checkbox>
                        <el-tooltip class="item" effect="dark" content="是否过滤以 'sys_' 开头的系统表" placement="right">
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
                <div style="margin-left: 135px">
                    <el-button type="primary" @click="afterSelectTable">下一步</el-button>
                    <el-button @click="back()">取消</el-button>
                </div>
            </el-card>
        </div>
        <el-form v-if="clickNext" label-width="135px" :model="saveForm" ref="saveForm" :rules="rules">
            <aside>
                <i class="el-icon-warning" style="font-size: 16px ;color: orange"></i>
                提示:</br>
                &nbsp;&nbsp;&nbsp;生成引擎会自动适配一些字段来生成对应功能，因此表 <b>{{saveForm.tableName}}</b> 需要遵循如下规范：</br>
                &nbsp;&nbsp;&nbsp;1. 主键字段必须为 <b>id (bigint)</b> ，且暂不支持组合主键；【必须】</br>
                &nbsp;&nbsp;&nbsp;2. 如需生成逻辑删除功能，则应有 <b>del_flag (int)</b> 字段，否则只可能是物理删除或无删除功能；【可选，建议】 </br>
                &nbsp;&nbsp;&nbsp;3. 如需生成查询的数据权限功能，则应有 <b>organization_code varchar(255)</b> 字段；【可选，建议】 </br>
                &nbsp;&nbsp;&nbsp;4. 当包含 <b>create_by (bigint), create_date (datetime), update_by (bigint), update_date (datetime)</b> 字段时，调用CRUD方法时才会给相应字段设置值；【可选，建议】</br>
                &nbsp;&nbsp;&nbsp;<font color=red>* 以上规则2，3，4，除了作为关联中间表以外，应该都遵循。</font>
            </aside>
            <el-card class="box-card" style="padding: 0 30px 0 30px">
                <div slot="header">
                    <span><b>基本信息</b></span>
                </div>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="数据库表名" prop="tableName">
                            <el-input v-model="saveForm.tableName" style="width: 100%" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="实体类/结构名" prop="entityName">
                            <el-input v-model="saveForm.entityName" style="width: 100%"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="功能作者" prop="functionAuthor">
                            <el-input v-model="saveForm.functionAuthor" style="width: 100%" placeholder="e.g: Administrator"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="模块名" prop="moduleName">
                            <span slot="label">
                                  <span>模块名</span>
                                  <el-tooltip class="item" effect="dark" content="生成项目源码的模块名，只能是字母、数字、下划线、$ 组合，开头只能是字母，例如：若生成的是java项目 src/main/java/com/mycompany/myproject/{moduleName}/service/XxxService.java" placement="right">
                                     <i class="el-icon-question"></i>
                                  </el-tooltip>
                            </span>
                            <el-input v-model="saveForm.moduleName" style="width: 100%" placeholder="e.g: sys"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="功能简称" prop="functionNameSimple">
                            <span slot="label">
                                  <span>功能简称</span>
                                  <el-tooltip class="item" effect="dark" content="如, 用作菜单名, 建议4个中文字或2个英文单词" placement="right">
                                     <i class="el-icon-question"></i>
                                  </el-tooltip>
                            </span>
                            <el-input v-model="saveForm.functionNameSimple" style="width: 100%" placeholder="e.g: Xxx Management"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="子模块名" prop="subModuleName">
                            <span slot="label">
                                  <span>子模块名</span>
                                  <el-tooltip class="item" effect="dark" content="类似“生成模块名”，如：src/main/java/com/mycompany/myproject/{moduleName}/service/{subModuleName}/XxxService.java" placement="right">
                                     <i class="el-icon-question"></i>
                                  </el-tooltip>
                            </span>
                            <el-input v-model="saveForm.subModuleName" style="width: 100%" placeholder="e.g: extra"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="功能信息" prop="functionName">
                            <span slot="label">
                                  <span>功能信息</span>
                                  <el-tooltip class="item" effect="dark" content="生成模块的功能名称，如：会作为源文件的注释" placement="right">
                                     <i class="el-icon-question"></i>
                                  </el-tooltip>
                            </span>
                            <el-input v-model="saveForm.functionName" style="width: 100%" placeholder="e.g: Xxx management center"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>&nbsp;</el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="关联的主表" prop="parentTableName">
                            <span slot="label">
                                  <span>关联的主表</span>
                                  <el-tooltip class="item" effect="dark" content="配置后可以自动生成 join 查询" placement="right">
                                     <i class="el-icon-question"></i>
                                  </el-tooltip>
                            </span>
                            <el-select v-model="saveForm.parentTableName" filterable style="width: 100%">
                                <el-option
                                        v-for="item in tables"
                                        :key="item.tableName"
                                        :label="item.tableName+'  '+item.comments"
                                        :value="item.tableName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="本表关联主表的外键字段" prop="parentTableFkName">
                            <span slot="label">
                                <span>本表关联主表的外键</span>
                                <el-tooltip class="item" effect="dark" content="同 “关联主表”" placement="right">
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </span>
                            <el-select v-model="saveForm.parentTableFkName" filterable style="width:91%">
                                <el-option
                                        v-for="item in saveForm.genTableColumns"
                                        :key="item.columnName"
                                        :label="item.columnName"
                                        :value="item.columnName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="18">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" :rows="3" v-model="saveForm.remark" style="width: 100%"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card" style="padding: 0 30px 0 30px">
                <div slot="header">
                    <span><b>扩展配置</b></span>
                </div>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="删除功能">
                            <span slot="label">
                                  <span>删除功能</span>
                                  <el-tooltip class="item" effect="dark" content="列表记录是否有删除功能，逻辑删除：后端执行的是update set del_flag=1 ，注：当逻辑删除不可用时，需检查表是否有del_flag字段" placement="right">
                                     <i class="el-icon-question"></i>
                                  </el-tooltip>
                            </span>
                            <el-radio-group v-model="saveForm.optionObj.tableDeleteType">
                                <el-radio-button :label="'deleteWithLogical'" :disabled="!isdeleteWithLogicalAble">逻辑删除</el-radio-button>
                                <el-radio-button :label="'deleteWithPhysical'">物理删除</el-radio-button>
                                <el-radio-button :label="'deleteWithNone'">无</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="启用Excel导出">
                            <el-checkbox saveForm.optionObj.isExportExcel></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="编辑方式">
                            <span slot="label">
                                  <span>编辑方式</span>
                                  <el-tooltip class="item" effect="dark" content="编辑页面字段的展示方式：如，弹窗编辑：点击编辑按钮在当前页弹出框进行编辑，页面编辑：会新打开页面进行编辑" placement="right">
                                     <i class="el-icon-question"></i>
                                  </el-tooltip>
                            </span>
                            <el-radio-group v-model="saveForm.optionObj.tableEditType">
                                <el-radio-button :label="'editOnPage'">页面编辑</el-radio-button>
                                <el-radio-button :label="'editOnDialog'">弹窗编辑</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <div slot="header">
                    <el-row>
                        <el-col :span="17">
                            <span><b>字段信息</b></span>
                        </el-col>
                        <el-col :span="4" style="position:relative;margin-left:40px">
                            <!--<el-button v-if="activeName!='third'" type="primary" @click="nextStep()">下一步</el-button>-->
                            <el-button @click="saveData()" type="success">保存配置</el-button>
                            <el-button @click="back()" type="primary">返回上一步</el-button>
                        </el-col>
                        <el-col :span="2" style="position:relative;margin-left:6px">
                            <el-button type="primary" @click="loadMetadata()" :loading="metadataLoading">重新加载</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-table ref="dragTable" :data="saveForm.genTableColumns" row-key="columnName" style="width:100%" height="600">
                    <el-table-column label="序号" type="index" width="40" align="center">
                        <template scope="scope">
                            <span>{{scope.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="拖动" width="40" class-name="handle-rank">
                        <template slot-scope="{}">
                            <i class="el-icon-rank"></i>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="列名" width="150">
                        <template slot-scope="{row}">
                            <span>{{ row.columnName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="列说明" width="150">
                        <template slot-scope="{row}">
                            <el-input v-model="row.columnComment"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="列类型" width="95">
                        <template slot-scope="{row}">
                            <span>{{ row.columnType }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="属性类型" width="105">
                        <template slot-scope="{row}">
                            <el-select v-model="row.attrType" filterable style="width: 100%">
                                <el-option
                                        v-for="item in attrTypes"
                                        :key="item"
                                        :label="getSimpleAttrType(item)"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="属性名称" width="150">
                        <template slot-scope="{row}">
                            <el-input v-model="row.attrName"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="主键" width="40">
                        <template slot="header" slot-scope="scope">
                            <span>主键</span>
                            <el-tooltip class="item" effect="dark" content="主键:暂不支持修改" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-checkbox disabled v-model="row.isPk" true-label="1" false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="插入" width="40">
                        <template slot="header" slot-scope="scope">
                            <span>插入</span>
                            <el-tooltip class="item" effect="dark" content="新增时是否包含该字段" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-checkbox v-model="row.isInsert" true-label="1" false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="更新" width="40">
                        <template slot="header" slot-scope="scope">
                            <span>更新</span>
                            <el-tooltip class="item" effect="dark" content="更新时是否包含该字段" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-checkbox v-model="row.isUpdate" true-label="1" false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="列表" width="40">
                        <template slot="header" slot-scope="scope">
                            <span>列表</span>
                            <el-tooltip class="item" effect="dark" content="展示列表是否包含该字段" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-checkbox v-model="row.isList" true-label="1" false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="查询" width="40">
                        <template slot="header" slot-scope="scope">
                            <span>查询</span>
                            <el-tooltip class="item" effect="dark" content="查询条件是否包含该字段" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-checkbox v-model="row.isQuery" true-label="1" false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="匹配方式" width="80">
                        <template slot="header" slot-scope="scope">
                            <span>匹配方式</span>
                            <el-tooltip class="item" effect="dark" content="作为查询条件时的匹配方式" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-select v-model="row.queryType" filterable style="width: 100%">
                                <el-option label="=" value="1"></el-option>
                                <el-option label="!=" value="2"></el-option>
                                <el-option label=">" value="3"></el-option>
                                <el-option label=">=" value="4"></el-option>
                                <el-option label="<" value="5"></el-option>
                                <el-option label="<=" value="6"></el-option>
                                <el-option label="Like" value="7"></el-option>
                                <el-option label="左Like" value="8"></el-option>
                                <el-option label="右Like" value="9"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="编辑" width="40">
                        <template slot="header" slot-scope="scope">
                            <span>编辑</span>
                            <el-tooltip class="item" effect="dark" content="编辑时是否包含该字段" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-checkbox v-model="row.isEdit" true-label="1" false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column align="center" label="控件类型" width="100">
                        <template slot="header" slot-scope="scope">
                            <span>控件类型</span>
                            <el-tooltip class="item" effect="dark" content="该字段的控件类型" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-select v-model="row.showType" filterable style="width: 100%">
                                <el-option label="单行文本框" value="1"></el-option>
                                <el-option label="多行文本框" value="2"></el-option>
                                <el-option label="隐藏域字段" value="3"></el-option>
                                <el-option label="单选下拉框" value="4"></el-option>
                                <el-option label="多选下拉框" value="5"></el-option>
                                <el-option label="复选框" value="6"></el-option>
                                <el-option label="日期选择" value="7">
                                    <el-tooltip effect="dark" content="Right Center 提示文字" placement="right">
                                        <span>日期选择</span>
                                    </el-tooltip>
                                </el-option>
                                <el-option label="日期时间" value="8">

                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="字典类型" width="100">
                        <template slot="header" slot-scope="scope">
                            <span>字典类型</span>
                            <el-tooltip class="item" effect="dark" content="该字段的关联的字典类型" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-select v-model="row.dictType" filterable>
                                <el-option
                                        v-for="item in dictTypes"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="必填" width="40">
                        <template slot="header" slot-scope="scope">
                            <span>必填</span>
                            <el-tooltip class="item" effect="dark" content="编辑时该字段是否必填" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-checkbox v-model="row.noNull" true-label="1" false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="校验规则" width="100">
                        <template slot="header" slot-scope="scope">
                            <span>校验规则</span>
                            <el-tooltip class="item" effect="dark" content="表单字段的校验规则，通常与必填配合使用" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="{row}">
                            <el-select clearable v-model="row.validRule" filterable style="width: 100%">
                                <el-option label="电子邮件" value="1"></el-option>
                                <el-option label="网址" value="2"></el-option>
                                <el-option label="日期" value="3"></el-option>
                                <el-option label="数值" value="4"></el-option>
                                <el-option label="整数" value="5"></el-option>
                                <el-option label="正整数" value="6"></el-option>
                                <el-option label="字母数字下划线" value="7"></el-option>
                                <el-option label="手机电话" value="8"></el-option>
                                <el-option label="邮政编码" value="9"></el-option>
                                <el-option label="Ipv4" value="10"></el-option>
                                <el-option label="Ipv6" value="11"></el-option>
                                <el-option label="QQ" value="12"></el-option>
                                <el-option label="身份证" value="13"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
            <!--button div-->
            <!-- <el-row>
                <el-col :span="18">&nbsp;</el-col>
                
            </el-row> -->
        </el-form>
    </section>
</template>
<script>
import TableEdit from "./TableEdit.js";

export default TableEdit;
</script>
<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>
