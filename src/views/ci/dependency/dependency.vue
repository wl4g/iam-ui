<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="ProjectName:">
                <el-input v-model="searchParams.projectName" placeholder="项目名："></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="onSubmit" type="success">Search</el-button>
            </el-form-item>

            <el-form-item style='float:right'>
                <!-- 新增按钮 -->
                <el-button type="primary" @click="addDependency()">Add</el-button>
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
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>

                    <el-table-column prop="projectName" label="Project"></el-table-column>
                    <el-table-column prop="parentName" label="Parent"></el-table-column>
                    <el-table-column prop="branch" label="ParentBranch"></el-table-column>

                    <el-table-column prop="createDate" label="CreateDate"></el-table-column>


                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editDependency(scope.row)">Edit</el-button>
                            <el-button type="text" size="small" @click="delDependency(scope.row)">Del</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm"
                     class="demo-form-inline">

                <el-form-item label="Project:" prop="projectId">
                    <el-select v-model="saveForm.projectId" placeholder="项目">
                        <el-option
                                v-for="item in ProjectData"
                                :key="item.id"
                                :label="item.projectName"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Dependent:" prop="dependentId">
                            <el-select v-model="saveForm.dependentId" placeholder="父项目">
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
                        <el-form-item label="Parent Branch:" prop="branch">
                            <el-input v-model="saveForm.branch" placeholder="父项目分支"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveDependency()">Save</el-button>
                <el-button @click="dialogVisible = false;">Cancel</el-button>
          </span>
        </el-dialog>


    </section>
</template>


<script>
    import Dependency from './Dependency.js'

    export default Dependency
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
