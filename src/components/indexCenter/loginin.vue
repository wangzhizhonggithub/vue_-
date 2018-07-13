<template>
  <div class="l_container">
    <vue-particles color="#dedede" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#999999"
      :linesWidth="1" :lineLinked="true" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="1" :hoverEffect="true" hoverMode="grab"
      :clickEffect="true" clickMode="push">
    </vue-particles>
    <!-- <div id="particles">
        </div> -->
    <!-- <img src="/static/img/login.jpg" alt=""> -->
    <div class="login" v-if="loginshow">
    </div>
    <form action="" v-if="loginshow">
      <h3 style="text-align:center;">{{$t("l.a1")}}</h3>
      <p class="pbox">
        <i class="icon1"></i>
        <input type="text" :placeholder="$t('loginin.title1')" class="input1" v-model="loginVal">
      </p>
      <p class="pbox">
        <i class="icon2" ></i>
        <input type="password" :placeholder="$t('loginin.title2')" class="input2" v-model="pwdVal" @keyup.enter="loginPost">
      </p>
      <!-- <Checkbox v-model="single" class="checkbox" @on-change="remeber">{{$t("loginin.title3")}}</Checkbox> -->

      <button type="button" @click="loginPost()" style="cursor:pointer;margin-top:30px">{{$t("loginin.title4")}}</button>
      <ul>
        <li @click="forgot" style="cursor:pointer;">{{$t("loginin.title6")}}</li>
        <li>|</li>
        <li @click="goreg" style="cursor:pointer;">{{$t("loginin.title5")}}</li>
        
      </ul>
    </form>
    <div class="login1" v-if="forget">
    </div>
    <form action="" v-if="forget" style="height:335px;">
      <h3 style="text-align:center; ">{{$t("l.a4")}}</h3>
      <p class="pbox">
        <i class="icon1"></i>
        <input type="text" :placeholder="$t('loginin.title1')" class="input1" v-model="user">
      </p>
      <p class="pbox">
        <i class="icon3"></i>
        <input type="text" :placeholder="$t('l.a17')" class="input2" v-model="code">
        <span @click="postCode($event)">{{$t("phone.info8")}}</span>

      </p>
      <p class="pbox">
        <i class="icon2"></i>
        <input type="password" :placeholder="$t('l.a18')" class="input2" v-model="newpwdVal">
      </p>
      <p class="pbox">
        <i class="icon2"></i>
        <input type="password" :placeholder="$t('l.a19')" class="input2" v-model="surepwdVal">
      </p>
      <button @click="changeit()" style="cursor:pointer;margin-top:0.1rem;" type="button">{{$t("authen.msg1")}}</button>
      <ul>
        <li @click="gologin" class="cursor:pointer;">{{$t("l.a8")}}</li>
      </ul>
    </form>
    <div class="v-transfer-dom" v-show="changeAlert">
      <div class="ivu-modal-mask" style="background-color:rgba(55,55,55,.3);"></div>
      <div class="ivu-modal-wrap vertical-center-modal" @click="closeAlert($event)">
        <div class="ivu-modal" style="width: 500px; height:220px;">
          <div class="ivu-modal-content" style="position:relative;background:rgba(255,255,255,0.9);;overflow:hidden;height:100%;border-radius: 5px;">
            <a class="ivu-modal-close" @click="closeAlert($event)">
              <i class="ivu-icon ivu-icon-ios-close-empty">
              </i>
            </a>
            <p style="margin-top:62px;margin-bottom:29px;text-align:center;font-size:18px;">{{$t("l.a9")}}</p>
            <p style="margin-bottom:30px;text-align:center;font-size:16px;line-height:16px;">

            </p>
            <p style="text-align:center;margin-top:50px;">
              <button ref="myBtn" type="button" @click="closeAlert($event)" style="cursor:pointer;border-radius:3px;background:#00aedd;color:#fff;font-size:16px;width:120px;height:44px;">
                {{$t("fu.a10")}}
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  // import crypto from 'crypto'
  // let particleground = require('../../assets/lib/jquery.particleground.js')
  export default {
    data() {
      return {
        // loginVal: '13552446485',
        // pwdVal: '123456',
        loginVal: '',
        pwdVal: '',
        single: false,
        loginshow: true,
        forget: false,
        surepwdVal: '',
        newpwdVal: '',
        ecode: '',
        ptype: false,
        etype: false,
        count: '',
        changeAlert: false,
        timer: null,
        count1: '',
        timer1: null,
        show1: true,
        show: true,
        moble: '',
        language: 'zh',
        iftranspw: '',
        code: '',
        user: '',
        isSendEmail: false
      }
    },
    methods: {
      remeber() {
        let _this = this;
        if (_this.single == true) {
          _this.setCookie(_this.loginVal, _this.pwdVal, 7)
        } else {
          _this.clearCookie();
        }
      },
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.loginVal = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.pwdVal = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      },
      closeAlert(event) {
        this.changeAlert = false;
        this.loginshow = true;
        this.loginshow = true;
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
      postCode(event) {
        if (this.user) {
          let params = {}
          let regu = /^[1][3,4,5,7,8][0-9]{9}$/;
          let re = new RegExp(regu);
          let _this = this;
          if (re.test(this.user)) {  //手机号
            params.moble = this.user;
            params.lyl="setpw";
            if (this.dealyTime) {
              // this.$Message.error('请稍后再点击获取验证码')
              return false
            }
            _this.dealy(60, event.target)
            this.FetchPost(this.requestUrl.login.getpwd, params)
              .then(res => {
                if (res.status === 200) {
                  _this.$Notice.success({ title: this.$t('aaa.b9') })
                  // _this.$Message.success('发送成功' )
                } else if (res.status == 401) {

                  _this.$Notice.warning({ title: this.$t('aaa.a9') })
                  clearInterval(_this.dealyTime)
                  this.dealyTime = null
                } else if (res.status == 402) {

                  _this.$Notice.warning({ title: this.$t('aaa.a10') })
                  clearInterval(_this.dealyTime)
                  this.dealyTime = null
                }
              })
          }
          else if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.user)) {
            params.email = this.user
            this.language == 'zh' ? params.type = 1 : params.type = 4;
            if (this.dealyTime) {
              // this.$Message.error('请稍后再点击获取验证码')
              return false
            }
            _this.dealy(60, event.target)
            this.FetchPost(this.requestUrl.login.getpwd, params)
              .then(res => {
                if (res.status === 200) {
                  _this.$Notice.success({ title: this.$t('aaa.b9') })
                  // _this.$Message.success('发送成功' )
                } else if (res.status == 401) {

                  _this.$Notice.warning({ title: this.$t('aaa.a9') })
                  clearInterval(_this.dealyTime)
                  this.dealyTime = null
                } else if (res.status == 103) {

                  _this.$Notice.warning({ title: this.$t('aaa.e9') })
                  clearInterval(_this.dealyTime)
                  this.dealyTime = null
                } else if (res.status == 104) {

                  _this.$Notice.warning({ title: this.$t('aaa.e10') })
                  clearInterval(_this.dealyTime)
                  this.dealyTime = null
                }
              })
          } else {
            this.$Notice.warning({
              title: this.$t('aaa.a4')
            });
          }

        } else {
          this.$Notice.warning({
            title: this.$t('loginin.title1')
          });

        }
      },
      changeit() {
        let params = {};
        if (this.changeParams()) {
          params = this.changeParams()
        } else {
          return false
        }
        // console.log(params)
        this.FetchPost(this.requestUrl.login.find, params).then(res => {

          if (res.status == 200) {
            // this.$Modal.success({
            //   content: res.message
            // });
            this.$Notice.success({
              title: this.$t('l.a9')
            });


            this.user = '';
            this.code = '';
            this.surepwdVal = "";
            this.newpwdVal = "";
            this.changeAlert = true;
            this.forget = false;

          } else if (res.status == 401) {
            this.$Notice.warning({
              title: this.$t('aaa.a6')
            });
          } else if (res.status == 402) {
            this.$Notice.warning({
              title: this.$t('aaa.a7')
            });
          } else if (res.status == 101) {
            this.$Notice.warning({
              title: this.$t('aaa.c2')
            });
          } else if (res.status == 102) {
            this.$Notice.warning({
              title: this.$t('aaa.c1')
            });
          } else if (res.status == 104) {
            this.$Notice.warning({
              title: this.$t('aaa.d14')
            });
          }
        })
      },
      goreg() {
        this.$router.push("./register")
      },
      gologin() {
        this.loginshow = true;
        this.forget = false;
        this.$eventBus.$emit('isForgetEvent', false)
      },
      forgot() {
        this.forget = true;
        this.loginshow = false;
        this.$eventBus.$emit('isForgetEvent', true)

      },
      loginPost() {
        let params
          , _this = this;
        if (this.loginParams() ) {
          params = this.loginParams()
        } else {
          return false
        }

        this.FetchPost(this.requestUrl.login.login, params)
          .then(res => {
            if (res.status === 200) {
              this.$Notice.success({
                title: this.$t('aaa.a1'),
                desc: false,
                duration: 1,
                // onClose: function () {
                //   _
                // }
              })

              localStorage.setItem("res", JSON.stringify(res))
              localStorage.setItem("user", res.data.user)
              localStorage.setItem("id", res.data.id)
              localStorage.setItem("iftranspw", res.data.chkTransPw);
              localStorage.setItem("ifchkMoble", res.data.chkMoble);
              localStorage.setItem("chkEmail", res.data.chkEmail);
              localStorage.setItem("chkAuth", res.data.chkAuth);
              localStorage.setItem("chkReal", res.data.chkReal);
              localStorage.setItem("phone", res.data.moble);
              localStorage.setItem("iflogin", res.data.chkPw);
              // localStorage.setItem("country", res.data.country);
              // localStorage.setItem("level", res.data.level);
              // localStorage.setItem("type", res.data.type);
              this.iftranspw = res.data.transpw;

              if (this.iftranspw.length == 0) {
                this.$router.push("/setZpsd")
              } else {
                //判断登陆以后在当前点得登陆页面
  //这儿用了路由守卫点那 登陆成功以后调到那  如果点击注册页面或者什么也没点击让跳到主页 ||toname=="register"||toname=="null"
          var toname=localStorage.getItem("toname")
          var tradingArr = ['/tradingCNHA','/tradingETF','tradingETH']
                ,isTrad = tradingArr.indexOf(toname) > -1 
              if( isTrad ||toname=="register"||toname==null||toname=="undefined"){
                  this.$router.push({
                    name: "/index", params: {
                      ifuser: 1
                    }
                  })
                } else {
                  this.$router.push({
                      name:toname, params: {
                        ifuser:1
                      }
                    })
              }
              }
            } else if (res.status == 405) {
              //this.$eventBus.$emit('alertbox', res.status, this.loginVal)  //eventBus用于父子组件传参,或者非页面跳转传参。
              this.$router.push({
                name: 'register',
                params: {
                  status: res.status,
                  email: this.loginVal
                }
              })
            } else if (res.status == 401) {
              this.$Notice.warning({
                title: this.$t('aaa.a2')
              })
            } else if (res.status == 402) {
              this.$Notice.warning({
                title: this.$t('aaa.a3')
              })
            }
          })
      },
      changeParams() {

        let phoneReg = /^1[0-9]\d{9}$/
          , emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
          , pwdReg = /^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/
          , codeReg = /^\d{6}$/
          , Obj = {}
          , userVal = this.user
          , pwdVal = this.newpwdVal
          , rePwdVal = this.surepwdVal
          , codeVal = this.code
        if (phoneReg.test(userVal)) {
          Obj.moble = userVal
          delete Obj.type
        } else if (emailReg.test(userVal)) {
          Obj.email = userVal
          this.language == 'zh' ? Obj.type = 1 : Obj.type = 4;
        } else {
          this.$Notice.warning({ title: this.$t('aaa.a4') })
          return false
        }
        if (codeReg.test(codeVal)) {
          Obj.code = codeVal
        } else {
          this.$Notice.warning({ title: this.$t('aaa.a5') })
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

        return Obj
      },
      loginParams() {
        let phoneReg = /^1[34578]\d{9}$/
          , emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
          , pwdReg = /^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/
          , obj = {}
          , loginVal = this.loginVal
          , pwdVal = this.pwdVal;

        //用户名
        if (phoneReg.test(loginVal)) {
          obj.moble = loginVal
        } else if (emailReg.test(loginVal)) {
          obj.email = loginVal
        } else {
          this.$Notice.error({
            title: this.$t('aaa.a4'),
            desc: false,
          })
          return false
        }
        //密码
        if (pwdReg.test(pwdVal)) {

          obj.password = this.md5(pwdVal)
        } else {
          this.$Notice.error({
            title: this.$t('input.a17'),
            desc: false,
          })
          return false
        }
        return obj
      }
    },
    mounted() {
      this.getCookie();
    },
    created() {
      this.language = localStorage.getItem("lan") || 'zh'
      if (this.dealyTime) {
        clearInterval(this.dealyTime)
        this.dealyTime = null
      }
      if (this.$route.params.status == 1) {
        this.forget = true;
        this.loginshow = false;
      }
      this.$eventBus.$on('goLoginEvent', () => {
        this.gologin()
      })

      //gologin
    }
  }
</script>
<style lang="scss">
  @import "../../assets/css/login.scss"
</style>