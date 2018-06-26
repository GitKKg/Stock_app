<template>
    <div>
      <q-card color="light-blue-5">
        <q-card-title>
          <q-list>
            <q-list-header><label>设置扫描时间区域</label></q-list-header>
            <q-item>

              <q-item-side icon="flight_takeoff"><label>开始时间</label></q-item-side>
              <q-item-main>
                <q-datetime v-model="date_start"  type="date" placeholder="开始时间"/>
              </q-item-main>

            </q-item>

            <q-item-separator/>

            <q-item>

              <q-item-side icon="flight_land"><label>结束时间</label></q-item-side>
              <q-item-main>
                <q-datetime v-model="date_end"  type="date" placeholder="结束时间"/>
              </q-item-main>
            </q-item>
          </q-list>
        </q-card-title>

        <q-card-separator />
        <q-card-main>
          Card Content
        </q-card-main>
      </q-card>

      <q-card>
        <q-card-title>
          极点设置
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          Card Content
        </q-card-main>
      </q-card>

      <q-card>
        <q-card-title>
          图形长度
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          Card Content
        </q-card-main>
      </q-card>
    </div>
</template>

<script>
export default {
  name: 'scan_overall',
  data: function () {
    return {
      date_start: undefined,
      date_end: undefined
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$route.meta.keepAlive = true
    next()
  },

  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~variables'
  label
    color black
</style>
