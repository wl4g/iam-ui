<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="Name:">
                <el-input v-model="searchParams.name" placeholder="Name"></el-input>
            </el-form-item>

            <el-form-item label="Create Date Range:">
                <el-date-picker v-model="searchParams.startDate" type="date" placeholder="Start Date" format="yyyy - MM - dd "></el-date-picker>
                <el-date-picker v-model="searchParams.endDate" type="date" placeholder="End Date" format="yyyy - MM - dd"></el-date-picker>
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

            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="gatherTime" label="GatherTime" :formatter="timestampToTime"></el-table-column>
                    <el-table-column prop="createTime" label="CreateTime" :formatter="timestampToTime"></el-table-column>

                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="detail(scope.row)">Detail</el-button>
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
                    <el-col :span="12">
                        <el-form-item label="Name:">
                            <el-input v-model="saveForm.name" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="CreateTime:">
                            <el-input v-model="saveForm.createTime" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="AlarmNote:">
                            <el-input type="textarea" v-model="saveForm.alarmNote" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--TODO-->
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Metric:">
                            <el-input v-model="saveForm.alarmTemplate.metric" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Rules：">
                            <!-- 查询结果表格 -->
                            <!--<div style="float:left;width: 266%;" v-loading='dialogLoading'>-->
                            <template>
                                <el-table :data="saveForm.alarmRules" style="width: 100%">

                                    <el-table-column label="LogicalOperator">
                                        <template scope="scope">
                                            <el-select v-model="scope.row.logicalOperator">
                                                <el-option label="or" :value="1"></el-option>
                                                <el-option disabled label="and" :value="2"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Aggregator">
                                        <template scope="scope">
                                            <el-select v-model="scope.row.aggregator">
                                                <el-option
                                                        v-for="item in dictutil.getDictListByType('agg_oper_type')"
                                                        :key="item.key"
                                                        :label="item.label"
                                                        :value="item.key">
                                                </el-option>

                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="RelateOperator">
                                        <template scope="scope">
                                            <el-select v-model="scope.row.relateOperator">
                                                <el-option label=">" :value="1"></el-option>
                                                <el-option label="<" :value="2"></el-option>
                                                <el-option label="=" :value="3"></el-option>
                                                <el-option label=">=" :value="4"></el-option>
                                                <el-option label="<=" :value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Value">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.value" readonly></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="queueTime">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.queueTimeWindow" readonly></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="AlarmLevel">
                                        <template scope="scope">
                                            <el-select v-model="scope.row.alarmLevel" placeholder="AlarmLevel">
                                                <el-option label="warn" :value="1"></el-option>
                                                <el-option label="error" :value="2"></el-option>
                                                <el-option label="danger" :value="3"></el-option>
                                                <el-option label="death" :value="4"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="CompareValue">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.compareValue" readonly></el-input>
                                        </template>
                                    </el-table-column>


                                </el-table>
                            </template>

                        </el-form-item>
                    </el-col>
                </el-row>


                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Contacts:">
                            <template>
                                <el-table :data="saveForm.notificationContacts" style="width: 100%">

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
                        <!--<el-button type="primary" @click="saveCollector()">Save</el-button>-->
                        <el-button @click="dialogVisible = false;">Close</el-button>
                    </span>
        </el-dialog>
    </section>
</template>


<script>
    import Record from './Record.js'

    export default Record
</script>

<style scoped>

</style>
