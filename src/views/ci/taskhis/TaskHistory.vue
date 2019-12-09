<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline" @keyup.enter.native="onSubmit()">

            <el-form-item label="Cluster:">
                <el-input v-model="searchParams.groupName" placeholder="e.g. sso | portal"></el-input>
            </el-form-item>

            <el-form-item label="Project:">
                <el-input v-model="searchParams.projectName" placeholder="e.g. safecloud-web-portal"></el-input>
            </el-form-item>

            <el-form-item label="Branch:">
                <el-input v-model="searchParams.branchName" placeholder="1.0.1-rc1"></el-input>
            </el-form-item>

            <el-form-item :label="$t('message.common.createDate')">
                <el-date-picker v-model="searchParams.startDate" type="date" placeholder="Start Date" format="yyyy-MM-dd HH:mm" style="width:160px;"></el-date-picker>
                <el-date-picker v-model="searchParams.endDate" type="date" placeholder="End Date" format="yyyy-MM-dd HH:mm" style="width:160px;"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button @click="onSubmit" type="success">Search</el-button>
            </el-form-item>
            <el-form-item style='float:right'>
                <!-- 新增按钮 -->
                <!--<el-button type="primary" @click="create()">Create</el-button>-->
            </el-form-item>
        </el-form>

        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="line"></div>
            <div class="">Total： <span class="number">{{total}}</span></div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" @row-dblclick="doubleClickRow" style="width:100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column width="70" prop="id" label="ID" ></el-table-column>
                    <el-table-column prop="groupName" label="Cluster"></el-table-column>
                    <el-table-column prop="projectName" label="Project"></el-table-column>
                    <el-table-column prop="branchName" label="Branch"></el-table-column>
                    <el-table-column prop="type" label="Type" min-width="50" :formatter="convertType"></el-table-column>
                    <el-table-column prop="status" label="Status">
                        <template slot-scope="scope">
                            <el-tag  :color="convertStatusType(scope.row)">
                                <img v-bind:src="convertStatusValue(scope.row)['img']" />
                                {{convertStatusValue(scope.row)['text']}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createDate" label="CreateDate"></el-table-column>
                    <el-table-column prop="updateDate" label="UpdateDate"></el-table-column>
                    <el-table-column prop="costTime" label="CostTime(s)">
                        <template slot-scope="scope">
                            {{scope.row.costTime?scope.row.costTime/1000:''}}
                        </template>
                    </el-table-column>
                    <el-table-column label="Operation" min-width="150">
                        <template slot-scope="scope">
                            <el-button type="info" size="small" @click="detail(scope.row)">Detail</el-button>
                            <el-button type="danger"  size="small" @click="stopTask(scope.row.id)">Stop</el-button>
                            <el-button v-if="scope.row.status == 2" type="warning" size="small" @click="rollbackTask(scope.row)">Rollback</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>


        <!--================================detail================================-->
        <el-dialog title="详情" :close-on-click-modal="false" size="full" :visible.sync="detailVisible" width="60%" v-loading='dialogLoading' @close="destoryReadLogTask">
            <el-form :inline="true" label-width="80px"  :model="buildForm" ref="buildForm" class="demo-form-inline">
                <el-form-item label="Cluster:">
                    <el-input v-model="detailForm.group" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="Branch:">
                    <el-input v-model="detailForm.branch" :readonly="true"></el-input>
                </el-form-item>
                <div>
                    <template>
                        <el-table :data="detailForm.taskInstances" style="width: 100%">
                            <el-table-column prop="id" label="ID"></el-table-column>
                            <el-table-column prop="instanceName" label="Instance"></el-table-column>
                            <el-table-column prop="status" label="Status">
                                <template slot-scope="scope">
                                    <el-tag :color="convertStatusType(scope.row)">
                                        <img v-bind:src="convertStatusValue(scope.row)['img']" />
                                        {{convertStatusValue(scope.row)['text']}}
                                    </el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="result" label="Result" min-width="100">
                                <template slot-scope="scope">
                                    <el-popover placement="right" width="400" trigger="click">
                                        <el-input type="textarea" :rows="30" placeholder="暂无数据" class="mytextarea" :readonly="true" v-model="scope.row.result"></el-input>
                                        <el-button slot="reference">Detail</el-button>
                                    </el-popover>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
                <div id="terminal"></div>
                <!--<el-button @click="test()">test</el-button>-->
                <!--<div class="log">
                    <template>
                        <el-input type="textarea" :rows="30" placeholder="暂无数据" v-model="detailForm.result" class="mytextarea mytextarea2" :readonly="true">
                        </el-input>
                    </template>
                </div>-->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false;destoryReadLogTask();">Close</el-button>
          </span>
        </el-dialog>
    </section>
</template>
<script>
    import TaskHistory from './TaskHistory.js'
    export default TaskHistory
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
    }
</style>
