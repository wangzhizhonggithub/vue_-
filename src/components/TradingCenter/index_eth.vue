<template>
  <div class="v-Trading">
     
        <!-- 非活动组件将被缓存！ -->
    
      <!-- <component :is="currentView" :titleCallback='titleCallback' >
        
      </component> -->
 
        
     <trad-home :titleCallback='titleCallback' :areaIndex="areaIndex"></trad-home>
  </div>
</template>

<script>
import tradHome from './tradQueue/home_eth.vue'         


// import recodeMore from './more/recodeMore.vue'                                                                                               
//控制3个 同级别页面
export default {
  metaInfo(){
            return{
                title:this.sockePrice,
                meta:[
                    {
                        name:"keywords",
                        conotent:this.$t("seo.a2")
                    },
                    {
                        name:"description",
                        conotent:this.$t("seo.a3")
                    }
                 ]
             }
        },
  name:'tradingCenter',
  components:{
    tradHome,
  },
  data(){
      return {
          depth:null,
          currentView:'tradHome',
          sockePrice:"ETH"+this.$t("seo.a1"),
          FirstId:0,
          areaList:[],
          areaIndex:-1,
      }
  },
  created () {
     this.$eventBus.$on('jumpCompoent',function(name,drag){
        this.currentView = name
     }.bind(this)) 
     this.FetchGet(this.requestUrl.tradingCenter.bList)
        .then(res => {
     
          if (res.data['CNHA']) {
            localStorage.setItem("FirstId1", Number(res.data['CNHA'][0].id))
          }
          if (res.data['ETH']) {
            localStorage.setItem("FirstId3", Number(res.data['ETH'][0].id))
            this.areaIndex=Number(res.data['ETH'][0].sorts)-1;
          }
          if (res.data['ETF']) {
            localStorage.setItem("FirstId2", Number(res.data['ETF'][0].id))
          }
          if (res.data['airdrop']) {
            localStorage.setItem("FirstId4", Number(res.data['airdrop'][0].id))
          }
        })
     this.FetchPost(this.requestUrl.Arts.headTrading, {}).then(res => {
        res.data.forEach((element, index) => {
          this.areaList.push({
            name: element.name.toUpperCase(),
            url: "/trading" + element.name.toUpperCase(),
            comName: "trad" + element.name.toUpperCase()
          })
        })
        localStorage.setItem("areaList", JSON.stringify(this.areaList))
      })
  },
  methods:{
   titleCallback(price,btype){
    if(!price){
      price="--"
    }
     var str ="/ETH"+this.$t("seo.a1");
     this.sockePrice = btype + str
   }
  },
  beforeRouteEnter(to,from,next){
   //确定暂停过
      if(window.Kline.resend){
        
        window.Kline.resend()
      }
      
      next(vm => {
        // vm.FetchGet(vm.requestUrl.tradingCenter.bList)
        //   .then(res => {
        //     vm.FirstId = Number(res.data['ETH'][0].id);
        //   })
       // vm.pollContorl = true
      })
  },
  beforeRouteLeave(to,from,next){
      if(to.path!="/tradMoreRecode" && to.path!="/tradMoreDepth" && to.path!="/tradingETF"){
        localStorage.removeItem("btypeId")
        localStorage.removeItem("jyqIndex");
      }
      //组件路由守卫
      if(window.Kline){
       
        window.Kline.pause()
      }
      //关闭poll
      if(window.pollTime){
        clearInterval(window.pollTime)
        window.pollTime = null
      }
      //委托延时
      if(window.logDelay){
        clearTimeout(window.logDelay)
        window.logDelay = null
      }
      if(window.sockePrice){
        clearInterval(window.sockePrice)
        window.sockePrice = null
      }
      if(window.settime){
        clearInterval(window.settime)
      }
      next()
  }
}
</script>

<style lang="scss" scoped>
  .v-Trading{
    width: 62.5%;
    min-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
  }

</style>
