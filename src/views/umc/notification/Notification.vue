<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

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
                <!-- 新增按钮 -->
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="alarmTime" label="AlarmTime" :formatter="timestampToTime"></el-table-column>
                    <!--<el-table-column prop="groupName" label="GroupName">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="dataDetail(scope.row)">{{scope.row.groupName}}</el-button>
                        </template>
                    </el-table-column>-->

                    <el-table-column label="Operation">
                        <template slot-scope="scope">
                            <el-button type="info" size="small">Detail</el-button>
                            <!--<el-button type="text" size="small" @click="delData(scope.row)">Del</el-button>-->
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogVisible" size="small" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline">

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="AlarmTime:" >
                            <el-input :value="timestampToTime(null,null,saveForm.alarmTime)" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="AlarmNote:" >
                            <el-input type="textarea" v-model="saveForm.alarmNote" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Contacts:">
                            <template>
                                <el-table :data="saveForm.contacts" style="width: 100%">

                                    <el-table-column prop="name" label="Name"></el-table-column>
                                    <el-table-column prop="email" label="Email"></el-table-column>
                                    <el-table-column prop="phone" label="Phone"></el-table-column>
                                    <!-- 动态标签 -->
                                    <el-table-column prop="status" label="Status">
                                        <template slot-scope="scope">
                                            <el-tag type="primary">{{convertStatusValue(scope.row.status)}}</el-tag>
                                        </template>
                                    </el-table-column>


                                </el-table>
                            </template>

                        </el-form-item>

                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                        <!--<el-button type="primary" @click="saveData()">Save</el-button>-->
                        <el-button @click="dialogVisible = false;">Cancel</el-button>
                    </span>
        </el-dialog>
    </section>
</template>


<script>
    import Notification from './Notification.js'

    export default Notification
</script>

<style scoped>

</style>
s
