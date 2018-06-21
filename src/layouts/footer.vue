<template>
  <q-layout-footer >
    <p v-if="gv.cuurent_symbol_spidered!=''">{{gv.cuurent_symbol_spidered}}</p>
    <qprogress></qprogress>

  </q-layout-footer>
</template>

<script>
import gv from '../global/common_sym'
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
    this.$set(this.gv, 'cuurent_symbol_spidered', '')
  }
}
</script>

<style scoped>

</style>
