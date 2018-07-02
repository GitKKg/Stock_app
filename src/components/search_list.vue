<template>
  <q-list
    link
    :striped-odd="true"
    separator
  >
    <q-list-header inset="true">搜索结果列表 :</q-list-header>
    <q-item v-for="item in ScanGroup">
      <q-item-main  :label=item[gv.code]+space+item[gv.name] @click.native="showGraph(item[gv.name],item[gv.code])" />
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
      gv: gv,
      space: '\t'
    }
  },
  methods: {
    openURL,
    showGraph: function (name,code) {
      console.log('showGraph')
      console.log(name)
      this.$q.notify(code+name+this.space+'入选！')
    }
  }
}
</script>

<style scoped>
  .q-list {
//    background-color: blue;
  };
</style>
