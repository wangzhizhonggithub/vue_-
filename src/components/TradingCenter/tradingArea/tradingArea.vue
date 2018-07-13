<template>
  <div class="v-TradArea">
    <div class="top">
      <ul class="Trapezoid">
        <li v-for="(item,index) in areaList" :class="index==areaIndex?'active':''" :key="index" @click="jumpTradArea(item.url,index)">{{item.name}}  {{$t("cc.a1")}}</li>
        <!-- {{$t("index.info1")}} -->
      </ul>
    </div>
    <div class="center">
      <ul class="B-list">
        <li v-for="(item,index) in firstBlist" :key="index" :class="index==currIndex?'active':''" @click="BdetailChange(index)">
          <img :src="item.path" alt="" :title="item.name" style="width:25px;height:25px;">
          <span>{{item.name}}</span>
        </li>
      </ul>
      <div class="dashed"></div>
    </div>
    <div class="bottom">
      <ul>
        <li>{{$t("t.a6")}}：
          <span>{{Blist[currIndex].CNum || isloginStr}}</span>
          <b>{{Blist[currIndex].coin || '--'}}</b>
        </li>
        <li>{{$t("t.a1")}}：
          <span v-if="hqlist.last==''|| hqlist.last=='--'">--</span>
          <span v-else>{{Blist[currIndex].buyBTC || isloginStr}}</span>
          <b>{{Blist[currIndex].name || '--'}}</b>
        </li>
      </ul>
      <ul>
        <li>{{$t("t.a6")}}：
          <span>{{Blist[currIndex].BNum || isloginStr}}</span>
          <b>{{Blist[currIndex].name || '--'}}</b>
        </li>
        <li>{{$t("t.a2")}}：
          <span v-if="hqlist.last==''|| hqlist.last=='--'">--</span>
          <span v-else>{{Blist[currIndex].sellCNHA || isloginStr}}</span>
          <b>{{Blist[currIndex].coin || '--'}}</b>
        </li>
      </ul>
      <ul class="last" v-if="hqList">
        <li>{{Blist[currIndex].name || '--'}}：
          <span :class="{spanc:spanc}">{{hqlist.last || '--' }}
            <Icon class="icon" :type="type"></Icon>
          </span>

        </li>
        <li class="botm">
          {{$t("t.a3")}}:
          <b style="margin-right: 8px;">{{hqlist.high || '--'}}</b>
          {{$t("t.a4")}}:
          <b style="margin-right: 8px;">{{hqlist.low || '--'}}</b>
          {{$t("t.a5")}}:
          <b style="margin-right: 8px;">{{hqlist.vol || '--'}}</b>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'tradArea',
    props: {
      // depth: Object,
      bList: Array,
      hqList: Object,
      buy: Number,
      sell: Number,
      areaIndex: Number,
      trading: String,
      jFloal: Number,
    },
    data() {
      return {
        areaList: [
          // { name: this.$t("cc.a1"), comName: 'tradHome', url: '/tradingCNHA' },
          // { name: this.$t("cc.a111"), comName: 'tradEtf', url: '/tradingETF' },
          // { name: this.$t("cc.a222"), comName: 'tradEth', url: '/tradingETH' },
          // { name: this.$t("cc.a222"), comName: 'tradAirdrop', url: '/tradingAIRDROP' },
          // {name:'ETH交易区'},          
        ],
        depthlist: [],
        currIndex: 0,
        Blist: [
          {}
        ],
        id: 2,
        hqlist: [],
        isloginStr: '--',
        isFirst: false,
        isJYQ: false,
        isJump: false,
        type: "arrow-down-c",
        spanc: false,
        apiUrl: this.Global.URL,
        isPath: true,
        firstBlist: null,
        jyqIndex: 0,
      }
    },

    created() {
      if (localStorage.user) {
        this.isloginStr = 0
      }
      if(localStorage.getItem("areaList")){
        this.areaList = JSON.parse(localStorage.getItem("areaList"));
      }else{
      this.FetchPost(this.requestUrl.Arts.headTrading, {}).then(res => {
        res.data.forEach((element, index) => {
          this.areaList.push({
            name: element.name.toUpperCase(),
            url: "/trading" + element.name.toUpperCase(),
            comName: "trad" + element.name.toUpperCase()
          })
        })
      })
      }

      // if(!localStorage.getItem("areaList")){
      //   console.log(11)
      //   this.$router.push("/tradingETF")
      // }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // vm.FetchGet(vm.requestUrl.tradingCenter.bList)
        //   .then(res => {
        //     vm.FirstId = Number(res.data['ETF'][0].id);
        //   })
        // vm.pollContorl = true
      })
    },
    methods: {
      jumpTradArea(name, idx) {
        this.$router.push(name)
        localStorage.setItem("jyqIndex", idx)
        localStorage.removeItem("btypeId")
        // if (idx == 0) {
        //  
        // } else if (idx == 1) {
        //   localStorage.setItem("btypeId", 5)
        // } else if (idx == 2) {
        //   localStorage.setItem("btypeId", 6)
        // }
        // localStorage.setItem("btypeId", this.Blist[this.currIndex].id)
        // this.BdetailChange(0);
      },
      mapDepth(BtypeArr) {
        //弃用
        this.depthlist = BtypeArr;

        let asksArr = this.depthlist.asks.slice(0, 5)
          , bidsArr = this.depthlist.bids.slice(0, 5);
        asksArr.forEach((element, index) => {
          if (index == 0) {
            this.buy = Number(element[0]);

          }
        });
        bidsArr.forEach((element, index) => {
          //console.log(element)
          if (index == 0) {
            this.sell = Number(element[0]);
          }
        });
      },
      mapBlist(BtypeArr) {

        var _this = this;
        //goldnum 可用的人民币余额 
        this.Blist = BtypeArr.map(function (element, index) {
          let buyBTC, BNum, CNum, sellCNHA, btrade, jtrade;
          btrade = Number(element.btrade);
          jtrade = Number(element.jtrade);
          if (element.goldnum || element.bigoldnum) {
            if (!element.goldnum) {
              buyBTC = _this.isloginStr
              CNum = _this.isloginStr
            } else {
              if(btrade){
                buyBTC = _this.Fixed(element.goldnum / _this.sell, btrade);

              }else{
                buyBTC=Math.floor(element.goldnum / _this.sell);
              }
              if(jtrade){
                CNum = _this.Fixed(element.goldnum, jtrade || 2);
              }else{
                CNum=Math.floor(element.goldnum)
              }
             
            }
            if (!element.bigoldnum) {
              BNum = _this.isloginStr
              sellCNHA = _this.isloginStr
            } else {
              if(btrade){
                BNum = _this.Fixed(element.bigoldnum, btrade);
              }else{
                BNum=Math.floor(element.bigoldnum)
              }
              if(jtrade){
                sellCNHA = (BNum * _this.buy).toString().delFixed(jtrade)
              }else{
                sellCNHA = Math.floor(BNum * _this.buy)

              }

            }
          } else {
            buyBTC = _this.isloginStr
            BNum = _this.isloginStr
            CNum = _this.isloginStr
            sellCNHA = _this.isloginStr
          }


          return {
            name: element.goods,
            url: '/static/img/btc.png',
            id: element.id,
            area: element.coin,
            BNum: BNum, //listB
            CNum: CNum,//tradingCNHA
            bid: element.bid,
            coin: element.coin,
            sellCNHA: sellCNHA,//可卖
            buyBTC: buyBTC, //可买的BTC
            path: element.path,
            btrade: element.btrade
          }
        })
        if (this.isPath && this.Blist) {
          this.firstBlist = this.Blist.map((element, index) => {
            return {
              name: element.name,
              path: element.path
            }
          })
          this.isPath = false
        }
      },
      maphqlist(data) {
        this.hqlist = data;
      },
      Fixed(data, s) {
        let str = data.toString()
          , index = str.indexOf('.')
          , fornt
          , end;
        typeof s == Number ? "" : s = Number(s)
        if (index > -1) {
          fornt = str.substring(0, index)
          end = str.substring(index, index + s + 1)
          if (end.length < s + 1) {
            //位数不够补领
            let l = Math.abs(s + 1 - end.length)
            for (let i = 0; i < s - 1; i++) {
              end += '0'
            }
          }
        } else {
          //整数加0
          fornt = str
          end = '.'
          for (let i = 0; i < s; i++) {
            end += '0'
          }
        }
        str = fornt + end
        return str
      },
      BdetailChange(index) {
        this.currIndex = index;
        this.Blist[index].buyBTC = "--";
        this.Blist[index].sellCNHA = "--";
        //回头看发现还是数据流没流好
        //不偷懒的程序员不是好程序员
        let id = this.Blist[index].id || 2
          , btrade = this.Blist[index].btrade || 2
          , goldnum = this.Blist[index].CNum || 0
          , bigoldnum = this.Blist[index].BNum || 0
          , jtrade = this.Blist[index].jtrade
        localStorage.setItem("btypeId", id)
        if (this.isFirst) {
          this.$eventBus.$emit('BtypeChange', id, btrade, goldnum, bigoldnum, jtrade)
          this.isFirst = false
        } else {
          this.$eventBus.$emit('BtypeChange', id, btrade, goldnum, bigoldnum, jtrade)
          this.$emit("listenHq", this.Blist[index].id || 2)
        }

      },
    },
    watch: {
      areaIndex(newVal, oldVal){
      
      },
      bList(newVal, oldVal) {
        let _this = this;
        if (newVal) {
          if (this.sell >= 0) {
            this.mapBlist(this.bList);
            if (!this.isJump) {
              //是否首页第一次跳转
              let id = this.$route.params.jumpId;
              if (id) {
                //   if (id == 5) {
                //     this.currIndex = id - 5;
                //   } else if (id < 5) {
                //     this.currIndex = id - 2;
                //   } else if (id > 5) {
                //     this.currIndex = id - 6;
                //   }
                for (let i = 0; i < _this.bList.length; i++) {
                  if (id == this.bList[i].id) {
                    this.currIndex = i;
                  }
                }
                localStorage.setItem("btypeId", id);
              } else {
                if (localStorage.getItem("btypeId")) {

                  var id = Number(localStorage.getItem("btypeId"))
                  for (let i = 0; i < this.bList.length; i++) {
                    if (id == this.bList[i].id) {
                      this.currIndex = i;
                    }
                  }
                } else {
                  this.currIndex = 0;
                }
                // console.log(this.currIndex)
              }

              this.isJump = true
            }
          }
        }
      },
      hqList(newVal, oldVal) {
        if (newVal) {
          this.maphqlist(this.hqList);
        }
        if (newVal.judge == 1) {
          this.type = "arrow-up-c",
            this.spanc = false

        } else {
          this.type = "arrow-down-c"
          this.spanc = true
        }
      },

    }
  }
</script>
<style lang="scss" scoped>
  @import './css/trading.scss';
</style>