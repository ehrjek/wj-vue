<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;opacity: 93%">
      <el-table-column type="expand" style="background: red">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="资料名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="资料简介">
              <span>{{ props.row.description}}</span>
            </el-form-item>
            <el-form-item label="截止时间">
              <span>{{ props.row.deadLine}}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.pass}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="资料编号"
        prop="id">
      </el-table-column>
      <el-table-column
        label="资料名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="资料简介"
        prop="description">
      </el-table-column>
      <el-table-column
        label="截止时间"
        prop="deadLine">
      </el-table-column>
      <el-table-column label="资料状态" prop="openToPublic" width="120">
      </el-table-column>
      <el-table-column label="详情" width="120">
        <template slot-scope="scope">
<!--          <el-button><router-link class="tt" :to="{path: '/myMeetingDetail2', query: {id:tableData[scope.$index].id,attend:tableData[scope.$index].participant,contain:tableData[scope.$index].maxAttend}}">报名详情</router-link></el-button>-->
          <el-button><router-link class="tt" :to="{path: '/myMeetingDetail2', query: {id:tableData[scope.$index].id}}">详情</router-link></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="width: 400px;margin-left: 400px;margin-top: 20px"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="paginations.page_index"
                   :page-size="paginations.page_size"
                   :total="paginations.total">
    </el-pagination>

  </div>
</template>

<script>
import axios from 'axios'
// axios.defaults.baseURL = 'http://218.93.206.188:49734/dmsapi'
// axios.defaults.timeout = 5000
export default {
  name: 'Meeting2',
  data () {
    return {
      meeting1: {
        id: '',
        name: '',
        description: '',
        deadLine: '',
        pass: '',
        openToPublic: ''
      },
      paginations: {
        page_index: 1, // 当前页
        total: 0, // 总数
        page_size: 5, // 一页显示多少
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      tableData: null,
      msgFlag: false,
      numFlag: false,
      attend: '',
      contain: '',
      allTableData: null,
      css: false
    }
  },
  methods: {
    setPaginations () {
      this.paginations.total = this.allTableData.length // 数据的数量
      this.paginations.page_index = 1 // 默认显示第一页

      // 显示数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleSizeChange () {
      this.paginations.page_index = 1 // 第一页
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleCurrentChange (page) {
      // 跳转页数
      // 获取当前页
      let index = this.paginations.page_size * (page - 1)
      // 获取总数
      let allData = this.paginations.page_size * page

      let tablist = []
      for (let i = index; i < allData; i++) {
        if (this.allTableData[i]) {
          tablist.push(this.allTableData[i])
        }
        this.tableData = tablist
      }
    },
    getmyMeeting () {
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: '/stuList',
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
        // this.css = 'style="color:red"'
        this.allTableData = res.data
        this.setPaginations()
        for (var i = 0; i < this.allTableData.length; i++) {
          if (this.allTableData[i].pass === true) {
            this.allTableData[i].openToPublic = '已通过'
          } else {
            this.allTableData[i].openToPublic = '未通过'
          }
        }
      }).catch(() => {
        alert('err')
      })
    }
  },
  mounted () {
    this.getmyMeeting()
  }
}
</script>

<style scoped>
  /*.el-form-item label {*/
  /*  margin-top: 10px*/
  /*}*/
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
