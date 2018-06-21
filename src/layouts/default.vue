<template>
  <q-layout view="hHh Lpr lFf">
    <qheader v-bind:Pisnowsearching="isnowsearching"></qheader>
    <q-layout-drawer
      v-bind:value="gv.leftDrawerOpen"
      side="left"
      :content-class="$q.theme === 'mat' ? 'bg-light-blue' : null"
      :breakpoint="50"
    >
      <search_list></search_list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
      <q-page>

      </q-page>
    </q-page-container>
    <q-layout-footer>
      <p>建设银行</p>
      <q-progress
        :percentage=50
        stripe
        animate
        height="45px"
      />
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import qheader from './header.vue'
import search_list from '../components/search_list.vue'
import gv from '../global/common_sym'
export default {
  name: 'LayoutDefault',
  components: {
    search_list,
    qheader
  },
  data: function () {
    return {
      gv: gv,
      isnowsearching: true
    }
  },
  methods: {
    openURL
  },
  created:function(){
    this.$set(this.gv,'leftDrawerOpen',true)
  }
}
</script>

<style scoped>
  .q-layout-drawer {
    color: black;
    background-color: gold;
  }
</style>
