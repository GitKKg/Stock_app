<template>
  <div>
    <q-card color="indigo-1" class="row gutter-md justify-center">
      <div>
      <label>加入扫描</label>
      </div>
      <div>
        <q-toggle icon="search"
           v-model="RectangleSetting.RectChecked"
          color="primary"/>
      </div>
    </q-card>

    <div   class="row content-stretch">

    <q-card class="col" color="indigo-1">
      <q-card-title>
        <label>直线属性</label>
      </q-card-title>
      <q-card-main>
        <q-list>
          <q-item>
            <q-item-side icon="arrow_back"><label>顶点数</label></q-item-side>
            <q-item-main>

              <q-input :disable="!RectangleSetting.RectChecked"  v-model="RectangleSetting.TopHits"  @blur="RangeCheck('TopHits')" type="number" suffix="个" stack-label="最小2最大10" />
            </q-item-main>
          </q-item>

          <q-item-separator/>

          <q-item>
            <q-item-side icon="arrow_forward"><label>底点数</label></q-item-side>
            <q-item-main>

              <q-input :disable="!RectangleSetting.RectChecked" v-model="RectangleSetting.BottomHits"  @blur="RangeCheck('BottomHits')" type="number" suffix="个" stack-label="最小2最大10" />

            </q-item-main>
          </q-item>

          <q-item-separator/>

          <q-item>
            <q-item-side icon="center_focus_strong"><label>顶点模糊度</label></q-item-side>
            <q-item-main>
              <q-input :disable="!RectangleSetting.RectChecked" v-model="RectangleSetting.TopFuzzy"  @blur="RangeCheck('TopFuzzy')" type="number" :decimals="2" :step="0.01" suffix="%" stack-label="最小0.2最大1"
                       min="0.2" max="1"/>
            </q-item-main>
          </q-item>
          <q-item-separator/>

          <q-item>
            <q-item-side icon="center_focus_strong"><label>底点模糊度</label></q-item-side>
            <q-item-main>
              <q-input :disable="!RectangleSetting.RectChecked" v-model="RectangleSetting.BottomFuzzy"  @blur="RangeCheck('BottomFuzzy')" type="number" :decimals="2" :step="0.01" suffix="%" stack-label="最小0.2最大1"
                       min="0.2" max="1"/>
            </q-item-main>
          </q-item>

        </q-list>
      </q-card-main>
    </q-card>

    <q-card class="col" color="indigo-1">
      <q-card-title>
        <label>高度</label>
      </q-card-title>
      <q-card-main>
        <q-list>
          <q-item>
            <q-item-side icon="arrow_downward"><label>最小值</label></q-item-side>
            <q-item-main>

              <q-input readonly :disable="true" v-model="RectangleSetting.minHeight"  @blur="RangeCheck('minHeight')" type="number" suffix="%" stack-label="建议值" />
            </q-item-main>
          </q-item>

          <q-item-separator/>

          <q-item>
            <q-item-side icon="arrow_upward"><label>最大值</label></q-item-side>
            <q-item-main>

              <q-input :disable="true" v-model="RectangleSetting.maxHeight"  @blur="RangeCheck('maxHeight')" type="number" suffix="%" stack-label="建议值" />

            </q-item-main>
          </q-item>

          <q-item-separator/>

        </q-list>
      </q-card-main>
    </q-card>
    </div>
    <q-card color="indigo-1">
      <q-card-title>
        <label>矩形品质</label>
      </q-card-title>
      <q-card-main>
        <q-list>
          <q-item>
            <q-item-side icon="arrow_downward"><label>右边界点数最小值</label></q-item-side>
            <q-item-main>

              <q-input  :disable="!RectangleSetting.RectChecked" v-model="RectangleSetting.rightMargin"  @blur="RangeCheck('rightMargin')" type="number" suffix="day" stack-label="最小3最大10" />
            </q-item-main>
          </q-item>

          <q-item-separator/>

          <q-item>
            <q-item-side icon="arrow_upward"><label>右边界回撤最小值</label></q-item-side>
            <q-item-main>

              <q-input :disable="!RectangleSetting.RectChecked" v-model="RectangleSetting.rightDrawback"  @blur="RangeCheck('rightDrawback')" type="number" suffix="%" stack-label="最小3最大8" />

            </q-item-main>
          </q-item>

          <q-item-separator/>

        </q-list>

      </q-card-main>

    </q-card>
    <q-card-separator />

    <q-card color="indigo-1" class="row gutter-md justify-end">
      <div>
        <q-btn color="primary" icon="visibility" @click="StartScaning" label="开始扫描"  />
      </div>
      <br/>
      <div>
        <q-btn color="red" icon="exit_to_app" @click="Exit" label="取消退出"/>
      </div>
    </q-card>

  </div>

