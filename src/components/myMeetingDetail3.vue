<template>
  <div>
    <el-button @click="com" style="margin-left: -160px">资料评价</el-button>
    <el-button @click="pas" style="margin-left: 50px">通过资料</el-button>
    <el-button @click="ret" style="margin-left: 50px">打回资料</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;opacity: 93%;margin-top: 20px">
      <el-table-column
        label="操作"
        prop="text" >
      </el-table-column>
      <el-table-column
        label="操作时间"
        prop="time">
      </el-table-column>
      <el-table-column
        label="具体内容"
        prop="detail">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="del(scope.$index)" type="text" size="small" style="color: #65CEA7">
            {{buttonT[scope.$index]}}
          </el-button>
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
  name: 'myMeetingDetail3',
  data () {
    return {
      id: this.$route.query.id,
      stuid: this.$route.query.stuid,
      tableData: null,
      comment: '',
      buttonT: []
    }
  },
  methods: {
    del (index) {
      var b = localStorage.getItem('token')
      console.log(this.tableData[index].operationType)
      console.log(this.tableData[index].id)
      if (this.tableData[index].operationType === 1) {
        // axios({
        //   method: 'post',
        //   url: '/download',
        //   headers: {
        //     'Accept': 'application/json'
        //   },
        //   params: {
        //     'token': a,
        //     id: this.tableData[index].id
        //   },
        //   crossDomain: true,
        //   dataType: 'jsonp',
        //   responseType: 'blob'
        // }).then(res => {
        //   console.log(res.data)
        //   this.content = res.data
        //   this.filename = this.tableData[index].detail
        //   const blob = new Blob([this.content])
        //   if (window.navigator.msSaveOrOpenBlob) {
        //     // 兼容IE10
        //     navigator.msSaveBlob(blob, this.filename)
        //   } else {
        //     //  chrome/firefox
        //     let aTag = document.createElement('a')
        //     aTag.download = this.filename
        //     aTag.href = URL.createObjectURL(blob)
        //     aTag.click()
        //     URL.revokeObjectURL(aTag.href)
        //   }
        // }).catch(() => {
        //   alert('err')
        // }).then(() => {
        //   this.getbyid()
        // })
        let a = document.createElement('a')
        // let aTag = document.createElement('a')
        a.href = 'http://218.93.206.188:49734/dmsapi/download?' + 'token=' + b + '&id=' + this.tableData[index].id
        a.click()
      } else {
        axios({
          method: 'post',
          url: 'teaCommentDelete',
          headers: {
            'Accept': 'application/json'
          },
          params: {
            'token': b,
            comment: this.tableData[index].id
          },
          crossDomain: true,
          dataType: 'jsonp'
        }).then(res => {
          console.log(res.data)
          if (res.data === true) {
            alert('操作成功')
          }
        }).catch(() => {
          alert('err')
        }).then(() => {
          this.getbyid()
        })
      }
    },
    pas () {
      var a = localStorage.getItem('token')
      axios({
        method: 'post',
        url: '/teaPass',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          data: this.id,
          stu: this.stuid
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        if (res.data === true) {
          alert('操作成功')
        }
      }).catch(() => {
        alert('err')
      }).then(() => {
        this.getbyid()
      })
    },
    ret () {
      var a = localStorage.getItem('token')
      console.log(this.id)
      console.log(this.stuid)
      axios({
        method: 'post',
        url: '/teaDeny',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          data: this.id,
          stu: this.stuid
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        if (res.data === true) {
          alert('操作成功')
        }
      }).catch(() => {
        alert('err')
      }).then(() => {
        this.getbyid()
      })
    },
    com () {
      var a = localStorage.getItem('token')
      this.comment = prompt('请输入评价内容')
      console.log('r' + this.comment)
      if (this.comment === null) {
      } else {
        axios({
          method: 'post',
          url: '/teaComment',
          headers: {
            'Accept': 'application/json'
          },
          params: {
            'token': a,
            data: this.id,
            stu: this.stuid,
            comment: this.comment
          },
          crossDomain: true,
          dataType: 'jsonp'
        }).then(res => {
          if (res.data === true) {
            alert('评价成功')
          }
        }).catch(() => {
          alert('err')
        }).then(() => {
          this.getbyid()
        })
      }
    },
    getbyid () {
      var a = localStorage.getItem('token')
      // console.log('y' + this.id)
      // console.log('y2' + this.stuid)
      axios({
        method: 'post',
        url: '/teaData',
        headers: {
          'Accept': 'application/json'
        },
        params: {
          'token': a,
          data: this.id,
          stu: this.stuid
        },
        crossDomain: true,
        dataType: 'jsonp'
      }).then(res => {
        console.log(res.data)
        this.tableData = res.data
        for (var i = 0; i < this.tableData.length; i++) { // 两个for循环很危险
          if (this.tableData[i].operationType === 1) {
            this.buttonT[i] = '下载'
            this.tableData[i].text = '学生上传'
          } else if (this.tableData[i].operationType === 2) {
            this.buttonT[i] = ''
            this.tableData[i].text = '学生留言'
          } else if (this.tableData[i].operationType === 3) {
            this.buttonT[i] = '删除留言'
            this.tableData[i].text = '教师留言'
          } else if (this.tableData[i].operationType === 4) {
            this.buttonT[i] = '撤销打回'
            this.tableData[i].text = '教师打回'
          } else {
            this.buttonT[i] = '撤销通过'
            this.tableData[i].text = '教师通过'
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
</style>
