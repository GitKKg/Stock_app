<template>
  <div id="q-app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
      <router-view v-if="!$route.meta.keepAlive" />
    </keep-alive>
  </div>
</template>

<script>

import gv from './global/common_sym'
import io from 'socket.io-client'
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
  updated: function () {
    let current_url = window.location.host
    if (gv.wsocket == undefined) {
      console.log('App set ws io')
      gv.wsocket = new io.connect('http://' + current_url, {'reconnection': true})// current_url include port number
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
