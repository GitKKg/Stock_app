<template>
  <q-layout view="lHh Lpr lFf">
    <qheader v-bind:Pisnowsearching="isnowsearching"></qheader>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-light-blue' : null"
    >
      <search_list></search_list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import qheader from './header.vue'
import search_list from './search_list.vue'
export default {
  name: 'LayoutDefault',
  components: {
    search_list,
    qheader
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      isnowsearching:true
    }
  },
  methods: {
    openURL
  }
}
</script>

<style scoped>
  .q-layout-drawer {
    color: black;
    background-color: gold;
  }
</style>
