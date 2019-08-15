<template>

    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
            <el-form-item label="Key:">
                <el-input v-model="searchParams.key" placeholder="Key"></el-input>
            </el-form-item>
            <el-form-item label="Label">
                <el-input v-model="searchParams.label" placeholder="Label"></el-input>
            </el-form-item>
            <el-form-item label="Type:">
                <el-select v-model="searchParams.type" placeholder="Type" style="width: 100%" :filterable="true" >
                    <el-option
                            v-for="item in allType"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Remark">
                <el-input v-model="searchParams.remark" placeholder="Remark"></el-input>
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
                <el-button type="primary" @click="addData()" style='float:right;margin:5px'>Add</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="key" label="Key"></el-table-column>
                    <el-table-column prop="type" label="Type"></el-table-column>
                    <el-table-column prop="value" label="Value"></el-table-column>
                    <el-table-column prop="label" label="Label"></el-table-column>
                    <el-table-column prop="labelEn" label="LabelEn"></el-table-column>
                    <el-table-column prop="remark" label="Remark" :show-overflow-tooltip="true" ></el-table-column>
                    <el-table-column prop="themes" label="Themes"></el-table-column>
                    <el-table-column prop="sort" label="Sort"></el-table-column>

                    <el-table-column prop="themes" label="Themes">
                        <template slot-scope="scope">
                            <el-tag :type="dictutil.getDictThemesByTypeAndValue('dict_theme_type',scope.row.themes)">{{dictutil.getDictLabelByTypeAndValue('dict_theme_type',scope.row.themes)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="Operation">
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
                    <el-col :span="8">
                        <el-form-item label="Value:" prop="value">
                            <el-input v-model="saveForm.value" :disabled="diseditable" placeholder="Value"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Label:" prop="label">
                            <el-input v-model="saveForm.label" placeholder="Label"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Label:" prop="labelEn">
                            <el-input v-model="saveForm.labelEn" placeholder="LabelEn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">

                        <el-form-item label="Themes:" prop="themes">
                            <el-select v-model="saveForm.themes" placeholder="Themes" style="width: 100%">
                                <el-option
                                        v-for="item in themess"
                                        :key="item"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <!-- TODO dictuse example -->
                        <!--<el-form-item label="Themes:" prop="themes">
                            <el-select v-model="saveForm.themes" placeholder="Themes" style="width: 100%">
                                <el-option
                                        v-for="item in dictutil.getDictListByType('dict_theme_type')"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>-->
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Sort:" prop="sort">
                            <el-input v-model="saveForm.sort" placeholder="Sort"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Icon:" prop="icon">
                            <el-input v-model="saveForm.icon" placeholder="Icon"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="Remark:" prop="remark">
                            <el-input v-model="saveForm.remark" placeholder="Remark"></el-input>
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
