<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="Cluster:">
                <el-input v-model="searchParams.groupName" placeholder="e.g. sso | portal"></el-input>
            </el-form-item>

            <el-form-item label="Project:">
                <el-input v-model="searchParams.projectName" placeholder="e.g. safecloud-web-portal"></el-input>
            </el-form-item>

            <el-form-item label="Branch:">
                <el-input v-model="searchParams.branchName" placeholder="1.0.1-rc1"></el-input>
                <!--<el-select v-model="searchParams.instance" placeholder="请选择实例:">
                    <el-option label="ALL" value=""></el-option>
                    <el-option label="a" value="1"></el-option>
                    <el-option label="b" value="2"></el-option>
                </el-select>-->
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
                    <el-table-column prop="id" label="ID" min-width="30"></el-table-column>
                    <el-table-column prop="groupName" label="Group"></el-table-column>
                    <el-table-column prop="projectName" label="Project"></el-table-column>
                    <el-table-column prop="branchName" label="Branch"></el-table-column>
                    <el-table-column prop="type" label="Type" min-width="50" :formatter="convertType"></el-table-column>
                    <el-table-column prop="status" label="Status">
                        <template slot-scope="scope">
                            <el-tag :type="convertStatusType(scope.row)">
                                <img v-bind:src="convertStatusValue(scope.row)['img']" />
                                {{convertStatusValue(scope.row)['text']}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createDate" label="CreateDate"></el-table-column>
                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detail(scope.row)">Detail</el-button>
                            <el-button type="text" size="small" @click="rollbackTask(scope.row)">Rollback</el-button>
                            <el-button type="text" size="small" @click="stopTask(scope.row.id)">Stop</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================add build taskhis================================-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" v-loading='dialogLoading'>
            <el-form :inline="true" label-width="80px" size="mini" :model="buildForm" ref="buildForm"
                     class="demo-form-inline">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="Group:" prop="group">
                            <el-select v-model="buildForm.group" @change="getenvir()" placeholder="Please group">
                                <el-option
                                        v-for="item in groupData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="Env:" prop="environment">
                            <el-select v-model="buildForm.environment" @change="getinstance()" placeholder="Please Env">
                                <el-option
                                        v-for="item in envirData"
                                        :key="item.id"
                                        :label="item.remark"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="Instance:" prop="instances">
                            <el-select v-model="buildForm.instances" multiple placeholder="请选择">
                                <el-option
                                        v-for="item in instanceData"
                                        :key="item.id"
                                        :label="item.host"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="PackType:" prop="tarType">
                            <el-select v-model="buildForm.tarType" placeholder="打包类型" style="width: 100%;">
                                <el-option label="tar" :value="1"></el-option>
                                <el-option disabled label="jar" :value="2"></el-option>
                                <el-option disabled label="docker" :value="3"></el-option>
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
                    <el-col :span="12">
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
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createTask()">Create</el-button>
                <el-button @click="dialogVisible = false;">Cancel</el-button>
          </span>
        </el-dialog>

        <!--================================detail================================-->
        <el-dialog title="详情" :visible.sync="detailVisible" width="60%" v-loading='dialogLoading'>
            <el-form :inline="true" label-width="80px" size="mini" :model="buildForm" ref="buildForm" class="demo-form-inline">
                <el-form-item label="Group:">
                    <el-input v-model="detailForm.group" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="Branch:">
                    <el-input v-model="detailForm.branch" :readonly="true"></el-input>
                </el-form-item>
                <div>
                    <template>
                        <el-table :data="detailForm.taskDetails" style="width: 100%">
                            <el-table-column prop="id" label="ID"></el-table-column>
                            <el-table-column prop="instanceName" label="Instance"></el-table-column>
                            <el-table-column prop="status" label="Status">
                                <template slot-scope="scope">
                                    <el-tag :type="convertStatusType(scope.row)">
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
                <div class="log">
                    <template>
                        <el-input type="textarea" :rows="30" placeholder="暂无数据" v-model="detailForm.result" class="mytextarea mytextarea2" :readonly="true">
                        </el-input>
                    </template>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false;stopReadLogTask();">Close</el-button>
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
