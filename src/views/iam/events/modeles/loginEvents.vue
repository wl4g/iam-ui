<template>
    <section >
        <!-- 查询结果数值 -->
        <div class="query">
            <el-button type="primary" style="float:right;margin-right:20px" @click="addData()">{{$t('message.common.add')}} Dictionaries</el-button>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" :border="true" style="width:100%">
                    <el-table-column prop="key" label="Time" min-width="100"></el-table-column>
                    <el-table-column prop="value" label="EventType"></el-table-column>
                    <el-table-column prop="type" label="Details" width=120></el-table-column>
                    <el-table-column :label="$t('message.common.operation')" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" icon='delete' @click="delData(scope.row)">{{$t('message.common.del')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange' ></el-pagination>

    </section>
</template>
<script>
export default {
    name:'loginEvents',
    data(){
        return{
            //查询条件
            searchParams: {
                key: '',
            },
            total:'',
            tableData:[]
        }
    }
}
</script>