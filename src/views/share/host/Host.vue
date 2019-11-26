<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline" @keyup.enter.native="onSubmit()">
            <el-form-item label="Name:">
                <el-input v-model="searchParams.name" placeholder="e.g. localhost" style="width:165px"></el-input>
            </el-form-item>
            <el-form-item label="Hostname:">
                <el-input v-model="searchParams.hostname" placeholder="e.g. localhost" style="width:165px"></el-input>
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
                <el-button type="primary" @click="addData()" style='float:right;margin:5px'>+ Add Host</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width:100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column width="100" prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="hostname" label="Hostname"></el-table-column>
                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="info" icon='edit' size="small" @click="editData(scope.row)">Edit</el-button>
                            <el-button type="danger" icon='delete' size="small" @click="delData(scope.row)">Del</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogVisible" size="small" v-loading='dialogLoading'>
            <el-form label-width="165px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline" :rules="rules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Name:" prop="name">
                            <el-input v-model="saveForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Provider:" prop="provider">
                            <el-select v-model="saveForm.provider">
                                <el-option
                                        v-for="item in dictutil.getDictListByType('vcs_provider')"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="AuthType:" prop="authType">
                            <el-select v-model="saveForm.authType">
                                <el-option
                                        v-for="item in dictutil.getDictListByType('vcs_auth_type')"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Repo BaseURI:" prop="baseUri">
                            <el-input v-model="saveForm.baseUri"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="saveForm.authType==1">
                    <el-col :span="12">
                        <el-form-item label="Username:" prop="username">
                            <el-input v-model="saveForm.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Password:" prop="password">
                            <el-input v-model="saveForm.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="saveForm.authType!=1">
                    <el-col :span="24">
                        <el-form-item label="SshKey:" prop="sshKey">
                            <el-input v-model="saveForm.sshKey"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="saveForm.authType!=1">
                    <el-col :span="24">
                        <el-form-item label="SshKey Pub:" prop="sshKeyPub">
                            <el-input v-model="saveForm.sshKeyPub"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Access Token:" prop="token">
                            <el-input v-model="saveForm.token"></el-input>
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
    import Host from './Host.js'

    export default Host
</script>

<style scoped>

</style>
s
