<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="searchbar" @keyup.enter.native="onSubmit()">
            <el-form-item :label="$t('message.common.name')">
                <el-input clearable v-model="searchParams.name" placeholder="e.g. FileName" style="width:150px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="onSubmit" type="success" >{{$t('message.common.search')}}</el-button>
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
            <!--<el-button type="primary" @click="addData()">+ Add Label&nbsp;</el-button>-->
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" border style="width:100%">
                    <!--<el-table-column :label="$t('message.common.selectAll')" type="selection"></el-table-column>-->
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="密码">
                                    <span>{{ props.row.passwd }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>

                    <el-table-column width="100" prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" :label="$t('message.doc.docName')"></el-table-column>

                    <el-table-column prop="shareCode" :label="$t('message.common.name')"></el-table-column>

                    <el-table-column prop="passwd" :label="$t('message.common.password')"></el-table-column>

                    <el-table-column prop="createDate" :label="$t('message.doc.shareTime')"></el-table-column>
                    <el-table-column prop="expireTime" :label="$t('message.doc.expireTime')"></el-table-column>


                    <el-table-column :label="$t('message.common.operation')" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" icon='delete' @click="cancelShare(scope.row)">{{$t('message.common.del')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>

    </section>
</template>

<script>
    import Share from './Share.js'
    export default Share
</script>

