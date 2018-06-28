<template>
    <div>
      <q-card color="indigo-1">
        <q-card-title>
          <label>设置扫描时间区域</label>
        </q-card-title>
        <q-card-main>
          <q-list>
            <q-item>
              <q-item-side icon="flight_takeoff"><label>开始时间</label></q-item-side>
              <q-item-main>
                <q-datetime v-model="ScanDateStart"  @blur="DateRangeCheck" type="date" placeholder="月为最小关注单位"/>
              </q-item-main>
            </q-item>

            <q-item-separator/>

            <q-item>
              <q-item-side icon="flight_land"><label>结束时间</label></q-item-side>
              <q-item-main>
                <q-datetime v-model="ScanDateEnd" @blur="DateRangeCheck" type="date" placeholder="月为最小关注单位"/>
              </q-item-main>
            </q-item>
          </q-list>
        </q-card-main>
      </q-card>

      <q-card-separator />

      <q-card color="indigo-1">
        <q-card-title>
          <label>极点设置</label>
        </q-card-title>
        <q-card-main>
          <q-list>
            <q-item>
              <q-item-side icon="arrow_back"><label>前点数</label></q-item-side>
              <q-item-main>
                <!-- this is a perfect way to limit number input online,but sorry on visual effect
               <input  v-model="prev"  @change="prev = Math.max(Math.min(Math.round(prev), 10), 2)"  type="number"  />
               -->
                <q-input  v-model="prev"  @blur="RangeCheck('prev')" type="number" suffix="个" stack-label="最小2最大10" min="2" max="10"/>
             </q-item-main>
           </q-item>

           <q-item-separator/>

           <q-item>
             <q-item-side icon="arrow_forward"><label>后点数</label></q-item-side>
             <q-item-main>

               <q-input  v-model="next"  @blur="RangeCheck('next')" type="number" suffix="个" stack-label="最小2最大10" min="2" max="10"/>

              </q-item-main>
            </q-item>

            <q-item-separator/>

            <q-item>
              <q-item-side icon="center_focus_strong"><label>模糊度</label></q-item-side>
              <q-item-main>
                <q-input v-model="fuzzy"  @blur="RangeCheck('fuzzy')" type="number" :decimals="2" :step="0.01" suffix="%" stack-label="最小0.2最大1"
                         min="0.2" max="1"/>
              </q-item-main>
            </q-item>

          </q-list>
        </q-card-main>
      </q-card>

      <q-card-separator />

      <q-card color="indigo-1">
        <q-card-title><label>图形长度</label></q-card-title>
        <q-card-separator />
        <q-card-main>
          <q-list>
            <q-item>
              <q-item-side icon="arrow_downward"><label>最小值</label></q-item-side>
              <q-item-main>
                <q-input  v-model="minGLength"  @blur="RangeCheck('minGLength')" type="number" suffix="天" stack-label="最小22最大66" min="2" max="10"/>
              </q-item-main>
            </q-item>

          </q-list>
        </q-card-main>
      </q-card>
    </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
import gv from '../global/common_sym'
export default {
  name: 'scan_overall',
  data: function () {
    return {
      ScanDateStart: undefined,
      ScanDateEnd: undefined,
      prev: 3,
      prevMax:10,
      prevMin:2,
      next: 3,
      nextMax:10,
      nextMin:2,
      fuzzy: 0.5,
      fuzzyMax:1,
      fuzzyMin:0.2,
      minGLength: 22,
      maxGLength: 66
    }
  },
  methods: {
    NullCheck: function (val, prop_name) {
      console.log('NullCheck')
      console.log(this.prev)
      console.log(event.target.value)
      let tmp = 0
      tmp = parseInt(event.target.value)
      if (tmp > 10) {
        tmp = 10
        event.target.value = 10
      }
      console.log('value again')
      console.log(event.target.value)

      this.prev = tmp
      console.log('Nullcheck change to tmp')
    },

    // check when blur, tried event input or change,but got race condition with man hand
    RangeCheck: function (prop_name) {
    // use [] not . dot , make func multiplexing,just brilliant
      console.log('RangeCheck')
      console.log(this[prop_name])
      console.log(typeof (this[prop_name]))
      if (typeof (this[prop_name]) === 'object') {
        console.log('catch')
        this[prop_name] = 3// no sense
        // even so,value actually be changed to null,only let validations to keep last gate
        return
      }
      // handle sci num trap
      let str = this[prop_name].toString()
      console.log('str', str)
      console.log('str', str.indexOf('e'))
      if (str.indexOf('e') != -1) {
        console.log('catch')
        this[prop_name] = 3// no sense
        // even so,value actually be changed to null,only let validations to keep last gate
      } else if (this[prop_name] > this[prop_name+'Max']) {
        this[prop_name] = this[prop_name+'Max']
      } else if (this[prop_name] < this[prop_name+'Min']) {
        this[prop_name] = this[prop_name+'Min']
      }
    },
    DateRangeCheck: function () {
      console.log('date check')
      if (this.ScanDateStart == undefined | this.ScanDateEnd == undefined | this.ScanDateStart >= this.ScanDateEnd) {
        this.ScanDateStart = new Date()
        this.ScanDateStart.setFullYear(this.ScanDateStart.getFullYear() - 1)
        this.ScanDateEnd = new Date()
        this.$q.dialog({
          title: '时间区间设置错误',
          message: '已重设为往前一年区间'
        })
      }
    }
  },
  // not use,due to check and correct in blur event

  validations: {
    prev: {
      required,
      between: between(2, 10)
    },
    next: {
      required,
      between: between(2, 10)
    },
    fuzzy: {
      required,
      between: between(0.1, 1)
    },
    validationGroup: ['prev', 'next', 'fuzzy']
  },

  created: function () {
    // this.date_start=new Date()
    // this.date_start.setFullYear(this.date_start.getFullYear()-1)
    // this.date_end=new Date()
  },
  beforeRouteLeave (to, from, next) {
    this.$v.validationGroup.$touch()

    if (this.$v.validationGroup.$error) {
      this.$q.notify('设定值非法，请重设')
      gv.scan_needRecheck_Tab = 'overall'
      next(false)
    } else {
      this.$route.meta.keepAlive = true
      next()
    }
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
    color red
</style>
