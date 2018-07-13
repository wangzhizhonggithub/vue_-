<template>
  <div class="v-TradHome v-etf">
    <trad-area :buy='buy' :sell='sell' :hqList="hqList" :bList='bList' v-on:listenHq="listnBid" :areaIndex="areaIndex" :jFloal="jFloal" :areaList="areaList"></trad-area>
    <trad-graph :depth='depth' :realList="realList" :btype="btype"></trad-graph>
    <trad-detail :buy='buyOne' :sell='sellOne' :buySum='buySum' :sellSum='sellSum' :bType="btype" :depth='depth' :jFloal="jFloal"
      :bList='bList' :areaIndex="areaIndex"></trad-detail>
    <trad-commission :btype="btype" :currEntrust='currEntrust' :logEntrust='logEntrust' :callUpdateLog='updateLog' v-if="logEntrust && currEntrust"
      :jFloal="jFloal" :areaIndex="areaIndex"></trad-commission>
  </div>
</template>

<script>
  import tradArea from '../tradingArea/tradingArea.vue'
  import tradGraph from '../tradGraph/tradGraph.vue'
  import tradDetail from '../tradDetail/tradDetail.vue'
  import tradCommission from '../tradCommission/tradCommission.vue'

  export default {
    name: 'tradEtf',
    props: {
      titleCallback: Function,
      areaList:Array,
      areaIndex:Number,
    },
    components: {
      tradArea, tradGraph, tradDetail, tradCommission
    },
    data() {
      return {
        buySum: 0,
        sellSum: 0,
        btype: 5,
        buyOne: 0,
        sellOne: 0,
        jFloal: 2,
        goods: "",
        buy: 0,
        sell: 0,
        isReload: false, //scoketPrice 节流
        depth: null,
        depthData: null,
        realList: null,
        bList: [],
        hqList: null,
        currEntrust: null, //Array
        logEntrust: null,
        id: '',
        bid: '', //这里跟btype一样
        bstate: '',
        currLogThrottle: true, //双变量控制
        pollContorl: true,
        isDepthReturn: false,
        isHqReturn: false,
        isRealListReturn: false
      }
    },
    created() {
      //数据流入口
      //对模块数据集中管理 并分发 复用数据
      //初始化数据流
      //组件数据使用父子流 尽量不出现回流
      //考虑到一个模块 more页面的数据同源 决定使用组件切换
      var _this = this;
      let id = this.$route.params.jumpId;
      if (id) {
        this.btype = id
        localStorage.setItem("btypeId", id);
      } else if (localStorage.getItem("btypeId")) {
        this.btype = Number(localStorage.getItem("btypeId"));
      } else if(localStorage.getItem("FirstId2")){
        this.btype = Number(localStorage.getItem("FirstId2"));
      } else {
        this.FetchGet(this.requestUrl.tradingCenter.bList)
          .then(res => {

            console.log(this.areaIndex)
            if (res.data['CNHA']) {
              this.btype = Number(res.data['CNHA'][0].id);
            }
            if (res.data['ETH']) {
              localStorage.setItem("FirstId3", Number(res.data['ETH'][0].id))
            }
            if (res.data['ETF']) {
              localStorage.setItem("FirstId2", Number(res.data['ETF'][0].id))
              this.areaIndex=Number(res.data['ETF'][0].sorts)-1;
            }
            if (res.data['airdrop']) {
              localStorage.setItem("FirstId4", Number(res.data['airdrop'][0].id))
            }
            _this.init();

          })
        return;
      }
      _this.init();
    
    },
    methods: {
      init(){
        var _this = this;
        _this.getBlist();
      _this.getRealList();
      _this.getHqlist();
      _this.getDepth();
      //  _this.getKlineList();
      // _this.getCurrEntrust()
      // _this.getLogEntrust()
      this.getEntrust()
      //监听事件
      this.$eventBus.$on('updateCurrEntrust', function (drag, params) {
        this.currLogThrottle = drag
        this.currlogParams = params || ''
        //刷新余额
        this.getBlist()
      }.bind(this))
      this.$eventBus.$on('BtypeChange', function (btype, jfloal, balance, currency) {
        this.btype = Number(btype)
        // if(jfloal){
        //   this.jfloal = Number(jfloal)
        // }
        if (balance) {
          this.buySum = Number(balance)

        }
        if (currency) {
          this.sellSum = Number(currency)
        }

      }.bind(this))

      //深度
      this.pollSend(2000)
      this.sockePrice(3000)
      clearInterval(window.settime)
      window.settime = setInterval(() => {
        if (!this.isRealListReturn) {
          return false
        }
        this.getRealList()
      }, 2000) //实时交易
      },
      updatedMoney() {

      },
      updateLog() {
        this.getCurrEntrust();
        this.getLogEntrust()
        this.getBlist()
      },
      pollSend(num) {
        //刷深度 
        let _this = this
        if (window.pollTime) {
          clearInterval(window.pollTime)
          window.pollTime = null
        }
        window.pollTime = setInterval(() => {
          if (_this.pollContorl) {
            if (!this.isDepthReturn) {
              return false
            }
            _this.getDepth()

          }
          // console.log('poll')
        }, num)
      },
      sockePrice(num) {
        var _this = this;
        if (window.sockePrice) {
          clearInterval(window.sockePrice)
          window.sockePrice = null
        }
        window.sockePrice = setInterval(() => {
          if (!this.isHqReturn) {
            return false
          }
          _this.getHqlist()
        }, num)
      },
      getDepth(callback) {
        let _this = this;
        let params = {}
        params.market = 'btc_usdt';
        this.isDepthReturn = false;
        params.typeboxid = this.btype || 5;
        params.size = 100;
        // params.timestamp = +new Date();

        this.FetchPost(this.requestUrl.tradingCenter.sdList, params)
          .then(res => {
            let data = res.data;
            let buy = data.bids || []
              , newBuy
              , jfloal = data.jfloal || 4;

            if (Object.prototype.toString.call(buy) == '[object Array]') {
              //让一个数组对象中相同的价格去重 且数量相加
              //利用对象
              //   var RealObj = {}
              //   buy.forEach((item,index,self)=>{
              //       if(RealObj.hasOwnProperty(item.price)){
              //           RealObj[item.price].push(item.num)
              //       }else{
              //         RealObj[item.price] = [item.num]
              //       }
              //   })
              //  for (const key in RealObj) {
              //    if (RealObj.hasOwnProperty(key)) {
              //      const element = RealObj[key];

              //    }
              //  }

              newBuy = buy.map((element, index) => {
                return [
                  element.price, element.num
                ]
              });
            }

            let sell = data.asks || []
              , newSell;
            if (Object.prototype.toString.call(sell) == '[object Array]') {
              newSell = sell.map((element, index) => {
                return [
                  element.price, element.num
                ]
              });
            }
            _this.depthData = {
              asks: newBuy,
              bids: newSell,
              timestamp: data.date,
              btrade: data.btrade,
              jtrade: data.jtrade,
              buycount: data.buycount,
              sellcount: data.sellcount
            }

            this.depth = _this.depthData;
            if (newBuy.length > 0) {
              this.buyOne = Number(newBuy[0][0]) || 0;
            } else {
              //if(this.buy){
              //  this.buyOne = this.buy
              //}else{
              this.buyOne = 0
              //}
            }
            if (newSell.length > 0) {
              this.sellOne = Number(newSell[0][0]) || 0;
            } else {
              //没有挂单
              // if(this.sell){
              //   this.buyOne = this.sell
              // }else{
              this.sellOne = 0
              //}
            }
            //注意这里的接口顺序 blist 需要 buy 跟 sell
            if (callback) {
              callback()
            }
            //console.log(this.depth)
            // let newdata=data.forEach((element,index) => {
            //   console.log(index)
            // });
            // _this.depthData=data;
            this.isDepthReturn = true;
          })

      },
      getBlist() {
        let _this = this;
        this.FetchGet(this.requestUrl.tradingCenter.bList)
          .then(res => {
            //_this.Blist = res

            _this.jFloal = Number(res.data.ETFjfloal);
            if (res.data['ETF']) {
              _this.bList = res.data['ETF'];
              if (localStorage.user) {
                for (let i = 0; i < _this.bList.length; i++) {
                  if (_this.btype == _this.bList[i].id) {
                    bIndex = i;
                  }
                }

                var obj = res.data['ETF'][bIndex]
                this.goods = res.data['ETF'][bIndex].goods;
                if (obj.goldnum) {
                  _this.buySum = Number(obj.goldnum)
                  // _this.buySum = Number(obj.goldnum.delFixed(2))
                } else {
                  _this.buySum = 1
                }
                if (obj.bigoldnum) {
                  _this.sellSum = Number(obj.bigoldnum)
                  // _this.sellSum = Number(obj.bigoldnum.delFixed(Number(obj.btrade)))
                } else {
                  _this.sellSum = 0
                }
                _this.sell = Number(obj.price) || 1
                _this.buy = Number(obj.price) || 1

              } else {
                var bIndex;
                for (let i = 0; i < _this.bList.length; i++) {
                  if (_this.btype == _this.bList[i].id) {
                    bIndex = i;
                  }
                }
                this.goods = res.data['ETF'][bIndex].goods;

              }
            }
          })
      },
      getHqlist(id, callback) {
        let _this = this;
        let params = {};
        params.typeboxid = this.btype || 5;
        this.isHqReturn = false;
        this.FetchGet(this.requestUrl.tradingCenter.hqList, params)
          .then(res => {
            //_this.Blist = res
            _this.hqList = res.data.ticker;
            _this.hqList.judge = Number(res.data.updown)
            //console.log(_this.hqList)
            // _this.$set(_this.hqList,_this.hqList);

            if (_this.last) {
              //对比
              if (_this.hqList.last == _this.last) {
                _this.isReload = false
              } else {
                //last 变化
                _this.isReload = !_this.isReload
                _this.last = _this.hqList.last

                this.titleCallback(this.last, this.goods);
              }
            } else {
              //last 第一次出来
              this.titleCallback(_this.hqList.last, '');
              _this.last = _this.hqList.last;
            }
            if (callback) {
              callback(_this.last)

            }
            this.isHqReturn = true
          })
      },
      getRealList(id) {
        let _this = this;
        this.isRealListReturn = false
        this.FetchPost(this.requestUrl.tradingCenter.RealList, { typeboxid: this.btype || 5 })
          .then(res => {
            //_this.Blist = res

            _this.realList = res.data;
            this.isRealListReturn = true;
            //console.log(this.realList)
          })
      },
      getKlineList(id) {
        let _this = this;
        let time = 1517302728000 || +new Date();
        this.FetchPost(this.requestUrl.tradingCenter.KineList, { typeboxid: this.btype || 5, time: time })
          .then(res => {

            // console.log(res)

          })
      },
      getCurrEntrust() {
        let _this = this
          , params = {};
        params.typeboxid = this.btype || 5
        params.page = 1
        this.FetchGet(this.requestUrl.tradingCenter.currEntrust, params)
          .then(res => {
            if (res.status == 200) {
              let arr = res.data.myent || []
              if (arr.length >= 5) {

                _this.currEntrust = arr.slice(0, 5)
              } else {
                _this.currEntrust = arr
              }
              // console.log(arr)
            }
          })
      },
      getLogEntrust() {
        let _this = this
          , params = {};
        params.typeboxid = this.btype || 5
        params.page = 1
        this.FetchGet(this.requestUrl.tradingCenter.logEntrust, params)
          .then(res2 => {
            if (res2.status == 200) {
              if (res2.data.pagedata.length >= 5) {
                _this.logEntrust = res2.data.pagedata.slice(0, 5)
              } else {
                _this.logEntrust = res2.data.pagedata
              }
            } else {
              _this.logEntrust = [];
            }
          })
      },
      getEntrust() {  //并发请求
        let _this = this
          , params = {}
          , opt = {};
        params.typeboxid = this.btype || 5

        opt.url1 = this.requestUrl.tradingCenter.currEntrust
        opt.params1 = params
        opt.url2 = this.requestUrl.tradingCenter.logEntrust
        opt.params2 = params
        opt.callback = function (res1, res2) {
          if (res1.status == 200) {
            if (res1.data.myent.length >= 5) {
              _this.currEntrust = res1.data.myent.slice(0, 5)
            } else {
              _this.currEntrust = res1.data.myent
            }
          } else {
            _this.currEntrust = [];
          }

          if (res2.status == 200) {
            if (res2.data.pagedata.length >= 5) {
              _this.logEntrust = res2.data.pagedata.slice(0, 5)
            } else {
              _this.logEntrust = res2.data.pagedata
            }
          } else {
            _this.logEntrust = [];
          }

        }

        this.FetchAll(opt)
      },
      listnBid(id) {
        this.bid = Number(id);
        this.getDepth();
        this.getRealList();
        this.getHqlist();
        this.getEntrust();

      },
      warning(msg) {
        this.$Notice.warning({
          title: msg,
          desc: ''
        });
      },
    },
    watch: {
      goods(newVal, oldVal) {
        // console.log(this.goods)
        this.titleCallback(this.last, this.goods)
      },
      currLogThrottle(newVal, oldVal) {

        if (this.currlogParams) {
          this.currEntrust.unshift(this.currlogParams)
          if (this.currEntrust.length > 5) {
            var lastData = this.currEntrust.pop()
            // console.log(lastData)
          }

          //插入数据 延时刷新
          if (window.logDelay) {
            clearTimeout(window.logDelay)
            window.logDelay = null
          }
          if (!window.logDelay) {
            window.logDelay = setTimeout(() => {
              this.getEntrust()
            }, 2000)
          }
        } else {
          this.getEntrust()
        }
      },
      isReload(newVal, oldVal) {
        //这里需要节流一次
        //实时价格变更
        this.getBlist()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-TradHome {
    width: 100%;
    height: inherit;
  }
</style>