<template>
  <q-layout-header>
    <q-btn-group class="row">
      <q-btn label="加载数据库" color="red" />
      <q-btn label="开始扫描" v-bind:disable="isnowsearching" color="primary"/>
      <q-btn-dropdown
        color="primary"
        label="爬取数据"
      >

        <q-list>
          <q-item>
            <date_setting_dialog></date_setting_dialog>
          </q-item>
          <q-item>
            <q-item-main>
              <q-btn label="存储爬网数据到服务器" />
            </q-item-main>
          </q-item>
          <q-item-separator />

        </q-list>
      </q-btn-dropdown>
    </q-btn-group>
  </q-layout-header>
</template>

<script>
import { date } from 'quasar'
import date_setting_dialog from './date_setting_dialog.vue'
export default {
  name: 'qheader',
  components: {
    date_setting_dialog
  },
  props: ['isnowsearching'],
  data: function () {
    return {
      datesetting: new Date(),
    }
  },
  computed: {
    // a computed getter
    datesettingfmt: function () {
      // `this` points to the vm instance
      return date.formatDate(this.datesetting, 'YYYY-MM-DD')
    }
  }

}
</script>

<style scoped>

</style>
