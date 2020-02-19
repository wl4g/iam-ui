<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane :label="$t('message.ci.contact')">
                <section id="configuration" class="configuration">
                    <el-form :inline="true" :model="searchParams" class="searchbar" @keyup.enter.native="onSubmit()">
                        <el-form-item :label="$t('message.common.name')">
                            <el-input v-model="searchParams.name" placeholder="名字"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('message.common.email')">
                            <el-input v-model="searchParams.email" placeholder="Email"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('message.common.phone')">
                            <el-input v-model="searchParams.phone" placeholder="Phone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="onSubmit" type="success" :loading="submitLoading">{{$t('message.common.search')}}</el-button>
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
                        <el-button type="primary" @click="addContact()"> + </el-button>
                    </div>
                    <!-- 查询结果表格 -->
                    <div>
                        <template>
                            <el-table :data="contactData" style="width: 100%">
                                <el-table-column :label="$t('message.common.selectAll')" type="selection"></el-table-column>
                                <el-table-column prop="id" label="ID"></el-table-column>
                                <el-table-column prop="name" :label="$t('message.common.name')"></el-table-column>
                                <el-table-column prop="email" :label="$t('message.common.email')"></el-table-column>
                                <el-table-column prop="phone" :label="$t('message.common.phone')"></el-table-column>

                                <el-table-column :label="$t('message.common.operation')" min-width="100">
                                    <template slot-scope="scope">
                                        <el-button type="info" icon='edit' @click="editContact(scope.row)">{{$t('message.common.edit')}}</el-button>
                                        <el-button type="danger" icon='delete' @click="delContact(scope.row)">{{$t('message.common.del')}}</el-button>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </template>
                    </div>
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>


                </section>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.common.group')">
                <el-form :inline="true" :model="searchGroupParams" class="searchbar">
                    <el-form-item :label="$t('message.common.name')">
                        <el-input v-model="searchGroupParams.name" placeholder="Input group name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="getGroupData" type="success" :loading="groupLoading">{{$t('message.common.search')}}</el-button>
                    </el-form-item>
                </el-form>
                <!--================================table================================-->
                <!-- 查询结果数值 -->
                <div class="query">
                    <div class="query-left">
                        <div class="line"></div>
                        Result Total： <span class="number">{{groupTotal}}</span>
                    </div>

                    <!-- 新增按钮 -->
                    <el-button type="primary" @click="addGroup()"> + </el-button>
                </div>
                <!-- 查询结果表格 -->
                <div>
                    <template>
                        <el-table :data="contactGroupData" border style="width: 100%">
                            <el-table-column :label="$t('message.common.selectAll')" type="selection"></el-table-column>
                            <el-table-column prop="id" label="ID"></el-table-column>
                            <el-table-column prop="name" :label="$t('message.common.name')">
                                <template slot-scope="scope">
                                    <!--<el-button size="small" :disabled="convertLockStatusDisable(scope.row)" @click="unlock(scope.row)">{{convertLockStatus(scope.row)}}</el-button>-->
                                    <el-input  v-model="scope.row.name"></el-input>
                                </template>
                            </el-table-column>

                            <!--<el-table-column prop="name" :label="$t('message.common.name')">
                                <template slot-scope="scope">
                                    <el-button size="small" :disabled="convertLockStatusDisable(scope.row)" @click="unlock(scope.row)">{{convertLockStatus(scope.row)}}</el-button>
                                </template>
                            </el-table-column>-->

                            <el-table-column :label="$t('message.common.operation')" min-width="100">
                                <template slot-scope="scope">
                                    <el-button type="success" @click="saveGroup(scope.row)">{{$t('message.common.save')}}</el-button>
                                    <el-button type="danger"  @click="delContactGroup(scope.row)">{{$t('message.common.del')}}</el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                    </template>
                </div>
                <el-pagination background layout="prev, pager, next" :total="groupTotal" @current-change='currentChangeGroup'></el-pagination>

            </el-tab-pane>
        </el-tabs>

        <!--================================save dialog================================-->
        <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogVisible" width="80%"  v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline" :rules="rules">

                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('message.common.name')" prop="name">
                            <el-input v-model="saveForm.name" placeholder="Name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.common.email')" prop="email">
                            <el-input v-model="saveForm.email" placeholder="Email"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item :label="$t('message.common.enable')" prop="emailEnable">
                            <el-switch v-model="saveForm.emailEnable" :on-value="1" :off-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.common.phone')" prop="phone">
                            <el-input v-model="saveForm.phone" placeholder="Phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item :label="$t('message.common.enable')" prop="phoneEnable">
                            <el-switch v-model="saveForm.phoneEnable" :on-value="1" :off-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.timeOfFreq')" prop="phoneTimeOfFreq">
                            <el-input v-model="saveForm.phoneTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.numOfFreq')" prop="phoneNumOfFreq">
                            <el-input v-model="saveForm.phoneNumOfFreq" placeholder="NumOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.dingtalk')" prop="dingtalk">
                            <el-input v-model="saveForm.dingtalk" placeholder="dingtalk"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item :label="$t('message.common.enable')" prop="dingtalkEnable">
                            <el-switch v-model="saveForm.dingtalkEnable" :on-value="1" :off-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.timeOfFreq')" prop="dingtalkTimeOfFreq">
                            <el-input v-model="saveForm.dingtalkTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.numOfFreq')" prop="dingtalkNumOfFreq">
                            <el-input v-model="saveForm.dingtalkNumOfFreq" placeholder="NumOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.wechat')" prop="wechat">
                            <el-input v-model="saveForm.wechat" placeholder="Wechat"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item :label="$t('message.common.enable')" prop="wechatEnable">
                            <el-switch v-model="saveForm.wechatEnable" :on-value="1" :off-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.timeOfFreq')" prop="wechatTimeOfFreq">
                            <el-input v-model="saveForm.wechatTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.numOfFreq')" prop="wechatNumOfFreq">
                            <el-input v-model="saveForm.wechatNumOfFreq" placeholder="NumOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.twitter')" prop="twitter">
                            <el-input v-model="saveForm.twitter" placeholder="Twitter"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item :label="$t('message.common.enable')" prop="twitterEnable">
                            <el-switch v-model="saveForm.twitterEnable" :on-value="1" :off-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.timeOfFreq')" prop="twitterTimeOfFreq">
                            <el-input v-model="saveForm.twitterTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.numOfFreq')" prop="twitterNumOfFreq">
                            <el-input v-model="saveForm.twitterNumOfFreq" placeholder="NumOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.facebook')" prop="facebook">
                            <el-input v-model="saveForm.facebook" placeholder="Facebook"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item :label="$t('message.common.enable')" prop="facebookEnable">
                            <el-switch v-model="saveForm.facebookEnable" :on-value="1" :off-value="0"></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.timeOfFreq')" prop="facebookTimeOfFreq">
                            <el-input v-model="saveForm.facebookTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item :label="$t('message.share.numOfFreq')" prop="facebookNumOfFreq">
                            <el-input v-model="saveForm.facebookNumOfFreq" placeholder="NumOfFreq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="16">
                        <el-form-item :label="$t('message.common.group')" prop="groups">
                            <el-select v-model="saveForm.groups" multiple placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in contactGroupData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>


            </el-form>
            <span slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="saveContact()" :loading="dialogLoading">{{$t('message.common.save')}}</el-button>
                            <el-button @click="dialogVisible = false;">{{$t('message.common.cancel')}}</el-button>
                        </span>
        </el-dialog>

    </div>
</template>


<script>
    import Contact from './Contact.js'

    export default Contact
</script>

<style scoped>

</style>
