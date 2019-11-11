<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="Cluster:">
                <el-input v-model="searchParams.groupName" placeholder="e.g. sso | portal"></el-input>
            </el-form-item>

            <el-form-item label="Project:">
                <el-input v-model="searchParams.projectName" placeholder="e.g. safecloud-web-portal"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="onSubmit" type="success">Search</el-button>
            </el-form-item>
        </el-form>

        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="line"></div>
            <div class="">Result Total： <span class="number">{{total}}</span>
                <!-- 新增按钮 -->
                <el-button type="primary" @click="addPriject()" style='float:right;margin-right:20px'>+</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="groupName" label="Cluster"></el-table-column>
                    <el-table-column prop="projectName" label="Project"></el-table-column>
                    <el-table-column prop="gitUrl" label="Git" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createDate" label="CreateDate"></el-table-column>

                    <!--<el-table-column prop="lockStatus" label="LockStatus" :formatter="convertLockStatus"></el-table-column>-->
                    <el-table-column prop="lockStatus" label="LockStatus" :formatter="convertLockStatus">
                        <template slot-scope="scope">
                            <el-button size="small" :disabled="convertLockStatusDisable(scope.row)" @click="unlock(scope.row)">{{convertLockStatus(scope.row)}}</el-button>
                        </template>

                    </el-table-column>

                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editPriject(scope.row)">Edit</el-button>
                            <el-button type="text" size="small" @click="delProject(scope.row)">Del</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :rules="rules" :model="saveForm" ref="saveForm"
                     class="demo-form-inline">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Cluster:" prop="appClusterId">
                            <el-select v-model="saveForm.appClusterId" placeholder="Please group">
                                <el-option
                                        v-for="item in groupData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Project:" prop="projectName">
                            <el-input v-model="saveForm.projectName" placeholder="项目名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="VcsType:" prop="vcsType">
                    <el-select v-model="saveForm.vcsType">
                        <el-option
                                v-for="item in dictutil.getDictListByType('ci_vcs_type')"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Git:" prop="gitUrl">
                    <el-input v-model="saveForm.gitUrl" placeholder="git地址"></el-input>
                </el-form-item>

                <el-form-item label="assetsPath:" prop="assetsPath">
                    <el-input v-model="saveForm.assetsPath" placeholder="tar地址"></el-input>
                </el-form-item>

                <el-form-item label="AppHome:" prop="parentAppHome">
                    <el-input v-model="saveForm.parentAppHome" placeholder="项目存放路径"></el-input>
                </el-form-item>

                <el-form-item label="remark:" prop="remark">
                    <el-input v-model="saveForm.remark" placeholder="备注"></el-input>
                </el-form-item>

                <!--<el-form-item label="restart:" prop="restartCommand">
                    <el-input type="textarea" v-model="saveForm.restartCommand" placeholder="自定义重启命令"></el-input>
                </el-form-item>-->

                <!--<el-form-item label="restart:" prop="restartCommand">
                    &lt;!&ndash;<el-input  v-model="saveForm.cron" placeholder="时间表达式" @change="checkCron"></el-input>&ndash;&gt;
                    <el-popover placement="right" width="200" trigger="focus" title="占位提示:">
                        <el-input type="textarea" :rows="5" :readonly="true" value="#{alias}=>sso<br>#{project}">
                        </el-input>
                        <el-input type="textarea" slot="reference" v-model="saveForm.restartCommand" placeholder="自定义重启命令"></el-input>
                    </el-popover>
                </el-form-item>-->

                <el-form-item label="Dependencies：" prop="dependencies">
                    <!-- 查询结果表格 -->
                    <!--<div style="float:left;width: 266%;" v-loading='dialogLoading'>-->
                        <template>
                            <el-table :data="saveForm.dependencies" style="width: 100%">
                                <!-- 动态标签 -->
                                <el-table-column prop="dependentId" label="Dependent" min-width="290">
                                    <template scope="scope">
                                        <el-select v-model="scope.row.dependentId"  placeholder="project" >
                                            <el-option
                                                    v-for="item in ProjectData"
                                                    :key="item.id"
                                                    :label="item.projectName"
                                                    :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="branch" label="BranchName" min-width="130">
                                    <template scope="scope">
                                        <el-input  v-model="scope.row.branch"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column label="Operation" min-width="140">
                                    <template slot-scope="scope">
                                        <el-row>
                                            <el-button @click.native.prevent="deleteDep(scope.$index)" type="text" size="mini" style="float: left;line-height: 20px;">
                                                Delete
                                            </el-button>
                                        </el-row>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    <!--</div>-->
                    <el-button type="primary"  @click.native.prevent="addRow()">+</el-button>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveProject()">Save</el-button>
                <el-button @click="dialogVisible = false;">Cancel</el-button>
          </span>
        </el-dialog>


    </section>
</template>


<script>
    import Project from './Project.js'

    export default Project
</script>

<style scoped>

    .mytextarea {
        height: 70vh;
        overflow-y: auto;
    }

    .mytextarea .el-textarea__inner {
        height: 100%;
        color: #aaa;
        background-color: #333;
        padding: 10px 10px 40px 10px;
        /* color: #bbb; */
        /* cursor: not-allowed; */
    }


</style>
