<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline" style="margin-left:10px">
            <el-form-item label="Key:">
                <el-input v-model="searchParams.key" placeholder="e.g. app_ns_type@dev" style="width:165px"></el-input>
            </el-form-item>
            <el-form-item label="Label:">
                <el-input v-model="searchParams.label" placeholder="e.g. 最大值" style="width:140px"></el-input>
            </el-form-item>
            <el-form-item label="Type:">
                <el-select v-model="searchParams.type" placeholder="e.g. app_ns_type" style="width:160px" :filterable="true" >
                    <el-option value="">e.g. app_ns_type</el-option>
					<el-option v-for="item in allType" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Remark">
                <el-input v-model="searchParams.remark" placeholder="e.g. 开发环境"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" type="success">Search</el-button>
            </el-form-item>
        </el-form>
        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="line"></div>
            <div class="">Total： <span class="number">{{total}}</span>
                <!-- 新增按钮 -->
                <el-button type="primary" @click="addData()" style='float:right;margin-right:20px'>+</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width:100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="key" label="Key" width=200></el-table-column>
                    <el-table-column prop="value" label="Value" width=110></el-table-column>
                    <el-table-column prop="type" label="Type" width=150></el-table-column>
                    <el-table-column prop="label" label="Label" :show-overflow-tooltip="true" width=90></el-table-column>
                    <el-table-column prop="labelEn" label="LabelEn" :show-overflow-tooltip="true" width=90></el-table-column>
                    <el-table-column prop="sort" label="Sort" width=68></el-table-column>
                    <el-table-column prop="themes" label="Themes" width=95>
                        <template slot-scope="scope">
                            <el-tag :type="dictutil.getDictThemesByTypeAndValue('dict_theme_type',scope.row.themes)">{{dictutil.getDictLabelByTypeAndValue('dict_theme_type',scope.row.themes)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="Remark" :show-overflow-tooltip="true" width=140></el-table-column>
					<el-table-column label="Oper">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="dataDetail(scope.row)">Edit</el-button>
                            <el-button type="text" size="small" @click="delData(scope.row)">Del</el-button>
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
                        <el-form-item label="Key:" prop="key">
                            <el-input v-model="saveForm.key" :disabled="diseditable" placeholder="key"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Type:" prop="type">
                            <el-input v-model="saveForm.type" placeholder="Type" :disabled="diseditable"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
					<el-col :span="12">
                        <el-form-item label="Value:" prop="value">
                            <el-input v-model="saveForm.value" :disabled="diseditable" placeholder="e.g. agg_oper_type"></el-input>
                        </el-form-item>
                    </el-col>
					<el-col :span="12">
                        <el-form-item label="Themes:" prop="themes">
                            <el-select v-model="saveForm.themes" placeholder="" style="width:100%">
								<el-option label=""></el-option>
                                <el-option v-for="item in themess" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Label:" prop="label">
                            <el-input v-model="saveForm.label" placeholder="e.g. 最小值"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="LabelEn:" prop="labelEn">
                            <el-input v-model="saveForm.labelEn" placeholder="e.g. min"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
					<el-col :span="12">
                        <el-form-item label="Sort:" prop="sort">
                            <el-input v-model="saveForm.sort" placeholder="e.g. 50"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Icon:" prop="icon">
                            <el-input v-model="saveForm.icon" placeholder="e.g. https://domain/image/favicon"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Remark:" prop="remark">
                            <el-input type="textarea" v-model="saveForm.remark" placeholder="Please input remark..."></el-input>
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
    import Dict from './Dict.js'

    export default Dict
</script>

<style scoped>

</style>
