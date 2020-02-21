
import {store} from "../../../utils";
import i18n from "../../../i18n/i18n";

export default {
  name: 'manage-menu',
  components: {  },
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        callback();
      }
    };

    return {
      //tree-table 标题列数据
      columns: [
        {
          text: i18n.t('message.common.enName'),
          value: 'name',
          icon: true,
          width: 220
        },
        {
          text: i18n.t('message.common.name'),
          value: 'displayName',
          width: 250,
        },
        {
          text: i18n.t('message.iam.permission'),
          value: 'permission',
        },
        {
          text: i18n.t('message.common.icon'),
          value: 'icon',
          width: 220
        }
      ],
      //tree-table 行数据
      data: [],
      // 列表按钮配置
      btn_info: {
        width: 250,
        add_text: i18n.t('message.common.addChild'),
        update_text: i18n.t('message.common.edit'),
        delete_text: i18n.t('message.common.del'),
      },
      //form 属性
      formFields: {
        id: '',
        name: '',
        displayName: '',
        parentId: '',
        permission: '',
        pageLocation: '',
        routePath: '',
        icon: '',
        sort: '',
        type: '',
      },

      //验证
      rules: {
        name: [{ required: true, message: 'Please input name', trigger: 'blur' }],
        displayName: [{ required: true, message: 'Please input displayName', trigger: 'blur' }],
        permission: [{required: true, message: 'Please input permission', trigger: 'blur' }],
        sort: [
          { required: true, message: 'Please input sort', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
      },

      //弹窗控制
      dialogVisible: false,
      //用于锁定确认按钮，避免重复提交
      dialogSubmitBtnSwith: false,
      //窗口标题
      windowTitle: '',
      //弹窗定位
      labelPosition: 'right',
      loading: false,
    }
  },
  methods : {
    /**
     * 获取列表
     */
    onGetList() {
      this.loading = true;
      this.$$api_iam_getMenuTree({
        fn: data => {
          this.loading = false;
          this.data = data.data.data;
        },
        errFn: () => {
          this.loading = false;
        }
      })
    },

     /**
     * 点击删除按钮
     */
    onClickBtnDelete(opts) {
       this.$confirm('请小心！！！子菜单会连同一起删除，是否继续？', '确认删除？').then(() => {
         this.$$api_iam_delMenu({
           data: {id: opts.data.id},
           fn: data => {
             this.onGetList();
           }
         })
       }).catch(() => {
         //do nothing
       })
     },
    /**
     * 添加下级菜单按钮
     */
    onClickBtnAdd(opts) {
      this.emptyFormFieldsAndEnableDialogSubmitBtn();
      this.windowTitle = '添加['+opts.data.displayName+']的下级菜单';
      this.dialogVisible = true;
      this.formFields.parentId = opts.data.id;
    },
    /**
     * 修改按钮
     */
    onClickBtnUpdate(opts) {
      this.emptyFormFieldsAndEnableDialogSubmitBtn();
      this.windowTitle = '修改['+opts.data.displayName+']菜单';
      this.dialogVisible = true;
      this.formFields = {
        id: opts.data.id,
        name: opts.data.name,
        displayName: opts.data.displayName,
        parentId: opts.data.parentId,
        permission: opts.data.permission,
        pageLocation: opts.data.pageLocation,
        routePath: opts.data.routePath,
        icon: opts.data.icon,
        sort: opts.data.sort,
        type: opts.data.type?opts.data.type.toString():'',
      }
    },
    /**
     * 清空所有的绑定属性，用于切换form的时候
     */
    emptyFormFieldsAndEnableDialogSubmitBtn(){
      if(this.$refs['menuForm']) {
        this.$refs['menuForm'].resetFields();
      }
      this.formFields = {
        id: '',
        name: '',
        displayName: '',
        parentId: '',
        permission: '',
        pageLocation: '',
        routePath: '',
        icon: '',
        sort: '',
        type: ''
      };
    },
    /**
     * 添加顶级菜单
     */
    addTopLevelModule(){
      this.emptyFormFieldsAndEnableDialogSubmitBtn();
      this.dialogVisible = true;
      this.windowTitle = '添加顶级菜单';
      this.formFields.parentId = 0;
    },
    /**
     * 添加或者保存
     */
    save(){
      this.dialogSubmitBtnSwith = true;

      this.$refs['menuForm'].validate((valid) => {
        if (valid) {
          this.$$api_iam_saveMenu({
            data: this.formFields,
            fn: data => {
              this.$message({
                message: 'save success',
                type: 'success'
              });
              this.dialogVisible = false;
              this.dialogSubmitBtnSwith = false;
              this.onGetList();
            },
            errFn: () => {
              this.dialogSubmitBtnSwith = false;
            }
          })
        }else {
          this.dialogSubmitBtnSwith = false;
        }
      });
    },

    /**
     * 菜单树节点选中事件
     */
    /*checkChange(node){
      this.formFields.parentModuleId = node.moduleId
      this.formFields.parentModuleName = node.moduleName + ' / ' + node.levelLabel
    },*/
  },
  mounted() {
    this.onGetList();
  },


}
