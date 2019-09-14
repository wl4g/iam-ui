<template>
    <section id="instance" class="instance">
        <!-- //表单 -->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">

            <el-form-item label="Group:">
                <el-select v-model="selectProp.group" @change="getenvir(0)" placeholder="请选择分组：">
                    <el-option label="ALL" value=""></el-option>
                    <el-option
                            v-for="item in groupData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Environment:">
                <el-select v-model="selectProp.environment" placeholder="请选择环境：">
                    <el-option label="ALL" value=""></el-option>
                    <el-option
                            v-for="item in envirData"
                            :key="item.id"
                            :label="item.remark"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="success" @click="queryList">Search</el-button>
            </el-form-item>
        </el-form>


        <!-- 弹窗内容 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @close='closeDialog;selectdisabled=false' size="large">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                <!-- 插入内容 -->
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="Group:" v-if="!selectdisabled" prop="group">
                            <el-select v-model="ruleForm.group" @change="getenvir(1)" placeholder="Please a group name">
                                <!-- <el-option label="全部" value=""></el-option> -->
                                <el-option
                                        v-for="item in groupData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="Environment:" v-if="!selectdisabled" prop="environment">
                            <el-select v-model="ruleForm.environment" placeholder="Please a environment name">
                                <!-- <el-option label="全部" value=""></el-option> -->
                                <el-option
                                        v-for="item in envirFormData"
                                        :key="item.id"
                                        :label="item.remark"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Instance:">
                            <!-- 查询结果表格 -->
                            <template>
                                <el-table :data="ruleForm.tableData1">
                                    <el-table-column label="Enable" width="100">
                                        <template scope="scope">
                                            <el-checkbox v-model="scope.row.enable" @change="handleEdit(scope.$index, scope.row)"></el-checkbox>
                                        </template>
                                    </el-table-column>
                                    <!-- 动态标签 -->

                                    <!-- 0816 modify -->
                                    <el-table-column prop="host" label="Host">
                                        <template scope="scope">
                                            <el-form-item :prop="'tableData1.' + scope.$index + '.hostId'">
                                                <el-select v-model="scope.row.hostId" placeholder="Please host">
                                                    <el-option
                                                            v-for="item in allHost"
                                                            :key="item.id"
                                                            :label="item.hostname"
                                                            :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="endpoint" label="Endpoint">
                                        <template scope="scope">
                                            <el-form-item :prop="'tableData1.' + scope.$index + '.endpoint'">
                                                <el-input size="small" v-model.number="scope.row.endpoint"
                                                          placeholder="Pleas port"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="sshUser" label="SshUser">
                                        <template scope="scope">
                                            <el-form-item :prop="'tableData1.' + scope.$index + '.sshUser'">
                                                <el-input size="small" v-model.number="scope.row.sshUser"
                                                          placeholder="Pleas SshUser"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="sshKey" label="SshKey">
                                        <template scope="scope">
                                            <el-form-item :prop="'tableData1.' + scope.$index + '.sshKey'">
                                                <el-input type="textarea" :rows="1" size="small" v-model.number="scope.row.sshKey"
                                                          placeholder="Pleas SshKey"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="remark" label="Remark">
                                        <template scope="scope">
                                            <el-form-item :prop="'tableData1.' + scope.$index + '.remark'" :rules='rules.remark' size="large">
                                                <el-input size="small" v-model="scope.row.remark" placeholder="Please remark"></el-input>
                                            </el-form-item>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Operation">
                                        <template slot-scope="scope">
                                            <el-row>
                                                <el-button
                                                        @click.native.prevent="deleteInstance(scope.$index, scope.row.id)"
                                                        type="text"
                                                        size="mini"
                                                >
                                                    Delete
                                                </el-button>
                                            </el-row>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <p>
                                <el-button type="primary" @click.native.prevent="addRow()"> + </el-button>
                            </p>

                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
            <!-- end -->
            <span slot="footer" class="dialog-footer" style="text-align:center;">
              <el-button @click="dialogVisible = false;selectdisabled = false">Cancel</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">OK</el-button>
            </span>
        </el-dialog>


        <!-- 查询结果数值 -->
        <div class="query">
            <div class="line"></div>
            <div class="">Result Total： <span class="number">{{total}}</span>
                <!-- 新增按钮 -->
                <el-button type="primary" @click="addOne" style='float:right;margin:5px'> + </el-button>
            </div>
        </div>

        <!-- 查询结果表格 -->
        <div v-loading='loading'>
            <template>
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="Group">
                    </el-table-column>
                    <el-table-column
                            prop="instanceCount"
                            label="Instances"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="evnname"
                            label="Environment"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="Remark"
                    >
                    </el-table-column>
                    <el-table-column
                            label="Operation"
                    >
                        <template slot-scope="scope">
                            <el-button @click="deleteRow(scope.row.evnsci)" type="text" size="small">Delete</el-button>
                            <el-button type="text" size="small" @click="editOne(scope.row)">Edit</el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        @current-change='currentChange'
                >
                </el-pagination>
            </template>
        </div>
    </section>
</template>
<script>
    import Instance from './Instance.js'
    export default Instance
</script>
<style>
</style>