</template>

<script>
import { required, between } from 'vuelidate/lib/validators'
import {gv, RectangleSetting} from '../global/common_sym'
export default {
  name: 'scan_rectangle',
  data () {
    return {
      RectangleSetting: RectangleSetting,
      gv: gv
    }
  },
  methods: {
    StartScaning: function () {
      this.$v.validationGroup.$touch()
      if (this.$v.validationGroup.$error) {
        this.$q.notify('设定值非法，请重设')
      } else {
        this.$router.push({path: '/'})
      }
    },
    RangeCheck: function (prop_name) {
      // use [] not . dot , make func multiplexing,just brilliant

      console.log('RangeCheck')
      console.log(this.RectangleSetting[prop_name])
      console.log(typeof (this.RectangleSetting[prop_name]))
      if (typeof (this.RectangleSetting[prop_name]) === 'object') {
        console.log('catch')
        this.RectangleSetting[prop_name] = 3// no sense
        // even so,value actually be changed to null,only let validations to keep last gate
        return
      }
      // handle sci num trap
      let str = this.RectangleSetting[prop_name].toString()
      console.log('str', str)
      console.log('str', str.indexOf('e'))
      if (str.indexOf('e') != -1) {
        console.log('catch')
        this[prop_name] = 3// no sense
        // even so,value actually be changed to null,only let validations to keep last gate
      } else if (this.RectangleSetting[prop_name] > this.RectangleSetting[prop_name + 'Max']) {
        this.RectangleSetting[prop_name] = this.RectangleSetting[prop_name + 'Max']
      } else if (this.RectangleSetting[prop_name] < this.RectangleSetting[prop_name + 'Min']) {
        this.RectangleSetting[prop_name] = this.RectangleSetting[prop_name + 'Min']
      }
    }
  },
  activated: function () {
    console.log('activated')
    this.$set(this.RectangleSetting, 'RectChecked', RectangleSetting.RectChecked)
    this.$set(this.RectangleSetting, 'TopHits', RectangleSetting.TopHits)
    this.$set(this.RectangleSetting, 'TopFuzzy', RectangleSetting.TopFuzzy)
    this.$set(this.RectangleSetting, 'BottomFuzzy', RectangleSetting.BottomFuzzy)
    this.$set(this.RectangleSetting, 'BottomHits', RectangleSetting.BottomHits)
    this.$set(this.RectangleSetting, 'minHeight', RectangleSetting.minHeight)
    this.$set(this.RectangleSetting, 'maxHeight', RectangleSetting.maxHeight)
    this.$set(this.RectangleSetting, 'rightMargin', RectangleSetting.rightMargin)
    this.$set(this.RectangleSetting, 'rightDrawback', RectangleSetting.rightDrawback)
    /*
    this.$set(this.RectangleSetting, 'minGLength', RectangleSetting.minGLength)
    this.$set(this.RectangleSetting, 'maxGLength', RectangleSetting.maxGLength)
    this.$set(this.RectangleSetting, 'ScanDateStart', RectangleSetting.ScanDateStart)
    this.$set(this.RectangleSetting, 'ScanDateEnd', RectangleSetting.ScanDateEnd)
    */
  },
  beforeRouteLeave (to, from, next) {
    this.$v.validationGroup.$touch()
    if (this.$v.validationGroup.$error) {
      this.$q.notify('设定值非法，请重设')
      gv.scan_needRecheck_Tab = 'rectangle'
      next(false)
    } else {
      this.$route.meta.keepAlive = true
      next()
    }
  },
  validations: {
    RectangleSetting: {
      TopHits: {
        required,
        between: between(2, 10)
      },
      TopFuzzy: {
        required,
        between: between(0.2, 1)
      },
      BottomFuzzy: {
        required,
        between: between(0.2, 1)
      },
      rightMargin: {
        required,
        between: between(3, 5)
      },
      rightDrawback: {
        required,
        between: between(3, 8)
      }
    },
    validationGroup: ['RectangleSetting.TopHits', 'RectangleSetting.TopFuzzy', 'RectangleSetting.BottomFuzzy', 'RectangleSetting.rightMargin', 'RectangleSetting.rightDrawback']
  }
}
</script>

<style lang="stylus" scoped>
  @import '~variables'
  label
    color red
</style>
