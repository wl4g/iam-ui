<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
            <el-form-item label="Id:">
                <el-input v-model="searchParams.id" placeholder="id" style="width: 80px;"></el-input>
            </el-form-item>
            <el-form-item label="TaskName:">
                <el-input v-model="searchParams.taskName" placeholder="任务名" ></el-input>
            </el-form-item>
            <el-form-item label="GroupName:">
                <el-input v-model="searchParams.groupName" placeholder="分组名" ></el-input>
            </el-form-item>
            <!--<el-form-item label="ProjectName:">
                <el-input v-model="searchParams.projectName" placeholder="项目名" style="width: 120px;"></el-input>
            </el-form-item>-->
            <el-form-item label="BranchName:">
                <el-input v-model="searchParams.branchName" placeholder="分支名" ></el-input>
            </el-form-item>
            <el-form-item label="PackType:">
                <el-select v-model="searchParams.tarType" placeholder="Pack" style="width: 100px;">
                    <el-option label="All" value=""></el-option>
                    <el-option label="tar" :value="1"></el-option>
                    <el-option disabled label="jar" :value="2"></el-option>
                    <el-option disabled label="docker" :value="3"></el-option>
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
                <el-button style='float:right;margin:5px' type="primary" @click="add()">Add</el-button>
                <!--<el-button style='float:right;margin:5px' type="primary" @click="create()">Add</el-button>-->
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData"  style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="taskName" label="Name"></el-table-column>
                    <el-table-column prop="groupName" label="Group"></el-table-column>
                    <el-table-column prop="instances" label="Instance Count">
                        <template slot-scope="scope">
                            <el-popover placement="right" width="200" trigger="hover">
                                <el-input type="textarea" :rows="3" placeholder="暂无数据" :readonly="true" :value="instances2Str(scope.row)"></el-input>
                                <el-button slot="reference">{{countInstance(scope.row)}}</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="branchName" label="Branch"></el-table-column>
                    <!--<el-table-column prop="projectName" label="Project"></el-table-column>-->
                    <el-table-column prop="tarType" label="PackType" min-width="50" :formatter="convertTarType"></el-table-column>
                    <el-table-column prop="createDate" label="CreateDate"></el-table-column>
                    <el-table-column prop="preCommand" label="Pre Command"></el-table-column>
                    <el-table-column prop="postCommand" label="Post Command"></el-table-column>

                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="runTask(scope.row)">Build</el-button>
                            <el-button type="text" size="small" @click="taskDetail(scope.row)">Edit</el-button>
                            <el-button type="text" size="small" @click="delTask(scope.row)">Del</el-button>
                            <!--<el-button type="text" size="small" @click="rollbackTask(scope.row)">Rollback</el-button>-->
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================add build taskhis================================-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :model="buildForm" ref="buildForm"
                     class="demo-form-inline">

                <el-row>
                    <el-col :span="11">
                        <el-form-item label="TaskName:" prop="taskName">
                            <el-input v-model="buildForm.taskName" placeholder="Task Name" style="width: 100%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="Group:" prop="group">
                            <el-select v-model="buildForm.group" @change="getenvir()" placeholder="Please group" style="width: 100%">
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
                                        v-for="item in envirData"
                                        :key="item.id"
                                        :label="item.remark"
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
                    <el-col :span="22">
                        <el-form-item label="Instance:" prop="instances">
                            <el-select v-model="buildForm.instances" multiple placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in instanceData"
                                        :key="item.id"
                                        :label="item.host"
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
                        <el-form-item label="PreCommand:" prop="preCommand">
                            <el-input type="textarea" v-model="buildForm.preCommand" :rows="3" placeholder="暂无数据"></el-input>
                        </el-form-item>

                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="22">
                        <el-form-item label="PostCommand:" prop="postCommand">
                            <el-input type="textarea" v-model="buildForm.postCommand" :rows="3" placeholder="暂无数据"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save()">Save</el-button>
                <el-button @click="dialogVisible = false;">Cancel</el-button>
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
