<template>
  <section class="console">
    <!-- //表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="height: 0px;">
      
      <el-form-item label="Log Level:" >
        <el-tooltip class="item" effect="dark" content="e.g. INFO↑ only outputs logs containing (INFO/WARN/ERROR/FATAL) level." placement="bottom-start">
          <el-select v-model="formInline.loglevle" class="testinput" >
            <el-option
                  v-for="item in loglevle"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-form-item>

        <el-form-item label="Cluster:" prop="group">
            <el-select v-model="formInline.index" style="width: 120px;">
                <el-option
                        v-for="item in groupData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
      
      <el-form-item label="Keyword:">
        <el-input v-model="formInline.content" placeholder="e.g. addr=11111119" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="formInline.enable"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <p @click="screen" style="color:#48576a;cursor:pointer;">Advance</p>
      </el-form-item>
      <el-form-item>
          <el-tooltip placement="top">
              <div slot="content">Desc: Multi-conditional filter to support include and exclude relationships.<br/>Tick to indicate enablement.</div>
              <i class="el-icon-warning" style="color:#e0e0e2;"></i>
          </el-tooltip>
      </el-form-item>
       <el-form-item label="Update:" >
        <!--<el-select v-model="formInline.fq" class="testinput" @change="stopThread" >
           <el-option v-for="item in fq" :key="item.id"
                :label="item.value" :value="item.id">
          </el-option>
        </el-select>-->

           <el-input v-model="formInline.fq" placeholder="sec" style="width: 40px;" @blur="checkfq"></el-input>


      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startThread()" >{{excute}}</el-button>
      </el-form-item>
       <el-form-item style='float:right'>
        <el-button type="success" @click="tailLast()">Tail</el-button>
      </el-form-item>
        <el-form-item style='float:right'>
            <el-button type="danger" @click="cleanConsole()" icon='delete2' ></el-button>
        </el-form-item>
      <el-form-item style='float:right'>
        <!-- 新增按钮 -->
        <el-button type="primary" @click="historylog = true">History</el-button>
      </el-form-item>
        <!-- 弹出内容 -->
      <el-dialog
        title="高级筛选"
        :visible.sync="dialogVisible"
        width="30%"
        class="tanchuang"
       >
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!-- 插入表格 -->
          <el-form-item label="配置：" prop="miaoshu">
            <!-- 查询结果表格 -->
            <div style="float:left;">
              <template>
                <el-table
                  :data="tableData1"
                  style="width: 100%">
                  <!-- 动态标签 -->
                  <el-table-column label="包含" min-width="90">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.enable" ></el-checkbox>
                        </template>
                    </el-table-column>
                  <el-table-column prop="value" label="value" width="240">
                      <template scope="scope">
                          <el-input size="small" v-model="scope.row.value" placeholder="请输入value" ></el-input>
                      </template>
                  </el-table-column> 

                  <el-table-column  label="操作" width="100">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData1)"
                        type="text"
                        size="small">
                        移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
            <el-button type="primary"  @click.native.prevent="addRow()">增加</el-button>
          </el-form-item>
          <!-- end -->
  
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>

        <el-dialog
        title="Log Loading Policy Settings"
        :visible.sync="historylog"
        width="30%"
        class="tanchuang1"
       >
        <el-form :inline="true" :model="formInline" >
          <!-- 插入表格 -->
          <el-form-item label="Policy:" prop="miaoshu">
            <div style="float:left;">
              <el-radio-group v-model="radio">
                <el-radio-button :label="1" class="myradio">Relative Time</el-radio-button>
                <el-radio-button :label="2" class="myradio">Custom Time</el-radio-button>
              </el-radio-group>
            </div>
            <div v-show="radio==1" style="float:left;">
             <el-radio-group v-model="radio1">
                <el-radio :label="1">1 min</el-radio>
                <el-radio :label="2">15 min</el-radio>
                <el-radio :label="3">1 hour</el-radio>
                <el-radio :label="4">4 hour</el-radio>
              </el-radio-group>
            </div>
             <div v-show="radio==2"  style="float:left;">
               <div>
                <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期" style="padding:10px 0px">
                </el-date-picker>
               </div>
              <el-time-picker
                  v-model="value2"
                  :picker-options="{
                    selectableRange: '00:00:00 - 23:59:59'
                  }"
                  placeholder="任意时间点">
                </el-time-picker>
                <el-time-picker
                  arrow-control
                  v-model="value3"
                  :picker-options="{
                    selectableRange: '00:00:00 - 23:59:59'
                  }"
                  placeholder="任意时间点">
                </el-time-picker>
            </div>
             <div v-show="radio==1"  style="float:left;color:rgb(119,122,126);line-height:25px;margin-top:20px;">
                 e.g. Selected 1 min, means loading the latest minute log, <br>note: there may be some delay.
            </div>
             <div v-show="radio==2"  style="float:left;color:rgb(119,122,126);line-height:25px;margin-top:20px;">
				Description: Load logs between absolute time intervals [startTime, endTime]
            </div>
          </el-form-item>
          <!-- end -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">OK</el-button>
        </span>
      </el-dialog>
        <!-- end -->
    </el-form>

    <div class="log">
      <!-- <span>进行中. . . .</span> -->
            <div class="line" style="margin-bottom: 10px;">
                <div>Total:<span class="number">{{total}}</span></div>
            </div>

      <template>
          <el-input
            type="textarea"
            :rows="30"
            placeholder="无数暂据"
            v-model="textarea" class="mytextarea" :readonly="true">
          </el-input>
      </template>
    </div>
  </section>
