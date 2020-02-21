<template>

    <section id="configuration" class="configuration">
        <el-form label-width="165px" :model="buildForm" ref="buildForm" :rules="rules" class="demo-form-inline">

            <el-row>
                <el-col :span="11">
                    <el-form-item :label="$t('message.ci.pipeName')" prop="taskName">
                        <el-input v-model="buildForm.taskName" placeholder="Task Name" style="width: 100%"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item :label="$t('message.ci.cluster')" prop="cluster">
                        <el-col :span="12">
                            <el-select v-model="buildForm.group" @change="onChangeCluster()" :disabled="isEdit" filterable style="width: 100%">
                                <el-option
                                        v-for="item in groupData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" class="text-center">
                            <router-link to="/share/cluster" class="link">前往配置</router-link>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item :label="$t('message.ci.env')" prop="envType">
                        <el-select v-model="buildForm.envType" @change="getinstance()" placeholder="Please Env" style="width: 100%">
                            <el-option
                                    v-for="item in dictutil.getDictListByType('app_ns_type')"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="Pcm:" prop="pcmId">
                        <el-col :span="12">
                            <el-select v-model="buildForm.pcmId" width="100%">
                                <el-option
                                        v-for="item in pcmData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="4" class="text-center">
                            <router-link to="/ci/pcm" class="link">前往配置</router-link>
                        </el-col>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="22">
                    <el-form-item :label="$t('message.ci.instances')" prop="instances">
                        <el-select v-model="buildForm.instances" multiple placeholder="请选择" style="width: 100%">
                            <el-option
                                    v-for="item in instanceData"
                                    :key="item.id"
                                    :label="item.hostname"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="11">
                    <el-form-item :label="$t('message.ci.branchType')" prop="tarOrBranch">
                        <el-switch v-model="buildForm.tagOrBranch" @change="getBranchs"
                                   :on-value="2" :off-value="1"
                                   on-text="tag" off-text="branch"
                                   on-color="#20A0FF" off-color="#13CE66" :width="80">
                        </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item :label="$t('message.ci.branchName')" prop="branch">
                        <el-select v-model="buildForm.branch" placeholder="branch" style="width: 100%;">
                            <el-option
                                    v-for="item in branchs"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>

                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="16">
                    <el-form-item :label="$t('message.ci.contactGroup')" prop="contactGroupData">
                        <el-select v-model="buildForm.contactGroupId" placeholder="请选择" style="width: 100%">
                            <el-option
                                    v-for="item in contactGroupData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3">
                    <el-form-item :label="$t('message.ci.custom')" prop="custom">
                        <el-switch
                                v-model="buildForm.commandOnOff"
                                on-text=""
                                off-text="">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="buildForm.commandOnOff">
                <el-col :span="22">
                    <el-form-item :label="$t('message.ci.buildCommand')" prop="buildCommand">
                        <el-tooltip class="item" effect="dark" placement="right-start">
                            <div slot="content">tip:command can use this placeholder, example:<br/>#{projectPath} ==> /home/ci/myproject</div>
                            <el-input type="textarea" v-model="buildForm.buildCommand" :rows="3" placeholder="暂无数据"></el-input>
                        </el-tooltip>
                    </el-form-item>

                </el-col>
            </el-row>

            <el-row v-if="buildForm.commandOnOff">
                <el-col :span="22">
                    <el-form-item :label="$t('message.ci.preCommand')" prop="preCommand">
                        <el-input type="textarea" v-model="buildForm.preCommand" :rows="3" placeholder="暂无数据"></el-input>
                    </el-form-item>

                </el-col>
            </el-row>

            <el-row v-if="buildForm.commandOnOff">
                <el-col :span="22">
                    <el-form-item :label="$t('message.ci.postCommand')" prop="postCommand">
                        <el-tooltip class="item" effect="dark" placement="right-start">
                            <div slot="content">tip:if command not found , try this before you command<br/>. /etc/profile && . /etc/bashrc && .
                                ~/.bash_profile && . ~/.bashrc &&
                            </div>
                            <el-input type="textarea" v-model="buildForm.postCommand" :rows="3" placeholder="暂无数据"></el-input>
                        </el-tooltip>

                    </el-form-item>
                </el-col>
            </el-row>

            <el-row v-if="buildForm.commandOnOff">
                <el-col :span="22">
                    <el-form-item :label="$t('message.ci.commands')" prop="commands">
                        <template>
                            <el-table :data="buildForm.taskBuildCommands" style="width: 100%">
                                <el-table-column prop="projectId" label="Id" min-width="10">
                                    <template scope="scope">
                                        {{scope.row.projectId}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="projectName" :label="$t('message.ci.project')" min-width="30">
                                    <template scope="scope">
                                        {{scope.row.projectName}}
                                    </template>
                                </el-table-column>

                                <el-table-column prop="command" :label="$t('message.ci.commands')" min-width="120">
                                    <template scope="scope">
                                        <!--<el-input  v-model="scope.row.command"></el-input>-->
                                        <el-input type="textarea" style="width: 100%" v-model="scope.row.command" :rows="2"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                        <!--<el-button type="primary"  @click.native.prevent="addRow()">+</el-button>-->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4" :offset="20">
                    <el-button type="primary" @click="save()" :loading="loading">{{$t('message.common.save')}}</el-button>
                    <el-button @click="backToTask()">{{$t('message.common.cancel')}}</el-button>
                </el-col>
            </el-row>

        </el-form>

    </section>
</template>


<script>
    import NewPipeline from './NewPipeline.js'

    export default NewPipeline
</script>

<style scoped>

</style>
