<template>

    <section id="configuration" class="configuration">
        <el-form label-width="165px" :model="buildForm" ref="buildForm" :rules="rules" class="demo-form-inline">

            <!--====================基础信息start====================-->
            <el-card class="box-card" style="background: rgba(243,241,237,0.32);">
                <div slot="header">
                    <span>基础信息</span>
                </div>
                <el-row>
                    <el-col :span="10">
                        <el-form-item :label="$t('message.ci.pipeName')" prop="taskName">
                            <el-input v-model="buildForm.taskName" placeholder="Task Name" style="width: 100%"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('message.ci.cluster')" prop="appClusterId">
                            <el-col :span="12">
                                <el-select v-model="buildForm.appClusterId" @change="onChangeCluster" :disabled="isEdit" filterable style="width: 100%">
                                    <el-option
                                            v-for="item in clusterData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="text-center">
                                <i class="el-icon-refresh" style="cursor:pointer;" @click="refreshClusterData"></i>
                                <router-link to="/erm/cluster" target="_blank" class="link">前往配置</router-link>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
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

                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('message.ci.instances')" prop="instances">
                            <!--<el-select v-model="buildForm.instances" multiple placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in instanceData"
                                        :key="item.id"
                                        :label="item.hostname"
                                        :value="item.id">
                                </el-option>
                            </el-select>-->
                            <el-transfer
                                    filterable
                                    filter-placeholder="Search"
                                    v-model="buildForm.instances"
                                    :data="instanceData2">
                                <!--<el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>-->
                                <i class="el-icon-refresh" slot="left-footer" style="cursor:pointer;margin-left: 16px" @click="refreshInstanceData"></i>
                                <router-link slot="left-footer" to="/erm/cluster" target="_blank" class="link" style="margin-left: 10px">前往配置</router-link>
                            </el-transfer>
                        </el-form-item>
                    </el-col>
                    <!--<el-col :span="2" class="text-center">
                        <i class="el-icon-refresh" style="cursor:pointer;" @click="refreshInstanceData"></i>
                        <router-link to="/erm/cluster" target="_blank" class="link">前往配置</router-link>
                    </el-col>-->
                </el-row>
                <el-row>
                    <el-form-item :label="$t('message.ci.assetsPath')" prop="assetsPath">
                        <el-col :span="23">
                            <el-input placeholder="tar path e.g: /portal-start/target" v-model="buildForm.assetsPath">
                                <template slot="prepend">{{'{WORKSPACE}/sources/'+buildForm.projectName}}</template>
                                <template slot="append">{{buildForm.assetsPath3}}</template>
                            </el-input>
                        </el-col>
                        <el-col :span="1">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    打包好后的tar包存放位置<br>
                                    maven项目参考一下配置:
                                    <pre>
