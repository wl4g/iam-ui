<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="Id:">
                <el-input v-model="searchParams.id" placeholder="Id："></el-input>
            </el-form-item>
            <el-form-item label="Name:">
                <el-input v-model="searchParams.name" placeholder="Name："></el-input>
            </el-form-item>
            <el-form-item label="TaskId:">
                <el-input v-model="searchParams.taskId" placeholder="TaskId："></el-input>
            </el-form-item>
            <el-form-item label="Status:">
                <!--<el-switch v-model="searchParams.enable" on-value="1" off-value="0"></el-switch>-->
                <el-select v-model="searchParams.enable">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Create Date Range:">
                <el-date-picker v-model="searchParams.startDate" type="date" placeholder="Start Date" format="yyyy - MM - dd " ></el-date-picker>
                <el-date-picker v-model="searchParams.endDate" type="date" placeholder="End Date" format="yyyy - MM - dd" ></el-date-picker>
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
                <el-button type="primary" @click="addTrigger()" style='float:right;margin:5px' >Add</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>

                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="taskId" label="Task ID"></el-table-column>

                    <el-table-column prop="type" label="type">
                        <template slot-scope="scope">
                            {{convertType(scope.row)}}
                        </template>
                    </el-table-column>


                    <el-table-column prop="enable" label="Status">
                        <template slot-scope="scope">
                            <el-tag :type="convertEnableType(scope.row)">{{convertEnableValue(scope.row)}}</el-tag>
                        </template>
                    </el-table-column>



                    <el-table-column prop="createDate" label="CreateDate"></el-table-column>
                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editTrigger(scope.row)">Edit</el-button>
                            <el-button type="text" size="small" @click="delTrigger(scope.row)">Del</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" :rules="rules"
                     class="demo-form-inline">

                <!--<el-row>
                    <el-col :span="12">
                        <el-form-item label="Project:" prop="projectId">
                            <el-select v-model="saveForm.projectId" placeholder="项目" style="width: 100%;">
                                <el-option
                                        v-for="item in ProjectData"
                                        :key="item.id"
                                        :label="item.projectName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Branch:" prop="branchName">
                            <el-input v-model="saveForm.branchName" placeholder="项目分支"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>-->


                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Group:" prop="group">
                            <el-select v-model="saveForm.group" @change="getTasksByAppClusterId()" placeholder="Please group" style="width: 100%;">
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
                        <el-form-item label="Env:" prop="taskId">
                            <el-select v-model="saveForm.taskId" placeholder="Please Task" style="width: 100%;">
                                <el-option
                                        v-for="item in tasksData"
                                        :key="item.id"
                                        :label="item.taskName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-row>
                    <!--<el-col :span="12">
                        <el-form-item label="Env:" prop="environment">
                            <el-select v-model="saveForm.environment" @change="getinstance()" placeholder="Please Env" style="width: 100%;">
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


                <el-form-item label="Instance:" prop="instances">
                    <el-select v-model="saveForm.instances" multiple placeholder="请选择" style="width: 100%;">
                        <el-option
                                v-for="item in instanceData"
                                :key="item.id"
                                :label="item.host"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>-->

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Type:" prop="type">
                            <el-select v-model="saveForm.type" placeholder="类型" style="width: 100%;">
                                <el-option label="调度" :value="4"></el-option>
                                <el-option label="钩子" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Cron:" prop="cron" v-if="saveForm.type==4">
                            <!--<el-input  v-model="saveForm.cron" placeholder="时间表达式" @change="checkCron"></el-input>-->
                            <el-popover placement="right" width="200" trigger="focus" title="最近5次运行时间:">
                                <el-input type="textarea" :rows="10" placeholder="暂无数据" :readonly="true" v-model="checkResult"></el-input>
                                <el-input slot="reference" v-model="saveForm.cron" placeholder="时间表达式" @change="checkCron"></el-input>
                            </el-popover>

                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <!--<el-col :span="12">
                        <el-form-item label="PackType:" prop="tarType">
                            <el-select v-model="saveForm.tarType" placeholder="打包类型" style="width: 100%;">
                                <el-option label="tar" :value="1"></el-option>
                                <el-option disabled label="jar" :value="2"></el-option>
                                <el-option label="docker" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>-->
                    <el-col :span="12">
                        <el-form-item label="Name:" prop="name">
                            <el-input v-model="saveForm.name" placeholder="备注"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Enable:" prop="enable">
                            <el-switch v-model="saveForm.enable" :on-value="1" :off-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="Remark:" prop="remark">
                    <el-input v-model="saveForm.remark" placeholder="备注"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveTrigger()">Save</el-button>
                <el-button @click="dialogVisible = false;">Cancel</el-button>
          </span>
        </el-dialog>


    </section>
</template>


<script>
    import Trigger from './Trigger.js'

    export default Trigger
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
