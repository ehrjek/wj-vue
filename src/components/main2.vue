<template>
  <el-container style="border: 1px solid #eee;">
    <!--    左边导航栏-->
    <el-aside width="200px"  style="height: 798px;background-color: #424F63">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1"   >
          <template slot="title" style="width: 200px">
            <div class="person" style="width: 50px;height: 50px;float: left">
              <i class="el-icon-user-solid" ></i>
              <img src="https://imagev2.xmcdn.com/group67/M00/25/FC/wKgMbV25hW2j70fkAAEGeFadOjI766.jpg" style="width: 50px;height: 50px;border-radius: 50px;left: 65px;position: absolute">
            </div>
            <!--              <el-row class="demo-avatar demo-basic">-->
            <!--                    <div class="block"><el-avatar :size="50" :src="circleUrl"></el-avatar></div>-->
            <!--                      <el-avatar :size="large" :src="circleUrl"></el-avatar>-->
            <!--              </el-row>-->
          </template>
          <el-menu-item-group style="background: #424F63;width: 200px" >
<!--                          <el-menu-item index="1-1" @click="ky">-->
<!--                            <li class="el-icon-house" ></li><router-link class="by" to="/home" >查看资料需求</router-link>-->
<!--                          </el-menu-item>-->
<!--            <el-menu-item index="1-2" @click="ky2">-->
<!--              <li class="el-icon-circle-plus-outline"></li><router-link class="by" to="/creatMeeting" style="">创建资料需求</router-link>-->
<!--            </el-menu-item>-->
            <el-menu-item index="1-3" @click="ky3">
              <li class="el-icon-setting"></li><router-link class="by" to="/meeting2">查看资料列表</router-link>
            </el-menu-item>
            <el-menu-item index="1-4" @click="ky4">
              <li class="el-icon-user"></li><router-link class="by" to="/Message2">个人信息</router-link>
            </el-menu-item>
            <!--              <el-menu-item index="1-5" @click="ky5">-->
            <!--                <li class="el-icon-notebook-2"></li><router-link class="by" to="/commitcode">编辑会议日程</router-link>-->
            <!--              </el-menu-item>-->
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <!--    头部-->
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="main-title"></span>
        <el-dropdown>
          <i class="el-icon-s-tools" style="margin-right: 15px;color: #65CEA7;"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <router-link to="/login" style="text-decoration: none;color: #000000">退出登录</router-link>
            </el-dropdown-item>
            <!--                <el-dropdown-item>新增</el-dropdown-item>-->
            <!--                <el-dropdown-item>删除</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
        <span style="color: #65CEA7;font-size: 15px;margin-right: 30px">{{admin}}</span>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'main2',
  data () {
    return {
      admin: localStorage.getItem('name'),
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    ky () {
      this.$router.replace({path: '/home'})
    },
    ky2 () {
      this.$router.replace({path: '/creatMeeting'})
    },
    ky3 () {
      this.$router.replace({path: '/meeting2'})
    },
    ky4 () {
      this.$router.replace({path: '/Message2'})
    },
    ky5 () {
      this.$router.replace({path: '/commitcode'})
    }
  }
}
</script>

<style scoped>
  .by:hover{
    color: #65CEA7;
  }
  .el-header {
    background-color: #424F63;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .by {
    text-decoration:none;
    color: #65CEA7;
    margin-left: 10px;
  }
  .el-menu-item{
    font-size: 15px;
    margin-top: 20px;
  }
  .el-icon-house {
    color:#65CEA7;
    left: 30px;
    bottom:15px;
    position: absolute
  }
  .el-icon-circle-plus-outline{
    color:#65CEA7;
    left: 30px;
    bottom:15px;
    position: absolute
  }
  .el-icon-setting {
    color:#65CEA7;
    left: 30px;
    bottom:15px;
    position: absolute
  }
  /*.el-submenu__title {*/
  /*  border: 5px solid red;*/
  /*}*/
  /*.el-menu-item:hover{*/
  /*  color:#353F4F;*/
  /*}*/
  .person-info {
    padding: 10px;
    background: #F1F1F1
  }

  .person-info .person-photo {
    float: left
  }
  .el-icon-notebook-2 {
    color:#65CEA7;
    left: 30px;
    bottom:15px;
    position: absolute
  }
  .el-icon-user {
    color:#65CEA7;
    left: 30px;
    bottom:15px;
    position: absolute
  }
  .person-info .person-account {
    float: left;
    margin-left: 10px;
    margin-top: -3px;
    font-size: 14px
  }

  .person-info .person-account span {
    display: block;
    line-height: 26px
  }
</style>
