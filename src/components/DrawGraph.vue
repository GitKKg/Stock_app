<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts'
import highchartsMore from 'highcharts/highcharts-more'
highchartsMore(Highcharts)
import 'highcharts/modules/exporting'
import {gv, ScanGroup} from '../global/common_sym'
import {addGraph} from '../plugins/graph_scan'

//  customize pan event handler to highcharts for drawing graph to respond with shifting chart after zooming in
// this is similar to decorator of python ,'function' wrap  H.Chart.prototype.pan function to insert addGraph(gv.Chart)
(function (H) {
  H.wrap(H.Chart.prototype, 'pan', function (proceed) {
    console.log('pannig...')
    addGraph(gv.Chart)
    proceed.call(this, arguments[1], arguments[2])
  })
})(Highcharts)

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
      var fuquanArray = ScanGroup[gv.StockIndex][gv.fuquan_averages].slice()
      console.log(fuquanArray)
      ScanGroup[gv.StockIndex][gv.topSeq]
        .map(day => {
          fuquanArray[day] = {
            y: ScanGroup[gv.StockIndex][gv.fuquan_averages][day],
            color: 'red',
            marker: {
              enabled: true,
              symbol: 'triangle-down'
            }}
        })

      ScanGroup[gv.StockIndex][gv.bottomSeq]
        .map(day => {
          fuquanArray[day] = {
            y: ScanGroup[gv.StockIndex][gv.fuquan_averages][day],
            color: 'black',
            marker: {
              enabled: true,
              symbol: 'triangle'
            }}
        })

      var options = {
        chart: {
          events: {
            selection: function (event) { gv.graphSelected = true },
            redraw: function () {
              if (gv.graphSelected === true) {
                addGraph(gv.Chart)// 'this' is not vue here,so could only directly import addGraph
                gv.graphSelected = false
              }
            }
          }, // no vue context,can't be called
          animation: false,
          backgroundColor: '#F5F5F5',
          height: parent.$el.clientHeight, // fist show still need this method,resize no work here
          width: null,
          reflow: true,
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
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
        subtitle: {
          text: '鼠标选中区域可以放大，放大后按住shift进行左右拖动，退出放大按右上角reset zoom 按钮'
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
          data: fuquanArray,
          type: 'spline'
        }

        /*    // area always filled with color,no independent borderline color,  even opaque can't help,
              // fill-color like similar parameter can't be found, so abandon temporary
        {
          name: '矩形',
          type: 'polygon',
          color: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.2).get(),
          data: [
            {x: ScanGroup[gv.StockIndex][gv.graph][0][gv.left],
              y: ScanGroup[gv.StockIndex][gv.graph][0][gv.top]},

            {x: ScanGroup[gv.StockIndex][gv.graph][0][gv.right],
              y: ScanGroup[gv.StockIndex][gv.graph][0][gv.top]},

            {x: ScanGroup[gv.StockIndex][gv.graph][0][gv.right],
              y: ScanGroup[gv.StockIndex][gv.graph][0][gv.bottom]},

            {x: ScanGroup[gv.StockIndex][gv.graph][0][gv.left],
              y: ScanGroup[gv.StockIndex][gv.graph][0][gv.bottom]}

          ]
        }
        */

        ]

      }
      // pan,event handler for shifting when in zooming in status

      gv.Chart = new Highcharts.Chart(this.$el, options)
      this.$addGraph(gv.Chart)
    }
  }

}

</script>

<style scoped>

</style>
