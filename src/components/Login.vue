<template>
    <div style="height: 610px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-box" style="background-color: #ffffff;opacity: 0.95" >
        <h3 class="login-title">欢迎登录</h3>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="act" >
          <el-button  @click="login"  class="sub"  style="background-color: #65CEA7;width: 90px;margin-left: -50px">登录</el-button>
        </el-form-item>
        <el-form-item class="act">
          <router-link type="info" to="/findPwd"  class="findPwd" style="text-decoration: none">忘记密码?</router-link>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import axios from 'axios'
// axios.defaults.baseURL = 'http://218.93.206.188:49734/dmsapi'
// axios.defaults.timeout = 5000
export default {
  name: 'Login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
      msg: ''
    }
  },
  methods: {
    login: function () {
      var name = this.form.name
      var pwd = this.form.password
      console.log(name, pwd)
      axios({
        method: 'post',
        url: '/login',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          account: name,
          password: pwd
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        // alert(res.data)
        console.log(res.data)
        console.log(res.data[0])
        if (res.data[0] === 0) {
          alert('登陆失败')
        } else if (res.data[0] === 1) {
          alert('登录成功')
          localStorage.setItem('token', res.data[1])
          this.$router.replace({path: '/main2'})
        } else {
          alert('登录成功')
          localStorage.setItem('token', res.data[1])
          this.$router.replace({path: '/main'})
        }
      }).catch(() => {
        alert('err')
      })
      localStorage.setItem('name', name)
      // this.$router.replace({path:'/main'})
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

  .login-title {
    text-align: center;
    margin-bottom: 20px;
  }
  .act{
    margin: 0;
  }

  .findPwd {
    margin: 0;
    margin-left: 80%;
    text-align:right;

  }
</style>