&lt;plugin&gt;
    &lt;artifactId&gt;maven-assembly-plugin&lt;/artifactId&gt;
    &lt;configuration&gt;
        &lt;finalName&gt;${final.name}-${project.version}-bin&lt;/finalName&gt;
        &lt;appendAssemblyId&gt;false&lt;/appendAssemblyId&gt;
        &lt;descriptors&gt;
            &lt;descriptor&gt;src/main/assemble/package.xml&lt;/descriptor&gt;
        &lt;/descriptors&gt;
    &lt;/configuration&gt;
    &lt;executions&gt;
        &lt;execution&gt;
            &lt;id&gt;make-assembly&lt;/id&gt;
            &lt;phase&gt;package&lt;/phase&gt;
            &lt;goals&gt;
                &lt;goal&gt;single&lt;/goal&gt;
            &lt;/goals&gt;
        &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;
                                </pre>
                                </div>
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </el-col>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-col :span="16">
                        <el-form-item :label="$t('message.ci.appInstallHome')" prop="parentAppHome">
                            <el-input v-model="buildForm.parentAppHome" placeholder="install directory"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <!--====================基础信息end====================-->

            <el-card class="box-card">
                <div slot="header">
                    <span>PCM</span>
                </div>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="Pcm:" prop="pcmId">
                            <el-col :span="12">
                                <el-select v-model="buildForm.pcmId" style="width: 100%">
                                    <el-option
                                            v-for="item in pcmData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6" class="text-center">
                                <i class="el-icon-refresh" style="cursor:pointer;" @click="refreshPcmtData"></i>
                                <router-link to="/ci/pcm" target="_blank" class="link">前往配置</router-link>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>


            <!--====================分支信息start====================-->
            <el-card class="box-card">
                <div slot="header">
                    <span>分支信息</span>
                </div>
                <el-row>
                    <el-col :span="11">
                        <el-form-item :label="$t('message.ci.branchType')" prop="tagOrBranch">
                            <el-switch v-model="buildForm.tagOrBranch" @change="getBranchs"
                                       :active-value="'2'" :inactive-value="'1'"
                                       active-text="tag" inactive-text="branch"
                                       active-color="#20A0FF" inactive-color="#13CE66">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item :label="$t('message.ci.branchName')" prop="branch">
                            <el-col :span="18">
                                <el-select v-model="buildForm.branch" placeholder="branch" style="width: 100%;">
                                    <el-option
                                            v-for="item in branchs"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="1" class="text-center">
                                <i class="el-icon-refresh" style="cursor:pointer;" @click="getBranchs"></i>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item :label="$t('message.ci.commands')" prop="commands">
                            <template>
                                <el-col :span="23">
                                    <el-table :data="buildForm.taskBuildCommands" style="width: 100%" :border="false">
                                        <el-table-column label="Id" min-width="10">
                                            <template scope="scope">
                                                {{scope.row.projectId}}
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('message.ci.project')" min-width="30">
                                            <template scope="scope">
                                                {{scope.row.projectName}}
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('message.ci.branchName')" min-width="30">
                                            <template scope="scope">
                                                <el-select v-model="scope.row.branch" placeholder="branch" style="width: 100%;">
                                                    <el-option
                                                            v-for="item in scope.row.branchs"
                                                            :key="item"
                                                            :label="item"
                                                            :value="item">
                                                    </el-option>
                                                </el-select>
                                            </template>
                                        </el-table-column>

                                        <el-table-column :label="$t('message.ci.commands')" min-width="120">
                                            <template scope="scope">
                                                <!--<el-input  v-model="scope.row.command"></el-input>-->
                                                <el-input type="textarea" style="width: 100%" v-model="scope.row.command" :rows="2"></el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                                <el-col :span="1">
                                    <i class="el-icon-refresh" style="cursor:pointer;" @click="getTaskBuildCommands"></i>
                                </el-col>
                            </template>
                            <!--<el-button type="primary"  @click.native.prevent="addRow()">+</el-button>-->
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <!--====================分支信息end====================-->



            <!--====================自定义命令start====================-->
            <el-card class="box-card" style="background: rgba(243,241,237,0.32);">
                <div slot="header">
                    <span>自定义命令</span>
                    <el-switch style="float: right; padding: 3px 0" v-model="buildForm.commandOnOff"></el-switch>
                </div>
                <!--<el-row>
                    <el-col :span="3">
                        <el-form-item :label="$t('message.ci.custom')" prop="custom">
                            <el-switch v-model="buildForm.commandOnOff"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>-->

                <el-row v-if="buildForm.commandOnOff">
                    <el-col :span="22">
                        <el-form-item :label="$t('message.ci.buildCommand')" prop="buildCommand">
                            <el-tooltip class="item" effect="dark" placement="right-start">
                                <div slot="content">tip:command can use this placeholder, example:<br/>#{projectPath} ==> /home/ci/myproject</div>
                                <el-input type="textarea" v-model="buildForm.buildCommand" :rows="3" placeholder="暂无数据"></el-input>
                            </el-tooltip>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">
                        <el-tooltip placement="top">
                            <div slot="content">自定义编译命令，为空则使用对应pipeline的默认命令，e.g: mvn clean install</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </el-col>
                </el-row>

                <el-row v-if="buildForm.commandOnOff">
                    <el-col :span="22">
                        <el-form-item :label="$t('message.ci.preCommand')" prop="preCommand">
                            <el-input type="textarea" v-model="buildForm.preCommand" :rows="3" placeholder="暂无数据"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">
                        <el-tooltip placement="top">
                            <div slot="content">前置命令，编译完成后，在远程目标机器(instance)执行，在deploy前执行</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>
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
                    <el-col :span="1">
                        <el-tooltip placement="top">
                            <div slot="content">后置命令，deploy后执行，在远程目标机器(instance)执行，可以是应用的重启命令,e.g: /etc/init.d/iam-server restart</div>
                            <i class="el-icon-question"></i>
                        </el-tooltip>
                    </el-col>
                </el-row>
            </el-card>
            <!--====================自定义命令end====================-->

            <!--====================通知start====================-->
            <el-card class="box-card">
                <div slot="header">
                    <span>通知</span>
                </div>
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
            </el-card>

            <el-row>
                <el-col :span="4" :offset="20">
                    <el-button type="primary" @click="save()" :loading="loading">{{$t('message.common.save')}}</el-button>
                    <el-button @click="backToTask()">{{$t('message.common.cancel')}}</el-button>
                </el-col>
            </el-row>
        </el-form>

        <el-dialog :close-on-click-modal="false" title="Info" :visible.sync="gotoProjectSettingDialog" width="30%">
            未找到该cluster对应的工程依赖，请设置
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="gotoProjectSetting">立即前往设置</el-button>
            </span>
        </el-dialog>


    </section>
</template>


<script>
    import NewPipeline from './NewPipeline.js'

    export default NewPipeline
</script>

<style>
    .box-card {
        margin : 10px 0px 10px 0px;
    }
</style>
