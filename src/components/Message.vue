<template>
  <div>
    <el-table :data="tableData2">
      <el-table-column label="昵称 " prop="displayName">
        </el-table-column>
      <el-table-column prop="username" label="账号" >
      </el-table-column>
      <el-table-column prop="email" label="邮箱" >
      </el-table-column>
      <el-table-column prop="gender" label="性别" >
      </el-table-column>
      <el-table-column prop="phone" label="电话" >
      </el-table-column>
      <el-table-column prop="profession" label="职业" >
      </el-table-column>
      <el-table-column label="编辑" >
        <template slot-scope="scope">
          <el-button @click="change(scope.$index, scope.row)" type="text" size="small" style="color: #65CEA7">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    编辑个人信息-->
    <div class="lay" v-show="changeFlag">
      <div class="lay-div" style="opacity: 95%">
        <el-form>
          <el-form-item label="昵称">
            <el-input v-model="meeting1.displayName"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="meeting1.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="meeting1.email"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="meeting1.gender"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="meeting1.phone"></el-input>
          </el-form-item>
          <el-form-item label="职业">
            <el-input v-model="meeting1.profession"></el-input>
          </el-form-item>
<!--          <el-form-item label="修改头像">-->
<!--            <input type="file" ref="photo" />-->
<!--          </el-form-item>-->
          <el-form-item >
            <el-button @click="submit" style="background-color: #65CEA7;width: 100px;">确定修改</el-button>
            <el-button @click="back"  style="background-color: #65CEA7;width: 100px;margin-left: 40px">返回</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
// axios.defaults.baseURL = 'http://218.93.206.188:49734/'
// axios.defaults.timeout = 5000
export default {
  name: 'Message',
  data () {
    return {
      meeting1: {
        displayName: '',
        username: '',
        gender: '',
        email: '',
        phone: '',
        profession: '',
        company: ''
      },
      tableData2: [],
      changeFlag: false
    }
  },
  methods: {
    back () {
      this.changeFlag = !this.changeFlag
    },
    getMessage1 () {
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: 'profile',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        console.log(res.data)
        this.meeting1 = res.data
        this.tableData2 = res.data
        // console.log(this.tableData2.username)
      }).catch(() => {
        alert('err')
      })
    },
    change: function (index, row) {
      this.changeFlag = !this.changeFlag
      this.meeting1 = row
    },
    submit: function () {
      this.changeFlag = !this.changeFlag
      console.log(this.meeting1)
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: 'profile',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          edit: true,
          name: this.meeting1.name,
          tel: this.meeting1.phone,
          sex: this.meeting1.gender,
          pro: this.meeting1.profession,
          com: this.meeting1.company
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        if (res.data === true) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      }).catch(() => {
        alert('err')
      })
    }
  },
  mounted () {
    this.getMessage1()
  }
}
</script>

<style scoped>
  .lay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 66;
  }
  .lay-div {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    padding: 20px;
    background: #fff;
    border-radius: 6px;

  }
</style>
