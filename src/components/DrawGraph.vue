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
      // slice could finish 1st level copy
      var fuquan_array = ScanGroup[gv.StockIndex][gv.fuquan_averages].slice()
      console.log(fuquan_array)
      ScanGroup[gv.StockIndex][gv.topSeq]
        .map(day => {
          fuquan_array[day] = {
            y: ScanGroup[gv.StockIndex][gv.fuquan_averages][day],
            color: 'red',
            marker: {
              enabled: true,
              symbol: 'triangle-down'
            }}
        })

      ScanGroup[gv.StockIndex][gv.bottomSeq]
        .map(day => fuquan_array[day] = {
          y: ScanGroup[gv.StockIndex][gv.fuquan_averages][day],
          color: 'black',
          marker: {
            enabled: true,
            symbol: 'triangle'
          }
        })

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
          data: fuquan_array

        }
        ]

      }

      // 图表初始化函数
      gv.Chart = new Highcharts.chart(this.$el, options, function (chart) {
        for (let g of ScanGroup[gv.StockIndex][gv.graph]) {
          console.log('gv.graph')
          if (g[gv.shape] == 'rect') {
            console.log('gv.rect')
            console.log(g)
            console.log(g[gv.left])
            console.log(g[gv.bottom])
            console.log(g[gv.right])
            console.log(g[gv.top])

            var xAxis = chart.xAxis[0]
            var yAxis = chart.yAxis[0]
            console.log(yAxis.toPixels(fuquan_array[g[gv.hit_top][0]].y))
            console.log(yAxis.toPixels(fuquan_array[g[gv.hit_bottom][0]].y))

            chart.renderer.rect(
              xAxis.toPixels(g[gv.left]),
              yAxis.toPixels(g[gv.top]),
              xAxis.toPixels(g[gv.right]) - xAxis.toPixels(g[gv.left]),
              // bottom - top,just so fuck anti-intuitive!
              yAxis.toPixels(g[gv.bottom]) - yAxis.toPixels(g[gv.top]),
              5
            ).attr({
              'stroke-width': 2,
              stroke: 'red',
              zIndex: 3
            })
              .add()
          }
        }
      })
    }
  }

}

</script>

<style scoped>

</style>
