<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="GroupName:">
                <el-input v-model="searchParams.groupName" placeholder="分组名："></el-input>
            </el-form-item>

            <el-form-item label="ProjectName:">
                <el-input v-model="searchParams.projectName" placeholder="项目名："></el-input>
            </el-form-item>

            <el-form-item label="BranchName:">
                <el-input v-model="searchParams.branchName" placeholder="分支名："></el-input>
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
                <el-button type="primary" @click="create()">Create</el-button>
            </el-form-item>

        </el-form>

        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="line"></div>
            <div class="">Result Total： <span class="number">{{total}}</span></div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" @row-dblclick="doubleClickRow" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="groupName" label="Group"></el-table-column>
                    <el-table-column prop="projectName" label="Project"></el-table-column>
                    <el-table-column prop="branchName" label="Branch"></el-table-column>

                    <el-table-column prop="type" label="Type" min-width="50" :formatter="convertType"></el-table-column>


                    <el-table-column prop="status" label="Status" :formatter="convertStatus"></el-table-column>
                    <!--<el-table-column prop="result" label="Result" :show-overflow-tooltip="true"></el-table-column>-->
                    <el-table-column prop="createDate" label="CreateDate"></el-table-column>

                    <!--<el-table-column prop="envRemark" label="Environment" min-width="120"></el-table-column>
                    <el-table-column prop="host" label="Host"></el-table-column>-->

                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detail(scope.row)">Detail</el-button>
                            <el-button type="text" size="small" @click="rollbackTask(scope.row)">Rollback</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================add build task================================-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" v-loading='dialogLoading'>
            <el-form :inline="true" label-width="80px" size="mini" :model="buildForm" ref="buildForm"
                     class="demo-form-inline">

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

                <el-form-item label="Instance:" prop="instances">
                    <el-select v-model="buildForm.instances" multiple placeholder="请选择">

                        <!--<el-option label="ALL" value=""></el-option>
                        <el-option label="a" value="1"></el-option>
                        <el-option label="b" value="2"></el-option>-->
                        <el-option
                                v-for="item in instanceData"
                                :key="item.id"
                                :label="item.host"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="Branch:" prop="instances">
                    <el-input v-model="buildForm.branch" placeholder="分支名"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createTask()">Create</el-button>
                <el-button @click="dialogVisible = false;if(!isedit){instancelist=[]}">Cancel</el-button>
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

                            <el-table-column prop="status" label="Status" :formatter="convertStatus"></el-table-column>
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
                        <el-input type="textarea" :rows="30" placeholder="暂无数据" v-model="detailForm.result" class="mytextarea" :readonly="true">
                        </el-input>
                    </template>
                </div>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false;">Close</el-button>
          </span>
        </el-dialog>

    </section>
</template>


<script>
    import Task from './Task.js'

    export default Task
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
