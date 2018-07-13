<template>
  <div class="v-Kline">
        <div class="left">
            <zb-klien :btypes="btype" ></zb-klien>
            <div class="left_abso" id="left_remo" @click ='remover()' v-show="isRemove"></div>
        </div>
        <div class="rihgt">
            <time-trade :realList="realList"></time-trade>
            <!-- <deep-graph :depth="depth" style="overflow:hidden"></deep-graph> -->
        </div>
  </div>
</template>
<script>
// import deepGraph from './kLineCom/deepGraph.vue'
import timeTrade from './kLineCom/timeTrade.vue'
// import kLine from './kLineCom/kLine.vue'
import zbKlien from './kLineCom/zbKline.vue'

export default {
  props:{
    depth:Object,
    realList:Object,
    btype:Number
  },
  name:'tradGraph',
  components:{
    zbKlien,
    timeTrade
  },
  data(){
    return {
      isRemove:true
    }
  },
  created(){
    
  },
  methods:{
    remover(){
      this.isRemove = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-Kline{
    width: 100%;
    height: 500px;
    background: #f3f3f3;
    margin-top: 15px;
    .left{
      width:calc(100% - 232px);
      height: 100%;
      float: left;
      background: #ffffff;
      position: relative;
     // margin-right: 1%;
     .left_abso{
       position: absolute;
       left:0;
       top: 0;
       background:white;
       opacity:0;
       z-index:10;
       width: 100%;
       height:100%;
     }
    }
    .rihgt{
      width: 225px;
      height: 100%;
      float: right;
      background: #ffffff;
      overflow: hidden;
    }
  }

</style>
