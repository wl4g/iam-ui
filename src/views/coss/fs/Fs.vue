<template>
    <div>
        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <el-row>
            <el-col :span="16">
                <el-button @click="openUploadDialog" type="primary">上传文件</el-button>
                <el-button @click="openCreateDrDialog" type="warning">新建目录</el-button>
                <el-button @click="getData" type="info">刷新</el-button>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="prefix" v-model="searchParams.prefix" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
                </el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" @click="back" style='float:right;margin-right:20px'>{{$t('message.common.back')}}</el-button>
            </el-col>
        </el-row>


        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width:100%" :span-method="arraySpanMethod" v-loading="loading">
                    <el-table-column :label="$t('message.common.selectAll')" type="selection" :selectable="firstRowSelectable"></el-table-column>
                    <el-table-column prop="key" label="Key">
                        <template slot-scope="scope">
                            <div v-if="scope.$index===0">
                                <svg class="myIcon" aria-hidden="true" style="cursor:pointer;" @click="prePath">
                                    <use xlink:href="#icon-fanhui"></use>
                                </svg>
                                &nbsp
                                <a v-for="item in routePath" @click="changePath(item.path)" style="font-size: 14px;cursor:pointer">
                                    {{item.name}}&nbsp
                                </a>
                            </div>
                            <div v-if="scope.$index!==0">
                                <a style="cursor:pointer" @click="openOetailDialog(scope.row)">
                                    <svg v-if="isDir(scope.row.key)" class="myIcon" aria-hidden="true" style="cursor:pointer;">
                                        <use xlink:href="#icon-wenjianjia"></use>
                                    </svg>
                                    <svg v-if="!isDir(scope.row.key)" class="myIcon" aria-hidden="true" style="cursor:pointer;">
                                        <use xlink:href="#icon-wenjian"></use>
                                    </svg>
                                    {{scope.row.key}}
                                </a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="100" prop="size" :label="$t('message.coss.fileSize')"></el-table-column>

                    <el-table-column width="100" prop="storageType" :label="$t('message.common.type')">
                        <template slot-scope="{row}">
                            <el-tag :type="dictutil.getDictThemesByTypeAndValue('coss_provider',row.storageType)">
                                {{dictutil.getDictLabelByTypeAndValue('coss_provider',row.storageType)}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column width="150" prop="owner.displayName" :label="$t('message.common.createBy')"></el-table-column>
                    <!--<el-table-column prop="atime" :label="$t('message.common.createDate')" :formatter="dateFormat"></el-table-column>-->
                    <el-table-column width="150" prop="mtime" :label="$t('message.common.updateDate')" :formatter="dateFormat"></el-table-column>


                    <el-table-column :label="$t('message.common.operation')" width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="openOetailDialog(scope.row)">{{$t('message.common.detail')}}</el-button>
                            <!--<el-button type="text" @click="getAcl(currentPath + scope.row.key)">{{$t('message.coss.acl')}}</el-button>
                            <el-button type="text" @click="deleteObject(scope.row)">{{$t('message.common.del')}}</el-button>-->
                            <el-dropdown @command="handleCommand" trigger="click">
                              <span class="el-dropdown-link">
                                  <el-button type="text" >更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                              </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{action:'getAcl',row: scope.row}">{{$t('message.coss.acl')}}</el-dropdown-item>
                                    <el-dropdown-item :command="{action:'deleteObject',row: scope.row}">{{$t('message.common.del')}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

        <el-dialog :close-on-click-modal="false" title="详情" :visible.sync="detailDialog">
            <el-form label-width="100px" :model="detailData" ref="detailData">
                <el-form-item label="文件名:" prop="name">
                    {{detailData.key}}
                </el-form-item>
                <el-form-item label="ETag:">
                    {{detailData.metadata.etag}}
                </el-form-item>
                <el-form-item label="URL:" prop="url">
                    <el-input readonly type="textarea" :value="detailData.downloadUrl"></el-input>
                    <a style="cursor:pointer" :href="detailData.downloadUrl">下载</a> &nbsp
                    <a style="cursor:pointer" :href="detailData.downloadUrl" target="_blank">打开文件url</a> &nbsp
                    <!--<el-button type="text" @click="$message({message: '下载',type: 'success'});" >下载</el-button>-->
                    <!--<el-button type="text" @click="$message({message: '打开文件url',type: 'success'});" >打开文件url</el-button>-->
                    <a style="cursor:pointer" type="text" size="medium" v-clipboard:copy="detailData.downloadUrl" v-clipboard:success="onCopySuccess">点击复制</a>
                    <!--<el-button type="text" @click="$message({message: '复制文件路径',type: 'success'});" >复制文件路径</el-button>-->
                </el-form-item>
                <el-form-item label="类型:" prop="type">
                    <el-row>
                        <el-col :span="6">&nbsp{{detailData.metadata.contentType}}&nbsp</el-col>
                        <el-col :offset="12" :span="6">
                            <a style="cursor:pointer" @click="getHead(detailData.key)">设置Http头</a>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="文件 ACL:" prop="acl">
                    <el-row>
                        <el-col :span="6">{{detailData.metadata.acl}}</el-col>
                        <el-col :offset="12" :span="6">
                            <a style="cursor:pointer" @click="getAcl(detailData.key)">设置读写权限</a>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="存储类型:" prop="saveType">
                    标准存储
                </el-form-item>
                <el-form-item label="服务器端加密:" prop="encrypt">
                    无
                </el-form-item>
            </el-form>
        </el-dialog>


        <el-dialog :close-on-click-modal="false" title="上传" :visible.sync="uploadDialog" width="40%">
            <el-form label-width="100px" :model="uploadData" ref="uploadData">
                <el-form-item label="上传到:" prop="uploadPatj">
                    <el-radio-group v-model="uploadData.uploadToType">
                        <el-radio-button :label="1">当前目录</el-radio-button>
                        <el-radio-button :label="2">指定目录</el-radio-button>
                    </el-radio-group>
                    <el-input v-if="uploadData.uploadToType===2" v-model="uploadData.uploadPath" placeholder="path"></el-input>
                    <span v-if="uploadData.uploadToType===2">
                        文件命名规范。。。。。。
                    </span>
                </el-form-item>

                <el-form-item label="文件 ACL:" prop="acl">
                    <el-radio-group v-model="uploadData.acl">
                        <el-radio-button
                                v-for="item in acls"
                                :label="item"
                                :value="item"
                                border>
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="上传文件" prop="file">
                    <el-upload
                            ref="upload"
                            drag
                            :with-credentials="true"
                            name="file"
                            class="upload-demo"
                            :limit="1"
                            :on-success="uploadSuccess"
                            :on-error="uploadFail"
                            :on-exceed="onExceed"
                            :before-upload="beforeUpload"
                            :action="uploadUrl"
                            :data="uploadData"
                            :auto-upload="false"
                            :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能同时上传一个文件，且不超过xxxkb</div>
                        <!--<el-button size="small" type="primary">点击上传</el-button>-->
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitUpload">{{$t('message.common.save')}}</el-button>
                <el-button @click="uploadDialog = false;">{{$t('message.common.cancel')}}</el-button>
            </span>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" title="ACL" :visible.sync="aclDialog" width="30%">
            <el-select v-model="aclForm.acl">
                <el-option
                        v-for="item in acls"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="setAcl">{{$t('message.common.save')}}</el-button>
                <el-button @click="aclDialog = false;">{{$t('message.common.cancel')}}</el-button>
            </span>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" title="Create Dir" :visible.sync="createDrDialog" width="30%">
            <el-input v-model="dirName" placeholder="名字"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createDir">{{$t('message.common.save')}}</el-button>
                <el-button @click="createDrDialog = false;">{{$t('message.common.cancel')}}</el-button>
            </span>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" title="设置Http头" :visible.sync="headDialog" width="50%">
            <el-form label-width="150px" :model="headForm" ref="headForm">
                <el-form-item label="Content-Type" prop="contentType">
                    <el-input v-model="headForm.contentType"></el-input>
                </el-form-item>
                <el-form-item label="Content-Encoding" prop="contentEncoding">
                    <el-input v-model="headForm.contentEncoding"></el-input>
                </el-form-item>
                <el-form-item label="Content-Disposition" prop="contentDisposition">
                    <el-input v-model="headForm.contentDisposition"></el-input>
                </el-form-item>
                <el-form-item label="Cache-Control" prop="cacheControl">
                    <el-input v-model="headForm.cacheControl"></el-input>
                </el-form-item>
                <el-form-item label="Expires" prop="etime">
                    <el-input v-model="headForm.etime"></el-input>
                </el-form-item>

                <el-row>
                    <el-col :span="6">
                        用户自定义元数据
                    </el-col>
                    <el-col :offset="16" :span="2">
                        <el-button type="primary"  @click="addRow()">添加</el-button>
                    </el-col>
                </el-row>

                <template>
                    <el-table :data="headForm.userMetadata" style="width: 100%">
                        <!-- 动态标签 -->
                        <el-table-column prop="key" label="参数">
                            <template scope="scope">
                                <el-input placeholder="请输入内容" v-model="scope.row.name">
                                    <template slot="prepend">x-oss-meta-</template>
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="value" label="值" >
                            <template scope="scope">
                                <el-input  v-model="scope.row.value"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column label="" width="50">
                            <template slot-scope="scope">
                                <el-row>
                                    <el-button @click.native.prevent="deleteRow(scope.$index)" type="text">
                                        X
                                    </el-button>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="putObjectMetaData">{{$t('message.common.save')}}</el-button>
                <el-button @click="headDialog = false;">{{$t('message.common.cancel')}}</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    import Fs from './Fs.js'

    export default Fs
</script>

