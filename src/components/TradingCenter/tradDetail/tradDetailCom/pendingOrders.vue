<template>
  <div class="v-pendOrder">
      <div class="title">
        <p class="text">{{$t("t.b14")}}</p>
        <Select v-model="model2" size="small">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <!-- <a class="more" href="javascript:void(0);" @click="jumpDepthPage('depthMore')">更多</a> -->
        <router-link class="more" :to='{path:"/tradMoreDepth?id="+bType+"&areaIndex="+areaIndex}' >{{$t("t.b15")}}</router-link>
        
          <div class="dashed"></div>
      </div>
      <div class="sell">
           <ul :class="changeUlStyle">
              <li v-for="item in bidsArr" :key="item.id" @click="noticeSell(item.price,item.count)">
                  <span>{{$t("t.b17")}}{{item.id}}</span>
                  <span>{{item.price}}</span>
                  <span>
                      <b>{{item.count}}</b>
                      <i :style="{width:item.pre}"></i>
                  </span>

              </li>
              
          </ul>
          
          <div class="dashed"></div>
      </div>

      <div class="bug">
          <ul>
              <li v-for="item in asksArr" :key="item.id" @click="noticeBug(item.price,item.count)">
                  <span>{{$t("t.b16")}}{{item.id}}</span>
                  <span>{{item.price}}</span>
                  <span>
                      <b>{{item.count}}</b>
                      <i :style="{width:item.pre}"></i>
                  </span>
              </li>
          </ul>
          
         
      </div>
      
  </div>
