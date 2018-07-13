<template>
    <div class="p_conent">
        <div class="p_header">
            <h2>{{$t("names.name3")}}</h2>
        </div>
        <div>
            <div class="info" v-if="one">
                <p>
                    <span style="margin-right:0.25rem;">{{$t("phone.info1")}}：{{phone}}</span>
                    <Button type="primary" @click="change">{{$t("config.action3")}}</Button>
                </p>
            </div>

            <!-- <Button type="primary" @click="reset">{{$t("config.action10")}}</Button> -->
        </div>
        <!-- 绑定 -->
        <div class="info" v-if="three">
            <p>
                <span style="margin-right:0.25rem;">{{$t("phone.info9")}}</span>
            </p>
        </div>
        <div v-if="three">
            <div class="first">
                <Form :model="formRight" label-position="right" :label-width="200" :rules="ruleValidate" ref="formValidate">
                    <FormItem :label="$t('phone.info10')" prop="phone">
                        <Input v-model="formRight.phone"></Input>
                    </FormItem>
                    <FormItem :label="$t('phone.info11')" prop="code">
                        <Input v-model="formRight.code"></Input>
                        <span @click="flag && ifPhone('chkMoble')" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                        <span v-if="!show">{{count}} s</span>
                    </FormItem>
                    <FormItem :label="$t('email.info4')" prop="ecode" v-if="chkEmail">
                        <Input v-model="formRight.ecode"></Input>
                        <span @click="flag1 && sendcode()" v-if="show1" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                        <span v-if="!show1">{{count1}} s</span>
                    </FormItem>
                    <FormItem :label="$t('trade.info3')" prop="tran" v-if="iftranspw">
                        <Input v-model="formRight.tran" type="password"></Input>
                    </FormItem>
                    <FormItem :label="$t('trade.info11')" prop="gcode" v-if="chkAuth && gtype">
                        <Input v-model="formRight.gcode"></Input>
                    </FormItem>
                </Form>
            </div>
            <div class="btn">
                <Button type="primary" size="large" @click="bindit('formValidate')">{{$t("authen.msg1")}}</Button>

                <!-- <Button type="ghost" size="large" @click="cancel">{{$t("authen.msg2")}}</Button> -->
            </div>
        </div>
        <!-- //旧手机 -->
        <div class="info" v-if="two">
            <p>
                <span style="margin-right:0.25rem;">{{$t("phone.info2")}}： {{phone}} </span>
            </p>
        </div>
        <div v-if="two">
            <div class="first">
                <Form :model="formRight2" label-position="right" :label-width="200" :rules="ruleValidate2" ref="formValidate2">
                    <FormItem :label="$t('phone.info3')">
                        <p style="font-size: 14px;margin-top:4px;">{{phone}}</p>
                    </FormItem>
                    <FormItem :label="$t('phone.info4')" prop="oldcode">
                        <Input v-model="formRight2.oldcode"></Input>
                        <span @click="flag && getcode('updateMoble')" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                        <span v-if="!show">{{count}} s</span>
                    </FormItem>
                </Form>
            </div>
            <div class="btn">
                <Button type="primary" size="large" @click="changes('formValidate2')">{{$t("config.action11")}}</Button>
            </div>
        </div>
        <!-- //新手机 -->
        <div class="info" v-if="two2">
            <p>
                <span style="margin-right:0.25rem;">{{$t("phone.info2")}}： {{phone}} </span>
            </p>
        </div>
        <div v-if="two2">
            <div class="first">
                <Form :model="formRight1" label-position="right" :label-width="200" :rules="ruleValidate1" ref="formValidate1">
                    <FormItem :label="$t('phone.info5')" prop="newmoble">
                        <Input v-model="formRight1.newmoble" @click="ifsame"></Input>
                    </FormItem>
                    <FormItem :label="$t('phone.info6')" prop="newcode">
                        <Input v-model="formRight1.newcode"></Input>
                        <span @click="flag && ifPhone('newMoble')" v-if="show" style="cursor:pointer;">{{$t("phone.info8")}}</span>
                        <span v-if="!show">{{count}} s</span>
                    </FormItem>
                    <FormItem :label="$t('email.info4')" prop="ecode" v-if="chkEmail" style="cursor:pointer;">
                        <Input v-model="formRight1.ecode"></Input>
                        <span @click="flag1 && sendcode()" v-if="show1">{{$t("phone.info8")}}</span>
                        <span v-if="!show1">{{count1}} s</span>
                    </FormItem>
                    <FormItem :label="$t('trade.info3')" prop="tran" v-if="iftranspw">
                        <Input v-model="formRight1.tran" type="password"></Input>
                    </FormItem>
                    <FormItem :label="$t('trade.info11')" prop="gcode" v-if="chkAuth && gtype">
                        <Input v-model="formRight1.gcode"></Input>
                    </FormItem>
                </Form>
            </div>
            <div class="btn">
                <Button type="primary" size="large" @click="changeit('formValidate1')">{{$t("authen.msg1")}}</Button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            const validateMobile = (rule, value, callback) => {
                if (!Number.isInteger(+value)) {
                    callback(new Error(this.$t('input.a10')));
                } else {
                    callback();
                }
            };
            const validatePhone = (rule, value, callback) => {
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
                    callback(new Error(this.$t('input.a6')));
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
            return {
                one: false,
                two: false,
                three: false,
                two2: false,
                four: false,
                count: '',
                timer: null,
                count1: '',
                timer1: null,
                show1: true,
                count2: '',
                timer2: null,
                show2: true,
                show: true,
                flag: 1,
                flag1: 1,
                gtype: 0,
                language:'zh',
                entermoble: "",
                phone: "",//手机号
                iftranspw: '',
                transpw: true,
                formRight: {
                    phone: '',
                    code: '',
                    ecode: '',
                    tran: '',
                    gcode: '',
                },
                formRight1: {
                    newmoble: '',
                    newcode: '',
                    ecode: '',
                    tran: '',
                    gcode: '',
                },
                formRight2: {
                    oldcode: '',
                },
                ruleValidate: {
                    phone: [
                        { required: true, message: this.$t('input.a6'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    gcode: [
                        { required: true, message: this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    tran: [
                        { required: true, message: this.$t('input.a12'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' }
                    ]
                },
                ruleValidate1: {
                    newmoble: [
                        { required: true, message: this.$t('input.a6'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    ecode: [
                        { required: true, message: this.$t('input.a11'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    newcode: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    gcode: [
                        { required: true, message: this.$t('input.a14'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                    tran: [
                        { required: true, message: this.$t('input.a12'), trigger: 'blur' },
                        { validator: validateTPwd, trigger: 'blur' }
                    ]
                },
                ruleValidate2: {
                    oldcode: [
                        { required: true, message: this.$t('input.a9'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            change() {  //切换修改
                this.two = true;
                this.one = false;
            },
            ifsame() {
                if (this.phone == this.formRight1.newmoble) {
                    this.$Notice.warning({
                        title: this.$t('aaa.b8')
                    });
                }
            },
            changes(name) {  //旧手机
                this.flag = 1;
                this.flag1 = 1;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.user.UserupdateMoble, { oldcode: this.formRight2.oldcode }).then(res => {
                            if (res.status == 200) {
                                this.two = false;
                                this.two2 = true;
                                this.show = true;
                                this.formRight2.input2 = '';
                                clearInterval(this.timer);
                                this.timer = null;
                            } else if (res.status == 402) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c1')
                                });
                                this.show = true;
                            }
                        })
                    }
                })

            },
            changeit(name) {  //修改手机号
                let gAuth;
                if (this.chkAuth && this.gtype) {
                    gAuth = 1
                } else {
                    gAuth = 0
                }
                this.flag = 1;
                this.flag1 = 1;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.formRight1.newmoble)){
                                this.$Notice.warning({
                                        title: this.$t('input.a6')
                                    })
                        }else{
                        this.FetchPost(this.requestUrl.user.UsernewMoble, {
                            newmoble: this.formRight1.newmoble,
                            newcode: this.formRight1.newcode,
                            ecode: this.formRight1.ecode,
                            onecode: this.formRight1.gcode,
                            transpw: this.md5(this.formRight1.tran),
                            gAuth:gAuth,
                            tpwd: this.iftranspw
                        }).then(res => {
                            if (res.status == 200) {
                                // this.$Notice.success({
                                //     title: res.message
                                // });
                                this.phone = res.data.moble;
                                this.formRight2.oldcode = "";
                                this.formRight1.newmoble = "";
                                this.formRight1.ecode = "";
                                this.formRight1.gcode = "";
                                this.formRight1.tran = "";
                                localStorage.setItem("user", res.data.user)
                                this.$eventBus.$emit("user", res.data.user)
                                this.two = false;
                                this.two2 = false;
                                this.one = true;
                                this.show = true;
                                this.show1 = true;
                                this.show2 = true;
                            } else if (res.status == 402) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c5')
                                });
                            } else if (res.status == 405) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.b8')
                                });
                            } else if (res.status == 403) {
                                this.$Notice.warning({
                                    title: this.$t('input.a6')
                                });
                            } else if (res.status == 406) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c1')
                                });
                            } else if (res.status == 407) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c2')
                                });
                            } else if (res.status == 408) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c4')
                                });
                            } else if (res.status == 409) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            } else if (res.status == 410) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c6')
                                });
                            }
                        })
                    }
                }
                })

            },
            reset() {  //重置
                this.four = true;
                this.one = false;
            },
            ifPhone(lyl) {
                let params;
                params = {
                    moble: this.formRight.phone || this.formRight1.newmoble
                }
                if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(params.moble)){
                    this.$Notice.warning({
                            title: this.$t('input.a6')
                        })
                }else{
                    this.FetchPost(this.requestUrl.login.checkmoble, params).then(res => {
                    if (res.status == 200) {
                        this.getcode(lyl);
                    } else if (res.status == 104) {
                        this.$Notice.warning({
                            title: this.$t('ddd.a5')
                        })
                        return false;
                    } else if (res.status == 401) {
                        this.$Notice.warning({
                            title: this.$t('input.a5')
                        })
                        return false;
                    }
                 })
                }
            },
            getcode(lyl) {  //发送验证码
                this.flag = 0;
                let moble = null;
                let timestrap = Date.parse(new Date());
                let codetype = 2;
                let sign = this.md5(timestrap + "LIANZHIJIA2018ETF");
                let params = {};
                params.tplid = 58097,
                params.timestrap = timestrap,
                params.codetype = codetype;
                params.sign = sign;
                params.lyl=lyl;
                params.moble = this.formRight1.newmoble || this.formRight.phone;
                if (!this.phone && !params.moble) {
                    this.$Notice.warning({
                        title: this.$t('aaa.b7')
                    });
                    this.flag = 1;
                } else {
                    this.FetchPost(this.requestUrl.user.Usersetcode, params).then(res => {
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
                                        this.flag = 1;
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }
                                }, 1000)
                            }
                        } else {
                            this.flag = 1;
                            this.$Notice.warning({
                                title: this.$t('aaa.a9')
                            });
                        }
                    })
                }
            },
            sendcode() {  //发送邮箱验证码
                this.flag1 = 0;
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
                                    this.flag1 = 1;
                                    clearInterval(this.timer1);
                                    this.timer1 = null;
                                }
                            }, 1000)
                        }
                    } else {
                        this.flag1 = 1;
                        this.$Notice.warning({
                            title: this.$t('aaa.a9')
                        });
                    }
                })
            },
            bindit(name) {  //绑定手机号
                let gAuth;
                if (this.chkAuth && this.gtype) {
                    gAuth = 1
                } else {
                    gAuth = 0
                }
                this.flag = 1;
                this.flag1 = 1;
                var params = {
                    moble: this.formRight.phone,
                    code: this.formRight.code,
                    ecode: this.formRight.ecode,
                    onecode: this.formRight.gcode,
                    transpw: this.md5(this.formRight.tran),
                    gAuth:gAuth,
                    tpwd: this.iftranspw
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        this.FetchPost(this.requestUrl.user.UserchkMoble, params).then(res => {
                            if (res.status == 200) {
                                this.$Notice.success({
                                    title: this.$t('aaa.b10')
                                });
                                this.phone = res.data.moble;
                                this.three = false;
                                this.one = true;
                                this.show = true;
                                this.formRight.phone = "";
                                this.$eventBus.$emit("user", res.data.user)
                                localStorage.setItem("ifchkMoble", 1)
                            } else if (res.status == 401) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c2')
                                });
                            } else if (res.status == 402) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c1')
                                });
                            }
                            else if (res.status == 101) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c5')
                                });
                            }
                            else if (res.status == 102) {
                                this.$Notice.warning({
                                    title: this.$t('bbb.c14')
                                });
                            } else if (res.status == 103) {
                                this.$Notice.warning({
                                    title: this.$t('bbb.c15')
                                });
                            }
                            else if (res.status == 405) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c4')
                                });
                            } else if (res.status == 406) {
                                this.$Notice.warning({
                                    title: this.$t('aaa.c3')
                                });
                            }
                        })
                    }
                })

            },
            forget(step) {  //忘记交易密码
                // console.log(step)
                localStorage.setItem("iftranspw", step)
                this.$router.push({
                    name: "tradePassword",
                })
            }
        },
        mounted() {
            this.language = localStorage.getItem("lan") || 'zh';
            this.chkEmail = Number(localStorage.getItem("chkEmail"));//是否已经通过邮箱验证
            this.iftranspw = Number(localStorage.getItem("iftranspw"));//是否已经验证交易密码
            this.chkAuth = Number(localStorage.getItem("chkAuth"));//是否已经验证谷歌
            this.FetchGet(this.requestUrl.user.Usermoble, {}).then(res => {
                this.ifmoble = Number(res.data.moble);
                this.phone = res.data.moble;
                this.gtype = Number(res.data.gtype); //1开启 0关闭
                if (this.ifmoble == 0) {
                    this.three = true;
                } else if (this.ifmoble) {
                    this.three = false;
                    this.one = true;
                }
            })
            // this.iftranspw=Number(localStorage.getItem("iftranspw"));
            // if(this.iftranspw!=0){
            //     this.transpw=true;
            // }else{
            //     this.transpw=false;
            // }
        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/phone.scss"
</style>