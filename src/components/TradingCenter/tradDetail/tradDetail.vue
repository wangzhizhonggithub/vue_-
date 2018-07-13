<template>
  <div class="v-TradDetail">
    <div class="layouts">
      <div class="contents">
        <div class="left">
          <div class="nav">
            <button @click="buyDrage(true)" :class="buyDrag?'active':''">{{$t("t.a7")}}
              <Icon v-show="buyDrag" type="arrow-down-b"></Icon>
            </button>
            <button @click="buyDrage(false)" :class="buyDrag?'':'active'">{{$t("t.a8")}}
              <Icon v-show="!buyDrag" type="arrow-down-b"></Icon>
            </button>
          </div>
          <!-- 限价买入 -->
          <div v-show="tableCon" class="limitPrice">
            <div class="divInput">
              <div class="pre">{{$t("t.b1")}}</div>
              <input v-model="buyPrice" class="append" value="" type="text" @input='inputPrice("buy")' />
            </div>
            <div class="divInput">
              <div class="pre">{{$t("t.b2")}}</div>
              <input v-model="buyCount" class="append" value="" type="text" @input="inputCount('buy')" @blur='cancelSliderCon("buy")' />
            </div>
          </div>
          <!-- 限价买入 -->
          <!-- 市价买入 -->
          <div v-show="!tableCon" class="marketPrice">
            <div class="divInput market">
              <div class="pre marPre">{{$t("t.b6")}}</div>
              <input class="append marAppend" :value="bName" readonly />
            </div>
            <div class="divInput">
              <div class="pre">{{$t("t.b7")}}({{bName}})</div>
              <input v-model="MbuyCount" class="append" value="" type="text" @input='inputPrice("mbuy")' />
            </div>
          </div>
          <!-- 市价买入 -->
          <div-slider :dataObj="dataObj" :sliderCallback='sliderCallback' ref='buySlider'></div-slider>
          <!-- <div class="rang"  @mousedown="inRangChange($event)">
                    <div class="underRang">
                      <img :class="conTan180?'tan180':''" src="/static/img/rang.png" alt="">
                    </div>
                    <div class="onRang" ref="onRang">
                      <img :class="conTan180?'':'tan180'" src="/static/img/inrang.png" alt="">
                    </div>
                </div> -->
          <div class="amount" v-show="tableCon">
            <b style="font-weight:400">{{$t("t.b5")}} &nbsp;&nbsp;</b>
            <b style="font-weight:400"> ≈</b>
            <span>{{tradAmount}}</span>{{bName}}
          </div>
          <div class="nowbuy">
            <Button type="success" @click="buyNow()">{{$t("t.b8")}}</Button>
          </div>
        </div>
        <div class="right">
          <div class="nav">
            <button @click="sellDrage(true)" :class="sellDrag?'active':''">{{$t("t.a9")}}
              <Icon v-show="sellDrag" type="arrow-down-b"></Icon>
            </button>
            <button @click="sellDrage(false)" :class="sellDrag?'':'active'">{{$t("t.a10")}}
              <Icon v-show="!sellDrag" type="arrow-down-b"></Icon>
            </button>
          </div>
          <!-- 限价卖出 -->
          <div v-show="tableCon1" class="limitPrice">
            <div class="divInput">
              <div class="pre">{{$t("t.b3")}}</div>
              <input v-model="sellPrice" class="append" value="" type="text" style="color:#ef2121;" @input='inputPrice("sell")' />
            </div>
            <div class="divInput">
              <div class="pre">{{$t("t.b4")}}</div>
              <input v-model="sellCount" class="append" value="" type="text" style="color:#ef2121;" @input="inputCount('sell')" @change='cancelSliderCon("sell")'
              />
            </div>
          </div>
          <!-- 限价卖出 -->
          <!-- 市价卖出 -->
          <div v-show="!tableCon1" class="marketPrice">
            <div class="divInput market">
              <div class="pre marPre">{{$t("t.b11")}}</div>
              <input class="append marAppend" :value="bName" readonly />
            </div>
            <div class="divInput">
              <div class="pre">{{$t("t.b12")}}</div>
              <input v-model="MsellCount" class="append" value="" type="text" style="color:#ef2121;" @input='inputCount("msell")' />
            </div>
          </div>
          <!-- 市价卖出 -->

          <div-slider :dataObj="dataObj1" :sliderCallback='sliderCallback' ref='sellSlider'></div-slider>
          <div class="amount" v-show="tableCon1">
            <b style="font-weight:400">{{$t("t.b5")}}&nbsp;&nbsp;</b>
            <b style="font-weight:400"> ≈</b>
            <span>{{tradAmount1}}</span>{{bName}}
          </div>
          <div class="nowbuy">
            <Button type="error" @click="sellNow()">{{$t("t.b13")}}</Button>
          </div>
        </div>
      </div>
      <div class="lay-slider">
        <pend-order :depth="depth" :acceptParams='acceptParams' v-if="depth" :bType="bType" :areaIndex="areaIndex"></pend-order>
      </div>
    </div>
    <div class="mask" v-if="buyModal">
    </div>
    <div class="alertModal1" v-if="buyModal">
      <p>{{$t("action.a1")}}
        <span>
          <Icon type="ios-close-empty" style="cursor:pointer;" @click.native="buyModal = false"></Icon>
        </span>
      </p>
      <div style="text-align:center">
        <span style="font-size:14px;margin:50px 0;display:block">{{$t("action.a2")}}</span>
      </div>
      <div class="btn">
        <Button type="primary" size="large" style="margin-right:10px;" @click="sellLate()">{{$t("cc.d5")}}</Button>
        <Button type="ghost" size="large" style="margin-left:10px;" @click="buyModal = false">{{$t("authen.msg2")}}</Button>
      </div>
    </div>
    <div class="mask" v-if="sellModal">
    </div>
    <div class="alertModal1" v-if="sellModal">
      <p>{{$t("action.a1")}}
        <span>
          <Icon type="ios-close-empty" style="cursor:pointer;" @click.native="sellModal = false"></Icon>
        </span>
      </p>
      <div style="text-align:center">
        <span style="font-size:14px;margin:50px 0;display:block">{{$t("action.a3")}}</span>
      </div>
      <div class="btn">
        <Button type="primary" size="large" style="margin-right:10px;" @click="buyLate()">{{$t("cc.d5")}}</Button>
        <Button type="ghost" size="large" style="margin-left:10px;" @click="sellModal = false">{{$t("authen.msg2")}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import divSlider from './tradDetailCom/divSlider.vue'
  import pendOrder from './tradDetailCom/pendingOrders.vue'

  export default {
    name: 'tradDetail',
    props: {
      depth: Object,
      buy: Number, //买1
      bType: Number,
      sell: Number, //卖
      buySum: Number,
      bList: Array,
      sellSum: Number,
      areaIndex: Number,
    },
    components: {
      divSlider, pendOrder
    },
    data() {
      return {
        isLoginStatus: false,
        tableCon: true,
        tableCon1: true,
        bName: "CNHA",
        tradAmount: 0.00,
        tradAmount1: 0.00,
        buyPrice: '',
        buyModal: false,
        sellModal: false,
        buycount: 0,
        sellcount: 0,
        sellPrice: '',
        jFloal: 0,
        buyCount: '',
        sellCount: '',
        MbuyCount: '',
        MsellCount: '',
        buyDrag: true,
        sellDrag: true,
        pre: 0,
        btype: this.bType,
        pre1: 0,
        //conTan180:true,
        stepCurr: -1,
        isFirst: true,
        dataObj: {
          conSliderCall: true,
          buySlider: 0,
          disabled: true,
          type: 'left',
          buyPre: '0.00%',
          stepArr: [
            {
              pre: '25%',
              num: 25,
              active: ''
            },
            {
              pre: '50%',
              num: 50,
              active: ''
            },
            {
              pre: '75%',
              num: 75,
              active: ''
            },
            {
              pre: '100%',
              num: 100,
              active: ''
            }
          ],
        },
        dataObj1: {
          conSliderCall: true,
          buySlider: 0,
          disabled: true,
          type: 'right',
          buyPre: '0.00%',
          stepArr: [
            {
              pre: '25%',
              num: 25,
              active: ''
            },
            {
              pre: '50%',
              num: 50,
              active: ''
            },
            {
              pre: '75%',
              num: 75,
              active: ''
            },
            {
              pre: '100%',
              num: 100,
              active: ''
            }
          ],
        },

        jfloal: 0,
        currLogThrottle: true, //节流第二个变量

      }
    },
    created() {
      if (localStorage.getItem("user")) {
        this.isLoginStatus = true;
      } else {
        this.isLoginStatus = false;
      }
      if (this.$router.currentRoute.name == 'tradingETF') {
        this.jfloal = 2
      }
      this.$eventBus.$on('BtypeChange', function (btype, jfloal, balance, currency) {
        //数据二次流入
        this.btype = Number(btype)
        if (jfloal) {
          this.jfloal = Number(jfloal)
        }
      }.bind(this))
      if (localStorage.getItem("btypeId")) {
        this.btype = localStorage.getItem("btypeId")
      }
      if (localStorage.user) {

        if (this.buyPrice) {
          this.dataObj.disabled = false
        } else {
          this.dataObj1.disabled = true
        }
        if (this.sellPrice) {
          this.dataObj1.disabled = false
        } else {
          this.dataObj1.disabled = true
        }
      }

      if (this.areaIndex == 1) {
        this.bName = "ETF";
        // this.jfloal=2  //出此下策  真tm服了  交易区位数第一个币种数
      } else if (this.areaIndex == 2) {
        this.bName = "ETH";
        // this.jfloal=2
      } else if (this.areaIndex == 0) {
        this.bName = "CNHA";
        // this.jfloal=6
      } else if (this.areaIndex == 3) {
        this.bName = "airdrop";
        // this.jfloal=6
      }

    },
    updated() {

    },
    methods: {
      scientificToNumber(num_str) { //
        var resValue = '',
          power = '',
          result = null,
          dotIndex = 0,
          resArr = [],
          sym = '';
        var numStr = num_str.toString();
        if (numStr[0] == '-') {  // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
          numStr = numStr.substr(1);
          sym = '-';
        }
        // console.log(numStr)
        if ((numStr.indexOf('E') != -1) || (numStr.indexOf('e') != -1)) {
          var regExp = new RegExp('^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$', 'ig');
          result = regExp.exec(numStr);
          // console.log(result);
          if (result != null) {
            resValue = result[2];
            power = result[5];
            result = null;
          }
          if (!resValue && !power) { return false }
          dotIndex = resValue.indexOf('.');
          resValue = resValue.replace('.', '');
          resArr = resValue.split('');
          // console.log(power)
          if (Number(power) >= 0) {
            var subres = resValue.substr(dotIndex);
            power = Number(power);
            //幂数大于小数点后面的数字位数时，后面加0
            for (var i = 0; i < power - subres.length; i++) {
              resArr.push('0');
            }
            if (power - subres.length < 0) {
              resArr.splice(dotIndex + power, 0, '.');
            }
          } else {
            power = power.replace('-', '');
            power = Number(power);
            //幂数大于等于 小数点的index位置, 前面加0
            for (var i = 0; i <= power - dotIndex; i++) {
              resArr.unshift('0');
            }
            var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
            resArr.splice(n, 0, '.');
          }
        } else {
          return numStr;
        }
        resValue = resArr.join('');
        // console.log(sym+resValue);
        return sym + resValue;

      },
      priceLimit() {
        var maxCount
          , minCount
          , ten = 10
          , jfloal = this.jfloal || 4
        maxCount = Number(this.buySum).div(this.buyPrice)
        minCount = 1 / Math.pow(ten, jfloal)

        if (maxCount < minCount) {
          this.buyPrice = 0
          this.initBuy()
          //this.warning('金额不够买入最小量')
          return false
        } else {
          return true
        }
      },
      isDisable(judeg, drag) {
        if (judeg == 'buy') {
          this.dataObj.disabled = drag
        } else {
          this.dataObj1.disabled = drag
        }
      },
      updatePre(judeg, num) {
        //更新百分比显示

        if (judeg == 'buy') {
          if (this.buySum > 0) {
            this.priceLimit()
            this.dataObj.buyPre = this.scientificToNumber((num * 100)).toString().delFixed(2) + '%'
          }
        } else {
          if (this.sellSum > 0) {
            this.dataObj1.buyPre = this.scientificToNumber((num * 100)).toString().delFixed(2) + '%'
          }
        }
      },
      cancelSliderCon(judeg) {
        //开启滑块控制 slider
        // console.log('change')
        // if(judeg == 'buy'){
        //   this.dataObj.conSliderCall = true  
        // }else if(judeg == 'sell'){
        //   this.dataObj1.conSliderCall = true  
        // }
      },
      updateSilder(judeg) {
        //父 组件调用子组件的方法
        if (this.buySum <= 0) {
          this.dataObj.buySlider = 0
          this.$refs.buySlider.updateSlider()
        }
        if (this.sellSum <= 0) {
          this.dataObj1.buySlider = 0
          this.$refs.sellSlider.updateSlider()
        }
        if (judeg == 'buy') {
          if (this.buyPrice > 0 && this.buySum > 0) {
            if (this.priceLimit()) {
              if (this.buyCount > 0) {
                let num = this.scientificToNumber((Number(this.buyPrice).mul(this.buyCount)).div(this.buySum))
                  , delNum = this.scientificToNumber((num * 100)).toString().delFixed(2);
                if (delNum < 0.01) {
                  delNum = 0.01
                } else {
                  delNum = delNum
                }
                this.dataObj.buyPre = delNum + '%' //更新百分比显示
                this.dataObj.buySlider = Math.ceil(delNum)
                this.$refs.buySlider.updateSlider()
              }
            }

          }

        } else if (judeg == 'sell') {
          if (this.sellPrice > 0 && this.sellSum > 0) {
            if (this.sellCount > 0) {
              let num = this.scientificToNumber(Number(this.sellCount).div(this.sellSum).toFixed(2))
                , delNum = this.scientificToNumber((num * 100)).toString().delFixed(2);
              if (delNum < 0.01) {
                delNum = 0.01
              } else {
                delNum = delNum
              }
              // console.log(delNum)
              this.dataObj1.buyPre = delNum + '%'
              this.dataObj1.buySlider = Math.ceil(delNum)
              this.$refs.sellSlider.updateSlider()
            }
          }
        } else if (judeg == 'mbuy') {
          if (this.buySum > 0 && this.MbuyCount > 0) {
            let num = this.scientificToNumber(Number(this.MbuyCount).div(this.buySum))
              , delNum = this.scientificToNumber((num * 100)).toString().delFixed(2)

            if (delNum < 0.01) {
              delNum = 0.01
            } else {
              delNum = delNum
            }
            this.dataObj.buyPre = delNum + '%' //更新百分比显示
            this.dataObj.buySlider = Math.ceil(delNum)
            this.$refs.buySlider.updateSlider()
          }
        } else if (judeg == 'msell') {
          if (this.sellSum > 0 && this.MsellCount > 0) {
            let num = this.scientificToNumber(Number(this.MsellCount).div(this.sellSum))
              , delNum = this.scientificToNumber((num * 100)).toString().delFixed(2)
            if (delNum < 0.01) {
              delNum = 0.01
            } else {
              delNum = delNum
            }
            this.dataObj1.buyPre = delNum + '%'
            this.dataObj1.buySlider = Math.ceil(delNum)
            this.$refs.sellSlider.updateSlider()
          }
        }
      },
      sliderCallback(judeg, integer) {
        // slider 控制input 百分比
        // 子组件的回掉方法 
        integer = integer / 100
        if (judeg == 'buy') {
          if (this.buySum) {
            if (this.buyPrice > 0) {
              let countSum = Number(this.buySum).div(this.buyPrice)
                , count = Number(countSum).mul(integer)
                , jfloal = this.jfloal || 4
              this.buyCount = count.toString().delFixed(jfloal)
              this.updatePre('buy', this.buyCount / countSum)
            }

          }
        } else if (judeg == 'sell') {
          if (this.sellSum) {
            if (this.sellPrice > 0) {

              let countSum = Number(this.sellSum)
                , count = Number(countSum).mul(integer)
                , jfloal = this.jfloal || 4

              this.sellCount = count.toString().delFixed(jfloal)
              this.updatePre('sell', this.sellCount / countSum)
            }
          }
        } else if (judeg == 'mbuy') {
          //市价交互
          if (this.buySum) {
            let countSum = Number(this.buySum)
              , count = countSum.mul(integer)
            this.MbuyCount = count.toString().delFixed(2)
            this.updatePre('buy', integer)

          }
        } else if (judeg == 'msell') {
          if (this.sellSum) {
            let countSum = Number(this.sellSum)
              , count = countSum.mul(integer)
              , jfloal = this.jfloal || 4;
            this.MsellCount = count.toString().delFixed(jfloal)
            this.updatePre('sell', integer)
          }
        }
      },
      updateCurrEntrust(params) {
        this.currLogThrottle ? this.currLogThrottle = false : this.currLogThrottle = true;
        //console.log(this.currLogThrottle)
        this.$eventBus.$emit('updateCurrEntrust', this.currLogThrottle, params)
      },
      Fixed(data, num) {
        let data1 = Number(data).toFixed(num);  //

        return Number(data1);
      },
      buyDrage(drag) {
        if (drag) {
          this.dataObj.way = 'limit'
        } else {
          this.dataObj.way = 'market'
        }
        this.buyDrag = drag
        this.tableCon = drag
        this.initBuy()
      },
      initBuy() {
        this.buyPrice = "";
        this.buyCount = ''
        this.MbuyCount = ''
        this.tradAmount = 0.00
        //更新百分比
        this.updatePre('buy', 0)
        //更新进度条
        this.dataObj.buySlider = 0
        this.$refs.buySlider.updateSlider()
        if (this.tableCon) {
          //限
          if (localStorage.user && this.buyPrice > 0) {
            this.isDisable('buy', false)
          } else {
            this.isDisable('buy', true)
          }
        } else {
          //市
          if (localStorage.user) {
            this.isDisable('buy', false)
          } else {
            this.isDisable('buy', true)
          }
        }


      },
      initSell() {
        this.sellCount = ''
        this.MsellCount = ''
        this.sellPrice = "";
        this.tradAmount1 = 0.00
        //更新百分比
        this.updatePre('sell', 0)
        //更新进度条
        this.dataObj1.buySlider = 0
        this.$refs.sellSlider.updateSlider()
        if (this.tableCon1) {
          if (localStorage.user && this.sellPrice > 0) {
            this.isDisable('sell', false)
          } else {
            this.isDisable('sell', true)
          }
        } else {
          if (localStorage.user) {
            this.isDisable('sell', false)
          } else {
            this.isDisable('sell', true)
          }
        }
      },
      sellDrage(drag) {
        if (drag) {
          this.dataObj1.way = 'limit'
        } else {
          this.dataObj1.way = 'market'
        }
        this.sellDrag = drag;
        this.tableCon1 = drag;
        this.initSell()
      },
      acceptParams(price, isBuy) {
        //isBuy 买单与卖单
        // if(isBuy){
        //   this.buyPrice = price;
        //   // this.buyCount = count
        // }else{
        //   this.sellPrice = price;

        // }
        // if(this.isFirst){
        this.buyPrice = price;
        this.sellPrice = price;
        //   this.isFirst=false;
        // }else{

        // }
      },
      sellNow() {
        // this.warning(this.$t("mmp.sb"))        
        // return false
        if (this.buycount <= 10 && !this.tableCon1) {
          this.buyModal = true;
        } else {
          this.sendParams(false)
        }
      },
      sellLate() {
        this.buyModal = false;
        this.sendParams(false)
      },
      buyLate() {
        this.sellModal = false;
        this.sendParams(true)
      },
      buyNow() {
        // this.warning(this.$t("mmp.sb"))
        // return false
        if (this.sellcount <= 10 && !this.tableCon) {
          this.sellModal = true;
        } else {
          this.sendParams(true)
        }
      },
      sendParams(isBuy) {
        // 限价买入卖出参数
        // $price = coin($_POST['price']); //价格
        // $num = $n = coin($_POST['num']); //数量
        // $tbid = $_POST['typeboxid']; //交易市场id
        // $flag = $_POST['flag'] ? $_POST['flag'] : 0; // 0 卖    1 买
        //tableCon  
        //tableCon1 控制 true 限价
        //需要知道是买还是卖 isBuy
        let params = {}
          , _this = this;
        params.typeboxid = this.btype;
        if (isBuy) {
          params.flag = 1;
          //mai
          if (this.tableCon) {
            //限价
            params.price = this.buyPrice || 0;
            params.num = this.buyCount || 0;

            params.tbb = this.tradAmount || 0;
            if (params.price <= 0) {
              _this.warning(_this.$t("bbb.a1"));
              return false
            }
            if (params.num <= 0) {
              _this.warning(_this.$t("bbb.a2"));
              return false
            }
            this.limitBS(params)
          } else {
            //市价
            var jfloal = this.jfloal || 4
              , countMin
              , amountMin
              , proMinFloat;
            proMinFloat = function (jfloal) {
              var str = '0.'
              for (var i = 1; i < jfloal; i++) {
                str += '0'
              }
              str += '1'
              return str
            }
            countMin = proMinFloat(this.jfloal)
            amountMin = Number(countMin).mul(this.sell) * 2
            params.amount = this.MbuyCount || 0;
            // if (params.amount <= amountMin) {
            //   _this.warning(_this.$t("bbb.a3"));
            //   return false
            // }
            this.marketBS(params)
          }
        } else {
          params.flag = 0;
          if (this.tableCon1) {
            //限价
            params.price = this.sellPrice || 0;
            params.num = this.sellCount || 0;
            params.tbb = this.tradAmount1 || 0;
            if (params.price <= 0) {
              _this.warning(_this.$t("bbb.a4"));
              return false
            }
            if (params.num <= 0) {
              _this.warning(_this.$t("bbb.a5"));
              return false
            }
            this.limitBS(params)
          } else {
            params.num = this.MsellCount || 0;
            if (params.num <= 0) {
              _this.warning(_this.$t("bbb.a5"));
              return false
            }
            this.marketBS(params)
          }
        }
      },
      marketBS(params) {
        let _this = this;
        this.FetchPost(this.requestUrl.tradingCenter.marketBS, params)
          .then(res => {
            if (res.status == 200) {
              _this.updateCurrEntrust(res.data)
              _this.success(_this.$t("bbb.a6"));
              //通知交易委托数据刷新
              if (params.flag) {
                this.initBuy()
              } else {
                this.initSell()
              }
            } else if (res.status == 201) {
              _this.$router.push('/login')
            } else if (res.status == 402) {
              _this.warning(_this.$t("aaa.e2") + res.data);
            } else if (res.status == 406) {
              _this.warning(_this.$t("seo.a22"));
            } else if (res.status == 403) {
              _this.warning(_this.$t("input.b4"));
            } else if (res.status == 407) {
              _this.warning(_this.$t("input.b15"));
            } else {
              _this.warning(_this.$t("bbb.a9"));
            }
          })
          .catch(e => { console.log(e) })
      },
      limitBS(params) {
        let _this = this;

        this.FetchPost(this.requestUrl.tradingCenter.limitBS, params)
          .then(res => {
            if (res.status == 200) {
              _this.success(_this.$t("bbb.a6"));
              //通知交易委托数据刷新
              if (params.flag) {
                this.initBuy()
              } else {
                this.initSell()
              }

              _this.updateCurrEntrust(res.data)
            } else if (res.status == 201) {
              _this.$router.push('/login')
            } else if (res.status == 403) {
              _this.warning(_this.$t("input.b4"));
            } else if (res.status == 407) {
              _this.warning(_this.$t("input.b15"));
            } else if (res.status == 408) {
              if (params.flag) {
                _this.warning(_this.$t("input.b13"));
              } else {
                _this.warning(_this.$t("input.b14"));
              }

            } else {
              _this.warning(_this.$t("bbb.a9"));
            }

          })
          .catch(e => { console.log(e) })
      },
      warning(msg) {
        this.$Notice.warning({
          title: msg,
          desc: ''
        });
      },
      success(msg) {
        this.$Notice.success({
          title: msg,
          desc: ''
        });
      },
      inputCount(str, drag) {
        if (str == 'buy') {
          if (this.buyCount.indexOf('.') >= 1) {
            let buyIndex = this.buyCount.indexOf('.')
              , front = this.buyCount.substring(buyIndex - 1, buyIndex)
              , end = this.buyCount.substring(buyIndex + 1, buyIndex + 2)

            if (front !== '' && end !== '') {
              this.checkCount(str, drag)
            }
          } else {
            this.checkCount(str, drag)
          }
          this.dataObj.conSliderCall = false
        } else if (str == 'sell') {
          if (this.sellCount.indexOf('.') >= 1) {
            let buyIndex = this.sellCount.indexOf('.')
              , front = this.sellCount.substring(buyIndex - 1, buyIndex)
              , end = this.sellCount.substring(buyIndex + 1, buyIndex + 2)

            if (front !== '' && end !== '') {
              this.checkCount(str, drag)
            }
          } else {
            this.checkCount(str, drag)
          }
          this.dataObj1.conSliderCall = false
        } else if (str == 'msell') {
          if (this.MsellCount.indexOf('.') >= 1) {
            let buyIndex = this.MsellCount.indexOf('.')
              , front = this.MsellCount.substring(buyIndex - 1, buyIndex)
              , end = this.MsellCount.substring(buyIndex + 1, buyIndex + 2)

            if (front !== '' && end !== '') {
              this.checkCount(str, drag)
            }
          } else {
            this.checkCount(str, drag)
          }
          this.dataObj1.conSliderCall = false
        }
      },
      inputPrice(str, drag) {
        // .前后有值再检测  
        if (str == 'buy') {
          if (this.buyPrice.indexOf('.') >= 1) {
            let buyIndex = this.buyPrice.indexOf('.')
              , front = this.buyPrice.substring(buyIndex - 1, buyIndex)
              , end = this.buyPrice.substring(buyIndex + 1, buyIndex + 2)
            if (front !== '' && end !== '') {
              this.checkPrice(str, drag)
            }
          } else {
            this.checkPrice(str, drag)
          } //谁改谁封装
        } else if (str == 'sell') {
          if (this.sellPrice.indexOf('.') >= 1) {
            let buyIndex = this.sellPrice.indexOf('.')
              , front = this.sellPrice.substring(buyIndex - 1, buyIndex)
              , end = this.sellPrice.substring(buyIndex + 1, buyIndex + 2)

            if (front !== '' && end !== '') {
              this.checkPrice(str, drag)
            }
          } else {
            this.checkPrice(str, drag)
          }
        } else if (str == 'mbuy') {
          //m 的这两个变量起错名字了

          if (this.MbuyCount.indexOf('.') >= 1) {
            let buyIndex = this.MbuyCount.indexOf('.')
              , front = this.MbuyCount.substring(buyIndex - 1, buyIndex)
              , end = this.MbuyCount.substring(buyIndex + 1, buyIndex + 2)

            if (front !== '' && end !== '') {
              this.checkPrice(str, drag)
            }
          } else {
            this.checkPrice(str, drag)
          }
          this.dataObj.conSliderCall = false
        }

      },
      checkPrice(str, drag) {
        // var reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        // console.log(this.jFloal)
        //正则开始 和结尾符号很重要 要那会都写
        if (Number(this.jFloal)) {
          var reg = eval("/(^[1-9]\\d*(\\.\\d{1," + this.jFloal + "})?$)|(^0(\\.\\d{1," + this.jFloal + "})?$)/");
          if (str == 'buy') {
            if (reg.test(this.buyPrice)) {
              // this.buyPrice = this.buyPrice.toString().delFixed(2)

            } else {

              if (this.isLoginStatus) {
                if (this.buyPrice == 0) {
                  this.buyPrice = ''
                } else {
                  var ret = eval("/^\\d+\\.{0,1}\\d{1," + this.jFloal + "}$/");

                  if (!ret.test(this.buyPrice)) {
                    if (this.buyPrice.match(eval("/\\d+\\.{0,1}\\d{1," + this.jFloal + "}/")) == null) {
                      this.buyPrice = this.buyPrice.substr(0, this.buyPrice.length - 1)
                      this.warning(this.$t("bbb.a7"))
                    }
                    this.buyPrice = this.buyPrice.match(eval("/\\d+\\.{0,1}\\d{1," + this.jFloal + "}/"))[0]

                    this.warning(this.$t("bbb.a7"))
                  }

                  //this.buyPrice = /\d+\.?\d{1,this.jFloal}/.test(this.buyPrice) //this.buyPrice.toString().delFixed(this.jFloal)

                }

              } else {

                this.warning(this.$t("bbb.a77"))
              }

              //this.buyPrice = ''
              this.tradAmount = 0.00
            }
          } else if (str == 'sell') {
            if (reg.test(this.sellPrice)) {
              // this.sellPrice = this.sellPrice.toString().delFixed(2)

            } else {
              if (this.isLoginStatus) {
                if (this.sellPrice == 0) {
                  this.sellPrice = ''
                } else {
                  var ret = eval("/^\\d+\\.{0,1}\\d{1," + this.jFloal + "}$/");

                  if (!ret.test(this.sellPrice)) {
                    if (this.sellPrice.match(eval("/\\d+\\.{0,1}\\d{1," + this.jFloal + "}/")) == null) {
                      this.sellPrice = this.sellPrice.substr(0, this.sellPrice.length - 1)
                      this.warning(this.$t("bbb.a7"))
                    }
                    this.sellPrice = this.sellPrice.match(eval("/\\d+\\.{0,1}\\d{1," + this.jFloal + "}/"))[0]

                    this.warning(this.$t("bbb.a7"))
                  }

                  //this.buyPrice = /\d+\.?\d{1,this.jFloal}/.test(this.buyPrice) //this.buyPrice.toString().delFixed(this.jFloal)

                }
              } else {
                this.warning(this.$t("bbb.a77"))
              }
              // this.sellPrice = ''
              this.tradAmount1 = 0.00
            }
          } else if (str == 'mbuy') {
            if (reg.test(this.MbuyCount)) {
              this.updateSilder('mbuy')
              //  this.MbuyCount = this.MbuyCount.toString().delFixed(2)
            } else {
              if (this.isLoginStatus) {
                if (this.MbuyCount == 0) {
                  this.MbuyCount = ''
                } else {
                  var ret = eval("/^\\d+\\.{0,1}\\d{1," + this.jFloal + "}$/");

                  if (!ret.test(this.MbuyCount)) {

                    if (this.MbuyCount.match(eval("/\\d+\\.{0,1}\\d{1," + this.jFloal + "}/")) == null) {
                      this.MbuyCount = this.MbuyCount.substr(0, this.MbuyCount.length - 1)
                      this.warning(this.$t("bbb.a7"))
                    }
                    this.MbuyCount = this.MbuyCount.match(eval("/\\d+\\.\\d{1," + this.jFloal + "}/"))[0]
                    this.warning(this.$t("bbb.a7"))
                  }

                  //this.buyPrice = /\d+\.?\d{1,this.jFloal}/.test(this.buyPrice) //this.buyPrice.toString().delFixed(this.jFloal)

                }
              } else {
                this.warning(this.$t("bbb.a77"))
              }
              // this.MbuyCount = ''
              this.tradAmount = 0.00
            }
          }

        } else {
          if (str == 'buy') {
            if (!Number(this.buyPrice)) {
              this.buyPrice = ''
            } else {
              this.buyPrice = parseInt(this.buyPrice)
            }

          } else if (str == 'sell') {
            if (!Number(this.sellPrice)) {
              this.sellPrice = ''
            } else {
              this.sellPrice = parseInt(this.sellPrice)
            }

          } else if (str == 'mbuy') {
            if (!Number(this.MbuyCount)) {
              this.MbuyCount = ''
            } else {
              this.MbuyCount = parseInt(this.MbuyCount)
            }

          }
        }


      },
      checkCount(str) {
        //正则不好是真的费劲
        //校验对应币种余额
        var jfloal = this.jfloal || 4
        if(Number(this.jfloal)){
          var reg = new RegExp('(^[1-9]\\d*(\\.\\d{1,' + jfloal + '})?$)|(^0(\\.\\d{1,' + jfloal + '})?$)')
        if (str == 'buy') {
          if (reg.test(this.buyCount)) {
            // this.buyCount = this.buyCount.toString().delFixed(jfloal)
            this.updateSilder('buy')
          } else {
            if (this.isLoginStatus) {

              if (this.buyCount == 0) {
                this.buyCount = ''
              } else {
                var ret = eval("/^\\d+\\.{0,1}\\d{1," + jfloal + "}$/");

                if (!ret.test(this.buyCount)) {

                  if (this.buyCount.match(eval("/\\d+\\.{0,1}\\d{1," + jfloal + "}/")) == null) {
                    this.buyCount = this.buyCount.substr(0, this.buyCount.length - 1)
                    this.warning(this.$t("bbb.a8"))
                  }
                  this.buyCount = this.buyCount.match(eval("/\\d+\\.{0,1}\\d{1," + jfloal + "}/"))[0]
                  this.warning(this.$t("bbb.a8"))
                }

                //this.buyPrice = /\d+\.?\d{1,this.jFloal}/.test(this.buyPrice) //this.buyPrice.toString().delFixed(this.jFloal)

              }
              // this.warning(this.$t("bbb.a8"))
            } else {
              this.warning(this.$t("bbb.a77"))
            }

            // this.buyCount = ''
          }
        } else if (str == 'sell') {
          if (reg.test(this.sellCount)) {
            // this.sellCount = this.sellCount.toString().delFixed(jfloal)
            this.updateSilder('sell')

          } else {
            if (this.isLoginStatus) {
              if (this.sellCount == 0) {
                this.sellCount = ''
              } else {
                var ret = eval("/^\\d+\\.{0,1}\\d{1," + jfloal + "}$/");
                if (!ret.test(this.sellCount)) {
                  if (this.sellCount.match(eval("/\\d+\\.{0,1}\\d{1," + jfloal + "}/")) == null) {
                    this.sellCount = this.sellCount.substr(0, this.sellCount.length - 1)
                    this.warning(this.$t("bbb.a8"))
                  }
                  this.sellCount = this.sellCount.match(eval("/\\d+\\.\\d{1," + jfloal + "}/"))[0]
                  this.warning(this.$t("bbb.a8"))
                }

                //this.buyPrice = /\d+\.?\d{1,this.jFloal}/.test(this.buyPrice) //this.buyPrice.toString().delFixed(this.jFloal)

              }
            } else {
              this.warning(this.$t("bbb.a77"))
            }


          }
        } else if (str == 'msell') {
          if (reg.test(this.MsellCount)) {
            this.updateSilder('msell')
          } else {
            if (this.isLoginStatus) {
              if (this.MsellCount == 0) {
                this.MsellCount = ''
              } else {
                var ret = eval("/^\\d+\\.{0,1}\\d{1," + jfloal + "}$/");

                if (!ret.test(this.MsellCount)) {
                  this.MsellCount = this.MsellCount.match(eval("/\\d+\\.\\d{1," + jfloal + "}/"))[0]
                  this.warning(this.$t("bbb.a8"))
                }

                //this.buyPrice = /\d+\.?\d{1,this.jFloal}/.test(this.buyPrice) //this.buyPrice.toString().delFixed(this.jFloal)

              }

            } else {
              this.warning(this.$t("bbb.a77"))
            }

            // this.MsellCount = ''
          }
        
        }
      }else{
        if (str == 'buy') {
            if (!Number(this.buyCount)) {
              this.buyCount = ''
            } else {
              this.buyCount = parseInt(this.buyCount)
            }

          } else if (str == 'sell') {
            if (!Number(this.sellCount)) {
              this.sellCount = ''
            } else {
              this.sellCount = parseInt(this.sellCount)
            }

          } else if (str == 'msell') {
            if (!Number(this.MsellCount)) {
              this.MsellCount = ''
            } else {
              this.MsellCount = parseInt(this.MsellCount)
            }

          }
      }
    }
    },
    watch: {
      bList() {
        if (this.isFirst) {
          this.jfloal = this.bList[0].btrade;
          this.isFirst = false;
        }
      },
      depth() {
        this.buycount = Number(this.depth.buycount);
        this.sellcount = Number(this.depth.sellcount);
        this.jfloal = this.depth.btrade || 4;
        this.jFloal = this.depth.jtrade || 2;
      },
      buy(newVal, oldVal) {
        if (!this.sellPrice) {
          if (typeof newVal != 'string') {
            var str = newVal.toString();
            if (Number(this.jFloal)) {
              this.sellPrice = str.delFixed(this.jFloal)
            } else {
              this.sellPrice = str;
            }

          }
        }
      },
      buyPrice(newVal, oldVal) {
        if (newVal) {
          if (this.buySum) {
            this.isDisable('buy', false)
          }
          if (this.buyCount && this.buySum) {
            var amount = Number(newVal).mul(this.buyCount)
            if (amount > this.buySum) {
              //超额 根据百分比变更数量
              this.buyCount = Number(this.buySum).div(this.buyPrice)
              this.updateSilder('buy')
            } else {
              this.updateSilder('buy')
              if (Number(this.jFloal)) {
                this.tradAmount = this.scientificToNumber(amount).toString().delFixed(this.jFloal)
              } else {
                this.tradAmount = this.scientificToNumber(amount)
              }

            }

          }
        }
        if (newVal == '' || newVal == 0) {
          this.tradAmount = 0.00
          //更新百分比
          this.updatePre('buy', 0)
          //更新进度条
          this.dataObj.buySlider = 0
          this.$refs.buySlider.updateSlider()
          this.isDisable('buy', true)
        }
      },
      sellPrice(newVal, oldVal) {
        if (newVal) {
          if (this.sellSum) {
            this.isDisable('sell', false)
          }
          if (this.sellCount && this.sellSum) {
            var amount = Number(newVal).mul(this.sellCount)
            if (Number(this.jFloal)) {
              this.tradAmount1 = this.scientificToNumber(amount).toString().delFixed(this.jFloal)
            } else {
              this.tradAmount1 = this.scientificToNumber(amount)
            }

          }
        }
        if (newVal == '' || newVal == 0) {
          this.tradAmount = 0.00
          //更新百分比
          this.updatePre('sell', 0)
          //更新进度条
          this.dataObj1.buySlider = 0
          this.$refs.sellSlider.updateSlider()
          this.isDisable('sell', true)
        }

      },
      sell(newVal, oldValVal) {
        if (!this.buyPrice) {
          if (typeof newVal != 'string') {
            var str = newVal.toString()
            if (Number(this.jFloal)) {
              this.buyPrice = str.delFixed(this.jFloal)
            } else {
              this.buyPrice = str
            }

          }
        }
      },
      buyCount(newVal, oldVal) {
        // console.log(this.buyCount)
        if (newVal) {
          if (this.buyPrice) {
            var amount = Number(newVal).mul(this.buyPrice)
            // console.log(amount)
            if (Number(this.jFloal)) {
              this.tradAmount = this.scientificToNumber(amount).toString().delFixed(this.jFloal)
            } else {
              this.tradAmount = this.scientificToNumber(amount)
            }

            // this.tradAmount = amount.toString().delFixed(this.jFloal)
            if (this.tradAmount > this.buySum) {
              //超过限额度 最大量显示
              var count = Number(this.buySum).div(this.buyPrice) || 0
              if (Number(this.jfloal)) {
                this.buyCount = count.toString().delFixed(this.jfloal) || 0
              } else {
                this.buyCount = count;
              }


              //更新百分比显示 
              this.updatePre('buy', 1)
            }
          }

        }
      },
      sellCount(newVal, oldVal) {
        if (newVal) {
          if (this.sellPrice) {
            if (newVal > this.sellSum) {
              if (this.jfloal) {
                this.sellCount = this.sellSum.toString().delFixed(this.jfloal)
              } else {
                this.sellCount = this.sellSum
              }

              this.updatePre('sell', 1)
            }
            var amount = Number(newVal).mul(this.sellPrice)
            if (Number(this.jFloal)) {
              this.tradAmount1 = this.scientificToNumber(amount).toString().delFixed(this.jFloal)
            } else {
              this.tradAmount1 = this.scientificToNumber(amount)
            }

            // this.tradAmount1 = amount.toString().delFixed(this.jFloal)

          }

        }
      },
      MbuyCount(newVal, oldValVal) {
        //市价买入金额

        if (newVal) {
          if (newVal > this.buySum) {
            this.MbuyCount = this.buySum
            this.updatePre('buy', 1)
          }
        }
      },
      MsellCount(newVal, oldVal) {
        if (newVal) {
          if (newVal > this.sellSum) {
            this.MsellCount = this.sellSum
            this.updatePre('sell', 1)
          }
        }
      },
      btype() {
        this.initBuy()
        this.initSell()
      },
      sellSum(newVal, oldVal) {
        if (newVal) {
          if (this.sellPrice) {
            this.isDisable('sell', false)
          }
        }
      },
      buySum(newVal, oldVal) {
        if (newVal) {
          if (this.buyPrice) {
            this.isDisable('buy', false)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .v-TradDetail {
    width: 100%;
    height: 350px;
    background: #f3f3f3;
    margin-top: 15px;
    font-size: 14px;
    color: #555555;
    .layouts {
      width: 100%;
      background: none;
      height: 100%;
    }
    .contents {
      width: 69%;
      margin-right: 1%;
      background: #fff;
      height: 100%;
      float: left;
      .left {
        width: 50%;
        float: left;
        height: 100%;
        padding-left: .38rem;
        padding-right: .25rem;
        position: relative;
        .nav {
          padding-top: 20px;
          margin-bottom: 22px;
          button {
            width: 50%;
            line-height: 28px;
            height: 28px;
            background: #ffffff;
            color: inherit;
            position: relative;
            border: 1px solid #ebebeb;
            text-align: center;
            margin-right: -4px;
            cursor: pointer;
            &.active {
              background: #f5f5f5;
            }
            .ivu-icon {
              position: absolute;
              left: 50%;
              color: #f5f5f5;
              font-size: 16px;
              margin-left: -5px;
              bottom: -12px;
            }
            &:nth-child(1) {
              border-right: none;
              border-top-left-radius: 2px;
              border-bottom-left-radius: 2px;
            }
            &:nth-child(2) {
              border-top-right-radius: 2px;
              border-bottom-right-radius: 2px;
            }
          }
        }
        .amount {
          margin-top: 25px;
          span {
            color: #19be6b;
          }
        }
        .nowbuy {
          width: 100%;
          padding-left: .38rem;
          padding-right: .25rem;
          position: absolute;
          left: 0;
          bottom: 37px;
          button {
            width: 100%;
            height: 44px;
            font-size: 16px;
            border-radius: 3px;
          }

        }
      }
      .right {
        width: 50%;
        float: left;
        padding-right: .38rem;
        padding-left: .25rem;
        height: 100%;
        position: relative;
        .nav {
          padding-top: 20px;
          margin-bottom: 22px;
          button {
            width: 50%;
            line-height: 28px;
            height: 28px;
            background: #ffffff;
            color: inherit;
            position: relative;
            border: 1px solid #ebebeb;
            text-align: center;
            margin-right: -4px;
            cursor: pointer;
            &.active {
              background: #f5f5f5;
            }
            .ivu-icon {
              position: absolute;
              left: 50%;
              color: #f5f5f5;
              font-size: 16px;
              margin-left: -5px;
              bottom: -12px;
            }
            &:nth-child(1) {
              border-right: none;
              border-top-left-radius: 2px;
              border-bottom-left-radius: 2px;
            }
            &:nth-child(2) {
              border-top-right-radius: 2px;
              border-bottom-right-radius: 2px;
            }
          }
        }
        .amount {
          margin-top: 25px;
          span {
            color: #19be6b;
          }
        }
        .nowbuy {
          width: 100%;
          padding-right: .38rem;
          padding-left: .25rem;
          position: absolute;
          left: 0;
          bottom: 37px;
          button {
            width: 100%;
            height: 44px;
            font-size: 16px;
            border-radius: 3px;
            color: #fff;
            background-color: #ed3f14;
            border-color: #ed3f14;
          }
        }
      }
      .divInput {
        width: 100%;
        height: 44px;
        line-height: 44px;
        background: #ffffff;
        border: 1px solid #ededed;
        margin-bottom: 20px;
        border-radius: 2px;
        position: relative;
        color: #555555;
        &.market {
          background: #ededed;
        }
        .pre {
          padding-left: .2rem;
          float: left;
        }
        .append {
          position: absolute;
          width: 50%;
          right: 0;
          text-align: right;
          padding-right: .1rem;
          height: 42px;
          top: 0;
          color: #19be6b;
          line-height: 44px;
          &.marAppend {
            background: #ededed;
            color: #555555;
          }
        }
      } // .rang{
      //   width: 100%;
      //   position: relative;
      //   .underRang{
      //     overflow: hidden;
      //     width: 100%;
      //     height: 15px;
      //     img{
      //       transform: rotate(0);
      //       &.tan180{
      //         transform:rotate(180deg);
      //       }
      //     }
      //   }
      //   .onRang{
      //     position: absolute;
      //     left: 0;
      //     top: 0;
      //     height: 15px;
      //     overflow: hidden;
      //     width: 100%;
      //     img{
      //        transform:rotate(180deg);
      //       &.tan180{
      //         transform:rotate(0);
      //       }
      //     }
      //   }
      // }
    }
    .mask {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(55, 55, 55, .6);
      height: 100%;
      z-index: 1000;
    }
    .alertModal1 {
      position: fixed;
      top: 0; // margin-top: -300px;
      bottom: 0;
      left: 0;
      right: 0;
      background: #ffffff;
      height: 250px;
      width: 500px;
      margin: auto;
      z-index: 10000;
      vertical-align: middle;
      border-radius: 3px;
      p {
        padding: 0.1rem 0rem 0.1rem 0.2rem;
        font-size: 16px;
        color: #555555;
        border-bottom: 1px solid #dedede;
        span {
          float: right;
          margin-right: 0.2rem;
          font-size: 30px;
          margin-top: -10px;
        }
      }
      .btn {
        text-align: center;
        button {
          width: 27.5%;
        }
      }
    }
    .lay-slider {
      width: 30%;
      background: #ffffff;
      height: 100%;
      float: left;
    }
  }
</style>