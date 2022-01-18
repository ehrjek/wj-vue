<template>
  <div>
    <el-table :data="tableData2">
      <el-table-column label="账号" prop="account">
      </el-table-column>
      <el-table-column prop="name" label="名字" >
      </el-table-column>
      <el-table-column prop="major" label="专业" >
      </el-table-column>
      <el-table-column prop="grade" label="年级" >
      </el-table-column>
      <el-table-column prop="clazz" label="班级" >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
// axios.defaults.baseURL = 'http://218.93.206.188:49734/dmsapi'
// axios.defaults.timeout = 5000
export default {
  name: 'Message2',
  data () {
    return {
      tableData2: null
    }
  },
  methods: {
    getMessage1 () {
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: 'stuProfile',
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
        // console.log(res.data[0])
        // console.log(Object.entries(res.data))
        this.tableData2 = res.data
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
