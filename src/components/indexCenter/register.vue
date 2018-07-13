<template>
    <div class="r_container">
        <div class="register" v-show="regMask">
        </div>
        <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#999999"
            :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="1" :hoverEffect="true" hoverMode="grab"
            :clickEffect="true" clickMode="push">
        </vue-particles>
        <Tabs value="name1" class="tabs" v-show="regCon" @on-click="change">
            <TabPane :label="$t('register.title1')" name="name1">
                <form action="">
                    <p class="pbox">
                        <i class="icon1"></i>
                        <input type="text" v-model="userVal" :placeholder="$t('register.title3')">
                    </p>
                    <p class="pbox">
                        <i class="icon2"></i>
                        <input type="password" :placeholder="$t('register.title4')" v-model="pwdVal">
                    </p>
                    <p class="pbox">
                        <i class="icon2"></i>
                        <input type="password" :placeholder="$t('register.title5')" v-model="rePwdVal">
                    </p>
                    <p class="pbox">
                        <i class="icon3"></i>
                        <input type="text" v-model="verVal" :placeholder="$t('register.title6')">
                        <span>
                            <img ref="reload" @click="reloadImg($event)" :src="imgSrc" :title="$t('aaa.a13')">
                        </span>
                    </p>
                    <p class="pbox">
                        <i class="icon4"></i>
                        <input type="text" v-model="codeVal" :placeholder="$t('register.title7')">
                        <span @click="ifPhone($event)">{{$t("phone.info8")}}</span>
                    </p>
                    <Checkbox v-model="single" class="checkbox">{{$t("l.a10")}}《
                        <a href="/userAgrement" target="_blank" style="color:#00aedd">{{$t("l.a11")}}</a>》</Checkbox>
                    <button type="button" @click="regPost('phone')">{{$t("register.title10")}}</button>
                    <p style="margin-top:0.1rem;">
                        <span style="cursor:pointer;font-size:14px;" @click="goLogin()">{{$t("register.title11")}}</span>
                    </p>
                </form>
            </TabPane>
            <TabPane :label="$t('register.title2')" name="name2">
                <form action="">
                    <p class="pbox">
                        <i class="icon1"></i>
                        <input type="text" v-model="userVal" :placeholder="$t('register.title8')">
                    </p>
                    <p class="pbox">
                        <i class="icon2"></i>
                        <input type="password" :placeholder="$t('register.title4')" v-model="pwdVal">
                    </p>
                    <p class="pbox">
                        <i class="icon2"></i>
                        <input type="password" :placeholder="$t('register.title5')" v-model="rePwdVal">
                    </p>
                    <p class="pbox">
                        <i class="icon3"></i>
                        <input type="text" v-model="verVal" :placeholder="$t('register.title6')">
                        <span>
                            <img ref="reload" @click="reloadImg($event)" :src="imgSrc" :title="$t('aaa.a13')">
                        </span>
                    </p>
                    <Checkbox v-model="single" class="checkbox">{{$t("l.a10")}}《
                        <a href="/userAgrement" target="_blank" style="color:#00aedd">{{$t("l.a11")}}</a>》</Checkbox>
                    <button type="button" @click="regPost('email')">{{$t("register.title10")}}</button>
                    <p style="margin-top:0.05rem;">
                        <span style="cursor:pointer;font-size:14px;" @click="goLogin()">{{$t("register.title11")}}</span>
                    </p>
                </form>
            </TabPane>
        </Tabs>
        <!-- 邮箱注册成功 -->
        <div class="v-transfer-dom" v-show="emailAlert">
            <div class="ivu-modal-mask" style="background-color:rgba(55,55,55,.3);"></div>
            <div class="ivu-modal-wrap vertical-center-modal" @click="closeAlert($event)">
                <div class="ivu-modal" style="width: 600px; height:280px;">
                    <div class="ivu-modal-content" style="position:relative;background:rgba(255,255,255,0.9);;overflow:hidden;height:100%;border-radius: 5px;">
                        <a class="ivu-modal-close" @click="closeAlert($event)">
                            <i class="ivu-icon ivu-icon-ios-close-empty">
                            </i>
                        </a>
                        <p style="margin-top:62px;margin-bottom:29px;text-align:center;font-size:18px;">{{$t("l.a12")}}</p>
                        <p style="margin-bottom:30px;text-align:center;font-size:16px;line-height:16px;">
                            {{$t("l.a13")}}
                            <span style="color:red">{{userVal}}</span>,{{$t("l.a14")}}
                        </p>
                        <button @click="againEmail($event)" ref="myBtn" type="button" style="cursor:pointer;border-radius:3px;background:#00aedd;color:#fff;font-size:16px;width:320px;height:44px;margin-left:140px;">
                            {{$t("l.a15")}}
                        </button>
                        <p style="width:460px;font-size:14px;text-align:right;margin-top:20px;" >
                            <span @click="jumpEmail()" style="cursor:pointer;">
                                 {{$t("l.a16")}}
                            </span>
                           
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                single: true,
                userVal: '',
                pwdVal: '',
                rePwdVal: '',
                codeVal: '',
                verVal: '',
                imgSrc: this.Global.URL+"/Login/checkcode",
                conImg: true,
                firstSrc: '',
                language: 'zh',
                emailAlert: false, //邮箱弹窗控制
                regMask: true,
                regCon: true, //tab 切换
                isSendEmail: false, //控制是否调用接口
                isClickThrottling:true
            }
        },
        updated() {
            let _this = this;
        },
        created() {
            this.language=localStorage.getItem("lan") || "zh";
            let _this = this;
            if (this.dealyTime) {
                clearInterval(this.dealyTime)
                this.dealyTime = null
            }
            if (this.emailTime) {
                clearInterval(this.emailTime)
                this.emailTime = null
            }
        },
        mounted(){
            if (this.$route.params.status == 405) {
                this.$nextTick(() => {
                    this.showAlert();
                    this.userVal = this.$route.params.email;
                    this.$refs.myBtn.click();
                    
                })
                
            }
        },
        methods: {
            init() {
                this.showAlert()
            },
            change() {
                this.userVal = "";
                this.pwdVal = "";
                this.rePwdVal = "";
                this.codeVal = "";
                this.verVal = "";
                clearInterval(this.dealyTime)
            },
            closeAlert(event) {
                let claName = event.target.className;
                if (claName == 'ivu-modal-wrap vertical-center-modal') {
                    this.emailAlert = false;
                    this.regMask = true;
                    this.regCon = true;
                } else if (claName == 'ivu-icon ivu-icon-ios-close-empty') {
                    this.emailAlert = false;
                    this.regMask = true;
                    this.regCon = true;
                }

            },
            jumpEmail() {
                //确保是邮箱 uesrVal
                let emailUrl = [
                    {
                        suffix: 'qq.com',
                        url: 'http://mail.qq.com'
                    },
                    {
                        suffix: '163.com',
                        url: 'http://email.163.com/'
                    },
                    {
                        suffix: '126.com',
                        url: 'http://email.163.com/'
                    },
                    {
                        suffix: 'yeah.net',
                        url: 'http://email.163.com/'
                    },
                    {
                        suffix: 'gmail.com',
                        url: 'http://mail.google.com'
                    },
                    {
                        suffix: 'yahoo.com',
                        url: 'http://login.yahoo.com'
                    }
                ]
                    , suff = this.userVal.substring(this.userVal.indexOf('@') + 1);

                emailUrl.forEach(function (item, index) {
                    if (suff == item.suffix) {
                        window.open(item.url)
                    }
                })
            },
            againEmail(event) {
                
                if (this.isSendEmail) {
                    //不发送右键
                    // this.isSendEmail  控制接口是否调用
                    //第一次不走
                    if(!this.emailTime){
                        this.emailDealy(event.target, 60)  
                    }
                    return false
                }
                //确定是email
                //接口成果之前 btn 节流
                if(!this.isClickThrottling){
                    return false
                }else{
                    this.isClickThrottling = false
                }                
                
                let params = {}
                    , _this = this;
                params.email = this.userVal
                this.language == 'zh' ? params.type = 1 : params.type = 4;

                this.FetchPost(this.requestUrl.login.againEmail, params)
                    .then(res => {
                        if (res.status === 200) {
                            _this.$Notice.success({ title: this.$t('aaa.b9') })
                            _this.emailDealy(event.target, 60)
                            _this.isClickThrottling = true
                        } else {
                            _this.$Notice.warning({ title: this.$t('aaa.a9') })
                        }
                    })
                
            },
            emailDealy(dom, m) {
                let _this = this;
                if (this.emailTime) {
                    clearInterval(this.emailTime)
                    this.emailTime = null
                }
                if (m == 60) {
                    _this.isSendEmail = true;
                    dom.style.color = '#999999'
                    dom.style.background = '#f3f3f3'
                    dom.style.border = '1px solid #dfdfdf'
                }
                this.emailTime = setInterval(function () {
                    dom.innerHTML = m + 's'
                    m = m - 1;
                    if (m == 0) {
                        dom.innerHTML = _this.$t("l.a15");
                        dom.style.color = '#fff',
                            dom.style.background = '#00aedd';
                        dom.style.border = 'none';
                        _this.isSendEmail = false;
                        clearInterval(_this.emailTime)
                        this.emailTime = null
                    }
                }, 1000)
            },
            showAlert() {
                this.emailAlert = true;
                this.regMask = false;
                this.regCon = false;
            },
            reloadImg(event) {
                //单独刷新 src
                // console.log(event)

                // console.log(event.target.src)
                if (this.conImg) {
                    if (event.src) {
                        this.firstSrc = event.src;
                    } else {
                        this.firstSrc = event.target.src;
                    }

                }
                this.conImg = false;
                // console.log(event.src)
                if (event.src) {
                    this.imgSrc = this.firstSrc + '?' + Math.random();
                    // console.log( this.$refs.reload) 
                } else {
                    event.target.src = this.firstSrc + '?' + Math.random()
                    // console.log(event.target.src)
                }
                // console.log(event)

            },
            goLogin() {
                this.$router.push('/login')
            },
            regPost(regStatus) {

                let params
                    , _this = this;
                if (this.regParams(regStatus)) {
                    params = this.regParams(regStatus)
                } else {
                    _this.reloadImg(_this.$refs.reload)
                    return false
                }
                this.FetchPost(this.requestUrl.login.register, params)
                    .then(res => {
                        if (res.status === 200) {
                            _this.$Notice.success({ title: this.$t('aaa.a8') })
                            if (!params.mcode) {
                                //邮箱渠道   手动输入登陆 必须得激活成功操可以登陆
                                // localStorage.setItem("user", res.data.email)
                                // localStorage.setItem("id", res.data.userid)
                                // localStorage.setItem("ifchkMoble", 0)
                                // localStorage.setItem("chkEmail", 1)
                                // localStorage.setItem("chkAuth", 0)
                                // localStorage.setItem("iflogin", 1);
                                _this.showAlert();
                                _this.$refs.myBtn.click();
                            } else {  //手机通道
                            //为了db_cart哪儿拿到res
                                localStorage.setItem("res", JSON.stringify(res))
                                localStorage.setItem("user", res.data.moble)
                                localStorage.setItem("id", res.data.userid)
                                localStorage.setItem("ifchkMoble", 1)
                                localStorage.setItem("chkEmail", 0)
                                localStorage.setItem("chkAuth", 0)
                                localStorage.setItem("iflogin", 1);
                                _this.$router.push("/setZpsd")
                            }
                        } else if (res.status == 401) {
                            _this.reloadImg(_this.$refs.reload)
                            _this.$Notice.warning({ title: this.$t('bbb.c11') })
                        } else if (res.status == 102) {
                            _this.$Notice.warning({ title: this.$t('bbb.c12') })
                        } else if (res.status == 103) {
                            _this.$Notice.warning({ title: this.$t('aaa.c1') })
                        } else if (res.status == 104) {
                            _this.$Notice.warning({ title: this.$t('bbb.c13') })
                        } else if (res.status == 105) {
                            _this.reloadImg(_this.$refs.reload)
                            _this.$Notice.warning({ title: this.$t('aaa.a12') })
                        }
                    })
            },
            regParams(regStatus) {
                let phoneReg = /^1[0-9]\d{9}$/
                    , emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
                    , pwdReg = /^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/
                    , codeReg = /^\d{6}$/
                    , verReg = /[A-Za-z0-9]{4}/
                    , Obj = {}
                    , userVal = this.userVal
                    , pwdVal = this.pwdVal
                    , rePwdVal = this.rePwdVal
                    , codeVal = this.codeVal
                    , verVal = this.verVal;
                if (regStatus == 'phone') {
                    
                    if (phoneReg.test(userVal)) {
                        Obj.moble = userVal
                        delete Obj.type
                    } else {
                        this.$Notice.warning({ title: this.$t('aaa.a4') })
                        return false
                    }

                    if (pwdReg.test(pwdVal)) {

                        Obj.password = this.md5(pwdVal)
                    } else {
                        this.$Notice.warning({ title: this.$t('input.a17') })
                        return false
                    }
                    if (rePwdVal == pwdVal) {
                        Obj.repassword = this.md5(rePwdVal)
                    } else {
                        this.$Notice.warning({ title: this.$t('input.a22') })
                        return false
                    }
                     if (verReg.test(verVal)) {
       
                        Obj.code = verVal
                    } else {
                        this.$Notice.warning({ title: this.$t('aaa.a10') })
                        return false;
                    }
                    if (codeReg.test(codeVal)) {
                        
                        Obj.mcode = codeVal
                    } else {
                        this.$Notice.warning({ title: this.$t('aaa.a5') })
                        return false
                    }
                   

                    if (!this.single) {
                        this.$Notice.warning({ title: this.$t('aaa.a11') })
                        return false;
                    }
                } else {
                    if (emailReg.test(userVal)) {
                        Obj.email = userVal
                        this.language == 'zh' ? Obj.type = 1 : Obj.type = 4;
                        delete Obj.mcode
                    } else {
                        this.$Notice.warning({ title: this.$t('aaa.a4') })
                        return false
                    } if (pwdReg.test(pwdVal)) {

                        Obj.password = this.md5(pwdVal)


                    } else {
                        this.$Notice.warning({ title: this.$t('input.a17') })
                        return false
                    }
                    if (rePwdVal == pwdVal) {
                        Obj.repassword = this.md5(rePwdVal)
                    } else {
                        this.$Notice.warning({ title: this.$t('input.a22') })
                        return false
                    }
                    if (verReg.test(verVal)) {
                        Obj.code = verVal
                    } else {
                        this.$Notice.warning({ title: this.$t('aaa.a10') })
                        return false;
                    }

                    if (!this.single) {
                        this.$Notice.warning({ title: this.$t('aaa.a11') })
                        return false;
                    }
                }
                return Obj
            },
            dealy(m, dom) {
                let _this = this;
                if (this.dealyTime) {
                    clearInterval(this.dealyTime)
                    this.dealyTime = null
                }
                this.dealyTime = setInterval(function () {
                    dom.innerHTML = m + 's'
                    dom.style.color = '#999999'
                    m = m - 1;
                    if (m == 0) {
                        clearInterval(_this.dealyTime)
                        _this.dealyTime = null
                        dom.innerHTML = _this.$t("phone.info8");
                        dom.style.color = '#495060'
                    }
                }, 1000)
            },
            ifPhone(event) {
                if (this.dealyTime) {
                    // this.$Message.error('请稍后再点击获取验证码')
                    return false
                }
                let params;
               
                params = {
                    moble: this.userVal
                }
                if (/^1[0-9]\d{9}$/.test(this.userVal)) {
                    this.FetchPost(this.requestUrl.login.checkmoble, params).then(res => {
                        if (res.status == 200) {
                            this.postCode(event);

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

                } else {
                    this.$Notice.warning({
                        title: this.$t('input.a6')
                    })
                }

            },
            postCode(event) {
                let timestrap = Date.parse(new Date());
                let codetype = 1;
                let sign = this.md5(timestrap + "LIANZHIJIA2018ETF");
                let params = {}
                    , _this = this;
   
                if (this.userVal) {
                    params.moble = this.userVal
                    params.tplid = 73631;
                    params.code = this.verVal
                    params.timestrap = timestrap,
                    params.codetype = codetype;
                    params.sign = sign;
                    params.lyl='reg'
                }

                if (this.dealyTime) {
                    // this.$Message.error('请稍后再点击获取验证码')
                    return false
                }
                _this.dealy(60, event.target)
                this.FetchPost(this.requestUrl.user.Usersetcode, params)
                    .then(res => {
                        if (res.status === 200) {
                            _this.$Notice.success({ title: this.$t('aaa.b9') })
                            // _this.$Message.success('发送成功' )
                        } else if (res.status == 401) {
                            _this.reloadImg(_this.$refs.reload)
                            _this.$Notice.warning({ title: this.$t('aaa.a9') })
                            clearInterval(_this.dealyTime)
                            this.dealyTime = null
                        } else if (res.status == 402) {
                           
                            _this.reloadImg(_this.$refs.reload)
                            // _this.$Notice.warning({ title: this.$t('aaa.a10') })
                            // clearInterval(_this.dealyTime)
                            // this.dealyTime = null
                        } else if (res.status == 403) {
                            _this.reloadImg(_this.$refs.reload)
                            _this.$Notice.warning({ title: this.$t('input.a6') })
                            clearInterval(_this.dealyTime)
                            this.dealyTime = null
                        }
                    })
            }

        }
    }
</script>
<style lang="scss">
    @import "../../assets/css/register.scss";
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal {
            top: 0;
        }
    }
</style>