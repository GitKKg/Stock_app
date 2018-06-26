
<template>
  <div>
    <q-tabs>
      <q-route-tab
        icon="settings"
        label="全局设定"
        slot="title"
        to="/scan_route"
      />
      <q-route-tab
        icon="crop_square"
        label="矩形设定"
        to="/scan_route/rectangle"
        exact
        slot="title"
      />
      <q-route-tab
        icon="trending_up"
        label="上升三角形设定"
        to="/scan_route/rectangle"
        exact
        slot="title"
      />
      <q-route-tab
        icon="trending_down"
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
export default {
  name: 'route_scan_overall',
  data: function () {
    return {
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
