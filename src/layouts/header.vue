<template>
  <q-layout-header>
    <q-btn-group class="row">
      <q-btn label="显示扫描列表" color="red" @click="onshowlist" />
      <q-btn label="加载数据库" color="red" />
      <q-btn label="开始扫描" v-bind:disable="Pisnowsearching" color="primary"/>
      <q-btn label="爬取数据"  color="primary">
        <q-popover :disable="false">
          <q-list>
            <date_setting_dialog></date_setting_dialog>
            <q-item>
              <q-item-main>
               <q-btn label="存储爬网数据到服务器" color="blue" />
              </q-item-main>
            </q-item>
          <q-item-separator />

          </q-list>
        </q-popover>
      </q-btn>
    </q-btn-group>
  </q-layout-header>
</template>

<script>
import { date } from 'quasar'
import date_setting_dialog from '../components/date_setting_dialog.vue'
import gv from '../global/common_sym'
export default {
  name: 'qheader',
  components: {
    date_setting_dialog
  },
  props: {'Pisnowsearching':Boolean},
  data: function () {
    return {
      datesetting: new Date(),
      gv:gv
    }
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
      this.gv.leftDrawerOpen=(this.gv.leftDrawerOpen==true?false:true)
  }
  }

}
</script>

<style scoped>
  .q-list {
      background-color: dodgerblue;
  };
</style>
