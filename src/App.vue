<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import gv from './global/common_sym'
export default {
  name: 'App',
  beforeUpdate: function () {
    console.log('bye')
    if (gv.wsocket != null) {
      console.log('wsocket here')
      gv.wsocket.disconnect()
      gv.wsocket = null
    }
  },
  beforeDestroy: function () {
    console.log('bye')
    if (gv.wsocket != null) {
      console.log('wsocket here')
      gv.wsocket.disconnect()
      gv.wsocket = null
    }
  }
}
</script>

<style>
</style>
