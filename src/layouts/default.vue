<template>
  <q-layout view="hHh Lpr lFf" >
    <qheader></qheader>
    <qleft_drawer></qleft_drawer>

    <q-page-container>
      <router-view />
      <q-page>

      </q-page>
    </q-page-container>

    <qfooter></qfooter>

  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import qheader from './header.vue'
import qfooter from './footer.vue'
import qleft_drawer from './left_drawer.vue'
import {gv, OverallSetting} from '../global/common_sym'
export default {
  name: 'LayoutDefault',
  components: {
    qheader,
    qfooter,
    qleft_drawer
  },
  data: function () {
    return {
      gv: gv,
      OverallSetting: OverallSetting
    }
  },
  created: function () {
    console.log('default created')
    console.log(this.gv)
    console.log(this.OverallSetting)
  },
  methods: {
    openURL
  }
}
</script>

<style scoped>
</style>
