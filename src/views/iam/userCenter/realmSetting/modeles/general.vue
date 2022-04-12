<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Display name" prop="displayname">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="HTML Display name" prop="htmldisplayname">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="url">
        <template slot="label">
          <span class="lableStyle">
            <span>Frontend URL</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="enabled">
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
        <slider-switch :isChecked.sync="ruleForm.enabled" ></slider-switch>
      </el-form-item>
      <el-form-item prop="access">
        <template slot="label">
          <span class="lableStyle">
            <span>User-Managed Access</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <slider-switch :isChecked.sync="ruleForm.enabled" ></slider-switch>
      </el-form-item>
      <el-form-item prop="endpoints">
        <template slot="label">
          <span class="lableStyle">
            <span>Endpoints</span>
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                <p>温馨提示：****</p>
              </div>
              <i class="el-icon-question table-msg" />
            </el-tooltip>
          </span>
        </template>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
        <el-button @click="resetForm('ruleForm')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
function formatDate(time, format = "YYMMDDhhmmss") {
  var date = new Date(time);

  var year = date.getFullYear(),
    month = date.getMonth() + 1, //月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return "0" + index;
  });

  var newTime = format
    .replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec);

  return newTime;
}
export default {
  name: "general",
  data() {
    return {
      ruleForm: {
        name: "",
        enabled: 1,
      },
      rules: {
        name: [{ required: true, message: "请输入name", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.info(formatDate(new Date().getTime()));

      return;
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