<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
            <!--<el-form-item label="ID:">
                <el-input v-model="searchParams.id" placeholder="e.g. 1" style="width: 80px;"></el-input>
            </el-form-item>-->
            <el-form-item label="PipeName:">
                <el-input v-model="searchParams.taskName" placeholder="e.g. TaskProtalDev" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item label="Cluster:">
                <el-input v-model="searchParams.groupName" placeholder="e.g. portal" style="width:110px;"></el-input>
            </el-form-item>
            <el-form-item label="Project:">
                <el-input v-model="searchParams.projectName" placeholder="e.g. portal-web" style="width:120px;"></el-input>
            </el-form-item>
            <!--<el-form-item label="Branch:">
                <el-input v-model="searchParams.branchName" placeholder="e.g. 1.0.1-rc1" style="width:115px;"></el-input>
            </el-form-item>-->
            <el-form-item label="PipeKind:">
                <el-select :clearable="true" v-model="searchParams.tarType" placeholder="PipeKind" style="width:70px;">
                    <el-option
                            v-for="item in dictutil.getDictListByType('ci_tar_type')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>


                </el-select>
            </el-form-item>
            <el-form-item label="CreateDate:">
                <el-date-picker v-model="searchParams.startDate" type="date" placeholder="Start Date" format="yyyy-MM-dd HH:mm" style="width:160px;"></el-date-picker>
                <el-date-picker v-model="searchParams.endDate" type="date" placeholder="End Date" format="yyyy-MM-dd HH:mm" style="width:160px;"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" type="success">Search</el-button>
            </el-form-item>
        </el-form>

        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="line"></div>
            <div class="">Total： <span class="number">{{total}}</span>
                <el-dropdown style='float:right;margin-right:20px' @command="add">
                    <el-button type="primary" >+ New Pipeline</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                                v-for="item in dictutil.getDictListByType('ci_tar_type')"
                                :command="item.value">{{item.label}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData"  style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID" min-width="40"></el-table-column>
                    <el-table-column prop="taskName" label="Name" min-width="70"></el-table-column>
                    <el-table-column prop="groupName" label="Group" min-width="60"></el-table-column>
                    <el-table-column prop="instances" label="Instances" min-width="70">
                        <template slot-scope="scope">
                            <el-popover placement="right" width="200" trigger="hover">
                                <el-input type="textarea" :rows="3" placeholder="No data row" :readonly="true" :value="instances2Str(scope.row)"></el-input>
                                <el-button slot="reference">{{countInstance(scope.row)}}</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="branchName" label="Branch" min-width="58"></el-table-column>
                    <!--<el-table-column prop="projectName" label="Project"></el-table-column>-->
                    <el-table-column prop="tarType" label="PipeKind" min-width="80"></el-table-column>
                    <el-table-column prop="createDate" label="CreateDate"></el-table-column>
                    <!--<el-table-column prop="buildCommand" label="BuildCmd" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="preCommand" label="PreCmd" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="postCommand" label="PostCmd" :show-overflow-tooltip="true"></el-table-column>-->

                    <el-table-column label="Operation" min-width="150">
                        <template slot-scope="scope">
                            <el-button type="warning" class='el-icon-upload' size="small"  @click="beforeRunTask(scope.row)">Build</el-button>
                            <el-button type="info" icon='edit' size="small" @click="taskDetail(scope.row)">Edit</el-button>
                            <el-button type="danger" icon='delete' size="small" @click="delTask(scope.row)">Del</el-button>
                            <!--<el-button type="text" size="small" @click="rollbackTask(scope.row)">Rollback</el-button>-->
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================add build taskhis================================-->
        <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogVisible" size="full"  v-loading='dialogLoading'>
            <el-form label-width="165px"  :model="buildForm" ref="buildForm" :rules="rules"
                     class="demo-form-inline">

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="TaskName:" prop="taskName">
                            <el-input v-model="buildForm.taskName" placeholder="Task Name" style="width: 100%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="Cluster:" prop="cluster">
                            <el-select v-model="buildForm.group" @change="onChangeCluster()" :disabled="isEdit" style="width: 100%">
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
                    <el-col :span="11">
                        <el-form-item label="Env:" prop="environment">
                            <el-select v-model="buildForm.environment" @change="getinstance()" placeholder="Please Env" style="width: 100%">
                                <el-option
                                        v-for="item in dictutil.getDictListByType('app_ns_type')"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="11">
                        <el-form-item label="PackType:" prop="tarType">
                            <el-select v-model="buildForm.tarType" placeholder="打包类型" style="width: 100%;">
                                <el-option label="tar" :value="1"></el-option>
                                <el-option label="vue" :value="4"></el-option>
                                <el-option disabled label="jar" :value="2"></el-option>
                                <el-option disabled label="docker" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>-->
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <el-form-item label="Instance:" prop="instances">
                            <el-select v-model="buildForm.instances"  multiple  placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in instanceData"
                                        :key="item.id"
                                        :label="item.hostname"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="Branch Type:" prop="tarOrBranch" >
                            <el-switch v-model="buildForm.tagOrBranch" @change="getBranchs"
                                       :on-value="2" :off-value="1"
                                       on-text="tag" off-text="branch"
                                       on-color="#20A0FF" off-color="#13CE66" :width="80">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="Branch:" prop="branch">
                            <el-select v-model="buildForm.branch" placeholder="branch" style="width: 100%;">
                                <el-option
                                        v-for="item in branchs"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <el-form-item label="BuildCommand:" prop="buildCommand">
                            <el-tooltip class="item" effect="dark" placement="right-start">
                                <div slot="content">tip:command can use this placeholder, example:<br/>#{projectPath} ==> /home/ci/myproject</div>
                                <el-input type="textarea" v-model="buildForm.buildCommand" :rows="3" placeholder="暂无数据"></el-input>
                            </el-tooltip>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <el-form-item label="PreCommand:" prop="preCommand">
                            <el-input type="textarea" v-model="buildForm.preCommand" :rows="3" placeholder="暂无数据"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <el-form-item label="PostCommand:" prop="postCommand">
                            <el-tooltip class="item" effect="dark" placement="right-start">
                                <div slot="content">tip:if command not found , try this before you command<br/>. /etc/profile && . /etc/bashrc && . ~/.bash_profile && . ~/.bashrc && </div>
                                <el-input type="textarea" v-model="buildForm.postCommand" :rows="3" placeholder="暂无数据"></el-input>
                            </el-tooltip>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="ContactGroup:" prop="contactGroupData">
                            <el-select v-model="buildForm.contactGroupId" placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in contactGroupData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <el-form-item label="Custom:" prop="custom">
                            <el-switch
                                v-model="buildForm.commandOnOff"
                                on-text=""
                                off-text="">
                        </el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row v-if="buildForm.commandOnOff">
                    <el-col :span="22">
                        <el-form-item label="Commands：" prop="commands">
                            <template>
                                <el-table :data="buildForm.taskBuildCommands" style="width: 100%" >
                                    <el-table-column prop="projectId" label="Id" min-width="10">
                                        <template scope="scope">
                                            {{scope.row.projectId}}
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="projectName" label="Name" min-width="30">
                                        <template scope="scope">
                                            {{scope.row.projectName}}
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="command" label="Command" min-width="120">
                                        <template scope="scope">
                                            <!--<el-input  v-model="scope.row.command"></el-input>-->
                                            <el-input type="textarea" v-model="scope.row.command" :rows="2" ></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <!--<el-button type="primary"  @click.native.prevent="addRow()">+</el-button>-->
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save()">Save</el-button>
                <el-button @click="dialogVisible = false;">Cancel</el-button>
          </span>
        </el-dialog>



        <el-dialog title="Create Task Confirm" :visible.sync="confirmDialog" size="small">
            <el-form label-width="80px"  :model="confirmForm" ref="confirmForm" class="demo-form-inline">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="trackType:" prop="trackType">
                            <el-select v-model="confirmForm.trackType">
                                <el-option
                                        v-for="item in dictutil.getDictListByType('ci_track_type')"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="trackId:" prop="trackId">
                            <el-input v-model="confirmForm.trackId" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="remark:" prop="remark">
                            <el-input type="textarea" v-model="confirmForm.remark" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="runTask()">Ok</el-button>
                <el-button @click="confirmDialog = false;cleanConfirm();">Cancel</el-button>
          </span>
        </el-dialog>

    </section>
</template>
<script>
    import Task from './Task.js'
    export default Task
</script>
<style>
    .mytextarea {
        height: 70vh;
        overflow-y: auto;
    }
    .mytextarea .el-textarea__inner {
        height: 100%;
        color: #aaa;
        background-color: #333;
        padding: 10px 10px 40px 10px;
    }
</style>
