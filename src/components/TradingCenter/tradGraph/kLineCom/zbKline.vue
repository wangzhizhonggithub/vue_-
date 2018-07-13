<template>

  <div id="kline_container">

  </div>
  
</template>
<script>
import '../../../../assets/lib/jquery.mousewheel'
  var Kline = require('yuhaokline');
  var K = Kline.default;
       
export default {
    name:'zbKline',
    props:{
        btypes:Number
    },
    data () {
        return {
            
            currencyArr:[],
            node_api:this.Global.K_URL
        }
    },
    created(){
        
        // if(!sessionStorage.getItem('refreshed')){
        //     window.location.reload()
        // }
        // sessionStorage.setItem('refreshed',true)
        
       
        
    },
    mounted(){
        
        const node_api = this.node_api
        window.Kline = new K({
            element: "#kline_container",
            symbol: this.btypes,
            symbolName: "BTC",
            type: "poll", // poll/stomp
            //url: "/api/Xian/Kline",
            // url:'/static/mock.json',
            showTrade:false,
            //url:'http://192.168.1.95:4000/users/kline',
            url:node_api+'/users/kline',
            debug:false,
            disableFirebase:true,  
            width:968,
            height:500,
            theme:'light',
            intervalTime:60000
        });
        window.Kline.draw();
        this.init()
   
       
    },
    methods:{
        init(){
            this.currencyClass()
            .then(()=>{
                this.changeSymbol(this.btypes)
            })
        },
        currencyClass(cb){
            var params = {}
                ,_this = this;
            return new Promise((resolve,reject)=>{
                this.FetchGet(this.requestUrl.tradingCenter.currencyClass,params)
                .then(res=>{
                    if(res.status === 200){
                        if(Object.prototype.toString.call(res.data) == '[object Array]'){
                            _this.currencyArr = res.data
                            resolve()
                        }
                    }else{
                        reject()
                    }
                })
            })
            
        },
        setSymbol(id,name){
            var id = id || 1
                ,name = name || 'ETH'
            if(window.Kline){
                window.Kline.setSymbol(id,name)
            }
        },
        changeSymbol( newVal ){
            var nameArr = this.currencyArr.filter(element=>{
               return element.id == newVal ? element.name:false
            })
            var params = nameArr[0]
           
            this.setSymbol(params.id,params.name)
        }
    },
    watch:{
        btypes(newVal,oldVal){
            
            this.changeSymbol(newVal)
        }
        
    }
}
</script>
<style>

    .symbol-title {
        line-height: 20px;
        margin: 5px 0 ;
        padding: 0;
    }
    .light .trades_list ul li.pr-red {
        color: #ed3f14;
    }
    .light .trades_list ul li.pr-green{
        color:#19be6b;
    }
    .symbol-title .dark{
        color: #999999;
    }
    .trade_container.light{
        border-left: none;
    }
    .trade_container.light #orderbook {
        display: none;
    }
    .trades_list{
        padding-left: 40px;
    }
    .trades_list ul li{
       height: 20px;
    }
    #chart_updated_time{
        display: none;
    }
    #orderbook{
        display: none;
    }
</style>
