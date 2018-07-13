<template>
    <div class="v-Thome">
            <div class="nav">
                    <ul>
                        <li v-for="(item,index) in navArr" :key="index" :class="currIndex==index?'active':''" @click="seleActive(index)">{{item}}</li>
                    </ul>
                    <span @click="goCollection">{{$t("fins.name6")}}>></span>
            </div>
            <trade-oper v-if="currIndex==0" :jyqData="jyqData" :jyqLog="jyqLog" :mapJlog="mapJlog" :mapJuserData="mapJuserData"></trade-oper>
            <bus-oper v-if="currIndex==1 && userBuy" :busData="busData"  :userBuy="userBuy" :buyprice="buyprice" :sellprice="sellprice" :userSell="userSell" :goldnum="goldnum" :mapUserBala="mapUserBala" :mapUserData="mapUserData"></bus-oper>
            <Modal v-model="noPermiss" width="360"  class-name="vertical-center-modal">
                    <p slot="header" style="color:#00adee;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>{{$t("cc.d4")}}</span>
                    </p>
                    <div style="text-align:center">
                        <p>{{$t("cc.d1")}}</p>
                        <p style="margin-top:20px;">{{$t("cc.d2")}}</p>
                        <p>{{$t("cc.d22")}}</p>
                        <p>{{$t("cc.d3")}}</p>
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long   style="background-color: #00aedd;
                        border-color: #00aedd;" @click="noPermiss = false">{{$t("cc.d5")}}</Button>
                    </div>
            </Modal>
    </div>
</template>
<script>
    import busOper from "./BusCenter/busOper.vue";
    import tradeOper from "./TradeSector/tradeOper.vue";
     export default {
        metaInfo(){
            return{
                title:this.title,
                meta:[
                    {
                        name:"keywords",
                        conotent:this.$t("seo.a5")
                    },
                    {
                        name:"description",
                        conotent:this.$t("seo.a4")
                    }
                 ]
             }
        },
        data() {
            return {
                navArr: [
                this.$t("cc.a1"),
                this.$t("cc.a2")
                ],
                currIndex: 0,
                title:this.$t("seo.a4"),
                userBuy:null,
                userSell:null,
                busData:null,
                jyqLog:null,
                buyprice:null,
                sellprice:null,
                jyqData:null,
                goldnum:null,
                flag:0,
                permiss:0,
                noPermiss:false,
            }
        },
        components: {
            busOper,tradeOper
        },
        methods: {
            mapJuserData(){ //交易区中心
                this.FetchPost(this.requestUrl.twoCen.juserBala,{}).then(res => {
                if(res.status==200){
                    this.jyqData=res.data;
                }else{
                    // this.jyqData=true;
                }
             })
            },
            mapUserBala(){  //用户几率
                this.FetchPost(this.requestUrl.twoCen.userBala,{}).then(res => {
                if(res.status==200){
                 this.permiss=1;
                 if(res.data.buy){
                     this.userBuy=res.data.buy;
                 }else{
                    this.userBuy={};
                 }
                 if(res.data.sell){
                     this.userSell=res.data.sell;
                 }else{
                    this.userSell={};
                 }
                 if(res.data.balance.goldnum){
                     this.goldnum=res.data.balance.goldnum;
                 }else{
                    this.goldnum=0;
                 }
                 if(res.data.buyprice){
                    this.buyprice=res.data.buyprice;
                 }else{
                    this.buyprice=0;
                 }
                 if(res.data.sellprice){
                    this.sellprice=res.data.sellprice;
                 }else{
                    this.sellprice=0;
                 }
                }else if(res.status==202){  //无权限
                    this.permiss=0;
                }
             })
            },
            mapUserData(flg,page){   //用户中心
                this.FetchPost(this.requestUrl.twoCen.transLog,{flag:flg,page:page}).then(res => {
                    if(res.status==200){
                        this.busData=res.data;
                    }else if(res.status==402){
                        this.busData=null;
                    }else if(res.status==202){  //无权限
                        
                     }
                })
            },
            seleActive(index) {
                if(this.permiss==0 && index==1){
                    this.currIndex = 0;
                    this.noPermiss=true;
                }else{
                    this.currIndex = index;
                }
                sessionStorage.setItem("current", this.currIndex);
                this.mapUserBala();
                this.mapJuserData();
                this.mapJlog(1);
            },
            goCollection(){
                this.$router.push("/financial/collection")
            },
            mapJlog(page){
                this.FetchPost(this.requestUrl.twoCen.jyqtransLog,{page:page}).then(res => {
                if(res.status==200){
                    this.jyqLog=res.data;
                }else{
                    this.jyqLog=null;
                }
             })
            }
        },
        created () {
            this.mapUserData(0,1);
            this.mapUserBala();
            this.mapJuserData();
            this.mapJlog(1);
        },
        mounted () {
            this.currIndex=sessionStorage.getItem("current") || 0;
        }
     }
</script>
<style lang="scss">
.v-Thome{
    width: 62.5%;
    min-width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    .ivu-table-body{
        overflow: inherit;
    }
    .nav {
            line-height: 44px;
            height: 44px;
            background: #f3f3f3;
            font-size: 14px;
            ul {
                float: left;
                li {
                    float: left;
                    width: 160px;
                    height: 100%;
                    text-align: center;
                    background: #e7e7e7;
                    margin-right: 10px;
                    font-size: 16px;
                    cursor:pointer;
                    &.active {
                        background: #ffffff;
                    }
                }
            }
            span{
               float: right;
               color: #00aedd;
               font-size: 16px;
               cursor: pointer;
            }
        }
}
.vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
    
        .ivu-modal{
            top: 0;
        }
    }
</style>