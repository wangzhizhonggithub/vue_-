<template>
    <div class="w_conent" v-if="show">
        <div class="w_header">
            <h2>{{$t("fins.name3")}}</h2>
        </div>
        <div class="w-main">
            <ul class="topUl">
                <li v-for="(item,index) in headList" :class="index==currentIndex?'lis':''" @click="toggleTab(index,item.id)">
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <div class="formStyle" v-if="(chkReal && Withflag==1 && !country) || (chkReal && Withflag==1 && country && level>=2)">
                <Form :model="formRight" label-position="right" :label-width="150" :rules="ruleValidate" ref="formValidate">
                    <FormItem :label="$t('w.b3')" prop="address">
                        <input type="text" list="url_list" name="text" class="inpus" v-model="formRight.address" @keyup="judge" />

                        <datalist id="url_list">
                            <option v-for="item in addressList" :label="item.address" :value="item.address" />
                        </datalist>
                        <div class="ivu-form-item-error-tip" v-if="errorShow">{{error}}</div>
                        <strong @click="gofunds">{{$t('fins.name4')}}</strong>
                    </FormItem>
                    <FormItem :label="$t('w.b4')" prop="num">
                        <Input v-model="formRight.num" @on-change="map()" style="margin-bottom:30px;"></Input>
                        <span>{{name}}</span>
                        <p>{{$t('account.a2')}}：{{yue}}
                            <em style="margin-left:60px;font-style: normal;"> {{$t('w.b8')}} ：{{txed}}</em>
                        </p>

                        <b @click="goAuth" style="margin-top:25px;">{{$t('w.b9')}}</b>
                    </FormItem>
                    <FormItem :label="$t('w.b5')">
                        <Input v-model="formRight.feenum" disabled></Input>
                        <span>{{name}}</span>
                    </FormItem>
                    <FormItem :label="$t('w.b6')">
                        <Input v-model="formRight.arrivalnum" disabled></Input>
                        <span>{{name}}</span>
                    </FormItem>
                    <FormItem :label="$t('w.b7')" prop="transpwd">
                        <Input v-model="formRight.transpwd" type="password"></Input>
                    </FormItem>
                    <FormItem :label="$t('w.a10')" prop="onecode" v-if="chkAuth && gtype">
                        <Input v-model="formRight.onecode"></Input>
                    </FormItem>
                </Form>
                <div class="btn">
                    <Button type="primary" size="large" @click="TB('formValidate')" :disabled="noclick">{{$t("fins.name3")}}</Button>
                </div>
            </div>
            <div v-if="(chkReal && Withflag==0 && !country) || (Withflag==0 && country && level>=2)">
                <p style="color:#555555;font-size:18px;line-height:80px;">
                    {{$t("w.a9")}}
                </p>
            </div>
            <div class="info" v-if="(chkReal&&!country) || (chkReal &&country && level>=2 )">
                <h4>{{$t("account.a7")}}</h4>
                <p>
                    {{$t("w.a1")}}
                </p>
                <p>
                    {{$t("w.a2")}}
                </p>
            </div>
            <!-- 没有实名认证过 判断chkreal -->
            <div class="msg" v-if="!chkReal || (chkReal && country && level==1 && type==4)">
                <p>
                    <span>{{$t("w.b1")}}</span>
                    <Button type="primary" @click="goAuth">{{$t("message.intru3")}}</Button>
                </p>
            </div>
            <!-- 实名认证过 但是正在审核中 国内一级过   国外二级过-->
            <div class="msg" v-if="chkReal && country && (type==0 || type==2) && level<2">
                <p>
                    <span>{{$t("w.b2")}}</span>
                </p>
            </div>
        </div>
        <div class="ac_th">
            <ul>
                <li>{{$t("de.a5")}}</li>
                <li>{{$t("fu.a1")}}</li>
                <li>{{$t("de.a66")}}({{name}})</li>
                <li>{{$t("de.a8")}}</li>
                <li>{{$t("account.a5")}}</li>
            </ul>
        </div>
        <div class="ac_td">
            <ul v-for="item in txList">
                <li>{{item.addtime}}</li>
                <li>
                    <span v-if="item.address">{{item.address}}</span>
                    <span v-if="!item.address">--</span>
                </li>
                <li>{{item.goldnum}}</li>
                <li v-if="Number(item.status)==0"> {{$t("w.a3")}}</li>
                <li v-if="Number(item.status)==1"> {{$t("w.a4")}}</li>
                <li v-if="Number(item.status)==2"> {{$t("w.a5")}}</li>
                <li v-if="Number(item.status)==3"> {{$t("w.a6")}}</li>
                <li v-if="Number(item.status)==4"> {{$t("w.a7")}}</li>
                <li v-if="Number(item.status)==5"> {{$t("w.a77")}}</li>
                <li>
                    <span v-if="item.status!=0"></span>
                    <span v-if="item.status==0" @click="cancel(item.id)" style="cursor:pointer;color:#00adee"> {{$t("w.a8")}}</span>
                </li>
            </ul>
            <div v-if="txList.length==0" class="unrecord">
                <img src="/static/img/unrecode.png" alt="">
                <p>{{$t("fu.a8")}}</p>
            </div>
        </div>
        <div class="yz" v-if="txList.length>0">
            <Button type="primary" size="large" @click="loadMore">{{$t("fu.a7")}}</Button>
        </div>
        <Modal v-model="modal2" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("hh.a3")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("w.b10")}}</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="sureDel">{{$t("w.a8")}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import { FloatCal } from '../../assets/lib/floatCal'
    let floatCal = new FloatCal()
    export default {
        data() {
            const validateMobile = (rule, value, callback) => {
                if (!/^([0-9]+(\.[0-9]+)?|10)$/.test(value)) {
                    callback(new Error(this.$t('sc.a20')));
                } else {
                    if (value <= this.fee) {
                        callback(new Error(this.$t('input.b7')));
                    } else if (value > Number(this.yue)) {
                        callback(new Error(this.$t('input.b4')));
                    } else {
                        if (value.indexOf(".") > 0) {
                            let len = value.split(".")[1].length;
                            let l;
                            if (len > this.tfloal) {
                                l = len - this.tfloal || 0;
                                callback(new Error(this.$t('input.b10') + "  " + this.tfloal + "  " + this.$t('input.b11')));
                            } else {
                                callback();
                            }
                        } else {
                            callback();
                        }

                    }
                }
            };
            const validateMobile1 = (rule, value, callback) => {
                if (!Number.isInteger(+value)) {
                    callback(new Error(this.$t('input.a10')));
                } else {
                    callback();
                }
            };
            const validateTPwd = (rule, value, callback) => {
                if (!/^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/.test(value)) {
                    callback(new Error(this.$t('input.a21')));
                } else {
                    callback();
                }
            };
            const validateAds = (rule, value, callback) => {
                if (value.replace(/^[0-9a-zA-Z]*$/g, '')) {
                    callback(new Error(this.$t('input.b2')));
                } else {
                    if (Number(this.formRight.address.length) != this.addressLen) {
                        callback(new Error(this.$t('input.b8') + "  " + this.addressLen + this.$t('input.b9')));
                    } else {
                        callback();
                    }
                }
            };
            return {
                spanshow: true,
                spanshow1: true,
                typeid: 1,
                chkAuth: 0,
                gtype: 0,
                chkReal: 1,
                country: '',
                type: 0,
                level: 0,
                modal2: false,
                error: "",
                show: false,
                errorShow: 0,
                modal_loading: false,
                n: 1,
                state: 0,//中国与国外的区别
                tfloal: 2,
                name: 'CNHA',
                addressLen: 0,
                Withflag: 1,
                yue: 0,
                currentIndex: 0,
                txed: 0,
                delid: 0,
                noclick: false,
                formRight: {
                    num: '',
                    address: '',
                    transpwd: '',
                    onecode: '',
                    feenum: '',
                    arrivalnum: '',
                },
                ruleValidate: {
                    num: [
                        { required: true, message: this.$t('input.b3'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    address: [
                        // { required: true, message:this.$t('input.b1'), trigger: 'blur' },
                        // { validator: validateAds, trigger: 'change' }
                    ],
                    transpwd: [
                        { required: true, message: this.$t('input.a12'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' }
                    ],
                    onecode: [
                        { required: true, message: this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile1, trigger: 'blur' }
                    ],
                    feenum: [
                        { required: true, message: 'The feenum code cannot be empty', trigger: 'blur' },
                    ],
                    arrivalnum: [
                        { required: true, message: 'The arrivalnum code cannot be empty', trigger: 'blur' },
                    ],

                },
                current: 1,
                showData: [
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 1 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 2 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 1 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 2 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 1 },
                    { time: "2018-01-04 15:09:03", num: "10", count: "10", state: 2 },
                ],
                columns1: [
                    {
                        title: '时间',
                        key: 'name'
                    },
                    {
                        title: '流水号',
                        key: 'age'
                    },
                    {
                        title: '金额（￥）',
                        key: 'address'
                    },
                    {
                        title: '充值方式',
                        key: 'name1'
                    },
                    {
                        title: '状态',
                        key: 'age1'
                    },
                    {
                        title: '操作',
                        key: 'address1'
                    }
                ],
                data1: [

                ],
                headList: [],
                addressList: [],
                txList: [],
            }
        },
        methods: {
            init() {
                this.formRight.num = "";
                this.formRight.address = "";
                this.formRight.transpwd = "";
                this.formRight.onecode = "";
                this.formRight.feenum = "";
                this.formRight.arrivalnum = "";
                // this.typeid=sessionStorage.getItem("typeid");

                this.currentIndex = sessionStorage.getItem("currentIndex") || 0;
                this.n = sessionStorage.getItem("n") || 1;
                this.FetchGet(this.requestUrl.FinanceCenter.headList, {}).then(res => {
                    this.headList = res.data.tb;
                    this.gtype = Number(res.data.gtype);
                    let data = this.headList[this.currentIndex];
                    this.Withflag = Number(data.status.Withflag);
                    this.name = data.name;
                    this.typeid = data.id;
                    this.fee = Number(data.fee);
                    this.tfloal = Number(data.tfloal);
                    this.addressLen = Number(data.addresslen); //地址长度
                    this.show = true;
                    if (data.yue) {
                        this.yue = data.yue.toString().delFixed(this.tfloal);
                    }
                    if(data.txed){
                        this.txed = data.txed.toString().delFixed(2);

                    }
                    this.FetchPost(this.requestUrl.FinanceCenter.Txaddress, { typeid: this.typeid }).then(res => {
                        this.addressList = res.data;
                    })
                    this.FetchPost(this.requestUrl.FinanceCenter.TxSuc, { typeid: this.typeid }).then(res => {

                    })
                    this.FetchGet(this.requestUrl.FinanceCenter.TXlog, { typeid: this.typeid, page: this.n }).then(res => {
                        if (res.status == 200) {
                            this.txList = res.data.filter((item, index) => {
                                let addtime = new Date((Number(item.addtime) * 1000));
                                item.addtime = this.formatDate(addtime);
                                item.goldnum = item.goldnum.delFixed(this.tfloal);
                                return true;
                            })
                        } else {
                            this.txList = [];
                        }
                    })
                })
            },
            judge() {
                this.error = "";
                this.errorShow = false;
                if (this.formRight.address.length == 0) {
                    this.errorShow = 1;
                    this.error = this.$t('input.b1');
                } else if (this.formRight.address.replace(/^[0-9a-zA-Z]*$/g, '')) {
                    this.errorShow = 1;
                    this.error = this.$t('input.b2');
                } else {
                    if (Number(this.formRight.address.length) != this.addressLen) {
                        this.errorShow = 1;
                        this.error = this.$t('input.b8') + "  " + this.addressLen + this.$t('input.b9');
                    } else {
                        this.errorShow = 0;
                        this.error = "";
                    }
                }
            },
            gofunds() {
                this.$router.push("/financial/funds")
            },
            goAuth() {
                this.$router.push("/security/authentication")
            },
            map() {
                this.formRight.feenum = this.fee;
                if (Number(this.formRight.feenum) < this.formRight.num) {
                    this.formRight.arrivalnum = floatCal.accSub(this.formRight.num, this.formRight.feenum);
                } else {
                    this.formRight.arrivalnum = 0;
                }
            },
            toggleTab(index, id) {
                this.n = 1;
                sessionStorage.setItem("currentIndex", index);
                sessionStorage.setItem("n", 1);
                if ((this.chkReal && this.Withflag == 1 && !this.country) || (this.chkReal && this.Withflag == 1 && this.country && this.level >= 2)) {
                    this.$refs['formValidate'].resetFields();
                }
                this.currentIndex = index;
                this.typeid = id;
                let data = this.headList[this.currentIndex];
                this.name = data.name;
                this.fee = data.fee;
                this.tfloal = Number(data.tfloal);
                this.addressLen = Number(this.headList[index].addresslen); //地址长度
                this.txList=[];
                if (data.yue) {
                    this.yue = data.yue.toString().delFixed(this.tfloal);
                }
                if(data.txed){
                        this.txed = data.txed.toString().delFixed(2);

                    }
                this.formRight.num = "";
                this.formRight.address = "";
                this.formRight.transpwd = "";
                this.formRight.onecode = "";
                this.formRight.feenum = "";
                this.formRight.arrivalnum = "";
                this.errorShow = 0;
                this.Withflag = Number(data.status.Withflag);
                this.init();
            },
            TB(name) {
                if (this.errorShow == true) {
                    return false;
                }
                if (this.txed == 0) {
                    this.$Notice.warning({
                        title: this.$t('aaa.e33')
                    });
                    return false;
                }
                let gAuth;
                if (this.chkAuth && this.gtype) {
                    gAuth = 1
                } else {
                    gAuth = 0
                }
                let params = {
                    typeid: this.typeid,
                    num: this.formRight.num,
                    address: this.formRight.address,
                    transpwd: this.md5(this.formRight.transpwd),
                    onecode: this.formRight.onecode,
                    feenum: this.formRight.feenum,
                    arrivalnum: this.formRight.arrivalnum,
                    gAuth: gAuth,
                    quota: this.txed,//提币限额
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.noclick = true;
                        this.FetchPost(this.requestUrl.FinanceCenter.TB, params).then(res => {
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('aaa.e1')
                                });
                                this.noclick = false;
                                this.init();
                            } else if (res.status == 202) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('aaa.e22')
                                });
                                this.init();
                            } else if (res.status == 402) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('aaa.e2')
                                });
                                this.init();
                            } else if (res.status == 405) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('aaa.c4')
                                });
                                this.init();
                            }else if (res.status == 112) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('aaa.c44')
                                });
                                this.init();
                            } else if (res.status == 406) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            } else if (res.status == 409) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('input.b12')
                                });
                            } else if (res.status == 410) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('input.b7')
                                });
                                this.init();
                            } else if (res.status == 408) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('input.b4')
                                });
                                this.init();
                            } else if (res.status == 401) {
                                this.noclick = false;
                                this.$Notice.warning({
                                    title: this.$t('aaa.e33')
                                });
                                this.init();
                            }
                        })
                    } else if (this.formRight.address == "") {
                        this.noclick = false;
                        this.errorShow = 0;
                        this.error = "";
                    } else {
                        this.noclick = false;
                    }
                })
            },
            cancel(id) {
                this.delid = id;
                this.modal2 = true;
                this.modal_loading = false;
            },
            sureDel() {
                this.FetchGet(this.requestUrl.FinanceCenter.cancel, { id: this.delid }).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: res.message
                        });
                        this.modal2 = false;
                        this.init();
                    } else {
                        this.$Notice.warning({
                            title: res.message || "操作失败"
                        });
                    }
                })
            },
            formatDate(date) {
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '   ';
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                return Y + M + D + h + m + s;
            },
            loadMore() {
                let getData;
                this.n++;
                this.FetchGet(this.requestUrl.FinanceCenter.TXlog, { typeid: this.typeid, page: this.n }).then(res => {
                    if (res.status == 200) {
                        getData = res.data.filter((item, index) => {
                            let addtime = new Date((Number(item.addtime) * 1000));
                            item.addtime = this.formatDate(addtime);
                            item.goldnum = item.goldnum.delFixed(Number(this.tfloal));
                            return true;
                        })

                        for (let i = 0; i < getData.length; i++) {
                            this.txList.push(getData[i])
                        }
                    } else {
                        this.n--;
                        sessionStorage.setItem("n", this.n);
                        this.$Notice.warning({
                            title: this.$t('aaa.e6')
                        })
                    }
                })
            },
            buildBTC() {
                this.spanshow = false;
            },
            buildETH() {
                this.spanshow1 = false;
            }
        },
        created() {
            this.chkAuth = Number(localStorage.getItem("chkAuth"));//判断用户是否验证谷歌
            if (this.$route.params.index) {
                sessionStorage.setItem("currentIndex", this.$route.params.index)
            }
            this.FetchGet(this.requestUrl.FinanceCenter.TiCheck, {}).then(res => {
                this.country = res.data.country;//判断用户的国际
                this.chkReal = Number(res.data.chkReal);//判断用户是是实名认真 0 || 1
                if (this.country == '中国大陆' || this.country == '') {
                    this.country = 0;
                } else {
                    this.country = 1;
                }
                this.type = Number(res.data.type);//  审核状态     0//正在审核 1 //审核通过 2//审核不通过                                                                                
                this.level = Number(res.data.level);//判断用户的等级


            })

            this.init();
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/withdrawal.scss"
</style>
