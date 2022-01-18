<template>
  <div>
  <el-table
    :data="tableData"
    style="width: 100%;opacity: 93%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="ID">
            <span>{{ props.row.studentUid }}</span>
          </el-form-item>
          <el-form-item label="学号">
            <span>{{ props.row.studentAccount }}</span>
          </el-form-item>
          <el-form-item label="学生姓名">
            <span>{{ props.row.studentName }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row.state}}</span>
          </el-form-item>
          <el-form-item label="交流">
            <span>{{ props.row.comment}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="学号"
      prop="studentAccount">
    </el-table-column>
    <el-table-column
      label="学生姓名"
      prop="studentName">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="state1">
    </el-table-column>
    <el-table-column
      label="交流"
      prop="comment1">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope" >
        <el-button ><router-link class="tt" :to="{path: '/myMeetingDetail3', query: {id:tableData[scope.$index].zid, stuid:tableData[scope.$index].studentUid}}">操作</router-link></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from 'axios'
// axios.defaults.baseURL = 'http://218.93.206.188:49734/dmsapi'
// axios.defaults.timeout = 5000
export default {
  name: 'myMeetingDetail',
  data () {
    return {
      id: this.$route.query.id, // 资料id
      tableData: {
        comment: '',
        state: '',
        studentAccount: '',
        studentName: '',
        studentUid: '',
        state1: '',
        comment1: '',
        zid: ''
      }
    }
  },
  methods: {
    getbyid () {
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: '/teaStuList',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          data: this.id
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        console.log(res.data)
        console.log(this.id)
        this.tableData = res.data
        for (var i = 0; i < this.tableData.length; i++) { // 两个for循环很危险
          this.tableData[i].zid = this.id
          if (this.tableData[i].state === 0) {
            this.tableData[i].state1 = '未上传'
          } else if (this.tableData[i].state === 1) {
            this.tableData[i].state1 = '未通过'
          } else if (this.tableData[i].state === 2) {
            this.tableData[i].state1 = '通过'
          } else {
            this.tableData[i].state1 = '待审核'
          }
          if (this.tableData[i].comment === 0) {
            this.tableData[i].comment1 = '无'
          } else if (this.tableData[i].comment === 1) {
            this.tableData[i].comment1 = '未回复'
          } else {
            this.tableData[i].comment1 = '已评价'
          }
        }
      }).catch(() => {
        alert('err')
      })
    }
  },
  mounted () {
    this.getbyid()
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .tt{
    text-decoration:none;
    color:#000000;
  }
</style>
