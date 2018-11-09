<template>
  <div class="count">
    <div id="bar" class="chart"></div>
    <div id="pie" class="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  methods: {
    drawBar () {
      let myChart = echarts.init(document.getElementById('bar'))
      myChart.setOption({
        title: {text: '柱状图'},
        legend: {
          data: ['销量', '说的', '哈哈']
        },
        tooltip: {},
        xAxis: {
          data: ['水电费', '第三方', '善良的看风景', '多少', '双联']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#91c7ae'
              }
            },
            data: [15, 19, 32, 63, 35]
          },
          {
            name: '说的',
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'pink'
              }
            },
            data: [12, 23, 27, 43, 45]
          },
          {
            name: '哈哈',
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#d48265'
              }
            },
            data: [16, 33, 24, 33, 25]
          }
        ]
      })
    },
    drawPie () {
      let myChart = echarts.init(document.getElementById('pie'))
      myChart.setOption({
        title: {text: '饼状图'},
        tooltip: {},
        legend: {
          data: ['水电费', '第三方', '善良的看风景', '多少', '双联'],
          left: 'left',
          top: 'middle',
          orient: 'vertical'
        },
        series: [{
          name: '销量',
          type: 'pie',
          roseType: 'radius',
          radius: '65%',
          itemStyle: {
            emphasis: {
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 200
            }
          },
          data: [
            {value: 50, name: '水电费'},
            {value: 38, name: '第三方'},
            {value: 52, name: '善良的看风景'},
            {value: 62, name: '多少'},
            {value: 72, name: '双联'}
          ]
        }]
      })
    }
  },
  mounted () {
    this.drawBar()
    this.drawPie()
  }
}
</script>

<style lang="stylus">
.count{
  padding: 20px 24px;
  .chart{
    width: 100%;
    height: 480px;
  }
}
</style>
