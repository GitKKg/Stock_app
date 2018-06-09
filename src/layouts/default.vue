<template>
  <q-layout view="lHh Lpr lFf">
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

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>搜索结果列表</q-list-header>
        <q-item dense=true @click.native="openURL('http://quasar-framework.org')">

          <q-item-main label="建设银行" />
        </q-item>
        <q-item @click.native="openURL('https://github.com/quasarframework/')">

          <q-item-main label="工商银行" />
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">

          <q-item-main label="江苏银行"  />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">

          <q-item-main label="中国银行"  />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">

          <q-item-main label="招商银行"  />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      isnowsearching:true,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
