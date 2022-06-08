<template>
  <div class="overView">
    <el-card class="box-card">
      <div class="top">
        <div class="topItem">
          <div class="topItemTitle">1小时访问</div>
          <div class="topItemContent">
            <div class="topItemContentLeft">197</div>
            <i class="el-icon-platform-eleme topItemContentRight" @click="toDetail(1)"></i>
          </div>
          <!-- <v-chart :options="register" /> -->
        </div>
        <div class="topItem">
          <div class="topItemTitle">今日访问</div>
          <div class="topItemContent">
            <div class="topItemContentLeft">3022</div>
            <i class="el-icon-platform-eleme topItemContentRight" @click="toDetail(2)"></i>
          </div>
        </div>
        <div class="topItem">
          <div class="topItemTitle">本周访问</div>
          <div class="topItemContent">
            <div class="topItemContentLeft">23891</div>
            <i class="el-icon-platform-eleme topItemContentRight" @click="toDetail(3)"></i>
          </div>
          <!-- <v-chart :options="register" /> -->
        </div>
        <div class="topItem">
          <div class="topItemTitle">本月访问</div>
          <div class="topItemContent">
            <div class="topItemContentLeft">127848</div>
            <i class="el-icon-platform-eleme topItemContentRight" @click="toDetail(4)"></i>
          </div>
          <!-- <v-chart :options="register" /> -->
        </div>
      </div>
    </el-card>
    <div class="content">
      <div class="contentLeft">
        <div class="leftItem">
          <div class="leftItemTitle">Id Server简介</div>
          <div class="leftItemContent">
            Id Server能介
            ldi server 星一个基于Spring Authonization Server 的开漂的怪权服务器，欢温star,如黑有兴短也可以对本项日发起贡献。
            </br>
            主要功編
            </br>
            1.通过U界面创建OAulh2春户确，并对OAuth2春尸确进行管理。
            </br>
            2.提供OAUm2慢权散身。
            </br>
            3.提供H2和Mysql两种环编
            </br>
            4.提供い空制台，睡低上手成本，
            </br>
            支种CLIENT_SECRET_BASIC、CLIENT_SECRET_POST,CLIENT_SECRET_JWT、PRIVATE_KEY_JWT目PE户ùU证方式
            </br>
            6支特AUTHORIZATION_CODE, CLIENT_CREDENTIALS. REFRESH_TOKEN 三4OAUN2仪方式。
            </br>
            7.OIDC 1.0的更待（完部中），
            </br>
            8.动态调监管理员的用户角色，对挠权服务器进行依细动能级别的权限控制。
            </br>
            主要功編
            </br>
            1.通过U界面创建OAulh2春户确，并对OAuth2春尸确进行管理。
            </br>
            2.提供OAUm2慢权散身。
            </br>
            3.提供H2和Mysql两种环编
            </br>
            4.提供い空制台，睡低上手成本，
            </br>
            支种CLIENT_SECRET_BASIC、CLIENT_SECRET_POST,CLIENT_SECRET_JWT、PRIVATE_KEY_JWT目PE户ùU证方式
            </br>
            6支特AUTHORIZATION_CODE, CLIENT_CREDENTIALS. REFRESH_TOKEN 三4OAUN2仪方式。
            </br>
            7.OIDC 1.0的更待（完部中），
            </br>
            8.动态调监管理员的用户角色，对挠权服务器进行依细动能级别的权限控制。
          </div>
        </div>
      </div>
      <div class="contentRight">
        <div class="rightItem">
          <div class="rightItemTitle">
            安全概览:
          </div>
          <div class="rightItemContent">
            <div class="rightContentTitle">疑似警告</div>
            <div class="rightcontentMain">
              <div class="rightContentNum">197</div>
              <i class="el-icon-platform-eleme rightContentNumIcon"></i>
            </div>
          </div>
          <div class="line"></div>
          <div class="rightItemContent">
            <div class="rightContentTitle">严重事件</div>
            <div class="rightcontentMain">
              <div class="rightContentNum">3022</div>
              <i class="el-icon-platform-eleme rightContentNumIcon"></i>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Overview from './Overview.js'
export default Overview
</script>

<style lang="less" >
.box-card .el-card__body {
  padding: 0;
}
.box-card .clearfix span {
  font-size: 1.2vw;
}
.overView {
  .box-card {
    margin-bottom: 1.2vw;
  }
  .top {
    height: 9vw;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .topItem {
    background: #ffffff;
    width: 24.5%;
    height: 9vw;
    // box-shadow: 11px 7px 6px 16px rgb(223 223 223 / 10%);
    box-shadow: 6px 6px 10px 10px #dfdfdf1a;
  }
  .saveItem {
    background: #ffffff;
    width: 49%;
    height: 8vw;
  }
  .topItemTitle {
    height: 3vw;
    line-height: 3vw;
    font-size: 1.1vw;
    text-align: center;
  }
  .topItemContent {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 5vw;
  }
  .topItemContentLeft {
    font-size: 1.1vw;
  }
  .topItemContentRight {
    font-size: 1.5vw;
    cursor: pointer;
  }
  .echarts {
    width: auto;
    height: 5vw;
  }
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  .contentLeft {
    width: 75%;
    background: #ffffff;
    box-shadow: 6px 6px 10px 10px #dfdfdf1a;
  }
  .contentRight {
    width: 24.5%;
    background: #ffffff;
    box-shadow: 6px 6px 10px 10px #dfdfdf1a;
  }
  .leftItemTitle {
    height: 3vw;
    line-height: 3vw;
    font-size: 1.1vw;
    font-weight: bold;
    padding-left: 1.2vw;
  }
  .leftItemContent {
    padding-left: 1.2vw;
  }
  .rightItemTitle {
    height: 3vw;
    line-height: 3vw;
    font-size: 1.1vw;
    font-weight: bold;
    padding-left: 1.2vw;
  }
  .rightContentTitle {
    font-size: 1vw;
    text-align: center;
  }
  .rightcontentMain {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 5vw;
    line-height: 5vw;
  }
  .rightContentNum {
    font-size: 1vw;
  }
  .rightContentNumIcon {
    font-size: 1.5vw;
  }
  .line {
    margin: 0 auto 1.5vw;
    width: 80%;
    height: 2px;
    background: #f1f1f1;
  }
}
</style>
