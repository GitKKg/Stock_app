<template>
  <q-item v-close-overlay>
  <q-item-main>
    <q-btn label="爬取新浪时间设置" icon="access_time" @click="maximizedModal = true" color="blue"></q-btn>
    <q-modal v-model="maximizedModal" :content-css="{padding: '50px'}" maximized  no-backdrop-dismiss>
      <q-modal-layout class="bg-grey">
        <h5 style="color: red">设置起始和结束时间:</h5>
        <q-icon name="flight_takeoff" size="50px" />
        <q-datetime v-model="date_start"  inverted color="blue" type="date" placeholder="开始时间"/>

        <q-icon name="flight_land" size="50px"/>
        <q-datetime v-model="date_end" icon="flight_land" inverted color="blue" type="date" placeholder="结束时间"/>

        <q-btn color="tertiary" @click="maximizedModal = false" label="Close" />
        <p>设置完毕点击开始爬取</p>
        <q-btn color="tertiary" @click="onSpider" label="开始爬取" />

      </q-modal-layout>

    </q-modal>
  </q-item-main>
  </q-item>
</template>

<script>

import axios from 'axios'
import io from 'socket.io-client'
import manager from 'socket.io-client'
import {gv, OverallSetting} from '../global/common_sym'

export default {
  name: 'date_setting_dialog',
  data: function () {
    return {
      maximizedModal: false,
      name: '',
      date_start: undefined,
      date_end: undefined
    }
  },
  created: function (){
    this.date_start=new Date()
    this.date_start.setFullYear(this.date_start.getFullYear()-1)
    this.date_end=new Date()
  },
  methods: {
    // 当props.ok()被调用
    onSpider: function () {
      if (this.date_start == undefined | this.date_end == undefined | this.date_start >= this.date_end) {
        alert('时间设置范围错误，请重设')
      } else {
        this.startSpider()
        this.maximizedModal = false
        // sleep(1000)
      }
    },
    startSpider: function () {
      let current_url = window.location.host
      let date_object = {
        'date_start_year': this.date_start.getFullYear(),
        'date_start_month': this.date_start.getMonth() + 1,
        'date_end_year': this.date_end.getFullYear(),
        'date_end_month': this.date_end.getMonth() + 1
      }

      gv.forbidSaveDB = true
      console.log(current_url)
      console.log(gv.wsocket)
      if (gv.wsocket == undefined) {
        this.$q.dialog({
          title: '你的浏览器禁止网络套接字',
          message: '请换新版的再来'
        })
        return false
      }

      gv.wsocket.on('connect', function () {
        console.log(gv.wsocket.id)
      })
      gv.wsocket.emit('spider', date_object)
      gv.wsocket.on('progress', function (percent) {
        console.log('progress percent is ' + percent)
        gv.spider_progress = percent
      })
      gv.wsocket.on('stockname', function (name) {
        console.log('stockname is ' + name)
        if (name == 'end') {
          gv.spider_progress = -1
          gv.current_sym_spidered = ''
          gv.forbidSaveDB = false
          gv.wsocket.off('stockname')
          gv.wsocket.off('progress')
        } else { gv.current_sym_spidered = name }
      })
    },

    // 当props.cancel()被调用
    onCancel () { },

    // 当我们展示给用户时
    onShow () { },

    // 当它被隐藏时
    onHide () { },

    // 自定义处理程序
    async choose (okFn, hero) {
      if (this.name.length === 0) {
        this.$q.dialog({
          title: 'Please specify your name!',
          message: `Can't buy tickets without knowing your name.`
        })
      } else {
        await okFn()
        this.$q.notify(`Ok ${this.name}, going with ${hero}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
