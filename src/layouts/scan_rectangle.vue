<template>
  <div>
    <h5>hello,Rectangle</h5>
  </div>
</template>

<script>
export default {
  name: 'scan_rectangle',
  beforeRouteLeave (to, from, next) {
    console.log('rect leave')
    this.$route.meta.keepAlive = true
    next()
  }
}
</script>

<style scoped>

</style>
