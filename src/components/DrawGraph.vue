<template>
  <div class="highcharts-container"></div>
</template>

<script>
import Highcharts from 'highcharts'

// add these two to support ploygon series data
import highchartsMore from 'highcharts/highcharts-more'
highchartsMore(Highcharts)
import histogramBellcurve from 'highcharts/modules/histogram-bellcurve'
histogramBellcurve(Highcharts)
// add these two to support mapNavigation with mousewheel zooming
import map from 'highcharts/modules/map'
map(Highcharts)

// with these two, support a button for graph saving as file to local
import Exporting from 'highcharts/modules/exporting'
Exporting(Highcharts)

import {gv, ScanGroup} from '../global/common_sym'
import {addGraph} from '../plugins/graph_scan'

//  customize pan event handler to highcharts for drawing graph to respond with shifting chart after zooming in
// this is similar to decorator of python ,'function' wrap  H.Chart.prototype.pan function to insert addGraph(gv.Chart)
// pan function defined in highcharts.src.js
(function (H) {
  H.wrap(H.Chart.prototype, 'pan', function (proceed) {
    console.log('pannig...')
    addGraph(gv.Chart)
    proceed.call(this, arguments[1], arguments[2])
  })
})(Highcharts); // ';' is required!

// mapZoom function defined in map.src.js
(function (H) {
  H.wrap(H.Chart.prototype, 'mapZoom', function (proceed) {
    console.log('mapZoom...')
    proceed.call(this, arguments[1], arguments[2])
    // behold, this order matters, or else, response to zoom will not catch up timely
    addGraph(gv.Chart)
    if (!(this.resetZoomButton)) { // 'this' here is highchart not vue
      this.showResetZoom()
    }
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

        // enable mousewheel zoom ,from highmaps
        mapNavigation: {
          enabled: true,
          enableButtons: false,
          mouseWheelSensitivity: 1.1 //  1.1 original default
        },
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
          text: '鼠标选中区域可以放大，滚轮可放大缩小,放大后按住shift进行左右拖动，退出放大按右上角reset zoom 按钮'
        },
        xAxis: {
          categories: ScanGroup[gv.StockIndex][gv.dates]

        },
        yAxis: [{
          title: {
            text: 'RMB' // y 轴标题
          }
        },
        {
          title: {
            text: '成交量' // y 轴标题
          }
        }
        ],
        series: [{
          name: '复权价格',
          data: fuquanArray,
          type: 'spline'
        },
        {
          name: '成交量',
          data: ScanGroup[gv.StockIndex][gv.shares],
          color: Highcharts.Color('#0000FF').setOpacity(0.1).get(), // defined in highcarts.src.js
          type: 'histogram',
          yAxis: 1
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
      console.log('Highcharts Chart')
      this.$addGraph(gv.Chart)
    }
  }

}

</script>

<style scoped>

</style>
