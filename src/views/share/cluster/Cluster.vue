<template>

    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="searchbar" @keyup.enter.native="onSubmit()">

            <el-form-item :label="$t('message.common.name')">
                <el-input v-model="searchParams.clusterName" placeholder="Name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="onSubmit" type="success" :loading="loading">{{$t('message.common.search')}}</el-button>
            </el-form-item>
        </el-form>

        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="query-left">
                <div class="line"></div>
                Result Total： <span class="number">{{total}}</span>
            </div>
            <!-- 新增按钮 -->
            <el-button type="primary" @click="addData()" > + </el-button>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column :label="$t('message.common.selectAll')" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" :label="$t('message.common.name')"></el-table-column>
                    <el-table-column prop="instanceCount" :label="$t('message.ci.instances')"></el-table-column>
                    <el-table-column prop="remark" :label="$t('message.common.remark')" ></el-table-column>

                    <el-table-column :label="$t('message.common.operation')" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="info" icon='edit' @click="editData(scope.row)">{{$t('message.common.edit')}}</el-button>
                            <el-button type="danger" icon='delete'  @click="delData(scope.row)">{{$t('message.common.del')}}</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :close-on-click-modal="false" :title="dialogTitle" width="80%" :visible.sync="dialogVisible" v-loading='dialogLoading'>
            <el-form label-width="80px" :model="saveForm" ref="saveForm" class="demo-form-inline" :rules="rules">

                <el-row>
                    <el-col :span="6">
                        <el-form-item :label="$t('message.common.name')" prop="name">
                            <el-input :disabled="isEdit" v-model="saveForm.name" placeholder="e.g:sso"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="18">
                        <el-form-item :label="$t('message.common.remark')" prop="remark">
                            <el-input v-model="saveForm.remark" placeholder="remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- instances -->
                <el-row >
                    <el-col :span="24">
                        <el-form-item :label="$t('message.ci.instances')">
                            <template>
                                <el-table :data="saveForm.instances" border style="width: 100%">

                                    <el-table-column prop="env" :label="$t('message.ci.env')">
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

                                    <el-table-column prop="host" :label="$t('message.iam.host')">
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

                                    <el-table-column prop="endpoint" :label="$t('message.common.endpoint')">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.endpoint" placeholder="Endpoint"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="sshUser" :label="$t('message.share.sshUser')">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.sshUser" placeholder="sshUser"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="sshKey" :label="$t('message.share.sshKey')" >
                                        <template scope="scope">
                                            <el-input type="textarea" :rows="2"  v-model="scope.row.sshKey" placeholder="sshKey"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="sshKeyPub" :label="$t('message.share.sshKeyPub')" >
                                        <template scope="scope">

                                            <el-tooltip class="item" effect="dark" :content="sshKeyPubTip(scope.row)" placement="top-start">
                                                <el-input type="textarea" :rows="2"  v-model="scope.row.sshKeyPub" placeholder="sshKeyPub"></el-input>
                                            </el-tooltip>

                                        </template>
                                    </el-table-column>

                                    <el-table-column prop="remark" :label="$t('message.common.remark')">
                                        <template scope="scope">
                                            <el-input size="small" v-model="scope.row.remark" placeholder="remark"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column :label="$t('message.common.operation')">
                                        <template slot-scope="scope">
                                            <el-button @click.native.prevent="deleteRow(scope.$index)" type="text" size="mini" style="float: left;line-height: 20px;">
                                                {{$t('message.common.del')}}
                                            </el-button>
                                            <el-button @click.native.prevent="connectTest(scope.row)" type="text" size="mini" style="float: left;line-height: 20px;">
                                                {{$t('message.share.connectTest')}}
                                            </el-button>
                                            <el-button @click.native.prevent="copyRow(scope.row)" type="text" size="mini" style="float: left;line-height: 20px;">
                                                {{$t('message.share.copy')}}
                                            </el-button>
                                            <el-button @click.native.prevent="generateSshKey(scope.row)" type="text" size="mini" style="float: left;line-height: 20px;">
                                                {{$t('message.share.generateSshKey')}}
                                            </el-button>
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
                        <el-button type="primary" @click="saveData()" :loading="dialogLoading">{{$t('message.common.save')}}</el-button>
                        <el-button @click="dialogVisible = false">{{$t('message.common.cancel')}}</el-button>
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
