<template>
    <div class="ac_conent">
        <div class="ac_header">
            <h2>{{$t("fins.name1")}}</h2>
            <ul>
                <li>{{$t("account.a1")}}
                    <span style="color:#ef2121;margin-right:5px;">{{total || 0}}</span>CNY</li>
            </ul>
        </div>
        <div class="ac_th">
            <ul>
                <li>{{$t("index.title2")}}</li>
                <li>{{$t("account.a2")}}</li>
                <li>{{$t("account.a3")}}</li>
                <li>{{$t("account.a4")}}</li>
                <li>{{$t("account.a5")}}</li>
            </ul>
        </div>
        <div class="ac_td">
            <ul v-for="(item,index) in showData">
                <li>
                    <img :src='item.path' alt="">
                    <b style="text-align:left;">{{item.nickname}}</b>
                </li>
                <li style="color:#555555">{{item.goldnum}}</li>
                <li style="color:#555555">{{item.gdgold}}</li>
                <li style="color:#555555;">{{item.total}}</li>
                <li>
                    <span style="color:#00aedd;cursor:pointer;" v-if="Number(item.status.Recflag)==1" @click="goCZ(index)">{{$t("fins.name2")}}</span>
                    <span style="color:#cccccc;" v-if="Number(item.status.Recflag)==0">{{$t("account.a6")}}</span>
                    <span style="color:#16c277;cursor:pointer;" v-if="Number(item.status.Withflag)==1" @click="goTx(index)">{{$t("fins.name3")}}</span>
                    <span style="color:#cccccc;" v-if="Number(item.status.Withflag)==0">{{$t("account.a6")}}</span>
                    <span style="color:#cccccc;" v-if="Number(item.lockstatus)==1">{{$t("sc.a3")}}</span>
                    <span style="color:#00aedd;cursor:pointer;" v-if="Number(item.status.Lockflag)==1 && Number(item.lockstatus)==0" @click="lockUpIt(index)">{{$t("sc.a1")}}</span>
                    <!-- <span  style="color:#00aedd;cursor:pointer;" v-if="Number(item.status.Recflag)==1" @click="goCZ(index)">已锁仓</span> -->

                </li>
            </ul>
            <div v-if="showData.length==0" class="unrecord">
                <img src="/static/img/unrecode.png" alt="">
                <p>{{$t("fu.a8")}}</p>
            </div>
        </div>
        <div class="mask" v-if="lockUp">
        </div>
        <div class="alert" v-if="lockUp">
            <p class="titleP">{{$t("sc.a2")}}
                <span @click="lockUp= false">
                    <Icon type="ios-close-empty" style="cursor:pointer;"></Icon>
                </span>
            </p>
            <p>
                {{$t("sc.a4")}}{{mounth}}{{$t("sc.a5")}}{{earn}}%。
            </p>
            <p>
                {{$t("sc.a6")}}
            </p>
            <p>
                {{$t("sc.a7")}}
            </p>
            <Form :model="formRight1" label-position="right" ref="formRight1" :rules="ruleValidate1">
                <FormItem prop="lockNum">
                    <input v-model="formRight1.lockNum" :placeholder="$t('sc.a9')" @input="inputIt" style="height: 40px !important;
                    width: 500px;border:1px solid #cccccc;border-radius:4px;padding-left:10px;"></input>
                </FormItem>
            </Form>
            <p style="text-align:right;margin-right:70px;">
                {{$t("sc.a8")}}
                <span style="color:#ef2121;margin-right:5px;">{{shouY}}</span>{{bName}}
            </p>
            <p style="text-align:right;margin-right:70px;margin-top:5px;">
                {{$t("sc.a10")}}
                <span style="color:#ef2121;margin-right:5px;">{{lockmin}}</span>{{bName}}
                <span style="margin-right:10px;"></span>{{$t("t.a6")}}：
                <span style="color:#ef2121;margin-right:5px;">{{goldnum}}</span>{{bName}}
            </p>
            <div class="btn">
                <Button type="primary" size="large" @click="lockDown('formRight1')" :disabled="noclick">{{$t("sc.a1")}}</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import { FloatCal } from '../../assets/lib/floatCal'
    let floatCal = new FloatCal()
    export default {
        data() {
            const validateMobile = (rule, value, callback) => {
                if (!/^([0-9]+(\.[0-9]+)?|10)$/.test(value)) {
                    callback(new Error(this.$t('input.b33')));
                } else {
                    if (value <= this.fee) {
                        callback(new Error(this.$t('input.b7')));
                    } else if (value > Number(this.yue)) {
                        callback(new Error(this.$t('input.b4')));
                    } else {
                        if (value.indexOf(".") > 0) {
                            let len = value.split(".")[1].length;
                            let l;
                            if (this.lockdigit == 0) {
                                callback(new Error(this.$t('sc.a18')));
                            } else {
                                if (len > this.lockdigit) {
                                    l = len - this.lockdigit || 0;
                                    callback(new Error(this.$t('input.b10') + "  " + this.lockdigit + "  " + this.$t('input.b11')));
                                } else {
                                    callback();
                                }
                            }

                        } else {
                            callback();
                        }

                    }
                }
            };
            return {
                total: '',//总资产
                showData: [
                ],
                mounth: 1,
                earn: 1,
                typeid: 1,
                goldnum: 1,
                lockmin: 1,
                lockdigit: 2,
                apiUrl: this.Global.URL,
                lockUp: false,
                noclick: false,
                bName: "CNHA",
                shouY: 0,
                formRight1: {
                    lockNum: '',
                },
                ruleValidate1: {
                    lockNum: [
                        { required: true, message: this.$t('sc.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            // lockPosition
            init() {
                this.FetchPost(this.requestUrl.FinanceCenter.accountList, {}).then(res => {
                    if (res.status == 200) {
                        this.total = res.data.total;
                        this.total = this.total.toString().delFixed(2);
                        if (res.data.data) {
                            this.showData = res.data.data.filter((item, index) => {
                                if (item.tfloal == 0) {
                                    item.goldnum = parseInt(item.goldnum);
                                    item.gdgold = parseInt(item.dj);
                                    item.total = parseInt(item.total);
                                    return true
                                } else {
                                    item.goldnum = item.goldnum.delFixed(Number(item.tfloal));
                                    item.gdgold = item.dj.delFixed(Number(item.tfloal));
                                    item.total = item.total.delFixed(Number(item.tfloal));
                                    return true
                                }
                            });
                        }
                    } else {
                        this.showData = [];
                    }

                })
            },
            inputIt() {
                // if(this.formRight1.lockNum=""){
                //     return false;
                // }
                if (this.lockdigit != 0 && this.formRight1.lockNum) {
                    this.buyPrice = this.formRight1.lockNum;
                    // num = num.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                    // num = num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                    // num = num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    var reg = eval("/(^[1-9]\\d*(\\.\\d{1," + this.lockdigit + "})?$)|(^0(\\.\\d{1,"+this.lockdigit+"})?$)/");
                    var ret = eval("/^\\d+\\.{0,1}\\d{1," + this.lockdigit + "}$/");

                    if (reg.test(this.buyPrice)) {
                    } else {
                        if (!ret.test(this.buyPrice)) {

                            if (this.buyPrice.match(eval("/\\d+\\.{0,1}\\d{1,"+this.lockdigit+"}/")) == null) {
          
                                this.buyPrice = this.buyPrice.substr(0, this.buyPrice.length - 1)
                            }
                  
                            this.buyPrice = this.buyPrice.match(eval("/\\d+\\.{1}\\d{1,"+this.lockdigit+"}/"))[0]
               
                        }

                        this.formRight1.lockNum = this.buyPrice;


                        // this.warning(this.$t("bbb.a7"))


                        // num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                        // if (num.indexOf(".") < 0 && num != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                        //     num = parseFloat(num);
                        // }

                    }
                } else {
                    this.formRight1.lockNum = parseInt(this.formRight1.lockNum) || "";
                }
                if (Number(this.formRight1.lockNum)) {
                    if (this.lockdigit == 0) {
                        this.shouY = this.earn * Number(this.formRight1.lockNum) * 0.01
                    } else {
                        this.shouY = (this.earn * Number(this.formRight1.lockNum) * 0.01).toString().delFixed(this.lockdigit);
                    }

                } else {
                    this.shouY = 0;
                }
            },
            lockUpIt(idx) {
                this.formRight1.lockNum = "";
                this.shouY = 0;
                this.earn = this.showData[idx].rate[0].rate || 1;
                this.mounth = this.showData[idx].rate[0].timelength || 1;
                this.goldnum = this.showData[idx].goldnum || 0;
                this.lockmin = this.showData[idx].lockmin || 0;
                this.typeid = this.showData[idx].typeid || 1;
                this.lockdigit = this.showData[idx].lockdigit || 1;
                this.bName = this.showData[idx].nickname;
                this.lockUp = true;
            },
            lockDown(name) {
                let params = {};
                params.typeid = this.typeid;
                params.number = this.formRight1.lockNum;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.noclick = true;
                        this.FetchPost(this.requestUrl.FinanceCenter.lockPosition, params).then(res => {
                            if (res.status == 200) {
                                this.lockUp = false;
                                this.noclick = false;
                                this.$Notice.success({
                                    title: this.$t('sc.a17')
                                })
                                this.init();
                            } else if (res.status == 402) {
                                this.lockUp = false;
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('sc.a12')
                                })
                            } else if (res.status == 403) {
                                this.lockUp = false;
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('sc.a16')
                                })
                            } else if (res.status == 405) {
                                this.lockUp = false;
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('sc.a14')
                                })
                            } else if (res.status == 406) {
                                this.lockUp = false;
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('sc.a15')
                                })
                            } else if (res.status == 407) {
                                this.lockUp = false;
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('sc.a16')
                                })
                            } else if (res.status == 408) {
                                this.lockUp = false;
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('input.b4')
                                })
                            } else {
                                this.lockUp = false;
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('sc.a12')
                                })
                            }
                        })
                    } else {
                        this.shouY = 0;
                    }
                })
                this.formRight1.lockNum = "";
            },
            goCZ(idx) {
                this.$router.push({
                    name: "/financial/deposit",
                    params: {
                        index: idx
                    }
                })
            },
            goTx(idx) {
                this.$router.push({
                    name: "/financial/withdraw",
                    params: {
                        index: idx
                    }
                })
            },
        },
        created() {
            this.init();
        },
        beforeDestroy() {
            clearInterval(this.timer)
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/account.scss"
</style>