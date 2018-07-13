<template>
    <div class="p_conent">
        <div class="p_header">
            <h2>{{$t("names.name10")}}</h2>
        </div>
        <div class="vinfo" v-if="one">
            <dl>
                <dt>
                    <qrcode :value="qrCodeUrl" :options="{ size: 200 }"></qrcode>
                </dt>
                <dd style=font-size:14px;>
                    <p>{{$t("goole.title1")}}</p>
                    <p>{{$t("goole.title2")}}</p>
                    <p>{{$t("goole.title3")}}
                        <p>{{$t("goole.title4")}}
                            <span style="color:rgb(239, 33, 33)">{{secret}}</span>
                            <span  style="margin-left:5px;color:#00aedd;cursor:pointer" v-clipboard:copy="secret" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("de.a2")}}</span>
                        </p>
                        <p  style="color:rgb(239, 33, 33)">
                            {{$t("goole.title5")}}
                        </p>

                    </p>
                </dd>
            </dl>
        </div>
        <!-- 设置谷歌认证 -->
        <div class="first" v-if="one">
            <Form :model="formRight" label-position="right" :label-width="200" :rules="ruleValidate" ref="formValidate">
                <FormItem :label="$t('goole.title6')">
                    <Input v-model="secret" :placeholder="secret" disabled></Input>
                </FormItem>
                <FormItem :label="$t('goole.title8')" prop="onecode">
                    <Input v-model="formRight.onecode"></Input>
                </FormItem>
                <FormItem :label="$t('phone.info11')" prop="code" v-if="see">
                        <Input v-model="formRight.code"></Input>
                        <span @click="flag && getcode('checkgoogleAuth')" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                        <span v-if="!show">{{count}} s</span>
                    </FormItem>
                    <FormItem :label="$t('email.info4')" prop="ecode" v-if="see1">
                        <Input v-model="formRight.ecode"></Input>
                        <span @click="flag1 && sendcode()" v-if="show1" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                        <span v-if="!show1">{{count1}} s</span>
                    </FormItem>

            </Form>
        </div>
        <div class="yz" v-if="one">
            <Button type="primary" size="large" @click="bindit('formValidate')">{{$t("goole.title7")}}</Button>
        </div>
        <div class="info" v-if="two">
            <p>
                <span style="margin-right:0.25rem;" v-if="closegoole">{{$t("goole.a2")}}</span>
                <span style="margin-right:0.25rem;" v-if="opengoole">{{$t("goole.a1")}}</span>
                <Button type="primary" @click="change" v-if="changeit">{{$t("config.action3")}}</Button>
                <Button type="primary" @click="close" style="margin-left:0.1rem;" v-if="closegoole">{{$t("goole.a3")}}</Button>
                <Button type="primary" @click="open" style="margin-left:0.1rem;" v-if="opengoole">{{$t("goole.a4")}}</Button>
            </p>
        </div>
        <!-- 关闭 -->
        <div class="info" v-if="three">
            <p>
                <span style="margin-right:0.25rem;">{{$t("goole.a6")}}</span>
            </p>
        </div>
        <div class="first" v-if="three">
            <Form :model="formRight1" label-position="right" :label-width="200" :rules="ruleValidate1" ref="formValidate1">
                <FormItem :label="$t('goole.title8')" prop="onecode">
                    <Input v-model="formRight1.onecode"></Input>
                </FormItem>
                <FormItem :label="$t('phone.info11')" prop="code" v-if="see">
                    <Input v-model="formRight1.code"></Input>
                    <span @click="flag && getcode('closeGoogle')" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show">{{count}} s</span>
                </FormItem>
                <FormItem :label="$t('email.info4')" prop="ecode" v-if="see1">
                    <Input v-model="formRight1.ecode"></Input>
                    <span @click="flag1 && sendcode()" v-if="show1" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show1">{{count1}} s</span>
                </FormItem>
            </Form>
        </div>
        <div class="yz" v-if="three">
            <Button type="primary" size="large" @click="closeit('formValidate1')" style="width: auto;"> {{$t("goole.a6")}}</Button>
        </div>
        <!-- 开启 -->
        <div class="info" v-if="five">
            <p>
                <span style="margin-right:0.25rem;"> {{$t("goole.a5")}}</span>
            </p>
        </div>
        <div class="first" v-if="five">
            <Form :model="formRight3" label-position="right" :label-width="200" :rules="ruleValidate3" ref="formValidate3">
                <FormItem :label="$t('goole.title8')" prop="onecode">
                    <Input v-model="formRight3.onecode"></Input>
                </FormItem>
            </Form>
        </div>
        <div class="yz" v-if="five">
            <Button type="primary" size="large" @click="openit('formValidate3')" style="width: auto;">{{$t("goole.a5")}}</Button>
        </div>
        <!-- 修改谷歌验证码 -->
        <div class="vinfo" v-if="four">
                <dl>
                        <dt>
                            <qrcode :value="qrCodeUrl1" :options="{ size: 200 }"></qrcode>
                        </dt>
                        <dd style=font-size:14px;>
                            <p>{{$t("goole.title1")}}</p>
                            <p>{{$t("goole.title2")}}</p>
                            <p>{{$t("goole.title3")}}
                                <p>{{$t("goole.title4")}}
                                    <span style="color:rgb(239, 33, 33)">{{secret}}</span>
                                    <span  style="margin-left:5px;color:#00aedd;cursor:pointer" v-clipboard:copy="secret" v-clipboard:success="onCopy" v-clipboard:error="onError">{{$t("de.a2")}}</span>
                                </p>
                                <p  style="color:rgb(239, 33, 33)">
                                    {{$t("goole.title5")}}
                                </p>
        
                            </p>
                        </dd>
                    </dl>
        </div>
        <!-- 修改谷歌认证 -->
        <div class="first" v-if="four">
            <Form :model="formRight2" label-position="right" :label-width="200" :rules="ruleValidate2" ref="formValidate2">
                <FormItem :label="$t('goole.a7')" prop="oldonecode">
                    <Input v-model="formRight2.oldonecode"></Input>
                </FormItem>
                <FormItem :label="$t('goole.a8')">
                    <Input v-model="formRight2.input1" :placeholder="secret" disabled></Input>
                </FormItem>
                <FormItem :label="$t('goole.a9')" prop="onecode">
                    <Input v-model="formRight2.onecode"></Input>
                </FormItem>
                <FormItem :label="$t('phone.info11')" prop="code" v-if="see">
                    <Input v-model="formRight2.code"></Input>
                    <span @click="flag && getcode('updategoogleAuth')" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show">{{count}} s</span>
                </FormItem>
                <FormItem :label="$t('email.info4')" prop="ecode" v-if="see1" >
                    <Input v-model="formRight2.ecode"></Input>
                    <span @click="flag1 && sendcode()" v-if="show1" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                    <span v-if="!show1">{{count1}} s</span>
                </FormItem>
            </Form>
        </div>
        <div class="yz" v-if="four">
            <Button type="primary" size="large" @click="changeita('formValidate2')">{{$t("goole.title7")}}</Button>
        </div>
    </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import VueQrcode from '@xkeshi/vue-qrcode'
    import VueClipboard from "vue-clipboard2";
    Vue.use(VueClipboard)
    export default {
        data() {
            const validateMobile = (rule, value, callback) => {

                if (!Number.isInteger(+value)) {
                    callback(new Error(this.$t('input.a10')));
                } else {
                    callback();
                }
            };
            return {
                one: false,
                two: false,
                three: false,
                four: false,
                five:false,
                see:false,
                see1:false,
                secret: '',//密钥
                see1: false,
                qrCodeUrl:'',
                language:'zh',
                qrCodeUrl1:'',
                changeit:true,
                see: false,
                closegoole: true,
                flag:1,
                flag1:1,
                opengoole: false,
                formRight: {
                    secret: '',
                    onecode: '',
                    ecode: '',
                    code: '',
                },
                formRight1: {
                    input1: '',
                    input2: '',
                    code: "",
                    ecode: "",
                    onecode: "",
                },
                formRight2: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    input5: '',
                    code: "",
                    ecode: '',
                    oldonecode: '',
                    onecode: '',
                },
                formRight3: {
                    onecode: "",
                },
                ruleValidate: {
                    onecode: [
                        { required: true, message:  this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    secret: [
                        { required: true, message:  this.$t('input.a26'), trigger: 'blur' },
                    ],
                    code: [
                        { required: true, message:  this.$t('input.a9'), trigger: 'blur' },
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ]
                },
                ruleValidate1: {
                    onecode: [
                        { required: true, message:  this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message:  this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ]
                },
                ruleValidate2: {
                    onecode: [
                        { required: true, message: this.$t('input.a25'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    ecode: [
                        { required: true, message:this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    oldonecode: [
                        { required: true, message:  this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                },
                ruleValidate3: {
                    onecode: [
                        { required: true, message:  this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ]
                },
                count: '',
                timer: null,
                count1: '',
                timer1: null,
                show: true,
                show1:true,
                phone: "",//手机号
            }
        },
        components: {
            'qrcode': VueQrcode
        },
        methods: {
            getcode(lyl) {  //发送验证码
                this.flag=0;
                let timestrap=Date.parse(new Date());
                let codetype=2;
                let sign=this.md5(timestrap+"LIANZHIJIA2018ETF");
                let params = {};
                    params.tplid = 58097,
                    params.timestrap=timestrap,
                    params.codetype=codetype;
                    params.sign=sign;
                    params.lyl=lyl;
                this.FetchPost(this.requestUrl.user.Usersetcode,params).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('aaa.b9')
                        });
                        const TIME_COUNT = 60;
                        if (!this.timer) {
                            this.count = TIME_COUNT;
                            this.show = false;
                            this.timer = setInterval(() => {
                                if (this.count > 0 && this.count <= TIME_COUNT) {
                                    this.count--;
                                } else {
                                    this.show = true;
                                    this.flag=1;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000)
                        }
                    } else {
                        this.flag=1;
                        this.$Notice.warning({
                            title: this.$t('aaa.a9')
                        });
                    }
                })
            },
            bindit(name) {  //绑定
                let pcode,emailcode;
                if(this.formRight.ecode){
                    emailcode=1;
                }
                if(this.formRight.code){
                    pcode=1;
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                     this.FetchPost(this.requestUrl.user.UsergoogleAuth, { 
                    secret: this.secret,
                    code: this.formRight.onecode,
                    phonecode: this.formRight.code,
                    ecode:this.formRight.ecode,
                    pcode:pcode,
                    emailcode:emailcode
                }).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('aaa.d2')
                        })
                        this.one = false;
                        this.two = true;
                        this.show=true;
                        this.show1=true;
                        localStorage.setItem("chkAuth",1)
                    } else if(res.status==402){
                        this.$Notice.warning({
                            title: this.$t('aaa.c4')
                        });
                    } else if(res.status==403){
                        this.$Notice.warning({
                            title: this.$t('aaa.c2')
                        });
                    } else if(res.status==405){
                        this.$Notice.warning({
                            title: this.$t('aaa.c1')
                        });
                    }
                  })
                    }
                })
            },
            onCopy(e) {  //复制文字
                this.$Notice.success({
                    title:this.$t('aaa.d3')
                });
            },
            onError(e) {
                this.$Notice.warning({
                    title:this.$t('aaa.d4')
                });
                // alert("复制失败！")
            },
            change() {
                this.two = false;
                this.four = true;
                this.FetchGet(this.requestUrl.user.changeGoogle, {}).then(res => {
                    this.qrCodeUrl1=res.data.qrCodeUrl;
                    this.secret = res.data.secret;
                })
            },
            changeita(name) {  //修改
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.user.UserupdategoogleAuth, {
                            secret: this.secret,
                            oldonecode: this.formRight2.oldonecode,
                            onecode: this.formRight2.onecode,
                            code: this.formRight2.code,
                            ecode: this.formRight2.ecode
                        }).then(res => {
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('aaa.d5')
                                });
                                this.two = true;
                                this.four = false;
                                this.show=true;
                                this.show1=true;
                                this.formRight2.oldonecode="";
                                this.formRight2.onecode="";
                                this.formRight2.code="";
                                this.formRight2.ecode="";
                            } else if(res.status==402){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c6')
                                });
                            } else if(res.status==403){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c2')
                                });
                            } else if(res.status==405){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c1')
                                });
                            } else if(res.status==406){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c4')
                                });
                            }
                        })
                    }
                })
            },
            close() {
                this.two = false;
                this.three = true;
            },
            open() {
                this.two = false;
                this.five = true;
            },
            closeit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.user.UsercloseGoogle, {
                            onecode: this.formRight1.onecode,
                            code: this.formRight1.code,
                            ecode: this.formRight1.ecode
                        }).then(res => {
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('aaa.d6')
                                })
                                this.two = true;
                                this.three = false;
                                this.closegoole = false;
                                this.opengoole = true;
                                this.show=true;
                                 this.show1=true;
                                 this.changeit=false;
                                 this.formRight1.onecode="";
                                 this.formRight1.code="";
                                 this.formRight1.ecode="";
                                // localStorage.setItem("chkAuth", 0)
                                // localStorage.setItem("switch", 0)
                            } else if(res.status==402){
                                this.$Notice.warning({
                                    title: this.$t('aaa.d7')
                                });
                            } else if(res.status==403){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c4')
                                });
                            } else if(res.status==405){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c2')
                                });
                            } else if(res.status==406){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c1')
                                });
                            }
                        })
                    }
                })
            },
            sendcode() {  //发送邮箱验证码
                this.flag1=0;
                this.FetchPost(this.requestUrl.user.UsersendEmail, {type: this.language == 'zh' ? 1 :4}).then(res => {
                    if (res.status == 200) {
                        this.$Notice.success({
                            title: this.$t('aaa.b9')
                        });
                        const TIME_COUNT = 60;
                        if (!this.timer1) {
                            this.count1 = TIME_COUNT;
                            this.show1 = false;
                            this.timer1 = setInterval(() => {
                                if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
                                    this.count1--;
                                } else {
                                    this.show1 = true;
                                    this.flag1=1;
                                    clearInterval(this.timer1);
                                    this.timer1 = null;
                                }
                            }, 1000)
                        }
                    } else {
                        this.flag1=1;
                        this.$Notice.warning({
                            title: this.$t('aaa.a9')
                        });
                    }
                })
            },
            openit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.user.UseropenGoogle, {
                            onecode: this.formRight3.onecode,
                        }).then(res => {
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('aaa.d8')
                                })
                                this.two = true;
                                this.five = false;
                                this.closegoole = true;
                                this.opengoole = false;
                                this.show=true;
                                this.show1=true;
                                this.changeit=true;
                                this.formRight3.onecode="";
                                // localStorage.setItem("chkAuth", 1)
                                // localStorage.setItem("switch", 1)
                            } else if(res.status==402){
                                this.$Notice.warning({
                                    title: this.$t('aaa.d9')
                                });
                            }else if(res.status==403){
                                this.$Notice.warning({
                                    title: this.$t('aaa.c4')
                                });
                            }
                        })
                    }
                })
            }
        },
        components: {
            'qrcode':VueQrcode
        },
        mounted() {
            this.language = localStorage.getItem("lan") || 'zh';
            this.FetchGet(this.requestUrl.user.Usergoogle, {}).then(res => {
                this.ifgoole = Number(res.data.google);
                this.secret = res.data.secret;
                this.qrCodeUrl=res.data.qrCodeUrl;
                this.gtype=res.data.gtype; //0关闭 1开启
                this.chkEmail = Number(localStorage.getItem("chkEmail"));//是否已经通过邮箱验证
                this.phone = Number(localStorage.getItem("ifchkMoble"));//是否已经手机验证
                if (this.chkEmail && this.phone) {
                    this.see = true;
                    this.see1 = false;
                } else if (this.chkEmail) {
                    this.see1 = true;
                } else if (this.phone) {
                    this.see = true;
                }
                if (this.ifgoole == 0) {
                    this.one = true;
                } else if (this.ifgoole) {
                    this.one = false;
                    this.two = true;
                }
                if(Number(this.gtype)==0){
                    this.opengoole=true;
                    this.closegoole=false;
                    this.changeit=false;
                }else{
                    this.closegoole=true;
                    this.changeit=true;
                    this.opengoole=false;
                }
            })
        },
        // components: {
        //     VueQArt
        // }
    }
</script>
<style lang="scss">
    @import "../../assets/css/phone.scss";
    .vinfo{
        border: 1px solid #ff9595;
        background: #ffefef;
        width: 95%;
        margin: 0 auto;
        dl{
            padding:20px;
            dt{
                float: left;
                margin-right:10px;
                margin-top: 5px;
                canvas{
                    width: 120px;
                    height: 120px;
                }
            }
            dd{
                p{
                    margin-top: 0.05rem;
                }
            }
        }

     }
     
</style>