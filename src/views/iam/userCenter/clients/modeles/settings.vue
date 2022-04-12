<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item prop="url">
        <template slot="label">
          <span class="lableStyle">
            <span>Client ID</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <el-input v-model="ruleForm.name" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item prop="url">
        <template slot="label">
          <span class="lableStyle">
            <span>Name</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <el-input v-model="ruleForm.name" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item prop="url">
        <template slot="label">
          <span class="lableStyle">
            <span>Description</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <el-input v-model="ruleForm.name" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item prop="enabled1">
        <template slot="label">
          <span class="lableStyle">
            <span>Enabled</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <slider-switch :isChecked.sync="ruleForm.enabled1"></slider-switch>{{ruleForm.enabled1}}
      </el-form-item>
      <el-form-item prop="access">
        <template slot="label">
          <span class="lableStyle">
            <span>Always Display in Console</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <slider-switch :isChecked.sync="ruleForm.enabled"></slider-switch>{{ruleForm.enabled}}
      </el-form-item>
      <el-form-item prop="enabled2">
        <template slot="label">
          <span class="lableStyle">
            <span>Consent Required</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <slider-switch :isChecked.sync="ruleForm.enabled2"></slider-switch>{{ruleForm.enabled2}}
      </el-form-item>
      <el-form-item prop="endpoints">
        <template slot="label">
          <span class="lableStyle">
            <span>Login Theme</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <el-input v-model="ruleForm.name" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item prop="enabled">
        <template slot="label">
          <span class="lableStyle">
            <span>Client Protocol</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <el-select
          v-model="ruleForm.type"
          placeholder="请选择"
          style="width: 400px"
          :filterable="true"
          clearable
        >
          <el-option
            v-for="item in allType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Save</el-button
        >
        <el-button @click="resetForm('ruleForm')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "settings",
  data() {
    return {
      ruleForm: {
        name: "",
        enabled: true,
        enabled1: true,
        enabled2: true,
      },
      rules: {
        name: [{ required: true, message: "请输入name", trigger: "blur" }],
      },
      allType: [
        {
          lable: "123",
          value: "333",
        },
      ],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>