<template>

    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline" @keyup.enter.native="onSubmit()">

            <el-form-item label="Name:">
                <el-input v-model="searchParams.name" placeholder="Name"></el-input>
            </el-form-item>

            <el-form-item label="Classify">
                    <el-select v-model="searchParams.classify" @change="getMetricByClassify()" clearable>
                        <el-option
                                v-for="item in dictutil.getDictListByType('metric_classify')"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
            </el-form-item>

            <el-form-item label="Metric">
               <!-- <el-input v-model="searchParams.metric" placeholder="Metric"></el-input>-->

                <el-select v-model="searchParams.metricId" filterable clearable>
                    <el-option
                            v-for="item in metricList"
                            :key="item.id"
                            :label="item.metric"
                            :value="item.id">
                    </el-option>
                </el-select>

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
                <el-button type="primary" @click="addTemplat()" style='float:right;margin:5px'> + </el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="metric" label="Metric"></el-table-column>

                    <el-table-column prop="classify" label="Classify">
                        <template slot-scope="scope">
                            <el-tag type="primary">{{convertClassifyValue(scope.row.classify)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="notifyLevel" label="NotifyLevel">
                        <template slot-scope="scope">
                            <el-tag :type="convertStatusType(scope.row.notifyLevel)">{{convertLevelValue(scope.row.notifyLevel)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="info" icon='edit' size="small" @click="editTemplat(scope.row)">Edit</el-button>
                            <el-button type="danger" icon='delete' size="small" @click="delTemplat(scope.row)">Del</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <!--================================save dialog================================-->
        <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="dialogVisible" size="large" v-loading='dialogLoading'>
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline">

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="Name:" prop="name">
                            <el-input v-model="saveForm.name" placeholder="Name"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="Classify:">
                            <el-select v-model="saveForm.classify" @change="getMetricByClassifyForm()">
                                <el-option
                                        v-for="item in dictutil.getDictListByType('metric_classify')"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>

                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="Metric:" prop="addr">
                            <el-select v-model="saveForm.metricId" filterable>
                                <el-option
                                        v-for="item in metricList2"
                                        :key="item.id"
                                        :label="item.metric"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="NotifyLevel:" >
                            <el-select v-model="saveForm.notifyLevel" placeholder="请选择">
                                <!-- TODO -->
                                <el-option label="warn" :value="1"></el-option>
                                <el-option label="error" :value="2"></el-option>
                                <el-option label="danger" :value="3"></el-option>
                                <el-option label="death" :value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <!-- tags -->
                <el-row >
                    <el-col>
                        <el-form-item label="Tags:">
                            <template>
                                <el-table :data="saveForm.tagMap" style="width: 100%">
                                    <!-- 动态标签 -->
                                    <el-table-column prop="name" label="TagName">
                                        <template scope="scope">
                                            <el-input v-model="scope.row.name" placeholder="tagName"></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="value" label="TagValue" >
                                        <template scope="scope">
                                            <el-input  v-model="scope.row.value"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Operation">
                                        <template slot-scope="scope">
                                            <el-row>
                                                <el-button @click.native.prevent="deleteTag(scope.$index)" type="text" size="mini" style="float: left;line-height: 20px;">
                                                    Delete
                                                </el-button>
                                            </el-row>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <!--</div>-->
                            <el-button type="primary"  @click.native.prevent="addTag()"> + </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- rules -->
                <el-row >
                    <el-col>
                        <el-form-item label="Rules:">
                            <template>
                                <el-table :data="saveForm.rules" style="width: 100%">
                                    <!-- 动态标签 -->
                                    <el-table-column  label="LogicalOperator" >
                                        <template scope="scope">
                                            <el-select v-model="scope.row.logicalOperator" placeholder="LogicalOperator">
                                                <el-option label="or" :value="1"></el-option>
                                                <el-option disabled label="and" :value="2"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="Aggregator">
                                        <template scope="scope">
                                            <el-select v-model="scope.row.aggregator" placeholder="Aggregator">
                                                <el-option label="avg" value='avg'></el-option>
                                                <el-option label="sum" value='sum'></el-option>
                                                <el-option label="min" value='min'></el-option>
                                                <el-option label="max" value='max'></el-option>
                                                <el-option label="latest" value='latest'></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column  label="RelateOperator">
                                        <template scope="scope">
                                            <el-select v-model="scope.row.relateOperator" placeholder="RelateOperator">
                                                <el-option label="=" :value="1"></el-option>
                                                <el-option label=">" :value="2"></el-option>
                                                <el-option label=">=" :value="3"></el-option>
                                                <el-option label="<" :value="4"></el-option>
                                                <el-option label="<=" :value="5"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Value" >
                                        <template scope="scope">
                                            <el-input  v-model="scope.row.value"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column  label="queueTime" >
                                        <template scope="scope">
                                            <el-input  v-model="scope.row.queueTimeWindow"></el-input>
                                        </template>
                                    </el-table-column>

                                    <el-table-column  label="AlarmLevel">
                                        <template scope="scope">
                                            <el-select v-model="scope.row.alarmLevel" placeholder="AlarmLevel">
                                                <el-option label="warn" :value="1"></el-option>
                                                <el-option label="error" :value="2"></el-option>
                                                <el-option label="danger" :value="3"></el-option>
                                                <el-option label="death" :value="4"></el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>

                                    <el-table-column label="Operation" >
                                        <template slot-scope="scope">
                                            <el-row>
                                                <el-button @click.native.prevent="deleteRule(scope.$index)" type="text" size="mini" style="float: left;line-height: 20px;">
                                                    Delete
                                                </el-button>
                                            </el-row>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <!--</div>-->
                            <el-button type="primary"  @click.native.prevent="addRule()"> + </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveTemplat()">Save</el-button>
                        <el-button @click="dialogVisible = false;">Cancel</el-button>
                    </span>
        </el-dialog>
    </section>
</template>
<script>
    import Templat from './Templat.js'
    export default Templat
</script>
<style scoped>
</style>
