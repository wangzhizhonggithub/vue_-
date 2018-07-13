<template>
    <div class="v-tradeOper">
        <div class="v-main">
            <div class="main">
                <div class="buy" v-if="jyqData">
                    <p>{{$t("re.a2")}} CNHA</p>
                    <div class="inp">
                        <input type="text" disabled :placeholder="jyqData.buyprice">
                        <span class="sps">{{$t("t.b1")}} CNY</span>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="buyNum" @input="suMon"  @keyup.enter="jyqBs(1)">
                        <span>{{$t("t.b2")}} CNHA</span>
                    </div>
                    <b>{{$t("account.a4")}}
                        <span>{{buyMon}} CNY</span>
                    </b>
                    <div class="buyBtn" @click="jyqBs(1)">
                        {{$t("re.a2")}}(CNY→CNHA)
                    </div>
                </div>
                <div class="sell" v-if="jyqData">
                    <p>{{$t("re.a3")}} CNHA
                        <span>{{$t("cc.a3")}}{{jyqData.goldnum}}</span>
                    </p>
                    <div class="inp">
                        <input type="text" disabled :placeholder="jyqData.sellprice">
                        <span class="sps">{{$t("t.b3")}} CNY</span>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="sellNum" @input="suMon1" @keyup.enter="jyqBs(0)">
                        <span>{{$t("t.b4")}} CNHA</span>
                    </div>
                    <CheckboxGroup v-model="type" class="check">
                        <span style="margin-right:10px;">{{$t("cc.a4")}}</span>
                        <Checkbox label="2">
                            <span>{{$t("cc.a5")}}</span>
                        </Checkbox>
                        <Checkbox label="3">
                            <span>{{$t("cc.a6")}}</span>
                        </Checkbox>
                        <Checkbox label="1" disabled>
                            <span>{{$t("cc.a7")}}</span>
                        </Checkbox>
                    </CheckboxGroup>
                    <b style="margin-right:0px;">{{$t("account.a4")}}
                        <span>{{sellMon}} CNY</span>
                    </b>
                    <div class="sellBtn" @click="jyqBs(0)">
                        {{$t("re.a3")}}(CNHA→CNY)
                    </div>
                </div>
                <div class="buy" v-if="!jyqData">
                    <p>{{$t("re.a2")}} CNHA</p>
                    <div class="inp">
                        <input type="text" disabled :placeholder="0.99">
                        <span class="sps">{{$t("t.b1")}} CNY</span>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="buyNum" @input="suMon">
                        <span>{{$t("t.b2")}} CNHA</span>
                    </div>
                    <b>{{$t("account.a4")}}
                        <span>123 CNY</span>
                    </b>
                    <div class="buyBtn" @click="jyqBs(1)">
                        {{$t("re.a2")}}(CNY→CNHA)
                    </div>
                </div>
                <div class="sell" v-if="!jyqData">
                    <p>{{$t("re.a3")}} CNHA
                        <span>{{$t("cc.a3")}}123</span>
                    </p>
                    <div class="inp">
                        <input type="text" disabled :placeholder="1">
                        <span class="sps">{{$t("t.b3")}} CNY</span>
                    </div>
                    <div class="inp">
                        <input type="text" v-model="sellNum" @input="suMon1">
                        <span>{{$t("t.b4")}} CNHA</span>
                    </div>
                    <CheckboxGroup v-model="type" class="check">
                        <span style="margin-right:10px;">{{$t("cc.a4")}}</span>
                        <Checkbox label="2">
                            <span>{{$t("cc.a5")}}</span>
                        </Checkbox>
                        <Checkbox label="3">
                            <span>{{$t("cc.a6")}}</span>
                        </Checkbox>
                        <Checkbox label="1" disabled>
                            <span>{{$t("cc.a7")}}</span>
                        </Checkbox>
                    </CheckboxGroup>
                    <b style="margin-right:0px;">{{$t("account.a4")}}
                        <span>123 CNY</span>
                    </b>
                    <div class="sellBtn" @click="jyqBs(0)">
                        {{$t("re.a3")}}(CNHA→CNY)
                    </div>
                </div>
                <div class="new" style="clear:both;"></div>
                <div class="info">
                    <h1>{{$t("cc.a8")}}</h1>
                    <p>{{$t("cc.a9")}}</p>
                    <p>{{$t("cc.a10")}}</p>
                    <p>{{$t("cc.a11")}}</p> 
                    <p>{{$t("cc.a123")}}</p>
                    <p style="color:#ef2121;margin-bottom:15px;">{{$t("cc.a12")}}</p>
                </div>
                <div style="padding-bottom:30px;"></div>
            </div>
        </div>
        <div class="v-record" v-if="jyqData">
            <h2>{{$t("cc.a13")}}</h2>
            <div-table :columns="currCol" :data="showData"></div-table>
            <div class="unrecord" v-if="showData.length==0">
                <img src="/static/img/unrecode.png" alt="">
                <p>{{$t("fu.a8")}}</p>
            </div>
            <Page :total="total" size="small" :page-size="5" :current="current" style="text-align:center;padding:30px 0;" v-if="showData.length>0"
                @on-change="changePage"></Page>
        </div>
        <!-- sak -->
        <Modal v-model="modal2" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("cc.d4")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("cc.a14")}}</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                    border-color: #00aedd;" @click="changeStyle" >{{$t("cc.d5")}}</Button>
            </div>
        </Modal>
        <Modal v-model="modal1" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("cc.d4")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("cc.a15")}}</p>
                <P>{{$t("cc.a16")}}</P>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                    border-color: #00aedd;" @click="modal1=false" >{{$t("cc.d5")}}</Button>
            </div>
        </Modal>
        <Modal v-model="bankModal" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("cc.d4")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("cc.a17")}}</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                    border-color: #00aedd;" @click="goUp">{{$t("config.action2")}}</Button>
            </div>
        </Modal>
        <Modal v-model="sureModel" width="360" class-name="vertical-center-modal" :closable="false">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("cc.d4")}}</span>
            </p>
            <div style="text-align:center">
                <p style="color: #ff0000;">{{$t("cc.a18")}}</p>
                <p style="color: #ff0000;">{{$t("cc.a19")}}</p>
            </div>
            <div slot="footer" style="overflow:hidden">
                <!-- <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                    border-color: #00aedd;">{{$t("cc.a20")}}</Button> -->
                     <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                    border:none;width:48%;float:left" @click="sureBuy">{{$t("cc.d5")}}</Button>
           <Button   size="large" long :loading="modal_loading" style=" background-color: white;border:none;color:#00aedd;
                     width:48%;float:left" @click="CancelsureModel" >{{$t("cc.b11")}}</Button>
            </div>
        </Modal>
        <Modal v-model="sureModel1" width="360" class-name="vertical-center-modal">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("cc.d4")}}</span>
            </p>
            <div style="text-align:center">
                <p>{{$t("cc.d6")}}</p>
                <p>{{$t("cc.d7")}}</p>
            </div>
            <div slot="footer" @click="sureSell">
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                     border-color: #00aedd;">{{$t("cc.d8")}}</Button>
            </div>
        </Modal>
        <Modal v-model="cancelModal" width="360" class-name="vertical-center-modal" :closable="false">
            <p slot="header" style="color:#00adee;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>{{$t("cc.d4")}}</span>
            </p>
            <div style="text-align:center">
                <p style="color: #ff0000;">{{$t("cc.b1")}}</p>
                <p style="color: #ff0000;">{{$t("cc.b2")}}</p>
            </div>
            <div slot="footer" style="overflow:hidden" >
                 
                <Button type="error" size="large" long :loading="modal_loading" style="background-color: #00aedd;
                    border:none;width:48%;float:left" @click="sureCancel">{{$t("cc.d5")}}</Button>
           <Button   size="large" long :loading="modal_loading" style=" background-color: white;border:none;color:#00aedd;
                     width:48%;float:left" @click="Cancel" >{{$t("cc.b11")}}</Button>
            </div>
        </Modal>
        <div class="delmask" v-if="tranModal">
        </div>
        <div class="alertModal" v-if="tranModal">
            <p>{{$t("names.name6")}}
                <span @click="tranModal = false">
                    <Icon type="ios-close-empty" @click.native="formRight1.transpwd = ''" style="cursor:pointer;"></Icon>
                </span>
            </p>
            <Form :model="formRight1" label-position="right" :label-width="100" ref="formRight1" :rules="ruleValidate1">
                <FormItem :label="$t('w.b7')" prop="transpwd">
                    <Input v-model="formRight1.transpwd" type="password"></Input>
                </FormItem>
            </Form>
            <div class="btn">
                <Button type="primary" size="large" @click="sendIt(0)">{{$t("cc.d5")}}</Button>
            </div>
        </div>
    </div>
