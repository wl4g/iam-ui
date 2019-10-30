<template>

    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
            <el-form-item label="Name:">
                <el-input v-model="searchParams.displayName" placeholder="e.g zhangsan"></el-input>
            </el-form-item>
            <el-form-item label="Account:">
                <el-input v-model="searchParams.userName" placeholder="e.g zhangsan"></el-input>
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
                <el-button type="primary" @click="addData()" style='float:right;margin:5px'> + </el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="displayName" label="Name"></el-table-column>
                    <el-table-column prop="userName" label="Account"></el-table-column>
                    <el-table-column prop="roleStrs" label="Role" ></el-table-column>
                    <el-table-column prop="groupNameStrs" label="Group" show-overflow-tooltip ></el-table-column>
                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editData(scope.row)">Edit</el-button>
                            <el-button type="text" size="small" @click="delData(scope.row)">Del</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="small" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Name:" prop="displayName">
                            <el-input v-model="saveForm.displayName" placeholder="e.g:张三"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Account:" prop="userName">
                            <el-input v-model="saveForm.userName" placeholder="e.g zhangsan"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Password:" prop="password">
                            <el-input type="password" v-model="saveForm.password" placeholder="e.g:123456"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Email:" prop="email">
                            <el-input v-model="saveForm.email" placeholder="e.g zhangsan@gmail.com"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Phone:" prop="phone">
                            <el-input v-model="saveForm.phone" placeholder="e.g:13888888888"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="remark:" prop="remark">
                            <el-input v-model="saveForm.remark" placeholder="e.g remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <el-form-item label="Role:" prop="role">
                            <el-select v-model="saveForm.roleIds"  multiple  placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in rolesData"
                                        :key="item.id"
                                        :label="item.displayName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="20">
                        <el-form-item  label="角色："   prop="groupNames">
                            <el-input type="textarea"  class="noHide"  v-model="saveForm.groupNameStrs" @click.native='focusDo()'></el-input>
                            <el-tree
                                    v-show="treeShow"
                                    default-expand-all
                                    :data="groupsTreeData"
                                    ref="modulesTree"
                                    show-checkbox
                                    node-key="id"
                                    :check-strictly="true"
                                    @check-change = "checkChange"
                                    :props="defaultProps">
                            </el-tree>
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
    import User from './User.js'
    export default User
</script>
<style scoped>
</style>
