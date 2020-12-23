<template>
    <div>
        <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
        </el-input>
        <el-tree
                class="fsviewer"
                ref="fsviewerref"
                :data="fileData"
                :default-expanded-keys="defaultExpandedKeys"
                :props="defaultProps"
                :filter-node-method="filterNode"
                node-key="path"
                draggable
                @node-expand="handleNodeExpand"
                @node-collapse="handleNodeCollapse"

                @node-drag-start="handleDragStart"
                @node-drag-enter="handleDragEnter"
                @node-drag-leave="handleDragLeave"
                @node-drag-over="handleDragOver"
                @node-drag-end="handleDragEnd"
                @node-drop="handleDrop"
                :allow-drop="allowDrop"
                :allow-drag="allowDrag">
            <span class="custom-tree-node" slot-scope="{ node, data }" @contextmenu.prevent="showMenu()">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                          type="text"
                          size="mini"
                          @click="() => append(data)">
                    Append
                  </el-button>
                  <el-button
                          type="text"
                          class="el-icon-delete"
                          @click="() => del(node, data)">
                  </el-button>
                </span>
              </span>
        </el-tree>
    </div>

</template>

<script>

    export default {
        name: 'fsviewer',
        props: {
            clickNotClose: {
                default: false,
                type: Boolean
            },
            buttonTop: {
                default: 250,
                type: Number
            },
            show: {
                default: false,
                type: Boolean
            },
        },
        data() {
            return {
                //show: false
                filterText: '',
                defaultExpandedKeys: [],
                fileData: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2',
                        children: [{
                            id: 11,
                            label: '三级 3-2-1'
                        }, {
                            id: 12,
                            label: '三级 3-2-2'
                        }, {
                            id: 13,
                            label: '三级 3-2-3'
                        }]
                    }]
                }],

                defaultProps: {
                    children: 'children',
                    label: 'fileName'
                }
            }
        },
        computed: {},
        watch: {
            show(value) {

            },
            filterText(val) {
                this.$refs.fsviewerref.filter(val);
            }
        },
        mounted() {
            //this.insertToBody()
            this.getTreeFiles();
        },
        beforeDestroy() {

        },
        methods: {

            getTreeFiles(){
                this.$$api_doc_getTreeFiles({
                    data: {},
                    fn: json => {
                        this.fileData = json.data;
                    },
                    errFn: () => {

                    }
                })
            },

            filterNode(value, data) {
                if (!value) return true;
                return data.fileName.indexOf(value) !== -1;
            },

            del(note, data){
                console.info(note,data)
                this.$$api_doc_delFile({
                    data: {
                        path: data.path
                    },
                    fn: json => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getTreeFiles();
                    },
                    errFn: () => {
                        this.$message.error('删除失败');
                    }
                })
            },

            // 树节点展开
            handleNodeExpand (data) {
                // 保存当前展开的节点
                let flag = false
                this.defaultExpandedKeys.some(item => {
                    if (item === data.path) { // 判断当前节点是否存在， 存在不做处理
                        flag = true
                        return true
                    }
                })
                if (!flag) { // 不存在则存到数组里
                    this.defaultExpandedKeys.push(data.path)
                }
                console.info(this.defaultExpandedKeys)
            },
            // 树节点关闭
            handleNodeCollapse (data) {
                this.defaultExpandedKeys.some((item, i) => {
                    if (item === data.path) {
                        // 删除关闭节点
                        this.defaultExpandedKeys.length = i
                    }
                })
            },


            handleDragStart(node, ev) {
                console.log('drag start', node);
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
            },
            //是否允许放置
            allowDrop(draggingNode, dropNode, type) {
                /*if (dropNode.data.label === '二级 3-1') {
                    return type !== 'inner';
                } else {
                    return true;
                }*/
                return true;
            },
            //是否允许拖动
            allowDrag(draggingNode) {
                //return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
                return true;
            },

            showMenu(){
                console.info('showMenu')
            }
        }
    }
</script>

<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>

<style lang="scss" scoped>

</style>
