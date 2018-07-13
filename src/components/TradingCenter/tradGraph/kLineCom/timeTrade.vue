<template>
    <div class="tard-socket">
        <div class="title">
                {{$t("seo.b17")}}
        </div>
        <ul class="uls">
            <li v-for="item in tradeList">
                <span>{{item.addtime}}</span>
                <span :class="item.flag?'green':'red'">{{item.price}}</span>
                <span>{{item.num }}</span></li>  
        </ul>
    </div>
</template>
<script>
export default {
  name:'timeTrade',
	props:{
		realList:Object
	},
    data(){
        return{
          tradeList:null,
        }
    },
    methods: {
        mapRealList(list){
            var _this = this;
             var arr = [];
            var jfloal=list.jfloal;
             var list=list.data;
            for (var i in list) {
                arr.push(list[i]); //属性
                //arr.push(object[i]); //值
            }
            list=arr;
           
            this.tradeList = list.map(function (element, index) { 
               
            let addtime=element.addtime;
                addtime=addtime.slice(0,10);
           addtime=Number(addtime)*1000;
            function add0(m){return m<10?'0'+m:m };  
             
            function getDate(shijianchuo) {  
            //时间戳是整数，否则要parseInt转换  
            var time = new Date(shijianchuo);  
            var y = time.getFullYear();  
            var m = time.getMonth()+1;  
            var d = time.getDate();  
            var h = time.getHours();  
            var mm = time.getMinutes();  
            var s = time.getSeconds();  
            return  add0(h)+':'+add0(mm)+':'+add0(s);  
            };  
            // if(jfloal==2){
            //     var reg=/[\d+]\.?(\d){0,2}/g;
            //     element.num=element.num.match(reg)[0]
                 
            // } 
           

            var price=element.price;
            var count = element.num;
            let len=Math.round(count).toString().length;
            if(len>=6){
                count=Math.round(count).toString().substring(0,len-3)
                count+="K";
            }
            return {
                addtime:getDate(addtime),
                price:price,
                num:count,
                flag:Number(element.flag)
            }
        })
        }
    },
    created () {
        
        //this.mapRealList(this.realList);
    },
    watch: {
      realList() {
          if(this.realList){
            this.mapRealList(this.realList);
          }
      },
    }
}
</script>
<style lang="scss" scoped>
   .tard-socket{
        width: 100%;
        float: left;
        .title{
            height: 28px;
            line-height: 28px;
            color: #555555;
            font-size: 12px;
            border-bottom: 1px solid #dedede;
            width:210px;
            text-align: center;
            font-family:"Microsoft YaHei";
            margin-left:7px;
        }
        .uls{
            padding-left: 7px;
            padding-top:8px;
            li{
                margin-bottom: 3px;
               span{
                 // margin-right: 7px;
               }
               span:nth-child(1){
                   color: #333333;
                   font-size: 12px;
                   display: inline-block;
                  width:28%;
                  text-align: left;
                  margin-left:6px;
               }
               span:nth-child(2){
                   font-size: 12px;
                   display: inline-block;
                   width: 32%;
                   text-align: left;
               }
               span:nth-child(3){
                   color: #999999;
                   font-size: 12px;
                   display: inline-block;
                   
                   // margin-right:25px;
                   width:33%;
                   text-align: left;
               }
               .green{
                color: #19be6b;
               }
               .red{
                color:#ef2121;
               }
            }
        }
      }
</style>