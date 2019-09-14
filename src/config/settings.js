import fa from "element-ui/src/locale/lang/fa";

var gbs = {
//  host: '/srm', // 接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
  db_prefix: 'devops_', // 本地存储的key
  // 状态码字段
  api_status_key_field: 'code',
  // 状态码value
  api_status_value_field: 200,
  // 存放数据的字段
  api_data_field: 'data',
  api_custom: {
    401: function (res) {
      console.info("redirect_url==" + res['data'].redirect_url);
      this.$store.dispatch('remove_userinfo').then(() => {
        //this.$router.push('/login')
        //window.location.href = res['data'].redirect_url;

        $.ajax({
          url: res['data'].redirect_url,   //去请求项目二中的url
          dataType: "json",
          type: "get",
          xhrFields: { withCredentials: true }, // Send cookies when support cross-domain request.
          success: function (data) {
            console.info("success");
          },
          error: function(req, status, errmsg){
            console.info(errmsg);
          }
        })

      })
    }
  }
}

var cbs = {
  /**
   * ajax请求成功，返回的状态码不是200时调用
   * @param  {object} err 返回的对象，包含错误码和错误信息
   */
  statusError (err) {
    console.log('err')
    if (err.status !== 404) {
      this.$message({
        showClose: true,
        message: '返回错误：' + err.msg,
        type: 'error'
      })
    } else {
      this.$store.dispatch('remove_userinfo').then(() => {
        this.$alert(err.status + ',' + err.msg + '！', 'Login Timeout', {
          confirmButtonText: 'OK',
          callback: action => {
            //this.$router.push('/login')
          }
        })
      })
    }
  },

  /**
   * ajax请求网络出错时调用
   */
  requestError (err) {
    this.$message({
      showClose: true,
      message: '请求错误：' + (err.response ? err.response.status : '') + ',' + (err.response ? err.response.statusText : ''),
      type: 'error'
    })
  }
}

export {
  gbs,
  cbs
}
