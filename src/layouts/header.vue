<template>
  <q-layout-header>
    <q-btn-group class="row">
      <q-btn label="加载数据库" color="red" @click="clickHandler1"/>
      <q-btn label="开始扫描" v-bind:disable="isnowsearching" color="primary" @click="clickHandler2"/>
      <q-btn-dropdown
        color="primary"
        label="爬取数据"
      >
        <q-btn-group class="column">
          <q-datetime v-model="model" display-value="爬取新浪时间设置"  type="date" />
          <q-btn label="存储爬网数据到服务器"   @click="clickHandler2"/>
        </q-btn-group>

      </q-btn-dropdown>
    </q-btn-group>
  </q-layout-header>
</template>

<script>
export default {
  name: 'qheader'
}
</script>

<style scoped>

</style>
