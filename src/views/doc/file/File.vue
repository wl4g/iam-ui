<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="searchbar" @keyup.enter.native="onSubmit()">
            <el-form-item :label="$t('message.common.name')">
                <el-input clearable v-model="searchParams.name" placeholder="e.g. fileName" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.common.language')">
                <el-select clearable v-model="searchParams.lang">
                    <el-option
                            v-for="item in dictutil.getDictListByType('doc_lang_type')"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('message.share.label')">
                <el-select clearable filterable v-model="searchParams.labelId">
                    <el-option
                            v-for="item in labelData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" type="success">{{$t('message.common.search')}}</el-button>
            </el-form-item>
        </el-form>

        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="query-left">
                <div class="line"></div>
                {{$t('message.common.total')}}:<span class="number">{{total}}</span>
            </div>
            <!-- 新增按钮 -->
            <div>
                <el-button type="success" @click="openUploadForm">+ Upload</el-button>
                <el-button type="primary" @click="add">+ Add File</el-button>
            </div>


        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" border style="width:100%">
                    <el-table-column :label="$t('message.common.selectAll')" type="selection"></el-table-column>
                    <el-table-column width="100" prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" :label="$t('message.common.name')"></el-table-column>
                    <el-table-column prop="type" :label="$t('message.doc.fileType')">
                        <template slot-scope="scope">
                            <el-tag :type="dictutil.getDictThemesByTypeAndValue('doc_file_type',scope.row.type)">{{dictutil.getDictLabelByTypeAndValue('doc_file_type',scope.row.type)}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lang" :label="$t('message.common.language')">
                        <template slot-scope="scope">
                            <el-tag :type="dictutil.getDictThemesByTypeAndValue('doc_lang_type',scope.row.lang)">{{dictutil.getDictLabelByTypeAndValue('doc_lang_type',scope.row.lang)}}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column prop="description" :label="$t('message.doc.description')" :show-overflow-tooltip="true"></el-table-column>

                    <el-table-column :label="$t('message.common.operation')" min-width="230">
                        <template slot-scope="scope">
                            <!--edit-->
                            <el-button type="info" icon='edit' @click="edit(scope.row)">{{$t('message.common.edit')}}</el-button>
                            <!--del-->
                            <el-button type="danger" icon='delete' @click="delData(scope.row)">{{$t('message.common.del')}}</el-button>
                            <!--compare-->
                            <el-button type="primary" icon='edit' @click="compareFile(scope.row)">{{$t('message.doc.compare')}}</el-button>
                            <!--browse-->
                            <el-button type="primary" icon='el-icon-tickets' @click="browseFile(scope.row)">{{$t('message.doc.browse')}}</el-button>
                            <!--share-->
                            <el-button type="primary" icon='el-icon-share' @click="shareDoc(scope.row)">{{$t('message.doc.share')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <el-dialog :close-on-click-modal="false" title="Upload" :visible.sync="dialogVisible" size="small">
            <el-form label-width="80px" size="mini" :model="saveForm" ref="saveForm" class="demo-form-inline" :rules="rules">
                <el-row>
                    <el-col :span="6">
                        <el-form-item prop="name" :label="$t('message.common.name')">
                            <el-input v-model="saveForm.name" placeholder="e.g. fileName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="$t('message.common.language')">
                            <el-select clearable v-model="saveForm.lang">
                                <el-option
                                        v-for="item in dictutil.getDictListByType('doc_lang_type')"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('message.share.label')">
                            <el-select clearable multiple filterable v-model="saveForm.labelIds" style="width: 100%">
                                <el-option
                                        v-for="item in labelData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('message.doc.description')">
                            <el-input type="textarea" :rows="1" v-model="saveForm.description" placeholder="e.g. description"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('message.common.upload')">
                            <el-upload
                                    :with-credentials="true"
                                    name="file"
                                    class="upload-demo"
                                    accept=".doc,.docx,.md"
                                    :limit="1"
                                    :on-success="uploadSuccess"
                                    :on-error="uploadFail"
                                    :on-exceed="onExceed"
                                    :action="uploadUrl"
                                    :file-list="saveForm.fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveData()">{{$t('message.common.save')}}</el-button>
                        <el-button @click="dialogVisible = false;">{{$t('message.common.cancel')}}</el-button>
                    </span>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" title="分享" :visible.sync="shareDialogVisible" width="30%">
            <strong>
                <i>{{shareText}}</i>
            </strong>
            <el-button type="text" size="medium" v-clipboard:copy="shareText" v-clipboard:success="onCopySuccess">点击复制</el-button>
        </el-dialog>

    </section>
</template>

<script>
    import File from './File.js'
    export default File
</script>

