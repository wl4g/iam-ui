import {
  store
} from 'utils/'
/**
 * Created by sailengsi on 2017/5/11.
 */
export default {
  name: 'login',
  data () {
    return {
      winSize: {
        width: '',
        height: ''
      },
      formOffset: {
        position: 'absolute',
        left: '',
        top: ''
      },
      register: false,
      login_actions: {
        disabled: false
      },
      data: {
        username: '',
        password: ''
        // token: ''
      },
    }
  },
  methods: {

  },
  mounted () {
      //var iamBaseURI = "http://passport.anjiancloud.test/sso";
      //var iamBaseURI = "http://passport.wl4g.com/sso";
      var iamBaseURI = "http://localhost:14040/iam-server";
  
      // 引用IAM SDK插件，处理SNS授权操作
      (function () {
        window.IAM.Core.configure({
          baseUri: iamBaseURI, // IAM认证服务接口的基础URI
          // 定义验证码显示面板配置
          captcha: {
            use: "VerifyWithJigsawGraph", // default by 'VerifyWithGifGraph'
            panel: document.getElementById("jigsaw"), // Jigsaw验证码时必须
            img: document.getElementById("codeimg"), // 验证码显示 img对象（仅jpeg/gif时需要）
            input: document.getElementById("captcha_input"), // 验证码input对象（仅jpeg/gif时需要）
            onSuccess: function(verifiedToken) {
              console.debug("Captcha verify successful. verifiedToken is "+ verifiedToken);
            },
            onError: function(errmsg) { // 如:申请过于频繁
              console.warn(errmsg);
            }
          },
          // 登录认证配置
          account: {
            submitBtn: document.getElementById("iam_submit"), // 登录提交触发对象
            principal: document.getElementById("user_name"), // 必填，获取填写的登录用户名
            credential: document.getElementById("password"), // 获取登录账号密码，账号登录时必填
            onBeforeSubmit: function (principal, plainPasswd, captcha) { // 提交之前
              //console.log("准备提交登录....");
              return true;
            },
            onSuccess: function (principal, redirectUrl) {
              //console.log("登录成功!");
              return true; // 返回false会阻止自动调整
            },
            onError: function (errmsg) {
              console.error("登录失败. " + errmsg);
              $("#err_tip").text(errmsg).show().delay(5000).hide(100);
            }
          },
          sms: { // SMS认证配置
            submitBtn: document.getElementById("phone_submit"), // 登录提交触发对象
            sendSmsBtn: document.getElementById("code-get"), // 发送SMS验证码对象
            mobileArea: $(".select-area"), // 手机号区域select对象
            mobile: document.getElementById("user_phone"), // 手机号input对象
            smsCode: document.getElementById("codeNumber"), // SMS验证码input对象
            onBeforeSubmit: function (mobileNum, smsCode) {
              //console.log("准备提交登录....");
              return true;
            },
            onSuccess: function(resp){
              $('.err-tip').text('');
              $('.code-write').hide();
            },
            onError: function(errmsg){
              console.error(errmsg);
              $("#err_tip").text(errmsg).show().delay(8000).hide(100);
            }
          },
          // SNS授权配置
          sns: {
            // 定义必须的请求参数
            required: {
              which: function () { // 执行操作类型，必须：当使用登录功能时值填"login",当使用绑定功能时值填"bind"
                return "login";
              },
              //refreshUrl: "" // SNS回调后重定向刷新的URL，可选，which=login时传空
            },
            // 定义内嵌授权页面配置
            qrcodePanel: {
              src: document.getElementById("qrcode_show"),
              width: "250",
              height: "260"
            },
            // 定义新开的TAB授权页的配置
            pagePanel: {
              "width": "800px",
              "height": "500px",
              "left": "250px",
              "top": "100px"
            },
            // 定义支持的社交网络服务商配置
            provider: {
              // "qq": { // 服务商名(需与后台对应, 可选：qq/wechat/sina/github/google/dingtalk/twitter/facebook等)
              // 	panelType: "pagePanel", // 使用新开TAB页的方式渲染授权页面
              // 	src: document.getElementById("qq") // 绑定QQ授权点击事件源
              // },
              "wechat": { // 服务商名(需与后台对应, 可选：qq/wechat/sina/github/google/dingtalk/twitter/facebook等)
                panelType: "qrcodePanel", // 使用内嵌的方式渲染扫码授权页面
                src: document.getElementById("codeGo") // 绑定Wechat授权点击事件源
              }
            },
            // 点击SNS服务商授权请求之前回调事件
            onBefore: function (provider, panelType) {
              if (provider == 'wechat') { // 只有微信等扫码登录时，才切换tab
                changeTab('login_scan_panel', 'login_scan_pass');
              }
              // 执行后续逻辑，返回false会阻止继续
              return true;
            }
          }
        }).bindForAccountAuthenticator().bindForSMSAuthenticator().bindForSNSAuthenticator().bindForCaptchaVerifier();
      })();
    
      // 监听panelType为pagePanel类型的SNS授权回调
      (function () {
        window.onmessage = function (e) {
          window.location.href = JSON.parse(e.data).refresh_url;
        }
      })();

      // 因SNS授权（如:WeChat）只能刷新页面，因此授权错误消息只能从IAM服务加载
      (function() {
        var url = iamBaseURI + "/login/errread";	
        $.ajax({
          url: url,
          success: function (res) {
            //console.log(res);
            var errmsg = res.data["errorTipsInfo"];
            if (errmsg != null && errmsg.length > 0) {
              $("#err_tip").text(errmsg).show().delay(8000).hide(100);
            }
          }
        });
      })();

  },

}
