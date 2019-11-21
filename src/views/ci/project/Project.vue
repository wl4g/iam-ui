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
                <el-button type="primary" @click="addPriject()" style='float:right;margin-right:20px'>+ New Project</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column width="100" prop="id" label="ID"></el-table-column>
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
                            <el-button type="info" icon='edit' size="small" @click="editPriject(scope.row)">Edit</el-button>
                            <el-button type="danger" icon='delete' size="small" @click="delProject(scope.row)">Del</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogVisible" width="60%" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :rules="rules" :model="saveForm" ref="saveForm"
                     class="demo-form-inline">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="App Cluster:" prop="appClusterId">
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
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="VCS Provider:" prop="vcs">
                            <el-select v-model="saveForm.vcsId" @change="changeVcs">
                                <el-option
                                        v-for="item in vcsData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Repository Project:" prop="project">
                            <el-select
                                    v-model="saveForm.projectName"
                                    @change="changeProject"
                                    filterable
                                    remote
                                    :clearable="true"
                                    placeholder="请输入关键词"
                                    :remote-method="remoteMethod"
                                    :loading="searchProjectLoading">
                                <el-option
                                        v-for="item in vcsProjectData"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="Repository HttpURI:" prop="httpUrl">
                    <el-input v-model="saveForm.httpUrl" placeholder="http url" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="Repository SshURI:" prop="sshUrl">
                    <el-input v-model="saveForm.sshUrl" placeholder="ssh url" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="Assets Path:" prop="assetsPath">
                    <el-input v-model="saveForm.assetsPath" placeholder="tar path"></el-input>
                </el-form-item>

                <el-form-item label="App Install Home:" prop="parentAppHome">
                    <el-input v-model="saveForm.parentAppHome" placeholder="install directory"></el-input>
                </el-form-item>

                <el-form-item label="Remark:" prop="remark">
                    <el-input v-model="saveForm.remark" placeholder="desciption"></el-input>
                </el-form-item>


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
                    <el-button type="primary"  @click.native.prevent="addRow()">+ Add Dependency</el-button>
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
