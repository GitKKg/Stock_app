<template>
  <q-item-main>
  <q-btn label="爬取新浪时间设置" @click="open_dialog = true"></q-btn>
  <q-dialog
    v-model="open_dialog"
    stack-buttons
    prevent-close
    @ok="onOk"
    @cancel="onCancel"
    @show="onShow"
    @hide="onHide"
  >
    <!-- 这里可能使用<q-dialog>的"title"属性 -->
    <span slot="title">Favorite Superhero</span>

    <!-- 这里可能使用<q-dialog>的"message"属性 -->
    <span slot="message">What is your superhero of choice?</span>

    <div slot="body">
      <q-field
        icon="account_circle"
        helper="We need your name so we can send you to the movies."
        label="Your name"
        :label-width="3"
      >
        <q-input v-model="name" />
      </q-field>
    </div>

    <template slot="buttons" slot-scope="props">
      <q-btn color="primary" label="Choose Superman" @click="choose(props.ok, 'Superman')" />
      <q-btn color="black" label="Choose Batman" @click="choose(props.ok, 'Batman')" />
      <q-btn color="negative" label="Choose Spiderman" @click="choose(props.ok, 'Spiderman')" />
      <q-btn flat label="No thanks" @click="props.cancel" />
    </template>
  </q-dialog>
    </q-item-main>
</template>

<script>
export default {
  name: 'date_setting_dialog',
  data: function () {
    return {
      open_dialog: false,
      name: ''
    }
  },
  methods: {
    // 当props.ok()被调用
    onOk (data) { },

    // 当props.cancel()被调用
    onCancel () {this.date_dialog_open=false },

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
