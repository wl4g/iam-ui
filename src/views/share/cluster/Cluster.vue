<template>

    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="Name:">
                <el-input v-model="searchParams.clusterName" placeholder="Name"></el-input>
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
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="instanceCount" label="Instances"></el-table-column>
                    <el-table-column prop="remark" label="Remark" ></el-table-column>

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
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="large" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline">

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="Name:" prop="name">
                            <el-input :disabled="isEdit" v-model="saveForm.name" placeholder="e.g:sso"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="18">
                        <el-form-item label="Remark:" prop="remark">
                            <el-input v-model="saveForm.remark" placeholder="remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- instances -->
                <el-row >
                    <el-col :span="24">
                        <el-form-item label="Instances:">
                            <template>
                                <el-table :data="saveForm.instances" style="width: 100%">

                                    <el-table-column prop="env" label="Env">
                                        <template scope="scope">
                                            <el-select v-model="scope.row.envType" placeholder="Env">
                                                <el-option
                                                        v-for="item in dictutil.getDictListByType('app_ns_type')"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="host" label="Host">
                                        <template scope="scope">
                                                <el-select v-model="scope.row.hostId" placeholder="Host">
                                                    <el-option
                                                            v-for="item in allHost"
                                                            :key="item.id"
                                                            :label="item.hostname"
                                                            :value="item.id">
                                                    </el-option>
                                                </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="endpoint" label="Endpoint">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.endpoint" placeholder="Endpoint"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="sshUser" label="sshUser">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.sshUser" placeholder="sshUser"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="sshKey" label="sshKey" >
                                        <template scope="scope">
                                            <el-input type="textarea" :rows="2"  v-model="scope.row.sshKey" placeholder="sshKey"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="remark" label="Remark">
                                        <template scope="scope">
                                            <el-input size="small" v-model="scope.row.remark" placeholder="remark"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Operation">
                                        <template slot-scope="scope">
                                            <el-row>
                                                <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="mini" style="float: left;line-height: 20px;">
                                                    Delete
                                                </el-button>
                                            </el-row>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <!--</div>-->
                            <el-button type="primary"  @click.native.prevent="addRow()"> + </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveData()">Save</el-button>
                        <el-button @click="dialogVisible = false;">Cancel</el-button>
                    </span>
        </el-dialog>

    </section>
</template>
<script>
    import Cluster from './Cluster.js'
    export default Cluster
</script>
<style scoped>
</style>
