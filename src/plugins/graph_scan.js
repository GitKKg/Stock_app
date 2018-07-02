// import something here

import {gv, OverallSetting, RectangleSetting, TriangleUpSetting, TriangleDownSetting,ScanGroup} from '../global/common_sym'
import { date } from 'quasar'
import io from 'socket.io-client'
import axios from 'axios'

function zip () {
  var args = [].slice.call(arguments)
  var shortest = args.length == 0 ? [] : args.reduce(function (a, b) {
    return a.length < b.length ? a : b
  })

  return shortest.map(function (_, i) {
    return args.map(function (array) { return array[i] })
  })
}
function strMapToObj (strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}

var ScanParameter = {}

function scan_start_test () {
  // OverallSetting.ScanDateStart=new Date()
  let timeStamp = OverallSetting.ScanDateStart
  let formattedString = date.formatDate(timeStamp, 'YYYYMMDD')
  let date_start = parseInt(formattedString)
  timeStamp = OverallSetting.ScanDateEnd
  formattedString = date.formatDate(timeStamp, 'YYYYMMDD')
  let date_end = parseInt(formattedString)
  let overall_keys = ['start', 'end', 'prev', 'next', 'fuzzy', 'min', 'max']
  let overall_vals = [date_start,
    date_end,
    OverallSetting.prev,
    OverallSetting.next,
    OverallSetting.fuzzy / 100, // rest assured,js is originally float dividing
    OverallSetting.minGLength,
    OverallSetting.maxGLength
  ]
  let rectangle_keys = ['enable', 'tophits', 'topfuzzy', 'bottomhits', 'bottomfuzzy', 'high', 'low',
    'rightmargin', 'rightdrawback']
  let rectangle_vals = [
    RectangleSetting.RectChecked,
    RectangleSetting.TopHits,
    RectangleSetting.TopFuzzy / 100,
    RectangleSetting.BottomHits,
    RectangleSetting.BottomFuzzy / 100,
    RectangleSetting.maxHeight / 100,
    RectangleSetting.minHeight / 100,
    RectangleSetting.rightMargin,
    RectangleSetting.rightDrawback / 100
  ]
  let triangle1_keys = ['enable', 'tophits', 'topfuzzy', 'bottomhits', 'bottomfuzzy', 'high', 'low',
    'rightmargin', 'rightdrawback', 'bottomslope']
  let triangle1_vals = [
    TriangleUpSetting.TriangleUpChecked,
    TriangleUpSetting.TopHits,
    TriangleUpSetting.TopFuzzy / 100,
    TriangleUpSetting.BottomHits,
    TriangleUpSetting.BottomFuzzy / 100,
    TriangleUpSetting.maxHeight,
    TriangleUpSetting.minHeight,
    TriangleUpSetting.rightMargin,
    TriangleUpSetting.rightDrawback,
    TriangleUpSetting.BottomSlope / 100
  ]
  let triangle2_keys = ['enable', 'tophits', 'topfuzzy', 'bottomhits', 'bottomfuzzy', 'high', 'low',
    'rightmargin', 'rightdrawback', 'topslope']
  let triangle2_vals = [
    TriangleDownSetting.TriangleDownChecked,
    TriangleDownSetting.TopHits,
    TriangleDownSetting.TopFuzzy / 100,
    TriangleDownSetting.BottomHits,
    TriangleDownSetting.BottomFuzzy / 100,
    TriangleDownSetting.maxHeight,
    TriangleDownSetting.minHeight,
    TriangleDownSetting.rightMargin,
    TriangleDownSetting.rightDrawback,
    TriangleDownSetting.TopSlope / 100
  ]
  console.log('hello scan_start_test', formattedString)
  ScanParameter = {
    overall: strMapToObj(new Map(zip(overall_keys, overall_vals))),
    rectangle: strMapToObj(new Map(zip(rectangle_keys, rectangle_vals))),
    triangle1: strMapToObj(new Map(zip(triangle1_keys, triangle1_vals))),
    triangle2: strMapToObj(new Map(zip(triangle2_keys, triangle2_vals)))
  }

  console.log(typeof (ScanParameter))
  console.log(ScanParameter)
  console.log(typeof (ScanParameter.overall))
  console.log(ScanParameter.overall)
  console.log(typeof (ScanParameter.overall['start']))
  console.log(ScanParameter.overall['start'])
  console.log(ScanParameter.overall['max'])
  gv.wsocket.emit('scan', ScanParameter, gv.wsocket.id)
  gv.wsocket.on('array', function (array) {
    console.log('get array')
    console.log(array)
  })

  gv.wsocket.on('ScanerProgress', function (percent) {
    console.log('ScanerProgress')
    gv.scanning_progress=percent
  })

  gv.wsocket.on('ScanMatch', function (data_array) {
    console.log('ScanMatch')
    console.log(eval(data_array[10]))
    data_array[10]=eval(data_array[10])//for the fuck json serialization work around in server
    ScanGroup.push(data_array)
    console.log(ScanGroup)

  })
}

// leave the export, even if you don't use it
export default ({ Vue }) => {
  // something to do
  Vue.prototype.$scan_start_test = scan_start_test
}