</template>
<script>
  import Console from './Console.js'

  export default Console
</script>
<style>
  .query{
    line-height: 18px;
    margin-bottom: 22px;
  }
  .number{
    font-weight: bold;color: #6cb33e;
  }
  .line{
    width:4px;height:18px;background:#6cb33e;display: block;float: left;margin-right: 6px;
  }
  .el-table th{
    background-color: #34302c;
  }
  .el-table__footer-wrapper thead div, .el-table__header-wrapper thead div{
    background-color: #34302c;
    color: #fff;
  }
  .tanchuang .el-form-item{
    width: 48%;
  }
  .tanchuang .el-form-item__content,.tanchuang .el-select{
    width: 77%;
  }
  .tanchuang .el-form-item{
    margin-bottom: 10px !important;
  }
  .tanchuang .ms{
    width: 100%;
  }
  .tanchuang .el-textarea{
    width: 97%;
  }


  .tanchuang1 .el-form-item__content,.tanchuang .el-select{
    width: 77%;
  }
  .tanchuang1 .el-form-item{
    margin-bottom: 10px !important;
  }
  .tanchuang1 .ms{
    width: 100%;
  }
  .tanchuang1 .el-textarea{
    width: 97%;
  }


  .testinput .el-input__inner{
     width: 80px;
  }
  /* .mytextarea .el-select-dropdown__list {
    list-style: none;
    padding: 6px 0;
    margin: 0;
    box-sizing: border-box;
    width: 40%;
} */
  .mytextarea {
    height: 70vh;
    overflow-y: auto;
  }
   .mytextarea .el-textarea__inner {
    height: 100%;
    color: #aaa; 
    background-color: #333;
    padding: 10px 10px 40px 10px;
    /* color: #bbb; */
    /* cursor: not-allowed; */
  }
  .myradio .el-radio-button__inner {
    font-size: 8px
  }
  .el-dialog .el-dialog__header {
    height: 30px;
    line-height: 30px;
}

  .log{
      margin-top: 40px;
  }
/* .log{
  position: relative;
}
.log span{
  position: absolute;
  bottom: 5px;
  left: 10px;
  z-index: 999;
  color: white;
} */
</style>
