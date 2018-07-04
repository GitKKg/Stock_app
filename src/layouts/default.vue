<template>
  <q-layout view="hHh Lpr lFf" >
    <qheader></qheader>
    <qleft_drawer></qleft_drawer>

    <q-page-container>

      <q-page class="column  items-stretch" ref="P_Graph">
          <q-resize-observable @resize="onResize" />
          <DrawGraph  v-if="gv.StockIndex!=-1 "></DrawGraph>
          <router-view v-else />

      </q-page>
    </q-page-container>

    <qfooter></qfooter>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import DrawGraph from '../components/DrawGraph'
import qheader from './header.vue'
import qfooter from './footer.vue'
import qleft_drawer from './left_drawer.vue'
import {gv, OverallSetting, ScanGroup} from '../global/common_sym'
export default {
  name: 'LayoutDefault',
  components: {
    qheader,
    qfooter,
    qleft_drawer,
    DrawGraph
  },
  data: function () {
    return {
      gv: gv,
      OverallSetting: OverallSetting
    }
  },
  created: function () {
    console.log('default created')
    this.$set(this.gv, 'StockIndex', -1)
  },
  mounted: function () {
    console.log('LayoutDefault mounted!')
    gv.P_Graph = this.$refs.P_Graph
    console.log(gv.P_Graph)
    console.log(gv.P_Graph.$el.clientHeight)
  },

  methods: {
    openURL,
    onResize:function(size){//this is really a great function provided by quasar
      console.log('!!!default onResize')
      console.log(size)
      if (gv.StockIndex != -1){
        console.log('reflow!!!!')
        gv.Chart.setSize(null, size.height, true)
      }
    }
  }
}
</script>

<style scoped>
</style>
