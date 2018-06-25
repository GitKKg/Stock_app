<template>
  <p>
  <q-progress v-if="gv.spider_progress!=-1"
    :percentage=gv.spider_progress
    stripe
    animate
    height="45px"
  />
    <q-progress v-if="gv.db_LoadProgress!=-1"
                :percentage=gv.db_LoadProgress
                stripe
                animate
                height="45px"
    />
  <q-progress v-if="gv.scanning_progress!=-1"
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
    this.$set(this.gv, 'spider_progress', -1)
    this.$set(this.gv, 'scanning_progress', -1)
    this.$set(this.gv, 'db_LoadProgress', -1)
  }
}
</script>

<style scoped>

</style>
