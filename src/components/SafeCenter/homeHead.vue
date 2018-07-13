<template>
  <div class="header">
    <div class="header_main">
      <div class="prompting">
        <ul>
          <li v-for="item in showData" >
            {{item.goods}}/{{item.coin}}：
            <span style="color:#16c277;" v-if="Number(item.daydie)>=0 && Number(item.jtrade)">
              {{item.price.delFixed(item.jtrade)}}
              <Icon type="arrow-up-c" style="color:#16c277;"></Icon>
            </span>
            <span style="color:#16c277;" v-if="Number(item.daydie)>=0 && !Number(item.jtrade)">
                {{parseInt(item.price)}}
                <Icon type="arrow-up-c" style="color:#16c277;"></Icon>
              </span>
            <span style="color:#ff0000;" v-if="Number(item.daydie)<0 && Number(item.jtrade)">
              {{item.price.delFixed(item.jtrade)}}
              <Icon type="arrow-down-c" style="color:#ff0000;"></Icon>
            </span>
            <span style="color:#16c277;" v-if="Number(item.daydie)<0 && !Number(item.jtrade)">
                {{parseInt(item.price)}}
                <Icon type="arrow-up-c" style="color:#16c277;"></Icon>
              </span>
          </li>
        </ul>
        <!-- <button style="margin-left:100px;background:#ffffff" @click="changeLocale">中英文切换</button> -->
      </div>
      <div class="lan" style="cursor:pointer" @mouseleave="noStyle" @mouseover="lanStyle">
        <div class="show">
            <span v-if="zh">简体中文</span>
            <span v-if="en">English</span>
          <!-- <img src="/static/img/zh.png" alt="" v-if="zh" class="imgUP">
          <img src="/static/img/en.png" alt="" v-if="en" class="imgUP"> -->
          <Icon :type="lanBox?'arrow-up-b':'arrow-down-b'" style="color:#ffffff;margin-left:5px;"></Icon>
        </div>
        <div class="lanBox" v-show="lanBox">
          <p @click="changeLocale('zh')">
            <span class="">
              简体中文
            </span>
          </p>
          <p @click="changeLocale('en')">
            <span>English</span>
          </p>
        </div>
      </div> 
    </div>
  </div>
</template>
<script>
  import bus from "../../assets/js/bus.js";
  export default {
    data() {
      return {
        showData: [],
        user: '',
        lanBox: false,
        zh: true,
        en: false,
        type: 0,
        aaa: '',
        isIndexReturn:false
      }
    },
    methods: {
      lanStyle() {
        this.lanBox = true;
      },
      noStyle() {
        this.lanBox = false;
      },
      getdata() {
        let _this = this;
        setInterval(() => {
          if(!this.isIndexReturn){
            return false
          }
          this.$store.dispatch('UPDATE_INDEXS')
          this.getit();
        }, 3000)
      },
      getit() {
        this.isIndexReturn = false
        if(this.$store.state.TradingArea){
          let  res = this.$store.state.TradingArea
          this.showData = res.data.CNHA.slice(0,3).concat(res.data.ETF).concat(res.data.ETH[0]);            
          this.isIndexReturn = true        
        }else{
          this.$store.dispatch('UPDATE_INDEXS')
          .then((res)=>{
            this.showData = res.data.CNHA.slice(0,3).concat(res.data.ETF).concat(res.data.ETH[0]);
            this.isIndexReturn = true          
          })
        }
        // this.FetchGet(this.requestUrl.Arts.jyq, {}).then(res => {
        //   this.showData = res.data.CNHA.slice(0,3).concat(res.data.ETF).concat(res.data.ETH[0]);
        // })
      
      },
      changeLocale(type) {  //切换中英文
        if (type == 'zh') {
          this.zh = true;
          this.en = false;
          this.type = 0;
        } else {
          this.en = true;
          this.zh = false;
          this.type = 1;
        }
        this.locale = this.$i18n.locale;

        bus.$emit('type', this.type)
        if (type == 'zh') {
          this.$i18n.locale = 'zh';
        } else if (type == 'en') {
          this.$i18n.locale = 'en'
        }
        localStorage.setItem("lan", this.$i18n.locale);
        if(this.$router.currentRoute.name == 'Gdetail'){
          this.$router.push('/index')
        }else{
          window.location.reload();
        }
        
        
      },
    },
    created() {
      this.user = localStorage.getItem("user");
      this.$i18n.locale = localStorage.getItem("lan") || 'zh';
      if (this.$i18n.locale == 'zh') {
        this.zh = true;
        this.en = false;
        this.type = 0;
      } else {
        this.en = true;
        this.zh = false;
        this.type = 1;
      }
      this.getit();
      this.getdata();
    },
    watch: {
      locale:function(){
      }
    }
  }
</script>
<style lang="scss">
  .header {
    width: 100%;
    height:42px;
    background: #14141c;   
    .header_main {
      width: 62.5%;
      min-width: 1200px;
      margin: 0 auto;
      background: #14141c;
      position: relative;
    }
    .prompting {
      line-height: 42px;
      color: #ffffff;
      font-size: 12px;
      float: left;
      width: 85%; // height: 40px;
      ul {
        float: left;
        li {
          float: left;
          margin-right: 20px;
          img {
            display: inline-block;
            width: 20px;
            height: 20px; // margin-right: 2px;
            vertical-align: middle;
            cursor: pointer;
          }
        }
      }
    }
    .lan {
      height: 42px;
      margin-left: 92%;
      .show {
        position: relative;
        width:95px;
        height:25px;  
        top:9px;
        border:1px solid #e3e3e3;
        border-radius:12px;
        span{
          line-height: 25px;
          color: #e3e3e3;
          margin-left:16px;
        }
        i {
        display: inline-block;
        color: #999999;
      }
      }
    }
    .lanBox {
      position: absolute;
      background: #fff;
      box-shadow: 1px 2px 6px #c5c5c5;
      border: solid 1px #eee;
      border-radius: 0 0 3px 3px;
      z-index: 10000;
      top: 40px;
      right: 0;
      p {
        width: 95px;
        text-align: center;
        padding: 5px 3px;
        line-height: 20px;
        color: #555555;
      }
      p:nth-child(1){
        margin-top: 10px;
      }
      p:hover {
        background: #eeeeee;
      } // right: 0;
    }
  }
</style>