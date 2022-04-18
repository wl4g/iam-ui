<template>
<div>
    <section v-if="isShow">
        <el-form :inline="true"  :model="searchParams" class="searchbar" style="margin-left:10px" @keyup.enter.native="onSubmit()">
            <el-form-item >
                <el-input v-model="searchParams.key" placeholder="search..." style="width:165px"></el-input>
            </el-form-item>
        </el-form>
        <!--================================table================================-->
        <!-- 查询结果数值 -->
        <div class="query">
            <div class="query-left">
                <div class="line"></div>
                Total： <span class="number">{{total}}</span>
            </div>
            <div>
                <el-button type="primary" style="float:right;margin-right:20px" @click="addData()">{{$t('message.common.add')}} </el-button>
                <el-button type="primary" style="float:right;margin-right:20px" @click="addData()">Add Builten</el-button>
            </div>
        </div>
        <!-- 查询结果表格 -->
        <div>
            <template>
                <el-table :data="tableData" :border="true" style="width:100%">
                    <el-table-column prop="key" label="Name" min-width="100"></el-table-column>
                    <el-table-column prop="value" label="Category"></el-table-column>
                    <el-table-column prop="type" label="Type" width=120></el-table-column>
                    <el-table-column prop="label" label="Priority Order" :show-overflow-tooltip="true" width=120></el-table-column>
                    <el-table-column :label="$t('message.common.operation')" min-width="100">
                        <template slot-scope="scope">
                            <el-button type="danger" icon='delete' @click="delData(scope.row)">{{$t('message.common.del')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :current-page="pageNum" @current-change='currentChange' ></el-pagination>

    </section>
    <section v-if="!isShow">
        <div>Create Protocol Mapper</div>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="200px" class="demo-ruleForm" >
            <el-form-item prop="url">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Protocol</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-input v-model="ruleForm.name" disabled style="width:400px"></el-input>
            </el-form-item>
            <el-form-item prop="url">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Name</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-input v-model="ruleForm.name" style="width:250px"></el-input>
            </el-form-item>
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
                <el-select v-model="ruleForm.type" placeholder="请选择" style="width:400px" :filterable="true" clearable>
					<el-option v-for="item in allType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="url">
                <template slot="label">
                    <span class="lableStyle">
                        <span >User Attribute</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-input v-model="ruleForm.name" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item prop="url">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Token Claim Name</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：****</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
                </template>
                <el-input v-model="ruleForm.name" style="width:400px"></el-input>
            </el-form-item>
            <el-form-item prop="enabled">
                <template slot="label">
                    <span class="lableStyle">
                        <span >Claim JSON Type</span>
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
                        <span >Add to ID token</span>
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
                        <span >Add to access token</span>
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
                        <span >Aggregate attribute values</span>
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
    </section>
</div>
</template>
<script>
export default {
    name:'mappers',
    data(){
        return{
            isShow:true,
            //查询条件
            searchParams: {
                key: '',
            },
            total:'',
            tableData:[],
            ruleForm:{
                name:'',
                enabled:true
            },
            allType:[
                {
                    lable:'123',
                    value:'333'
                }
            ]
        }
    },  
    mounted(){
        this.isShow = true
    },
    methods:{
        addData(){
            this.isShow = !this.isShow
        },
        submitForm(){
            this.isShow = !this.isShow
        }
    }
}
</script>
<style>

</style>