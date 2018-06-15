<template>
  <q-item v-close-overlay>
  <q-item-main>
    <q-btn label="爬取新浪时间设置" @click="maximizedModal = true" color="blue"></q-btn>
    <q-modal v-model="maximizedModal"  maximized  no-backdrop-dismiss>
      <q-modal-layout class="bg-grey">
        <h5 style="color: blue">设置起始和结束时间:</h5>
        <q-datetime v-model="date_start" inverted color="blue" type="date" placeholder="开始时间"/>
        <q-datetime v-model="date_end" inverted color="blue" type="date" placeholder="结束时间"/>

        <q-btn color="tertiary" @click="maximizedModal = false" label="Close" />
        <p>设置完毕点击开始爬取</p>
        <q-btn color="tertiary" @click="onOK" label="开始爬取" />

      </q-modal-layout>

    </q-modal>
  </q-item-main>
  </q-item>
</template>

<script>

import axios from 'axios'
export default {
  name: 'date_setting_dialog',
  data: function () {
    return {
      model: new Date(),
      maximizedModal: false,
      name: '',
      date_start: new Date(),
      date_end: new Date()
    }
  },
  methods: {
    // 当props.ok()被调用
    onOK: function () {
      if (this.date_start == null | this.date_end == null | this.date_start >= this.date_end) {
        alert('时间设置范围错误，请重设')
      } else {
        function sleep (delay) {
          var start = new Date().getTime()
          while (new Date().getTime() < start + delay);
        }

        axios.get('/spider', {
          params: {
            ID: 12345
          }
        })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })

        axios.post('/spider', {
          startyear: this.date_start.getFullYear(),
          startmonth: this.date_start.getMonth(),
          startday: this.date_start.getDay(),
          endtyear: this.date_end.getFullYear(),
          endtmonth: this.date_end.getMonth(),
          endtday: this.date_end.getDay()
        })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
        this.maximizedModal = false
        sleep(1000)
      }
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
