<template>
    <el-form ref="form" :model="meeting" class="login-box" style="margin-left: 280px;opacity: 93%;width: 800px;"  :rules="rules" >
      <div class="add-lay" style="height: 620px;margin-top: 10px">
        <h3 style="padding-top: 10px" class="login-title">创建资料需求</h3>
        <el-form-item label="资料名称" prop="name" style="margin-left: 100px;" >
          <input type="text" v-model="meeting.name" class="ty" >
        </el-form-item>
        <el-form-item label="资料简介" prop="info" >
          <el-input
            type="textarea" style="width: 500px;margin-left: -57px"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="meeting.desc" clearable >
          </el-input>
        </el-form-item>
        <el-form-item label="设置资料提交截止时间" prop="time" >
            <el-date-picker style="width: 300px;margin-left: -140px"
              v-model="value2"
              type="datetime"
              placeholder="设置资料提交截止时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="专业" prop="major" >
          <input type="text" v-model="meeting.major" class="ty">
        </el-form-item>
        <el-form-item label="年级" prop="grade" >
          <input type="text" v-model="meeting.grade" class="ty">
        </el-form-item>
        <el-form-item label="班级" prop="class">
          <input type="text" v-model="meeting.class" class="ty">
        </el-form-item>
        <el-form-item >
          <el-button  @click="create"  class="sub" style="background-color: #65CEA7;width: 100px;margin-left: -100px">创建</el-button>
        </el-form-item>

      </div>

    </el-form>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
// axios.defaults.baseURL = 'http://218.93.206.188:49734/dmsapi'
// axios.defaults.timeout = 5000
export default {
  name: 'CreatMeeting',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入会议名'))
      } else {
        if (this.meeting.name !== '') {
          this.$refs.form.validateField('name')
        }
        callback()
      }
    }
    return {
      value2: '',
      meeting: {
        name: '',
        desc: '',
        deadLine: '',
        grade: '',
        class: '',
        major: ''
      },
      form: {
        name: '',
        desc: '',
        deadLine: '',
        grade: '',
        class: '',
        major: ''
      },
      rules: {
        name: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    create: function () {
      var a = localStorage.getItem('token')
      this.meeting.deadLine = moment(this.value2).format('YYYY-MM-DD HH:mm:ss')
      axios({
        method: 'post',
        url: 'teaCreate',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          name: this.meeting.name,
          desc: this.meeting.desc,
          deadLine: this.meeting.deadLine,
          grade: this.meeting.grade,
          class: this.meeting.class,
          major: this.meeting.major
        },
        // withCredentials: true,
        // crossDomain: true
        dataType: 'jsonp'
      }).then(res => {
        if (res.data === true) {
          alert('资料需求创建成功')
        } else {
          alert('请将信息填写完整')
        }
      }).catch(() => {
        alert('err')
      })
    }
  }
}
</script>

<style scoped>
  .add-lay {
    left:50%;
    width: 100%;
    background: #fff;
    text-align: center;
    margin: 0;
    border: 1px solid #DCDFE6;
    border-radius: 15px;
    box-shadow: 0 0 30px #DCDFE6;
  }
  .el-form-item {
    margin-left: 100px;
    font-weight: bold;
    margin-top: 30px;
  }
  .ty {
    width: 400px;
    height: 25px;
    margin-left: -150px;
  }
  .login-box {
    /*border: 1px solid #DCDFE6;*/
    /*border-radius: 15px;*/
    /*box-shadow: 0 0 30px #DCDFE6;*/
  }
</style>
