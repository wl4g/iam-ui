<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="250px" class="demo-ruleForm" >
            <el-form-item prop="enabled">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Login Theme</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-select v-model="ruleForm.type" placeholder="请选择" style="width:160px" :filterable="true" clearable>
					<el-option v-for="item in allType" :key="item" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="enabled">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Account Theme</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-select v-model="ruleForm.type" placeholder="请选择" style="width:160px" :filterable="true" clearable>
					<el-option v-for="item in allType" :key="item" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="enabled">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Admin Console Theme</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-select v-model="ruleForm.type" placeholder="请选择" style="width:160px" :filterable="true" clearable>
					<el-option v-for="item in allType" :key="item" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="enabled">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Email Theme</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-select v-model="ruleForm.type" placeholder="请选择" style="width:160px" :filterable="true" clearable>
					<el-option v-for="item in allType" :key="item" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="enabled">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Revoke Refresh Token</span>
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
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
                <el-button @click="resetForm('ruleForm')">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

export default ({
    name:"themes",
    data(){
        return{
            ruleForm: {
                name: '',
                enabled:1,
            },
            rules: {
                
            },
            allType:[
                {
                    lable:'123',
                    value:'333'
                }
            ]
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
})
</script>

<style>

</style>