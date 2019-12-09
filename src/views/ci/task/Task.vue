<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline" @keyup.enter.native="onSubmit()">
            <!--<el-form-item label="ID:">
                <el-input v-model="searchParams.id" placeholder="e.g. 1" style="width: 80px;"></el-input>
            </el-form-item>-->
            <el-form-item :label="$t('message.ci.pipeName')">
                <el-input v-model="searchParams.taskName" placeholder="e.g. TaskProtalDev" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.ci.cluster')">
                <el-input v-model="searchParams.groupName" placeholder="e.g. portal" style="width:110px;"></el-input>
            </el-form-item>
            <!--<el-form-item label="Project:">
                <el-input v-model="searchParams.projectName" placeholder="e.g. portal-web" style="width:120px;"></el-input>
            </el-form-item>-->
            <!--<el-form-item label="Branch:">
                <el-input v-model="searchParams.branchName" placeholder="e.g. 1.0.1-rc1" style="width:115px;"></el-input>
            </el-form-item>-->
            <el-form-item :label="$t('message.ci.pipeKind')">
                <el-select :clearable="true" v-model="searchParams.providerKind" placeholder="PipeKind" style="width:105px;">
                    <el-option
                            v-for="item in dictutil.getDictListByType('ci_provider_kind')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('message.common.createDate')">
                <el-date-picker v-model="searchParams.startDate" type="date" placeholder="Start Date" format="yyyy-MM-dd HH:mm" style="width:160px;"></el-date-picker>
                <el-date-picker v-model="searchParams.endDate" type="date" placeholder="End Date" format="yyyy-MM-dd HH:mm" style="width:160px;"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" type="success">{{$t('message.common.search')}}</el-button>
            </el-form-item>
        </el-form>

        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="line"></div>
            <div class="">Total： <span class="number">{{total}}</span>
                <el-dropdown style='float:right;margin-right:20px' @command="add">
                    <el-button type="primary">+ New Pipeline</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                                v-for="item in dictutil.getDictListByType('ci_provider_kind')"
                                :command="item.value"
                                :disabled="item.enable!=1">
                            {{item.label}}
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
                    <el-table-column prop="taskName" :label="$t('message.ci.pipeName')" min-width="70"></el-table-column>
                    <el-table-column prop="groupName" :label="$t('message.ci.cluster')" min-width="60"></el-table-column>
                    <el-table-column prop="instances" :label="$t('message.ci.instances')" min-width="70">
                        <template slot-scope="scope">
                            <el-popover placement="right" width="200" trigger="hover">
                                <el-input type="textarea" :rows="3" placeholder="No data row" :readonly="true" :value="instances2Str(scope.row)"></el-input>
                                <el-button slot="reference">{{countInstance(scope.row)}}</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="branchName" :label="$t('message.ci.branchName')" min-width="58"></el-table-column>
                    <!--<el-table-column prop="projectName" label="Project"></el-table-column>-->
                    <el-table-column prop="providerKind" :label="$t('message.ci.pipeKind')" min-width="80"></el-table-column>
                    <el-table-column prop="createDate" :label="$t('message.common.createDate')"></el-table-column>
                    <!--<el-table-column prop="buildCommand" label="BuildCmd" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="preCommand" label="PreCmd" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="postCommand" label="PostCmd" :show-overflow-tooltip="true"></el-table-column>-->

                    <el-table-column :label="$t('message.common.operation')" min-width="150">
                        <template slot-scope="scope">
                            <el-button type="warning" class='iconfont icon-qidong' size="small"  @click="beforeRunTask(scope.row)">{{$t('message.ci.build')}}</el-button>
                            <el-button type="info" icon='edit' size="small" @click="taskDetail(scope.row)">{{$t('message.common.edit')}}</el-button>
                            <el-button type="danger" icon='delete' size="small" @click="delTask(scope.row)">{{$t('message.common.del')}}</el-button>
                            <!--<el-button type="text" size="small" @click="rollbackTask(scope.row)">Rollback</el-button>-->
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>


        <el-dialog :close-on-click-modal="false" title="Create Task Confirm" :visible.sync="confirmDialog" size="small">
            <el-form label-width="80px"  :model="confirmForm" ref="confirmForm" class="demo-form-inline" :rules="buildRules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('message.ci.trackType')" prop="trackType">
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
                        <el-form-item :label="$t('message.ci.trackId')" prop="trackId">
                            <el-input v-model="confirmForm.trackId" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('message.common.remark')" prop="remark">
                            <el-input type="textarea" v-model="confirmForm.remark" :rows="2"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="runTask()">{{$t('message.common.save')}}</el-button>
                <el-button @click="confirmDialog = false;cleanConfirm();">{{$t('message.common.cancel')}}</el-button>
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
