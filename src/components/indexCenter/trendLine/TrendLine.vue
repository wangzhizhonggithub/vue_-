<template>
  <div class="trendline" style="width:260px;height:60px;left:-50px;" ref="trendLine">

  </div>
</template>
<script>
  let echarts = require('echarts');
export default {
  name:'trendLine',
  props:{
    trendLineData:Array,
    typeboxid:Number
  },
  data(){
    return{
      line:{},
      priceTimer:null,
      timeArr:[],
      timrnum:+new Date()
    }
  },
  created(){
      if(this.priceTimer ){
          clearInterval(this.priceTimer)
          this.priceTimer = null
      }
      
  },
  mounted(){
  var _this = this;
  var typeboxid = this.typeboxid || 1
 
  if(this.trendLineData){
    
  

    var priceArr = this.mapPrice(this.trendLineData,typeboxid)
   
    this.drawLines(_this.$refs.trendLine.id,priceArr)
  }
    // this.getTrend(typeboxid,function(priceArr){
    //     _this.drawLines(_this.$refs.trendLine.id,priceArr)
    // })
    
   
  },
  methods:{
    getTrend(typeboxid,callback){
        //弃用
        var params = {};
        var _this = this;
        params.typeboxid = typeboxid || 1
        this.FetchPost(this.requestUrl.trendLine.trendIndex,params).then(res => {
            let priceArr = res.data.map(function(item){
                return Number(item.open)
            })
          callback(priceArr)
        })
    },
    proTimeArr(){
        var xAxisArr = []
        var threeDay = 3*24*3600*1000;
        var now = +new Date() - threeDay;
        var interval = 1*3600*1000; 
        for(var i = 0; i++; i<72){
            now = now+interval
            xAxisArr.push(this.formatter(now))
        }
        this.timeArr = xAxisArr
    },
    formatter(now){
        now = new Date(now)
        return [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
    },
    drawLine(id){
        var dom = document.getElementById(id);
        var myChart = echarts.init(dom);
        var xAxisArr = []
      
        
        var option = {
            xAxis: {
                show:false,
                type: 'category',
                data: []
            },
            yAxis: {
                show:false,
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        myChart.setOption(option)
    },
    drawLines(domId,priceArr){
        
        var le =  priceArr.length
        var dom = document.getElementById(domId);
        var myChart = echarts.init(dom);
        var priceArr = priceArr || [{}];
        var app = {};
        var option = null;
        function randomData(value,now) {
            now = new Date(now);
             
            value = value
            return {
                name: now.toString(),
                value: [
                    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')+" " + now.getHours()+":"+now.getMinutes()+"0:0"+now.getSeconds(),
                    value
                ]
            }
        }   
        var data = [];
        // var threeDay = 3*24 * 3600 * 1000;
        // var now = this.trendLineData.timenum- threeDay;
        // var interval = 1*3600*1000;
     
        for (var i = 0; i < le ; i++) {
            data.push(randomData(priceArr[i].price,priceArr[i].timestamp));
        }
        // console.log(data)
        option = {
            xAxis: {
                show:false,
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                show:false,
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                max:function(value){
                    // console.log(value)
                    return value.max
                },
                min:function(value){
                    return value.min
                },
            },
            series: [{
                name: '价格趋势',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }]
        };

        // this.priceTimer = setInterval(function () {

        //     for (var i = 0; i < 5; i++) {
        //         data.shift();
        //         data.push(randomData());
        //     }

        //     myChart.setOption({
        //         series: [{
        //             data: data,
        //         }]
        //     });
        // }, interval);
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }

    },
    mapPrice(price,typeboxid){
       
        var priceArr = []
        price.forEach(function(item){
           if (item.typeboxid == typeboxid){
            var price = item.price
            var timestamp = item.timestamp
               priceArr.push({
                   price,
                   timestamp
               }) 
           }
        })
        return priceArr
    }
  }
}
</script>
<style lang="scss" scoped>
  .trendline{
    position: absolute;
    top: -5px;
    //    transform: translateY(-10px)
    transform: scale(0.7)
  }
  
</style>

