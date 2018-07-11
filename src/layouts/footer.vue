<template>
  <q-layout-footer class="bg-indigo-1">
    <p v-if="gv.current_sym_spidered!=''">{{gv.current_sym_spidered}}</p>
    <qprogress></qprogress>

  </q-layout-footer>
</template>

<script>
import {gv, OverallSetting} from '../global/common_sym'
import qprogress from '../components/progress'

export default {
  name: 'qfooter',
  components: {
    qprogress
  },
  data: function () {
    return {
      gv: gv
    }
  },
  created: function () {
    this.$set(this.gv, 'current_sym_spidered', '')
  }
}
</script>

<style scoped>

</style>