</template>
<script>
export default {
  name:'pendOrder',
  props:{
      depth:Object,
      acceptParams:Function,
      bType:Number,
      areaIndex: Number,
  },
  data(){
      return{
        asksArr:[],
        bidsArr:[],
        depthNum:'0.01',
        model2: '0.0001',
        listIndex:0,
        cityList: [
            {
                value: '0.0001',
                label: '0.0001'
            },
        ],
        btype:this.bType,
      }
  },
  created(){
    this.$eventBus.$on('BtypeChange',function(btype,jfloal,balance,currency,jFloal){
        this.btype = Number(btype)

    }.bind(this))
    this.btype=localStorage.getItem("btypeId")
    this.mapDepth()   
    // this.mapBlist()
  },
  methods:{
      DropdownItem(name){
        //   console.log(1)
      },
      jumpDepthPage(depthMore){
        this.$eventBus.$emit('jumpCompoent',depthMore)
        
        //产品交互的变更代码
      },
      noticeBug(price){
          //子回掉父 tradDetail
        this.acceptParams(price,true)
      },
      noticeSell(price){
        this.acceptParams(price,false)  
      },
      mapDepth(){
        let asksArr = this.depth.asks || []
            ,realAsksArr = []
            ,bidsArr = this.depth.bids || []
            ,realBidsArr = []
            ,timestamp = this.timestamp
            ,_this = this
            ,asksCountMax = 0
            ,bidsCountMax = 0
            ,countMax = 0
            ,jfloal = this.depth.btrade || 4
            ,jFloal =this.depth.jtrade || 2 ;
            
        if(Object.prototype.toString.call(asksArr) == '[object Array]'){
            asksArr = asksArr.slice(0,5)
        }
        if(Object.prototype.toString.call(bidsArr) == '[object Array]'){
            bidsArr = bidsArr.slice(0,5)
        }
        asksArr.forEach(element=>{
            if(Number(element[1])>asksCountMax ){
                asksCountMax = Number(element[1])
            }
        })
        bidsArr.forEach(element=>{
            if( Number(element[1]) > bidsCountMax ){
                bidsCountMax = Number(element[1])
            }
           
        })
        if(Number(asksCountMax) < Number(bidsCountMax)){
            countMax = bidsCountMax
        }else{
            countMax = asksCountMax
        }

        asksArr.forEach( (element ,index ) => {
            let pre = Number(element[1])/countMax

            pre = Math.ceil(pre*10000)/100
            
            pre = Math.ceil(pre*0.35) +'%'
            let count,price;
            if(Number(jfloal)){
                count =element[1].toString().delFixed(jfloal);
            }else{
                count=parseInt(element[1]);
            }
            if(Number(jFloal)){
                price=element[0].toString().delFixed(jFloal || 2);
            }else{
                price=parseInt(element[0])
            }
            let len=Math.round(count).toString().length;
            if(len>=6){
                count=Math.round(count).toString().substring(0,len-3)
                count+="K";
            }
            //他的总量只有60%
            realAsksArr.push({
                id:index+1,
                price:price,
                count:count,
                pre:pre       
            })
        });
        realAsksArr= realAsksArr;
        _this.asksArr = realAsksArr
        //卖单
        
        bidsArr.forEach( (element ,index ) => {
            // console.log(element[1])
            // console.log(bidsCountSum)
            let pre =element[1]/countMax;
            let count,price;
            pre = Math.ceil(pre*10000)/100
            // console.log(pre)
            
            pre = Math.ceil(pre*0.35) +'%'

            //他的总量只有60&
            if(Number(jfloal)){
                count =element[1].toString().delFixed(jfloal);
            }else{
                count=parseInt(element[1]);
            }
            if(Number(jFloal)){
                price=element[0].toString().delFixed(jFloal || 2);
            }else{
                price=parseInt(element[0])
            }
            let len=Math.round(count).toString().length;
            if(len>=6){
                count=Math.round(count).toString().substring(0,len-3)
                count+="K";
            }

           realBidsArr.push({
                id:index+1,
                price:price,
                count:count,
                pre:pre       
            })
        });
        realBidsArr=realBidsArr.reverse()
        _this.bidsArr = realBidsArr


        // 如果卖单不够五个的话  改变样式
        // if(this.bidsArr.length<5){
        //     document.getElementsByClassName("ulStyle").style.paddingTop=(30 * this.bidsArr.length) + 'px';
        // }
      },
  },
  watch:{
      depth(){
        this.mapDepth()
      }
  },
  computed: {
    changeUlStyle(){
            if(this.bidsArr.length==5)
            return '';
            if(this.bidsArr.length==4)
            return 'ulStyle4';
            if(this.bidsArr.length==3)
            return 'ulStyle3';
            if(this.bidsArr.length==2)
            return 'ulStyle2';
            if(this.bidsArr.length==1)
            return 'ulStyle1';
      },
  }
}
</script>
<style lang="scss">
    .v-pendOrder{
        height: 100%;
        font-size: 14px;
        color: #555555;
        .title{
            position: relative;
            line-height: 40px;
            height: 40px;
            width: 100%;
            .text{
                float: left;
                padding-left:.2rem;
            }
            .more{
                float: right;
                padding-right: .2rem;
                color: #555555;
            }
            .ivu-select{
                width: 74px;
                font-size: 16px;
                .ivu-select-selection{
                    border: none;
                }
                .ivu-select-selected-value:focus{
                    outline: none;
                }
            }
        }
        .dashed{
            background: #ffffff url('/static/img/dashed.png') repeat-x;
            height: 1px;
            width: 94%;
            margin: 0 3%;
            left: 0;
            position: absolute;
            bottom: 0;
        }
        .bug{
            position: relative;
            height: 155px;
            ul{
                
                line-height: 31px;
                li{
                    overflow: hidden;
                    cursor: pointer;
                    span{
                        float: left;
                        text-align: left;
                        padding-left:.2rem; 
                        &:nth-child(1){
                            width: 20%;
                            color: #19be6b;
                            text-align: center;
                        }
                        &:nth-child(2){
                            width: 30%; 
                            text-align: right;                            
                        }
                        &:nth-child(3){
                            width: 46%;
                            margin-right: 4%;
                            position: relative;
                            padding-left: .1rem;
                            b{
                                width: 60%;
                                text-align: right;                               
                                display: inline-block;
                            }
                            i{
                               
                                height: 15px;
                                position: absolute;
                                top: 50%;
                                margin-top: -9px;
                                margin-left: .03rem;
                                background: #19be6b;
                            } 
                        }
                    }
                    
                }
            }
        }
        .sell{
            position: relative;
            height: 155px;
            .ulStyle1{
                padding-top:120px;
            }
            .ulStyle2{
                padding-top:90px;
            }
            .ulStyle3{
                padding-top:60px;
            }
            .ulStyle4{
                padding-top:30px;
            }
            ul{
                line-height: 31px;
                li{
                    overflow: hidden;
                    cursor: pointer;
                    span{
                        float: left;
                        text-align: left;
                        padding-left:.2rem; 
                        &:nth-child(1){
                            width: 20%;
                            color:#ed3f14;
                            text-align: center;
                        }
                        &:nth-child(2){
                            width: 30%;
                            text-align: right;
                        }
                        &:nth-child(3){
                            width: 46%;
                            margin-right: 4%;
                            position: relative;
                            padding-left: .1rem;
                            b{
                                width: 60%;
                                display: inline-block;
                                text-align: right;
                            }
                            i{
                                height: 15px;
                                position: absolute;
                                top: 50%;
                                margin-top: -9px;
                                margin-left: .03rem;                                               
                                background:#ed3f14;
                            } 
                        }
                    }
                    
                }
            }
        }

    }
</style>
