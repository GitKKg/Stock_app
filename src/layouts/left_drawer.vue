<template>
  <q-layout-drawer
    v-bind:value="gv.leftDrawerOpen"
    side="left"
    :content-class="$q.theme === 'mat' ? 'bg-light-blue' : null"
    :breakpoint="50"
  >
    <search_list v-if="true"></search_list>
  </q-layout-drawer>
</template>

<script>
import search_list from '../components/search_list'
import gv from '../global/common_sym'
export default {
  name: 'qleft_drawer',
  components: {
    search_list
  },
  data: function () {
    return {
      gv: gv
    }
  },
  created: function () {
    this.$set(this.gv, 'leftDrawerOpen',false)
  }
}
</script>

<style scoped>
  /*no effect in quasar component*/
  .q-layout-drawer {
    color: black;
    background-color: gold;
  }
</style>
