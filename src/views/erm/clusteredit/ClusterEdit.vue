<template>
    <section id="configuration" class="configuration">
        <el-form label-width="50px" :model="saveForm" ref="saveForm" class="demo-form-inline" :rules="rules">

            <el-row>
                <el-col :span="6">
                    <el-form-item :label="$t('message.common.name')" prop="name">
                        <el-input :disabled="isEdit" v-model="saveForm.name" placeholder="e.g:sso"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="15">
                    <el-form-item :label="$t('message.common.remark')" prop="remark">
                        <el-input type="textarea" v-model="saveForm.remark" placeholder="remark"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="2" :offset="1">
                    <el-button type="info" @click="back()">{{$t('message.common.back')}}</el-button>
                </el-col>
            </el-row>

            <!-- instances -->
            <el-row >
                <el-col :span="24">
                    <el-form-item :label="$t('message.ci.instances')">
                        <template>
                            <el-table :data="saveForm.instances" border style="width: 100%">

                                <el-table-column width="120" :label="$t('message.ci.env')">
                                    <template scope="scope">
                                        <el-form-item  :prop="`instances.${scope.$index}.envType`" :rules="rules.envType">
                                            <el-select v-model="scope.row.envType" placeholder="Env">
                                                <el-option
                                                        v-for="item in dictutil.getDictListByType('app_ns_type')"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column width="140" prop="host" :label="$t('message.iam.host')">
                                    <template scope="scope">
                                        <el-form-item  :prop="`instances.${scope.$index}.hostId`" :rules="rules.hostId">
                                            <el-select v-model="scope.row.hostId" placeholder="Host">
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

                                <el-table-column  width="100" prop="endpoint" :label="$t('message.common.endpoint')">
                                    <template scope="scope">
                                        <el-form-item  :prop="`instances.${scope.$index}.endpoint`" :rules="rules.endpoint">
                                            <el-input v-model="scope.row.endpoint" placeholder="Endpoint"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column  width="100" prop="sshUser" :label="$t('message.share.sshUser')">
                                    <template scope="scope">
                                        <el-form-item  :prop="`instances.${scope.$index}.sshUser`" :rules="rules.sshUser">
                                            <el-input v-model="scope.row.sshUser" placeholder="sshUser"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column  width="180" prop="sshKey" :label="$t('message.share.sshKey')" >
                                    <template scope="scope">
                                        <el-form-item  :prop="`instances.${scope.$index}.sshKey`" :rules="rules.sshKey">
                                            <el-col :span="21">
                                                <el-input type="textarea"  class="my-table-textarea"  v-model="scope.row.sshKey" placeholder="sshKey" @focus="openTextDialogVisible(scope.row,false)"></el-input>
                                            </el-col>
                                            <el-col :offset="1" :span="2">
                                                <i class="el-icon-search" @click="openTextDialogVisible(scope.row,false)"></i>
                                            </el-col>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column width="180" prop="sshKeyPub" :label="$t('message.share.sshKeyPub')" >
                                    <template scope="scope">
                                        <el-form-item  :prop="`instances.${scope.$index}.sshKeyPub`" :rules="rules.sshKeyPub">
                                            <el-col :span="21">
                                                <el-input  type="textarea"  class="my-table-textarea" v-model="scope.row.sshKeyPub" placeholder="sshKeyPub" @focus="openTextDialogVisible(scope.row,true)"></el-input>
                                            </el-col>
                                            <el-col :offset="1" :span="2">
                                                <i class="el-icon-search" @click="openTextDialogVisible(scope.row,true)"></i>
                                            </el-col>
                                        </el-form-item>
                                    </template>
                                </el-table-column>

                                <el-table-column width="120" prop="remark" :label="$t('message.common.remark')">
                                    <template scope="scope">
                                        <el-form-item>
                                            <el-input size="small" v-model="scope.row.remark" placeholder="remark"></el-input>
                                        </el-form-item>
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
                                        <el-button @click.native.prevent="confirmGenerateSshKey(scope.row)" type="text" size="mini" style="float: left;line-height: 20px;">
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
        <el-row>
            <el-col :span="4" :offset="20">
                <el-button type="primary" @click="saveData()" :loading="loading">{{$t('message.common.save')}}</el-button>
                <el-button @click="back()">{{$t('message.common.cancel')}}</el-button>
            </el-col>
        </el-row>


        <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="textDialogVisible" width="40%" :before-close="closeTextDialogVisible">
            <el-input v-if="!isPub" type="textarea" ref="inputRef" :autosize="{ minRows: 3 }" v-model="tempText"></el-input>

            <el-popover v-if="isPub" placement="right" width="400" trigger="focus" >
                <el-row>
                    <el-row :span="2">
                        参考命令:
                    </el-row>
                </el-row>
                <el-row>
                    <el-row :span="2">
                        <!--<code v-model="sshKeyPubTip(tempText)"></code>-->
                        <code>
                            {{sshKeyPubTip(tempText)}}
                        </code>
                    </el-row>
                </el-row>
                <el-input slot="reference" type="textarea" ref="inputRef" :autosize="{ minRows: 3 }" v-model="tempText"></el-input>
            </el-popover>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeTextDialogVisible">确 定</el-button>
              </span>
        </el-dialog>


        <el-dialog :close-on-click-modal="false" title="编辑" :visible.sync="tipDialogVisible" width="40%" >
            <span>已成功创建密钥对，请把公钥复制到host主机</span><br/>
            <code>
                {{tempText}}
            </code>
            <el-button type="text" v-clipboard:copy="tempText" v-clipboard:success="onCopySuccess">复制</el-button>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tipDialogVisible=false;">知道了</el-button>
              </span>
        </el-dialog>

    </section>
</template>


<script>
    import ClusterEdit from './ClusterEdit.js'

    export default ClusterEdit
</script>

<style>
    .my-table-textarea textarea{
        overflow:hidden;
        resize:none;
        height: 29px !important;
        min-height: 29px !important;
    }

</style>
