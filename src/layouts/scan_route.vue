
<template>
  <div>
    <q-tabs v-model="gv.scan_route_Tab" >
      <q-tab
        alert="true"
        icon="settings"
        name="overall"
        label="全局设定"
        slot="title"
        @click="onOverall"
      />
      <q-tab
        icon="crop_square"
        name="rectangle"
        label="矩形设定"
        to="/scan_route/rectangle"
        exact
        @click="onRectangle"
        slot="title"

      />
      <q-tab
        icon="trending_up"
        name="triangle1"
        label="上升三角形设定"
        to="/scan_route/rectangle"
        exact
        slot="title"
      />
      <q-tab
        icon="trending_down"
        name="triangle2"
        label="下降三角形设定"
        to="/"
        exact
        slot="title"
      />
    </q-tabs>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
      <router-view v-if="!$route.meta.keepAlive" />
    </keep-alive>
  </div>
</template>

<script>
import gv from '../global/common_sym'
export default {
  name: 'route_scan_overall',
  data: function () {
    return {
      gv: gv
    }
  },
  methods: {
    onRect: function () {
      console.log('tabs')
      return false
    },
    onOverall: function () {
      this.$router.push({path: '/scan_route'})
    },
    onRectangle: function () {
      this.$router.push({path: '/scan_route/rectangle'})
    }
  },
  created: function () {
    console.log('scan_route_Tab watched')
    this.$set(this.gv, 'scan_route_Tab', 'overall')
  },
  updated: function () {
    console.log('scan_route_Tab beforeUpdate')
    console.log(gv.scan_route_Tab)
    if(gv.scan_needRecheck_Tab!=undefined) {
      console.log('force reselect')
      console.log(gv.scan_needRecheck_Tab)
      gv.scan_route_Tab = gv.scan_needRecheck_Tab
      gv.scan_needRecheck_Tab = undefined
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$route.meta.keepAlive = true
    next()
  }

}
</script>

<style lang="stylus" scoped>

</style>
