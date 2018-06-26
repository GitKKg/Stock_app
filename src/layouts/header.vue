<template>
  <q-layout-header>
    <q-btn-group class="row">
      <q-btn label="显示扫描列表" icon="list" color="red" @click="onshowlist" />
      <q-btn label="加载数据库" icon="folder_open" color="red" @click="onOpenDB"/>
      <q-btn label="开始扫描" icon="flight" v-bind:disable="false" color="primary" @click="OnScan"/>
      <q-btn label="爬取数据" icon="search" color="primary">
        <q-popover :disable="false">
          <q-list>
            <date_setting_dialog></date_setting_dialog>
            <q-item>
              <q-item-main>
               <q-btn label="存储爬网数据到服务器" v-bind:disable="gv.forbidSaveDB" @click="onSaveDB" color="blue" />
              </q-item-main>
            </q-item>
          </q-list>
        </q-popover>
      </q-btn>
    </q-btn-group>
  </q-layout-header>
</template>

<script>
import { date } from 'quasar'
import date_setting_dialog from '../components/date_setting_dialog'
import gv from '../global/common_sym'
import io from 'socket.io-client'
export default {
  name: 'qheader',
  components: {
    date_setting_dialog
  },
  // props: {'Pisnowsearching':Boolean},
  data: function () {
    return {
      datesetting: new Date(),
      gv: gv
    }
  },
  created: function () {
    this.$set(this.gv, 'forbidSaveDB', true)
  },
  computed: {
    // a computed getter
    datesettingfmt: function () {
      // `this` points to the vm instance
      return date.formatDate(this.datesetting, 'YYYY-MM-DD')
    }
  },
  methods: {
    onshowlist: function () {
      this.gv.leftDrawerOpen = (!this.gv.leftDrawerOpen)
    },
    OnScan: function () {
      this.$router.push({path: '/scan_route'})
    },
    onOpenDB: function () {
      let instance_vue = this
      if (gv.wsocket == undefined) {
        this.$q.dialog({
          title: '你的浏览器禁止网络套接字',
          message: '请换新版的再来'
        })
        return false
      }
      gv.wsocket.emit('LdDb')
      gv.wsocket.once('loaded', function () {
        gv.db_LoadProgress = 100
        console.log('DB is already loaded')
        // 'this' is io not vue here,so use some var to pass in get vue then get quasar plugin
        instance_vue.$q.dialog({
          title: '很好',
          message: '数据库早就被人加载了，省你事了'
        })
        return true
      }
      )
      gv.wsocket.on('loading', function () {
        instance_vue.$q.notify({
          type: 'info',
          color: 'blue',
          position: 'top',
          message: '有人正在加载数据库，等会你也能用'
        })
        return false
      }
      )
      gv.wsocket.on('db_progress', function (percent) {
        gv.db_LoadProgress = percent
      }
      )
    },
    onSaveDB: function () {
      gv.wsocket.emit('SaveDB')
      gv.wsocket.on('DBprogress',
        function (percent) {

        }
      )
    }

  }
}
</script>

<style scoped>
  .q-list {
      background-color: dodgerblue;
  };
</style>
