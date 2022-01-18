<template>
  <div style="height: 610px">
    <el-form ref="form" :model="form"  label-width="80px" class="login-box" style="background-color: #ffffff;opacity: 0.95;">
      <h3 style="margin-bottom: 10px">找回密码</h3>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
        <el-form-item label="新密码" prop="newpwd1">
          <el-input type="password" v-model="form.newpwd1" show-password=""></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newpwd2">
          <el-input type="password" v-model="form.newpwd2" show-password=""></el-input>
        </el-form-item>
      <el-form-item class="sure">
        <el-button style="background-color: #65CEA7;width: 120px;" class="sub" @click="submit">确定</el-button>
        <el-button style="background-color: #65CEA7;width: 120px;" class="sub" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import axios from 'axios'
// axios.defaults.baseURL = 'http://218.93.206.188:49734/dmsapi'
// axios.defaults.timeout = 5000
export default {
  name: 'FindPwd',
  data () {
    return {
      form: {
        name: null,
        newpwd1: null,
        newpwd2: null
      }
    }
  },
  methods: {
    back () {
      this.$router.replace({path: '/login'})
    },
    submit: function () {
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: 'changePassword',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          password: this.newpwd2
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        if (res.data === true) {
          alert('密码修改成功,返回登录')
          this.$router.replace({path: '/login'})
        }
      }).catch(() => {
        alert('err')
      })
    }
  }
}
</script>

<style scoped>
  .login-box {
    width: 400px;
    margin: 200px auto;
    border: 1px solid #DCDFE6;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 30px #DCDFE6;
  }
  .flag {
    width: 63.5%;
  }
  .sure{
    margin: 0;
  }
  .sub {
    padding: 15px 50px;
    left: -40px;
    position: relative;
  }
</style>
