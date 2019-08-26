<template>
    <div id="wrap" style="background:url('/static/images/bg_icon/background.png') no-repeat;background-size: cover;">
        <div id="top">
            <img id="img_logo" src="static/images/bg_icon/logo.png"/>
        </div>
        <div id="content">
            <div id="content-left" class="lanren">
                <ul>
                    <li><img src="static/images/roll/ai1.png"></li>
                    <li><img src="static/images/roll/ai2.png"></li>
                    <li><img src="static/images/roll/ai3.png"></li>
                </ul>
                <ul>
                    <li><img src="static/images/roll/wulianwang1.png"></li>
                    <li><img src="static/images/roll/wulianwang2.png"></li>
                    <li><img src="static/images/roll/wulianwang3.png"></li>
                </ul>
                <ul>
                    <li><img src="static/images/roll/nengyuan1.png"></li>
                    <li><img src="static/images/roll/nengyuan2.png"></li>
                    <li><img src="static/images/roll/nengyuan3.png"></li>
                </ul>
                <div class="base">
                    <img src="static/images/roll/base.png" alt="图片">
                </div>
                <div class="cloud">
                    <img src="static/images/roll/yun.png" alt="图片">
                </div>
                <div class="shadow">
                    <img src="static/images/roll/yunyinyin.png" alt="图片">
                </div>
                <div class="light">
                    <img src="static/images/roll/guangzhu.png" alt="图片">
                </div>
            </div>
            <div id="content-right">
                <div id="con-top">
                    <span id="passwordGo" class="active">账号登录</span>
                    <span class="cut-line">|</span>
                    <span id="phoneGo">手机登录</span>
                    <span class="cut-line">|</span>
                    <span id="codeGo">扫码登录</span>
                </div>
                <div id="err_tip"></div>
                <div id="login_scan_pass">
                    <form action="#">
                        <div>
                            <i class="icon-user"></i>
                            <input id="user_name" class="text1" name="username" placeholder="请输入账号"
                                   style="color: #fff;border: 1px solid #80c1fb;background:#253667;padding-left:40px;border-radius:2px 2px 2px 2px;"
                                   maxlength=20>
                        </div>
                        <div class="pass-word">
                            <i class="icon-pass"></i>
                            <input placeholder="请输入密码" id="password" class="text1 text2"
                                   style="color: #fff;border: 1px solid #80c1fb;background:#253667;padding-left:40px;border-radius:2px 2px 2px 2px;"
                                   name="password" type="password" maxlength=25>
                        </div>
                        <div id="captcha_panel">
                            <i class="icon-code"></i>
                            <input id="captcha_input" class="text4" name="captcha" maxlength=5
                                   style="border:1px solid #dad2d2;padding-left:20px;border-radius:2px 2px 2px 2px;display:none;">
                            <img id="codeimg" name="codeimg" border=0
                                 style="padding:0 0 5px 0;position:relative;top:18px;margin-left:5px;width:100px;height:35px;cursor:pointer;display:none;"
                                 title="看不清点击图片刷新">
                        </div>
                        <br/>
                        <input id="iam_submit" type="button" style="cursor:pointer;" value="登录"><br/><br/><br/>
                        <div style="position:relative;margin-top:-30px;left:18px;display: none">
							<span
                                    style="text-decoration: line-through;margin-left: 40px;color: #efefef;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                            <span class="con-foot">手机号登录</span>
                            <span
                                    style="text-decoration: line-through;color: #efefef;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <div style="margin-top:15px;margin-left:10px;display: none">
                            <img id="wechat" style="cursor:pointer;margin-left:70px;" src="static/images/bg_icon/wx.png">
                            <img id="qq" style="cursor:pointer;margin-left:48px;" src="static/images/bg_icon/qq.png">
                            <img id="sina" style="cursor:pointer;margin-left:52px;" src="static/images/bg_icon/sina.png">
                        </div>
                    </form>
                </div>

                <div id="login_scan_panel">
                    <div id="content-left1">
                        <div id="qrcode_show" style="height:255px;">
                        </div>
                    </div>
                    <div style="text-align: center;color: #4e619c;">打开&nbsp;&nbsp;<b
                            style="color: #fff;">微信’扫一扫’</b>&nbsp;&nbsp;扫描二维码
                    </div>
                </div>
                <div id="login_phone">
                    <!-- <form action="#"> -->
                    <div>
                        <i class="icon-phone"></i>
                        <select class="select-area">
                            <option value="+086">大陆+086</option>
                            <option value="+852">香港+852</option>
                            <option value="+853">澳门+853</option>
                            <option value="+084">越南+084</option>
                            <!-- <option value="+092">巴基斯坦+092</option> -->
                            <!-- <option value="+065">新加坡+065</option> -->
                            <option value="+358">法国+358</option>
                            <option value="+066">泰国+066</option>
                        </select>
                        <!-- <input id="user_phone" class="text1" name="phone" placeholder="请输入手机号"
                                style="box-sizing:border-box;width:240px;color: #fff;border: 1px solid #80c1fb;background:#253667;padding-left:125px;border-radius:2px 2px 2px 2px;"
                                maxlength=40> -->
                        <input id="user_phone" class="text1" name="phone" placeholder="请输入手机号"
                               style="box-sizing:border-box;width:240px;color: #fff;border: 1px solid #80c1fb;background:#253667;padding-left:125px;border-radius:2px 2px 2px 2px;"
                               maxlength="11" onkeypress="return event.keyCode>=48&amp;&amp;event.keyCode<=57"
                               onkeyup="value=value.replace(/[^\d]/g,'') " ng-pattern="/[^a-zA-Z]/">
                    </div>
                    <p class="err-info phone-err">请输入正确的手机号</p>
                    <div class="pass-word code-number">
                        <i class="icon-codeNumber"></i>
                        <input placeholder="请输入短信动态码" id="codeNumber" class="text1 text2"
                               style="box-sizing:border-box;width:240px;color: #fff;border: 1px solid #80c1fb;background:#253667;padding-left:40px;border-radius:2px 2px 2px 2px;"
                               name="codeNumber" type="text" maxlength=6>
                        <button type="button" id="code-get">获取</button>
                    </div>
                    <p class="err-info pass-err">请输入短信验证码</p>
                    <br>
                    <input id="phone_submit" type="button" style="cursor:pointer;" value="登录">
                    <!-- </form> -->
                    <div id="code-write" class="code-write">
                        <p>
                            <span class="err-tip"></span>
                            <span class="code-close">x</span>
                        </p>
                        <p>
                            <span>图文验证码</span>
                        </p>
                        <div style="margin: 10px 10px 0 10px;">
                            <i class="icon-codecode"></i>
                            <input id="user_code" class="text1" name="code" placeholder="请输入验证码"
                                   style="width:100px;color: #fff;border: 1px solid #80c1fb;background:#253667;padding-left:40px;border-radius:2px 2px 2px 2px;"
                                   maxlength=40>
                            <img class="code-image" src="" alt="图片">
                        </div>
                        <br>
                        <div style="text-align: center">
                            <input id="code_submit" type="button" style="cursor:pointer;width:90%;" value="确定">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="foot" style="line-height:24px; position:relative;">
            <div>Copyright © 2016 - 2020 XXXX科技有限公司· XXX云平台 ● 京ICP备xxxxx号-1</div>
            <!--<div style="position:absolute;width:120px;top:-25px;right:10%">关注我们<img src="static/qrcode2.png"></div> -->
        </div>
        <!-- <div class="main-right">
            <div class="rightimageBox">
                <div id="qrcode-title">微信扫码关注</div>
                <img class="rightImage" src="static/qrcode-safecloud-mp.jpg">
            </div>
        </div> -->
    </div>
</template>

<script>
    import LoginJs from './Login.js'

    export default LoginJs



</script>

<style scoped lang='less'>

    //@import url(Login.less);
    //@import "./static/css/bootstrap-3.3.7.min.css";
    @import "/static/css/lanren.css";
    @import "/static/css/login.css";
    @import "/static/css/upgrade.css";
    @import "/static/css/wx.css";

</style>
