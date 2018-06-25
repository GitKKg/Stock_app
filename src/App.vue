<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

import gv from './global/common_sym'
export default {
  name: 'App',
  mounted: function () {
    {
      // in case user quick click close or f5 before ws connected ,which will make zombie connection
      // place disconnect in vue beforeUpdate and beforeDestroy get no effect,gv should be destroyed already
      // only works when cooperate with server spider's little sleep when it just enter main to give flask's view function(onSpider)
      // changce to out
      window.onbeforeunload = function () {
        if (gv.wsocket != undefined) {
          console.log('wsocket here')
          gv.wsocket.disconnect()
          gv.wsocket = undefined
          // sleep(1000)
        }
        return undefined// not show dialog
      }
    }
  },
  beforeUpdate: function () {
    console.log('beforeUpdate bye')
    console.log(gv.wsocket)
    if (gv.wsocket != undefined) {
      console.log('wsocket here')
      gv.wsocket.disconnect()
      gv.wsocket = undefined
    }
  },
  beforeDestroy: function () {
    console.log('beforeDestroy bye')
    console.log(gv.wsocket)
    if (gv.wsocket != undefined) {
      console.log('wsocket here')
      gv.wsocket.disconnect()
      gv.wsocket = undefined
    }
  }
}
</script>

<style>
</style>
