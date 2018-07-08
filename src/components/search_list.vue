<template>
  <q-list
    link
    :striped-odd="true"
    separator
  >
    <q-list-header inset="true">搜索结果列表 :</q-list-header>
    <q-item v-for="(item ,index) in ScanGroup" :key="index">
      <q-item-main  :label="index+'号'+item[gv.code]+'\t'+item[gv.name]" @click.native="showGraph(item[gv.name],item[gv.code],index)" />
    </q-item>

  </q-list>
</template>

<script>
import { openURL } from 'quasar'
import {ScanGroup, gv} from '../global/common_sym'
export default {
  name: 'search_list',
  data: function () {
    return {
      ScanGroup: ScanGroup,
      gv: gv
    }
  },
  methods: {
    openURL,
    showGraph: function (name, code, index) {
      console.log('showGraph')
      console.log(name)
      this.$q.notify(index + '号' + code + name + '入选！')
      if (gv.StockIndex == -1) {
        gv.StockIndex = index
      } else {
        gv.StockIndex = index
        var fuquanArray = ScanGroup[index][gv.fuquan_averages].slice()
        ScanGroup[index][gv.topSeq]
          .map(day => {
            fuquanArray[day] = {
              y: ScanGroup[index][gv.fuquan_averages][day],
              color: 'red',
              marker: {
                enabled: true,
                symbol: 'triangle-down'
              }
            }
          })

        ScanGroup[index][gv.bottomSeq]
          .map(day => {
            fuquanArray[day] = {
              y: ScanGroup[index][gv.fuquan_averages][day],
              color: 'black',
              marker: {
                enabled: true,
                symbol: 'triangle'
              }
            }
          })
        gv.Chart.xAxis[0].setCategories(ScanGroup[index][gv.dates], false)
        // the last option updatePoints of setData() is a fucking shit trap,default true means passing value(1st anti-intuition),
        // false means passing ref,but even if passing value is merging points status not overwriting!shit!
        // no doc detail specify this 2nd anti-intuitive setting!
        gv.Chart.series[0].setData(fuquanArray, false, false, false)// 3rd must be false!or else they are merged not overwrited!
        gv.Chart.setTitle({text: ScanGroup[index][gv.code] + '\t' + ScanGroup[index][gv.name]}, null, false)
        // gv.Chart.setSize(null, null, false)

        gv.Chart.redraw(false)
        console.log(gv.Chart.series[0])
        this.$addGraph(gv.Chart)
      }
    }
  }
}
</script>

<style scoped>
  .q-list {
//    background-color: blue;
  };
</style>
