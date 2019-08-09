<template>

    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="Name:">
                <el-input v-model="searchParams.name" placeholder="Name"></el-input>
            </el-form-item>

            <el-form-item label="Addr">
                <el-input v-model="searchParams.addr" placeholder="Addr"></el-input>
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
                <el-button type="primary" @click="addCollector()" style='float:right;margin:5px'>Add</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="Name"></el-table-column>
                    <el-table-column prop="addr" label="Addr"></el-table-column>
                    <el-table-column prop="hname" label="Host's Name"></el-table-column>

                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editCollector(scope.row)">Edit</el-button>
                            <el-button type="text" size="small" @click="delCollector(scope.row)">Del</el-button>
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
                        <el-form-item label="Name:" prop="name">
                            <el-input v-model="saveForm.name" placeholder="Name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Addr:" prop="addr">
                            <el-input v-model="saveForm.addr" placeholder="Addr"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">

                        <el-form-item label="Host:" prop="host">
                            <el-select v-model="saveForm.hostId" placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in allHost"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>
                </el-row>


            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveCollector()">Save</el-button>
                        <el-button @click="dialogVisible = false;">Cancel</el-button>
                    </span>
        </el-dialog>
    </section>

</template>


<script>
    import Collector from './Collector.js'

    export default Collector
</script>

<style scoped>

</style>
