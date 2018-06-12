<template>
  <q-layout-header>
    <q-btn-group class="row">
      <q-btn label="加载数据库" color="red" @click="clickHandler1"/>
      <q-btn label="开始扫描" v-bind:disable="isnowsearching" color="primary" @click="clickHandler2"/>
      <q-btn-dropdown
        color="primary"
        label="爬取数据"
      >
        <q-list>
          <q-list-header>爬取新浪时间设置</q-list-header>
          <q-item>

            <q-item-main>
              <q-datetime v-model="datesetting" display-value="爬取新浪时间设置"  type="date" />
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-main>
              <q-btn label="存储爬网数据到服务器"   @click="clickHandler2"/>
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
export default {
  name: 'qheader',
  props: ['isnowsearching', 'datesetting'],
  data: function () {
    return {
      isnowsearching: true,
      datesetting: new Date()
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
