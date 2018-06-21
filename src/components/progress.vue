<template>
  <p>
  <q-progress v-if="gv.spider_progress!=0"
    :percentage=50
    stripe
    animate
    height="45px"
  />
  <q-progress v-if="gv.scanning_progress!=0"
              :percentage=50
              stripe
              animate
              height="45px"
  />
  </p>
</template>

<script>
import gv from '../global/common_sym'
export default {
  name: 'qprogress',
  data: function () {
    return {
      gv: gv
    }
  },
  created: function () {
    this.$set(this.gv, 'spider_progress', 0)
    this.$set(this.gv, 'scanning_progress', 50)
  }
}
</script>

<style scoped>

</style>
