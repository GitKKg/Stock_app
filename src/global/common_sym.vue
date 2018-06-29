<script>
var gv = {
  wsocket: undefined,
  leftDrawerOpen: false,
  manager: null,
  spider_progress: 0,
  current_sym_spidered: '',
  forbidSaveDB: true,
  db_LoadProgress: 0,
  scanning_progress: 0,
  scan_route_Tab: 'overall',
  scan_needRecheck_Tab: undefined
}
var OverallSetting = {
  ScanDateStart: undefined,
  ScanDateEnd: undefined,
  prev: 3,
  prevMax: 10,
  prevMin: 2,
  next: 3,
  nextMax: 10,
  nextMin: 2,
  fuzzy: 0.5,
  fuzzyMax: 1,
  fuzzyMin: 0.2,
  minGLength: 22,
  minGLengthMax: 50,
  minGLengthMin: 22,
  maxGLength: 66,
  maxGLengthMax: 132,
  maxGLengthMin: 66
}
var RectangleSetting = {
  RectChecked: false,
  TopHits: 3,
  TopHitsMin:2,
  TopHitsMax:10,
  TopFuzzy: 0.5,
  TopFuzzyMin:0.2,
  TopFuzzyMax:1,
  BottomFuzzy: 0.5,
  BottomFuzzyMin:0.2,
  BottomFuzzyMax:1,
  BottomHits: 3,
  BottomHitsMin:2,
  BottomHitsMax:10,
  minHeight: 10,
  minHeightMax: 15,
  minHeightMin: 8,
  maxHeight: 25,
  maxHeightMax: 30,
  maxHeightMin: 15,
  rightMargin: 3,
  rightMarginMax: 10,
  rightMarginMin: 3,
  rightDrawback:5,
  rightDrawbackMin:3,
  rightDrawbackMax:8
}

export {gv, OverallSetting, RectangleSetting}
</script>
