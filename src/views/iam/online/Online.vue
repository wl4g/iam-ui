<template>
    <section id="configuration" class="configuration">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">

            <el-form-item label="Name:">
                <el-select v-model="searchParams.id" >
                    <el-option
                            v-for="item in iamServers"
                            :key="item.id"
                            :label="item.displayName"
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

            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="全选" type="selection"></el-table-column>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="principal" label="principal"></el-table-column>
                    <el-table-column prop="host" label="host"></el-table-column>
                    <el-table-column prop="startTimestamp" label="startTimestamp"></el-table-column>
                    <el-table-column prop="lastAccessTime" label="lastAccessTime"></el-table-column>
                    <el-table-column prop="expired" label="expired"></el-table-column>
                    <el-table-column prop="authenticated" label="authenticated"></el-table-column>
                    <el-table-column label="Operation" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="destroySessions(scope.row)">destroy</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change='currentChange'></el-pagination>
    </section>
</template>


<script>
    import Online from './Online.js'

    export default Online
</script>

<style scoped>

</style>
