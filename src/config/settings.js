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
    401: function (res,url,success,error) {
      console.debug("Response 401 for redirect_url: " + res['data'].redirect_url);
      checkTGCExpiredRedirectToLoginIfNecessary(res);

      this.$store.dispatch('remove_userinfo').then(() => {
        $.ajax({
          url: getRespJsonURL(res.data.redirect_url),
          type: "post",
          dataType: "json",
          // 设置后跨越请求Client应用才会带上TGC
          xhrFields: { withCredentials: true },
          success: function (res1) {
            console.debug("Redirect iam-server response: "+ JSON.stringify(res1));
            checkTGCExpiredRedirectToLoginIfNecessary(res1);

            $.ajax({
              url: getRespJsonURL(res1.data.redirect_url),
              type: "post",
              dataType: "json",
              // 此时虽Client应用无有效sid(无需指定withCredentials)，
              // 但设置后响应新生成的sid(client cookie)才会被chrome保存
              xhrFields: { withCredentials: true },
              success: function (res2) {
                console.debug("Redirect iam-client response: "+ JSON.stringify(res2));
                $.ajax({
                  url: url,
                  type: "post",
                  dataType: "json",
                  // 此时虽Client应用无有效sid(无需指定withCredentials)，
                  // 但设置后响应新生成的sid(client cookie)才会被chrome保存
                  xhrFields: { withCredentials: true },
                  success: function (res3) {
                    console.debug("Redirect iam-client response: "+ JSON.stringify(res2));
                    if(success){
                      success(res3);
                    }
                  },
                  error: function(req, status, errmsg){
                    console.error(errmsg);
                    if(error){
                      error();
                    }

                  }
                });
              },
              error: function(req, status, errmsg){
                console.error(errmsg);
                error();
              }
            });
          },
          error: function(req, status, errmsg){
            console.error(errmsg);
            error();
          }
        })

      })
    }
  }
};


/**
 * 获取相应格式为JSON的URL
 * @param {*} url 
 */
var getRespJsonURL = function(url){
  if(url.indexOf("?")>0){
    url += "&response_type=json";
  } else{
    url += "?response_type=json";
  }
  return url;
}

/**
 * 检查返回未登录(code=401)时是否跳转登录页，
 * (仅当TGC过期(真正过期)是才跳转登录页，iam-client过期无需跳转登陆页)
 * @param {*} res 
 */
var checkTGCExpiredRedirectToLoginIfNecessary = function(res){
  console.debug("TGC过期检查，res:" + JSON.stringify(res));
  if(res.code == 401 || res.code == '401' || res.data.code == 401 || res.data.code == '401'){
    // IamWithCasAppClient/IamWithCasAppServer
    if(res.data.serviceRole == 'IamWithCasAppServer'){ // TGC过期?
      window.location.href = res.data.redirect_url;
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
