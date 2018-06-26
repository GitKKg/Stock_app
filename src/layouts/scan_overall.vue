<template>

  <div>
    <q-tabs>
      <q-tab
        default
        icon="settings"
        label="全局设定"
        exact
        slot="title"
      />
      <q-route-tab
        icon="crop_square"
        label="矩形设定"
        to="/rectangle"
        exact
        slot="title"
      />
      <q-route-tab
        icon="trending_up"
        label="上升三角形设定"
        to="/rectangle"
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

      <router-view></router-view>

  </div>

</template>
// orginal design was use 5 route in scaning modal dialog to switch 'overall','rectangle','triangle' para setting page
// but finally depleted due to route page jump will make whole app fresh ,ws connected lost...
<script>
export default {
  name: 'route_scan_overall'
}
</script>

<style scoped>

</style>
