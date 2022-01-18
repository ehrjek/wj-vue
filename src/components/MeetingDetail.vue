<template>
  <div>
    <el-form ref="form" :model="meeting" width="80px" class="login-box" style="margin-left: 250px;opacity: 90%;width: 800px;">
      <div class="add-lay" style=";height:650px;background-color: #ffffff">
        <el-form-item label="会议名称" prop="name" style="margin-left: 100px;margin-top: 20px;padding-top: 20px">
          <h class="login-title">{{this.tableData.name}}</h>
        </el-form-item>
        <div style="border: #65CEA7 0.5px solid"></div>
        <el-form-item label="会议主题" prop="title">
          <span>{{this.tableData.subject}}</span>
        </el-form-item>
        <div style="border: #65CEA7 0.5px solid"></div>
        <el-form-item label="会议简介" prop="info">
          <span>{{this.tableData.description}}</span>
        </el-form-item>
        <div style="border: #65CEA7 0.5px solid"></div>
        <el-form-item label="会议时间" prop="time">
          <span>{{this.tableData.heldDate}}</span>
        </el-form-item>
        <div style="border: #65CEA7 0.5px solid"></div>
        <el-form-item label="会议地点" prop="address">
          <span>{{this.tableData.location}}</span>
        </el-form-item>
        <div style="border: #65CEA7 0.5px solid"></div>
        <el-form-item label="会议人数" prop="num">
          <span>{{this.tableData.participant}}/{{this.tableData.maxAttend}}</span>
        </el-form-item>
        <div style="border:#65CEA7 0.5px solid"></div>
        <el-form-item label="会议主讲" prop="director">
          <span>{{this.tableData.speaker}}</span>
        </el-form-item>
        <div style="border:#65CEA7 0.5px solid"></div>
        <el-form-item class="act" style="width: 600px">
          <el-button @click="create" class="sub" id="bao" style="background-color: #65CEA7;width: 150px;">报名</el-button>
          <el-button  @click="fanhui" class="sub" style="background-color: #65CEA7;width: 150px;margin-left: 50px">返回</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
export default {
  name: 'MeetingDetail',
  data () {
    return {
      meeting: '',
      no: '',
      tableData: this.$route.query.num,
      enter: '10'
    }
  },
  methods: {
    pan () {
      var a = new Date()
      var b = moment(a).format('YYYY-MM-DD hh:mm:ss')
      console.log(this.tableData.heldDate)
      if (b > this.tableData.heldDate) {
        var t = document.getElementById('bao')
        t.innerHTML = '报名时间已过'
        t.style.color = 'grey'
      }
    },
    fanhui () {
      this.$router.replace({path: '/home'})
    },
    create: function () {
      var r = document.getElementById('bao').innerHTML
      if (r === '报名时间已过') {
        alert('报名时间已过,报名失败')
      } else {
        var a = localStorage.getItem('token')
        console.log(this.tableData.id)
        axios({
          method: 'post',
          url: 'guest',
          headers: {
            'Accept': 'application/json'
          },
          params: {
            'token': a,
            action: 'join',
            meeting: this.tableData.id
          },
          crossDomain: true,
          dataType: 'jsonp'
        }).then(res => {
          console.log(res.data)
          if (res.data === true) {
            alert('报名成功')
          }
        }).catch(() => {
          alert('err')
        })
      }
    }
  },
  mounted () {
    this.pan()
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
    border-radius: 10px;
    box-shadow: 0 0 30px #DCDFE6;
  }
  .el-form-item {
    margin-left: 100px;
    margin-top: 15px;
  }
</style>
