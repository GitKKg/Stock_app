<template>
  <q-list
    link
    :striped-odd="true"
    separator
  >
    <q-list-header :inset="true">搜索结果列表 :</q-list-header>
    <q-item @click.native="openURL('http://quasar-framework.org')">
      <q-item-main  label="建设银行" />
    </q-item>
    <q-item @click.native="openURL('https://github.com/quasarframework/')">
      <q-item-main  label="工商银行" />
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
</template>

<script>
import { openURL } from 'quasar'
export default {
  name: 'search_list',
  methods: {
    openURL
  }
}
</script>

<style scoped>
  .q-list {
//    background-color: blue;
  };
</style>
