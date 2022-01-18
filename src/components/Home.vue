<template>
  <div style="background-color: #ffffff;opacity: 0.95" >
  <div id="myChart" style="width:1200px; height: 500px;margin-left: 100px" >
  </div>
    <el-button @click="test">提交情况图</el-button>
    <el-button @click="test2">管理人数表</el-button>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    test () {
      this.ttt2()
    },
    test2 () {
      this.ttt()
    },
    ttt2 () {
      // var t = document.getElementById('myChart')
      // t.style.width = '200px'
      // t.style.height = '200px'
      let myChart = echarts.init(document.getElementById('myChart'), 'light')
      // 绘制图表
      myChart.setOption({
        title: {text: '提交情况图'},
        tooltip: {},
        xAxis: {
          data: ['2018级软工3班', '2018级软工4班', '2019级软工3班', '2019级软工4班']
        },
        yAxis: {},
        series: [
          {
            name: '18.3',
            type: 'pie', // 设置图表类型为饼图
            radius: '30%', // 大小控制
            center: ['15%', '50%'], // 位置控制
            data: [
              {value: 29, name: '已提交人数'},
              {value: 20, name: '未提交人数'}
            ]
          },
          {
            name: '18.4',
            type: 'pie', // 设置图表类型为饼图
            radius: '30%',
            center: ['38%', '50%'],
            data: [
              {value: 25, name: '已提交人数'},
              {value: 25, name: '未提交人数'}
            ]
          },
          {
            name: '19.3',
            type: 'pie', // 设置图表类型为饼图
            radius: '30%',
            center: ['61%', '50%'],
            data: [
              {value: 30, name: '已提交人数'},
              {value: 21, name: '未提交人数'}
            ]
          },
          {
            name: '19.4',
            type: 'pie', // 设置图表类型为饼图
            radius: '30%',
            center: ['85%', '50%'],
            data: [
              {value: 20, name: '已提交人数'},
              {value: 28, name: '未提交人数'}
            ]
          }
        ]
      })
    },
    ttt () {
      let myChart = echarts.init(document.getElementById('myChart'), 'light')
      // 绘制图表
      myChart.setOption({
        title: {text: '管理人数表'},
        tooltip: {},
        xAxis: {
          data: ['2018级软工3班', '2018级软工4班', '2019级软工3班', '2019级软工4班']
        },
        yAxis: {},
        series: [{
          name: '人数',
          type: 'bar',
          data: [49, 50, 51, 48]
        }, {data: []}, {data: []}, {data: []}]
      })
    }
  },
  mounted () {
    this.ttt()
  }
}
</script>

<style scoped>

</style>
