<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%;opacity: 93%">
      <el-table-column type="expand" >
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID" class="rr">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="资料名称" class="rr">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="资料简介" class="rr">
              <span>{{ props.row.description}}</span>
            </el-form-item>
            <el-form-item label="截止时间" class="rr">
              <span>{{ props.row.deadLine}}</span>
            </el-form-item>
            <el-form-item label="专业" class="rr">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="年级" class="rr">
              <span>{{ props.row.grade }}</span>
            </el-form-item>
            <el-form-item label="班级" class="rr">
              <span>{{ props.row.clazz }}</span>
            </el-form-item>
            <el-form-item label="状态" class="rr">
              <span>{{ props.row.submit }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="资料编号"
        prop="id" width="200">
      </el-table-column>
      <el-table-column
        label="资料名称"
        prop="name" >
      </el-table-column>
      <el-table-column
        label="资料简介"
        prop="description">
      </el-table-column>
      <el-table-column label="资料状态" prop="openToPublic" width="150" >
      </el-table-column>

      <el-table-column label="编辑与发布" width="150">
        <template slot-scope="scope" >
          <el-button @click="change(scope.$index, scope.row)" type="text" size="small" style="color: #65CEA7">
            编辑与发布
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="150">
        <template slot-scope="scope">
          <el-button @click="del(scope.$index)" type="text" size="small" style="color: #65CEA7">
            删除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="上传详情" width="150">
        <template slot-scope="scope">
          <el-button><router-link class="tt" :to="{path: '/myMeetingDetail', query: {id:tableData[scope.$index].id}}">详情</router-link></el-button>
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

    <!--    修改信息-->
    <div class="lay" v-show="msgFlag">
      <div class="lay-div" style="height: 735px;opacity: 95%">
        <el-form>
          <el-form-item label="资料名称">
            <el-input v-model="meeting1.name"></el-input>
          </el-form-item>
          <el-form-item label="资料简介">
            <el-input v-model="meeting1.description"></el-input>
          </el-form-item>
          <el-form-item label="截止时间">
            <el-input v-model="meeting1.deadLine"></el-input>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="meeting1.major"></el-input>
          </el-form-item>
          <el-form-item label="年级">
            <el-input v-model="meeting1.grade"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input v-model="meeting1.clazz"></el-input>
          </el-form-item>
          <template>
            <el-radio v-model="meeting1.submit" label='true' >资料发布</el-radio>
            <el-radio v-model="meeting1.submit" label='false'>取消发布</el-radio>
          </template>
          <el-form-item >
            <el-button style="margin-top: 20px;margin-left: -20px;background-color:#65CEA7;width: 80px" @click="tochange">确定</el-button>
            <el-button style="margin-left: 40px;width: 80px;background-color:#65CEA7" @click="msgFlag = !msgFlag">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
// axios.defaults.baseURL = 'http://218.93.206.188:49734/dmsapi'
// axios.defaults.timeout = 5000
export default {
  name: 'Meeting',
  data () {
    return {
      meeting1: {
        clazz: '', // 班级
        deadLine: '', // 截止时间
        description: '', // 简介
        grade: '', // 年级
        id: '', // 编号
        major: '', // 专业
        name: '', // 名字
        submit: '',
        teacher: '' // 老师
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
    tochange () {
      this.msgFlag = !this.msgFlag
      var a = localStorage.getItem('token')
      console.log('oo' + this.meeting1.major)
      console.log('oo' + this.meeting1.submit)
      axios({
        method: 'post',
        url: '/teaEdit',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          id: this.meeting1.id,
          name: this.meeting1.name,
          desc: this.meeting1.description,
          deadLine: this.meeting1.deadLine,
          grade: this.meeting1.grade,
          class: this.meeting1.clazz,
          major: this.meeting1.major,
          submit: this.meeting1.submit
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        if (res.data === true) {
          alert('资料修改成功')
        } else {
          alert('资料修改失败')
        }
      }).catch(() => {
        alert('err')
      }).then(() => {
        this.getmyMeeting()
      })
    },
    getmyMeeting () {
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: '/teaList',
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
          if (this.allTableData[i].submit === true) {
            this.allTableData[i].openToPublic = '已发布'
          } else {
            this.allTableData[i].openToPublic = '未发布'
          }
        }
      }).catch(() => {
        alert('err')
      })
    },
    del: function (index) {
      console.log(index)
      console.log(this.tableData[index].id)
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: '/teaDelete',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          id: this.tableData[index].id
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        if (res.data === true) {
          alert('删除成功')
        }
      }).catch(() => {
        alert('err')
      }).then(() => {
        this.getmyMeeting()
      })
    },
    change: function (index, row) {
      this.meeting1 = row
      // console.log(row)
      // console.log(this.meeting1.submit)
      this.msgFlag = true
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
  .demo-table-expand  {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-form-item {
    margin-top: -5px;
  }
  .tt{
    text-decoration:none;
    color:#000000;
  }
  .rr{
    width: 300px
  }
</style>