</template>
<script>
    import divTable from '../../TradingCenter/tradCommission/tradCommissionCom/divTable.vue';
    import buyCard from './buyCard.vue'
    export default {
        components: {
            divTable, buyCard
        },
        props: {
            jyqData: Object,
            jyqLog: Object,
            mapJlog: Function,
            mapJuserData:Function
        },
        data() {
            const validateTPwd = (rule, value, callback) => {
                if (!/^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/.test(value)) {
                    callback(new Error(this.$t('input.a21')));
                } else {
                    callback();
                }
            };
            return {
                type: ['1'],//收款方式,
                modal_loading: false,
                modal2: false,
                modal1: false,
                sureModel: false,
                showData: [],
                // page:1,
                current: 1,
                total: 0,
                cancelModal: false,
                bankModal: false,
                sureModel1: false,
                tranModal: false,
                buyNum: '',
                collectId: '',
                coOrder: '',
                payId: '',
                cancelId: '',
                cancelOrder: '',
                payOrder: '',
                isBank: 0,
                business: 0,
                sellNum: '',
                params: {},
                sellMon: 0,
                buyMon: 0,
                currCol: [
                    {
                        title: this.$t('cc.b3'),
                        key: 'id',
                        width: 100
                    },
                    {
                        type: 'expand',
                        width: 10,
                        render: (h, params) => {
                            return h(buyCard, {
                                props: {
                                    row: params.row.method,
                                    status: params.row.status,
                                    emitIt: this.sureCancel,
                                    rows: params.row
                                }
                            })
                        }
                    },
                    {
                        title: this.$t('de.a5'),
                        key: 'time',
                        width: 160,
                        align: 'center'
                    },
                    {
                        title: this.$t('cc.b4'),
                        key: 'flag',
                        width: 120
                    },
                    {
                        title: this.$t('re.a5') + '(CNY)',
                        key: 'price'
                    },
                    {
                        title: this.$t('de.a6') + '(CNHA)',
                        key: 'count'
                    },
                    {
                        title: this.$t('cc.b5') + '(CNY)',
                        key: 'total',
                    },
                    {
                        title: this.$t('de.a8'),
                        key: 'status',
                        width: 150
                    },
                    {
                        title: this.$t('account.a5'),
                        key: 'action',
                        // className:"last",
                        width: 200,
                        align: 'left',
                        render: (h, params) => {
                            if (params.row.flag == this.$t('dd.c3') && params.row.status == this.$t('dd.c6')) {
                                return h('div', [
                                    h('div', {
                                        style: {
                                            color: 'white',
                                            cursor: 'pointer',
                                            width: '50%',
                                            float: 'left',
                                            lineHeight:"30px",
                                            background:"#00aedd"
                                        },
                                        on: {
                                            click: () => {
                                                this.payOrder = params.row.id;
                                                this.business = params.row.business;
                                                this.payId = params.row.ordernum;
                                                this.sureModel = true
                                            }
                                        }
                                    }, this.$t('cc.b7')),
                                    h('div', {
                                        style: {
                                            color: '#00aedd',
                                            cursor: 'pointer',
                                            lineHeight:"30px"
                                        },
                                        on: {
                                            click: () => {
                                                this.cancelOrder = params.row.id;
                                                this.cancelId = params.row.ordernum;
                                                this.cancelModal = true
                                            }
                                        }
                                    }, this.$t('cc.b8'))
                                ]);
                            }

                        }
                    }

                ],
                formRight1: {
                    transpwd: '',
                },
                ruleValidate1: {
                    transpwd: [
                        { required: true, message: this.$t('input.a21'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            changeStyle() {
                this.modal2 = false;
                document.body.scrollTop = 500;
            },
            buy() {
                this.modal2 = true;
            },
            sell() {
                this.modal1 = true;
            },
            suMon() {
                this.buyNum = this.buyNum.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                this.buyNum = this.buyNum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                this.buyNum = this.buyNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                this.buyNum = this.buyNum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                if (this.buyNum.indexOf(".") < 0 && this.buyNum != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                    this.buyNum = parseFloat(this.buyNum);
                }
                let numReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if (numReg.test(this.buyNum)) {
                    this.buyMon = Number(this.buyNum).mul(this.jyqData.buyprice)
                } else {
                    this.buyMon = 0;
                }
            },
            sureSell() { //确认已收款
                this.FetchPost(this.requestUrl.twoCen.jyqReceiva, {
                    id: this.collectId,
                    ordernum: this.coOrder
                }).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('cc.b9')
                        });
                        this.sureModel1 = false;
                        this.mapJlog(this.current);
                    } else {
                        this.sureModel1 = false;
                        this.$Notice.warning({
                            title: this.$t('cc.b10')
                        });
                    }
                })
            },
            sureBuy() { //确认已付款
                this.FetchPost(this.requestUrl.twoCen.jyqpayMent, {
                    id: this.payId,
                    ordernum: this.payOrder
                }).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('cc.b9')
                        });
                        this.getcode();
                        this.sureModel = false;
                        this.mapJlog(this.current);

                    }else if(res.status==403){
                        this.$Notice.success({
                            title: this.$t('cc.b99')
                        });
                        this.sureModel1 = false;
                    } else {
                        this.sureModel1 = false;
                        this.$Notice.warning({
                            title: this.$t('cc.b10')
                        });
                    }
                })
            },
            getcode() {  //发送短信验证码
                let params = {};
                params.tplid = 69919,
                    params.userid = this.business;
                this.FetchPost(this.requestUrl.twoCen.sendCode, params).then(res => {
                    if (res.status == 200) {

                    } else {

                    }
                })
            },
            sureCancel(id, order) {  //确定取消
                this.FetchPost(this.requestUrl.twoCen.Cancellation, {
                    id: this.cancelId || id,
                    ordernum: this.cancelOrder || order
                }).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('cc.b12')
                        });
                        this.cancelModal = false;
                        this.mapJlog(this.current);
                    } else {
                        this.cancelModal = false;
                        this.$Notice.warning({
                            title: this.$t('cc.b10')
                        });
                    }
                })
            },
            Cancel(){
                this.cancelModal = false;
            },
            CancelsureModel(){
                this.sureModel=false;
            },
            suMon1() { //计算卖出cnha
                this.sellNum = this.sellNum.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
                this.sellNum = this.sellNum.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
                this.sellNum = this.sellNum.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                this.sellNum = this.sellNum.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
                if (this.sellNum.indexOf(".") < 0 && this.sellNum != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
                    this.sellNum = parseFloat(this.sellNum);
                }
                let numReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                if (numReg.test(this.sellNum)) {
                    this.sellMon = Number(this.sellNum).mul(this.jyqData.sellprice);
                    if (this.sellNum > this.jyqData.goldnum) {
                        this.$Notice.warning({
                            title: this.$t('dd.c1')
                        });
                        this.sellMon = 0;
                        this.sellNum = "";
                    }
                } else {
                    this.sellMon = 0;
                }
            },
            changePage(page) {
                this.current = page;
                this.mapJlog(page);
            },
            goUp() {  //跳转到财务中心充值
                this.$router.push("/financial/collection")
            },
            sendIt(flag) {  //交易区买入卖出
                if (localStorage.getItem("lan") == "zh") {
                    this.params.lantype = 1
                } else {
                    this.params.lantype = 4
                }

                if (flag == 0) {
                    this.params.transpwd = this.md5(this.formRight1.transpwd);
                    this.$refs['formRight1'].validate((valid) => {
                    if (valid) {
                        this.tranModal = false;
                        this.FetchPost(this.requestUrl.twoCen.work, this.params).then(res => {
                            if (res.status == 200) {
                                this.mapJlog(1)
                                this.mapJuserData();
                                if (flag == 1) {
                                    //     this.$Notice.success({
                                    //     title: '买入成功'
                                    //   });   
                                    this.modal2 = true;
                                } else {
                                    //     this.$Notice.success({
                                    //     title: '卖出成功'
                                    //   });     
                                    this.modal1 = true;
                                }
                            } else if (res.status == 101) {
                                this.$Notice.warning({
                                    title: this.$t('cc.c1')
                                });
                            } else if (res.status == 102) {  //102   最多买入/卖出量不可高于xxx
                                this.$Notice.warning({
                                    title: this.$t('dd.b13') + res.data
                                });
                            } else if (res.status == 1021) {  //102   最多买入/卖出量不可高于xxx
                                this.$Notice.warning({
                                    title: this.$t('dd.b14') + res.data
                                });
                            } else if (res.status == 1031) {  //102   最多买入/卖出量不可高于xxx
                                this.$Notice.warning({
                                    title: this.$t('dd.b15') + res.data
                                });
                            } else if (res.status == 103) {  //103   最少买入/卖出量不可低于xxx
                                this.$Notice.warning({
                                    title: this.$t('dd.b16') + res.data
                                });
                            } else if (res.status == 104) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('dd.b13') + res.data,
                                });
                            } else if (res.status == 1041) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('dd.b14') + res.data,
                                });
                            } else if (res.status == 105) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('input.b4')
                                });
                            } else if (res.status == 106) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            } else if (res.status == 107) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('cc.c2')
                                });
                            } else if (res.status == 108) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('cc.c3')
                                });
                            } else if (res.status == 109) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('cc.c4')
                                });
                            } else {
                                this.$Notice.warning({
                                    title: this.$t('cc.b10')
                                });
                            }

                            this.sellNum = "";
                            this.sellMon = 0;
                            this.buyNum = "";
                            this.buyMon = 0;
                            this.formRight1.transpwd = '';
                        })
                    }
                })
                }else{
                        this.tranModal = false;
                        this.FetchPost(this.requestUrl.twoCen.work, this.params).then(res => {
                            if (res.status == 200) {
                                this.mapJlog(1)
                                if (flag == 1) {
                                    //     this.$Notice.success({
                                    //     title: '买入成功'
                                    //   });   
                                    this.modal2 = true;
                                } else {
                                    //     this.$Notice.success({
                                    //     title: '卖出成功'
                                    //   });     
                                    this.modal1 = true;
                                }
                            } else if (res.status == 101) {
                                this.$Notice.warning({
                                    title: this.$t('cc.c1')
                                });
                            } else if (res.status == 102) {  //102   最多买入/卖出量不可高于xxx
                                this.$Notice.warning({
                                    title: this.$t('dd.b13') + res.data
                                });
                            } else if (res.status == 1021) {  //102   最多买入/卖出量不可高于xxx
                                this.$Notice.warning({
                                    title: this.$t('dd.b14') + res.data
                                });
                            } else if (res.status == 1031) {  //102   最多买入/卖出量不可高于xxx
                                this.$Notice.warning({
                                    title: this.$t('dd.b15') + res.data
                                });
                            } else if (res.status == 103) {  //103   最少买入/卖出量不可低于xxx
                                this.$Notice.warning({
                                    title: this.$t('dd.b16') + res.data
                                });
                            } else if (res.status == 104) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('dd.b13') + res.data,
                                });
                            } else if (res.status == 1041) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('dd.b14') + res.data,
                                });
                            } else if (res.status == 105) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('input.b4')
                                });
                            } else if (res.status == 106) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            } else if (res.status == 107) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('cc.c2')
                                });
                            } else if (res.status == 108) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('cc.c3')
                                });
                            } else if (res.status == 109) {  //104 最多买入/卖出量不可高于xxx(商户余额)
                                this.$Notice.warning({
                                    title: this.$t('cc.c4')
                                });
                            } else {
                                this.$Notice.warning({
                                    title: this.$t('cc.b10')
                                });
                            }

                            this.sellNum = "";
                            this.sellMon = 0;
                            this.buyNum = "";
                            this.buyMon = 0;
                            this.formRight1.transpwd = '';
                        })
                    }
            },
            jyqBs(flag) {  //验证
                if (this.regParams(flag)) {
                    this.params = this.regParams(flag);
                } else {
                    return false
                }
                if (this.isBank) {  //设置银行卡
                    this.bankModal = false;
                    if (flag == 0) {
                        this.tranModal = true;
                    } else {
                        this.sendIt(flag);
                    }
                } else {
                    this.bankModal = true;
                    return false
                }

            },
            regParams(type) { //正则判断
                let obj = {};
                let numReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
                obj.flag = type;
                if (type == 0) {
                    obj.sellprice = this.jyqData.sellprice;
                    obj.checkbox = this.type;

                    if (this.sellNum == "") {
                        this.$Notice.warning({ title: this.$t('cc.c5') })
                        return false
                    } else {
                        if (numReg.test(this.sellNum)) {
                            obj.num = this.sellNum

                        } else {
                            this.$Notice.warning({ title: this.$t('cc.c6') })
                            return false
                        }
                    }
                } else if (type == 1) {
                    obj.buyprice = this.jyqData.buyprice;
                    if (this.buyNum == "") {
                        this.$Notice.warning({ title: this.$t('cc.c7') })
                        return false
                    } else {
                        if (numReg.test(this.buyNum)) {

                            obj.num = this.buyNum

                        } else {
                            this.$Notice.warning({ title: this.$t('cc.c6') })
                            return false
                        }
                    }

                }
                return obj
            },
            formatDate(date) {
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
                var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
                return Y + M + D + h + m + s;
            },
            mapData(data) {
                let _this = this;
                this.showData = data.map((element, index) => {

                    let id = ''
                        , time = ''
                        , addtime = ''
                        , price = ''
                        , count = ''
                        , total = ''
                        , status = ''
                        , buyer = ''
                        , type = ''
                        , memo = ''
                        , flag = ''
                        , transfer = ''
                        , abc = ''
                        , business = ''
                        , ordernum = ''
                        , method = []
                        , _disableExpand = false
                        , _expanded = false
                    if (element.flag == 0) {
                        flag = this.$t('dd.c2');
                        _disableExpand = true;
                    } else {
                        flag = this.$t('dd.c3');
                    }

                    addtime = new Date((Number(element.addtime) * 1000));
                    time = _this.formatDate(addtime);
                    id = element.ordernum;
                    buyer = element.xm;
                    price = element.price.delFixed(Number(2));
                    count = element.num.delFixed(Number(2));
                    total = element.total.delFixed(Number(2));
                    business = element.business;
                    type = abc;
                    memo = element.remark;
                    method = element.method;
                    ordernum = element.id;
                    if (element.status == 0 && element.flag == 1) {
                        status = this.$t('dd.c6');
                    } else if (element.status == 0 && element.flag == 0) {
                        status = this.$t('dd.c7');
                    } else if (element.status == 1) {
                        status = this.$t('dd.c4');
                    } else if (element.status == 2 && element.flag == 1) {
                        status = this.$t('dd.c8');
                    } else if (element.status == 3) {
                        status = this.$t('dd.c5');
                        _disableExpand = true;
                    }
                    if (index == 0 && flag != this.$t('dd.c2') && status == this.$t('dd.c6')) {
                        _expanded = true
                    }
                    return {
                        id,
                        time,
                        price,
                        count,
                        total,
                        status,
                        buyer,
                        total,
                        memo,
                        _disableExpand,
                        type,
                        method,
                        ordernum,
                        _expanded,
                        flag,
                        business
                    }
                });
            },
        },
        created() {
            if (this.jyqData) {
                this.isBank = Number(this.jyqData.bank);
            }
            if (this.jyqLog) {
                this.total = Number(this.jyqLog.count);
                this.mapData(this.jyqLog.data);
            } else {
                this.showData = [];
            }

        },
        watch: {
            jyqData() {
                if (this.jyqData) {
                    this.isBank = Number(this.jyqData.bank);
                }
            },
            jyqLog(newVal, oldVal) {
                if (this.jyqLog) {
                    this.total = Number(this.jyqLog.count);
                    this.mapData(this.jyqLog.data);
                } else {
                    this.showData = [];
                }
            }
        }
    }
</script>
<style lang="scss">
    @import './css/tradeSector.scss';
</style>