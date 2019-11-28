<template>
    <el-form :inline="true" label-width="80px"  class="demo-form-inline">
        <el-form-item label="Cluster:">
            <el-input v-model="detailForm.group" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="Branch:">
            <el-input v-model="detailForm.branch" :readonly="true"></el-input>
        </el-form-item>
        <div>
            <template>
                <el-table :data="detailForm.taskInstances" style="width: 100%">
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="instanceName" label="Instance"></el-table-column>
                    <el-table-column prop="status" label="Status">
                        <template slot-scope="scope">
                            <el-tag :color="convertStatusType(scope.row)">
                                <img v-bind:src="convertStatusValue(scope.row)['img']" />
                                {{convertStatusValue(scope.row)['text']}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="result" label="Result" min-width="100">
                        <template slot-scope="scope">
                            <el-popover placement="right" width="400" trigger="click">
                                <el-input type="textarea" :rows="30" placeholder="暂无数据" class="mytextarea" :readonly="true" v-model="scope.row.result"></el-input>
                                <el-button slot="reference">Detail</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <div id="terminal"></div>
    </el-form>
</template>


<script>
    import TaskHisDetail from './TaskHisDetail.js'

    export default TaskHisDetail
</script>

<style scoped>

</style>
s
