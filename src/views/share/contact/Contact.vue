<template>
    <el-tabs type="border-card">
        <el-tab-pane label="Contact">
            <section id="configuration" class="configuration">
                <el-form :inline="true" :model="searchParams" class="demo-form-inline">
                    <el-form-item label="Name:">
                        <el-input v-model="searchParams.name" placeholder="名字"></el-input>
                    </el-form-item>
                    <el-form-item label="Email">
                        <el-input v-model="searchParams.email" placeholder="Email"></el-input>
                    </el-form-item>
                    <el-form-item label="Phone">
                        <el-input v-model="searchParams.phone" placeholder="Phone"></el-input>
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
                        <el-button type="primary" @click="addContact()" style='float:right;margin:5px'> + </el-button>
                    </div>
                </div>
                <!-- 查询结果表格 -->
                <div>
                    <template>
                        <el-table :data="contactData" style="width: 100%">
                            <el-table-column label="全选" type="selection"></el-table-column>
                            <el-table-column prop="id" label="ID"></el-table-column>
                            <el-table-column prop="name" label="Name"></el-table-column>
                            <el-table-column prop="email" label="Email"></el-table-column>
                            <el-table-column prop="phone" label="Phone"></el-table-column>

                            <el-table-column label="Operation" min-width="100">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="editContact(scope.row)">Edit</el-button>
                                    <el-button type="text" size="small" @click="delContact(scope.row)">Del</el-button>
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
                                <el-form-item label="Name:" prop="name">
                                    <el-input v-model="saveForm.name" placeholder="Name"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="Email:" prop="email">
                                    <el-input v-model="saveForm.email" placeholder="Email"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="Enable:" prop="emailEnable">
                                    <el-switch v-model="saveForm.emailEnable" :on-value="1" :off-value="0"></el-switch>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="Phone:" prop="phone">
                                    <el-input v-model="saveForm.phone" placeholder="Phone"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="Enable:" prop="phoneEnable">
                                    <el-switch v-model="saveForm.phoneEnable" :on-value="1" :off-value="0"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="TimeOfFreq:" prop="phoneTimeOfFreq">
                                    <el-input v-model="saveForm.phoneTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="NumOfFreq:" prop="phoneNumOfFreq">
                                    <el-input v-model="saveForm.phoneNumOfFreq" placeholder="NumOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="Dingtalk:" prop="dingtalk">
                                    <el-input v-model="saveForm.dingtalk" placeholder="dingtalk"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="Enable:" prop="dingtalkEnable">
                                    <el-switch v-model="saveForm.dingtalkEnable" :on-value="1" :off-value="0"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="TimeOfFreq:" prop="dingtalkTimeOfFreq">
                                    <el-input v-model="saveForm.dingtalkTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="NumOfFreq:" prop="dingtalkNumOfFreq">
                                    <el-input v-model="saveForm.dingtalkNumOfFreq" placeholder="NumOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="Wechat:" prop="wechat">
                                    <el-input v-model="saveForm.wechat" placeholder="Wechat"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="Enable:" prop="wechatEnable">
                                    <el-switch v-model="saveForm.wechatEnable" :on-value="1" :off-value="0"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="TimeOfFreq:" prop="wechatTimeOfFreq">
                                    <el-input v-model="saveForm.wechatTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="NumOfFreq:" prop="wechatNumOfFreq">
                                    <el-input v-model="saveForm.wechatNumOfFreq" placeholder="NumOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="Twitter:" prop="twitter">
                                    <el-input v-model="saveForm.twitter" placeholder="Twitter"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="Enable:" prop="twitterEnable">
                                    <el-switch v-model="saveForm.twitterEnable" :on-value="1" :off-value="0"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="TimeOfFreq:" prop="twitterTimeOfFreq">
                                    <el-input v-model="saveForm.twitterTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="NumOfFreq:" prop="twitterNumOfFreq">
                                    <el-input v-model="saveForm.twitterNumOfFreq" placeholder="NumOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="7">
                                <el-form-item label="Facebook:" prop="facebook">
                                    <el-input v-model="saveForm.facebook" placeholder="Facebook"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item label="Enable:" prop="facebookEnable">
                                    <el-switch v-model="saveForm.facebookEnable" :on-value="1" :off-value="0"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="TimeOfFreq:" prop="facebookTimeOfFreq">
                                    <el-input v-model="saveForm.facebookTimeOfFreq" placeholder="TimeOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="NumOfFreq:" prop="facebookNumOfFreq">
                                    <el-input v-model="saveForm.facebookNumOfFreq" placeholder="NumOfFreq"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="16">
                                <el-form-item label="Groups:" prop="groups">
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
                        <el-button type="primary" @click="saveContact()">Save</el-button>
                        <el-button @click="dialogVisible = false;">Cancel</el-button>
                    </span>
                </el-dialog>
            </section>
        </el-tab-pane>
        <el-tab-pane label="Group">
            <el-form :inline="true" :model="searchGroupParams" class="demo-form-inline">
                <el-form-item label="Name:">
                    <el-input v-model="searchGroupParams.name" placeholder="Input group name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getGroupData" type="success">Search</el-button>
                </el-form-item>
            </el-form>
            <!--================================table================================-->
            <!-- 查询结果数值 -->
            <div class="query">
                <div class="line"></div>
                <div class="">Result Total： <span class="number">{{groupTotal}}</span>
                    <!-- 新增按钮 -->
                    <el-button type="primary" @click="addGroup()" style='float:right;margin:5px'> + </el-button>
                </div>
            </div>
            <!-- 查询结果表格 -->
            <div>
                <template>
                    <el-table :data="contactGroupData" style="width: 100%">
                        <el-table-column label="全选" type="selection"></el-table-column>
                        <el-table-column prop="id" label="ID"></el-table-column>
                        <el-table-column prop="name" label="Name">
                            <template slot-scope="scope">
                                <!--<el-button size="small" :disabled="convertLockStatusDisable(scope.row)" @click="unlock(scope.row)">{{convertLockStatus(scope.row)}}</el-button>-->
                                <el-input  v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>

                        <!--<el-table-column prop="name" label="Name">
                            <template slot-scope="scope">
                                <el-button size="small" :disabled="convertLockStatusDisable(scope.row)" @click="unlock(scope.row)">{{convertLockStatus(scope.row)}}</el-button>
                            </template>
                        </el-table-column>-->

                        <el-table-column label="Operation" min-width="100">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="saveGroup(scope.row)">Save</el-button>
                                <el-button type="text" size="small" @click="delContactGroup(scope.row)">Del</el-button>
                            </template>
                        </el-table-column>

                    </el-table>
                </template>
            </div>
            <el-pagination background layout="prev, pager, next" :total="groupTotal" @current-change='currentChangeGroup'></el-pagination>

        </el-tab-pane>

    </el-tabs>


</template>


<script>
    import Contact from './Contact.js'

    export default Contact
</script>

<style scoped>

</style>
