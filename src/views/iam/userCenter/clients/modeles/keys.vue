<template>
<div>
    <section v-if="isShow">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" >
            <el-form-item prop="enabled">
                <template slot="label">
                    <span class="lableStyle">
                        <span >User JWKS URL</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <slider-switch :isChecked.sync="ruleForm.enabled" ></slider-switch>
            </el-form-item>
            <el-form-item prop="access">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Multivalued</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <slider-switch :isChecked.sync="ruleForm.enabled" ></slider-switch>
            </el-form-item>
            <el-form-item prop="access">
                <template slot="label">
                    <span class="lableStyle">
                        <span >User JWKS</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitGenerate('ruleForm')">Generate new keys and certificate</el-button>
                <el-button @click="resetForm('ruleForm')">Import Certificate</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
                <el-button @click="resetForm('ruleForm')">Cancel</el-button>
            </el-form-item>
        </el-form>
    </section>
    <section v-if="!isShow">
        <div>Generate Private Key</div>
        <el-form :model="generateForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" >
            <el-form-item prop="enabled">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Mapper Type</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-select v-model="generateForm.type" placeholder="请选择" style="width:400px" :filterable="true" clearable>
					<el-option v-for="item in allType" :key="item" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="url">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Key Alias</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-input v-model="generateForm.name" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item prop="url">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Key Password</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-input v-model="generateForm.name" style="width:400px" show-password></el-input>
            </el-form-item>
            <el-form-item prop="url">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Store Password</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-input v-model="generateForm.name" style="width:400px" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('generateForm')">Generate and Download</el-button>
                <el-button @click="cancel('generateForm')">Cancel</el-button>
            </el-form-item>
        </el-form>
    </section>
</div>
</template>

<script>

export default ({
    data(){
        return{
            ruleForm: {
                name: '',
                enabled:1,
            },
            generateForm: {
                name: '',
                enabled:1,
            },
            rules: {
                name: [
                        { required: true, message: '请输入name', trigger: 'blur' },
                ]
            },
            isShow:true
        }
    },
    methods:{
        submitGenerate(){
            this.isShow = !this.isShow
        },
        cancel(){
            this.isShow = !this.isShow
        }
    }
})
</script>
