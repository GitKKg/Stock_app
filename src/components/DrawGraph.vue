<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts'
import {gv, ScanGroup} from '../global/common_sym'

export default {
  name: 'DrawGraph',
  mounted () { // flex container,insert before update
    console.log('DrawGraph mounted')
    this.initChart(gv.P_Graph)
  },
  data: function () {
    return {
      gv: gv,
      ScanGroup: ScanGroup
    }
  },
  methods: {
    initChart (parent) {
      var options = {
        chart: {
          animation: false,
          type: 'spline',
          backgroundColor: '#F5F5F5',
          height: parent.$el.clientHeight, // fist show still need this method,resize no work here
          width: null,
          reflow: true,
          zoomType: 'x',
          panning: true,
          panKey: 'ctrl',
          resetZoomButton: {
            // 按钮定位
            position: {
              align: 'right', // by default
              verticalAlign: 'top', // by default
              x: 0,
              y: -30
            }
          }
        },
        title: {
          text: ScanGroup[gv.StockIndex][gv.code] + '\t' + ScanGroup[gv.StockIndex][gv.name] // 标题
        },
        xAxis: {
          categories: ScanGroup[gv.StockIndex][gv.dates]

        },
        yAxis: {
          title: {
            text: 'RMB' // y 轴标题
          }
        },
        series: [{
          name: '复权价格',
          data: ScanGroup[gv.StockIndex][gv.fuquan_averages]

        }
        ]

      }

      // 图表初始化函数
      gv.Chart = new Highcharts.chart(this.$el, options)
      ScanGroup[gv.StockIndex][gv.topSeq]
        .map(group => gv.Chart.series[0].data[group])
        .map(point => point.update({
          color: 'red',
          marker: {
            enabled: true,
            symbol: 'circle'
          }
        },false,false))
      ScanGroup[gv.StockIndex][gv.bottomSeq]
        .map(group => gv.Chart.series[0].data[group])
        .map(point => point.update({
          color: 'green',
          marker: {
            enabled: true,
            symbol: 'circle'
          }
        },true,false))
    }
  }
}
</script>

<style scoped>

</style>
