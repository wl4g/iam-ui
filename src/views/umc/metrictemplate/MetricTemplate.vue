<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline" @keyup.enter.native="onSubmit()">

            <el-form-item label="Metric">
                <el-input v-model="searchParams.metric" placeholder="Metric"></el-input>
            </el-form-item>

            <el-form-item label="Classify">
                <el-select v-model="searchParams.classify">
                    <el-option label="all" value=""></el-option>
                    <el-option
                            v-for="item in dictutil.getDictListByType('metric_classify')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
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
                <el-button type="primary" @click="addData()" style='float:right;margin:5px'> + </el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="metric" label="Metric"></el-table-column>

                    <!--<el-table-column prop="classify" label="Classify">
                        <template slot-scope="scope">
                            <el-tag type="primary">{{convertClassifyValue(scope.row.classify)}}</el-tag>
                        </template>
                    </el-table-column>-->

                    <el-table-column prop="classify" label="Classify">
                        <template slot-scope="scope">
                            <el-tag :type="dictutil.getDictThemesByTypeAndValue('metric_classify',scope.row.classify)">{{dictutil.getDictLabelByTypeAndValue('metric_classify',scope.row.classify)}}</el-tag>
                        </template>
                    </el-table-column>

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
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline">

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="Metric:" prop="addr">
                            <el-input v-model="saveForm.metric" placeholder="Metric"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Classify:">
                            <el-select v-model="saveForm.classify">
                                <el-option
                                        v-for="item in dictutil.getDictListByType('metric_classify')"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
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
    import MetricTemplate from './MetricTemplate.js'

    export default MetricTemplate
</script>

<style scoped>

</style>
s
