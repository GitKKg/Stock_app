<template>
  <q-list
    link
    :striped-odd="true"
    separator
  >
    <q-list-header inset="true">搜索结果列表 :</q-list-header>
    <q-item v-for="(item ,index) in ScanGroup">
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
        gv.Chart.xAxis[0].setCategories(ScanGroup[gv.StockIndex][gv.dates], false)
        gv.Chart.series[0].setData(ScanGroup[gv.StockIndex][gv.fuquan_averages], false)
        gv.Chart.setTitle({text: ScanGroup[gv.StockIndex][gv.code] + '\t' + ScanGroup[gv.StockIndex][gv.name]}, null, false)
        gv.Chart.setSize(null, null, false)
        gv.Chart.redraw()
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
