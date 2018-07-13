<template>
    <div class="c_conent">
        <div class="c_header">
            <h2>{{$t("fins.name6")}}</h2>
        </div>
        <div class="c-main">
            <ul class="topUl">
                <li v-for="(item,index) in listData" :class="index==currentIndex?'lis':''" @click="tabToggle(index)">
                    <span>{{$t(item)}}</span>
                </li>
            </ul>
            <!-- 没认证 -->
            <div class="msg" v-if="!rzShow">
                <p>
                    <span>{{$t("bbb.a13")}}</span>
                    <Button type="primary" @click="goAuth">{{$t("message.intru3")}}</Button>
                </p>
            </div>
            <!-- 认证过 -->
            <div v-if="rzShow">
                <div v-if="currentIndex==0">
                    <div v-if="unbinnd1">
                        <Form :model="formRight" label-position="right" :label-width="200" ref="formRight" :rules="ruleValidate">
                            <FormItem :label="$t('bbb.b4')">
                                <p>{{xm}}</p>
                            </FormItem>
                            <FormItem :label="$t('bbb.b5')">
                                <Select v-model="formRight.bank">
                                    <Option v-for="(item,index) in bankList" :value="item[1]" :key="item[0]">{{item[1]}}</Option>
                                </Select>
                                <!-- <input type="text" list="url_list" name="text" class="inpus" v-model="formRight.bank" />
                                <datalist id="url_list">
                                    <option v-for="item in bankList" :label="item[0]" :value="item[1]" />
                                </datalist> -->
                            </FormItem>
                            <FormItem :label="$t('bbb.b6')" prop="branch">
                                <Input v-model="formRight.branch"></Input>
                            </FormItem>
                            <FormItem :label="$t('bbb.b7')" prop="card">
                                <Input v-model="formRight.card"></Input>
                            </FormItem>
                            <FormItem :label="$t('email.info3')" prop="transpw">
                                <Input v-model="formRight.transpw" type="password"></Input>
                            </FormItem>
                        </Form>
                        <div class="btn">
                            <Button type="primary" size="large" @click="bind(1,'formRight')" :disabled="noclick">{{$t("bbb.b8")}}</Button>
                        </div>
                    </div>
                    <div v-if="!unbinnd1">
                        <Form label-position="right" :label-width="200">
                            <FormItem :label="$t('bbb.b4')">
                                <p>{{xm}}</p>
                            </FormItem>
                            <FormItem :label="$t('bbb.b9')">
                                <p style="color:#00aedd">
                                    <span style="margin-right:5px;">{{bank}}</span>{{$t("bbb.b10")}}
                                    <span>{{card}}</span>
                                </p>
                            </FormItem>
                        </Form>
                        <div class="btn">
                            <Button type="primary" size="large" @click="changeZ(1)">{{$t("config.action3")}}</Button>
                        </div>
                    </div>
                </div>
                <div v-if="currentIndex==1">
                    <div v-if="unbinnd2">
                        <Form :model="formRight1" label-position="right" :label-width="200" ref="formRight1" :rules="ruleValidate1">
                            <FormItem :label="$t('bbb.c1')">
                                <p>{{xm}}</p>
                            </FormItem>
                            <FormItem :label="$t('bbb.c2')">
                                <div class="wemUp" v-if="!images[0]">
                                    <!-- <h2>+</h2>
                                    <input type="file" mutiple @change="onFileChange1" accept="image/png,image/gif,image/jpeg" style="opacity:0;font-size:0"> -->
                                    <Upload multiple type="drag" :action="uploadHost" :data="ossParams" :format="['jpg','jpeg','png','bmp']"
                                        :max-size="5120" :before-upload="beforeUpload" :on-success="handleSuccess">

                                        <div style="padding: 15px 0">
                                            +
                                        </div>
                                    </Upload>
                                </div>
                                <div class="img_show" v-if="images[0]">
                                    <img :src="images[0].image" alt="">
                                </div>
                                <!-- <input type="file" class="reloadMore1" mutiple @change="onFileChange1" accept="image/png,image/gif,image/jpeg" style="opacity:0;z-index:100"> -->
                                <div class="reloadMore1">
                                    <Upload multiple type="drag" :action="uploadHost" :before-upload="beforeUpload" :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png','bmp']" :max-size="5120" :data="ossParams">
                                        <div style="padding: -3px 0">
                                            {{$t("a.a9")}}
                                        </div>
                                    </Upload>
                                </div>
                                <!-- <span class="reloadMore">{{$t("a.a9")}}</span> -->
                                <span>{{$t("bbb.c3")}}</span>
                            </FormItem>
                            <FormItem :label="$t('bbb.c4')" prop="alipay">
                                <Input v-model="formRight1.alipay"></Input>
                            </FormItem>
                            <FormItem :label="$t('email.info3')" prop="transpw1">
                                <Input v-model="formRight1.transpw1" type="password"></Input>
                            </FormItem>
                        </Form>
                        <div class="btn">
                            <Button type="primary" size="large" @click="bind(2,'formRight1')" :disabled="noclick">{{$t("bbb.b8")}}</Button>
                        </div>
                    </div>
                    <div v-if="!unbinnd2">
                        <Form label-position="right" :label-width="200">
                            <FormItem :label="$t('bbb.c1')">
                                <p>{{xm}}</p>
                            </FormItem>
                            <FormItem :label="$t('bbb.c5')" prop="transpw">
                                <p style="color:#00aedd;">{{alipay}}</p>
                                <img :src="alipay_code" alt="" style="width:65px;height:65px;">
                            </FormItem>
                        </Form>
                        <div class="btn">
                            <Button type="primary" size="large" @click="changeZ(2)">{{$t("config.action3")}}</Button>
                        </div>
                    </div>
                </div>
                <div v-if="currentIndex==2">
                    <div v-if="unbinnd3">
                        <Form :model="formRight2" label-position="right" :label-width="200" ref="formRight2" :rules="ruleValidate2">
                            <FormItem :label="$t('bbb.c6')">
                                <p>{{xm}}</p>
                            </FormItem>
                            <FormItem :label="$t('bbb.c7')">
                                <div class="wemUp" v-if="!images1[0]">
                                    <Upload multiple type="drag" :action="uploadHost" :before-upload="beforeUploadz" :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png','bmp']" :max-size="5120" :data="ossParams">
                                        <div style="padding: 15px 0">
                                            +
                                        </div>
                                    </Upload>
                                </div>
                                <div class="img_show" v-if="images1[0]">
                                    <img :src="images1[0].image" alt="">
                                </div>
                                <!-- <input type="file" class="reloadMore1" mutiple @change="onFileChange2" accept="image/png,image/gif,image/jpeg" style="opacity:0;z-index:100"> -->
                                <div class="reloadMore1">
                                    <Upload multiple type="drag" :action="uploadHost" :before-upload="beforeUploadz" :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png','bmp']" :max-size="5120" :data="ossParams">
                                        <div style="padding: -3px 0">
                                            {{$t("a.a9")}}
                                        </div>
                                    </Upload>
                                </div>
                                <!-- <span class="reloadMore">{{$t("a.a9")}}</span> -->
                                <span>{{$t("bbb.c8")}}</span>
                            </FormItem>
                            <FormItem :label="$t('bbb.c9')" prop="wechat">
                                <Input v-model="formRight2.wechat"></Input>
                            </FormItem>
                            <FormItem :label="$t('email.info3')" prop="transpw2">
                                <Input v-model="formRight2.transpw2" type="password"></Input>
                            </FormItem>
                        </Form>
                        <div class="btn">
                            <Button type="primary" size="large" @click="bind(3,'formRight2')" :disabled="noclick">{{$t("bbb.b8")}}</Button>
                        </div>
                    </div>
                    <div v-if="!unbinnd3">
                        <Form label-position="right" :label-width="200">
                            <FormItem :label="$t('bbb.c6')">
                                <p>{{xm}}</p>
                            </FormItem>
                            <FormItem :label="$t('bbb.c10')">
                                <p style="color:#00aedd;">{{wechat}}</p>
                                <img :src="wechat_code" alt="" style="width:65px;height:65px;">
                            </FormItem>

                        </Form>
                        <div class="btn">
                            <Button type="primary" size="large" @click="changeZ(3)">{{$t("config.action3")}}</Button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    export default {
        data() {
            const validateMobile = (rule, value, callback) => {

                if (!/^[\w`~!@#$%^&*()_+<>?:"{},.\/;'[\]]{6,20}$/.test(value)) {
                    callback(new Error(this.$t('input.a21')));
                } else {
                    callback();
                }
            };
            const validateLength = (rule, value, callback) => {
                if (!/^(\d{16}|\d{19})$/.test(value)) {
                    callback(new Error(this.$t('ddd.a1')));
                } else {
                    callback();
                }
            };

            return {
                apiUrl: this.Global.URL,
                listData: ['bbb.b1', 'bbb.b2', 'bbb.b3'],
                currentIndex: 0,
                file: null,
                unbinnd1: true,
                unbinnd2: true,
                unbinnd3: true,
                noclick: false,
                loadingStatus: false,
                rzShow: 1,
                update1: 0,
                update: 0,
                bank: '',
                card: '',
                alipay: "",
                alipay_code: '',
                wechat: '',
                wechat_code: '',
                images: [],
                xm: "",
                update2: 0,
                images1: [],
                Url_list: new FormData(),
                Url_list1: new FormData(),
                formRight: {
                    bank: '',
                    branch: '',
                    transpw: '',
                    card: '',
                },
                formRight1: {
                    alipay: '',
                    transpw1: '',
                },
                formRight2: {
                    wechat: '',
                    transpw2: '',
                },
                ruleValidate: {
                    bank: [
                        { required: true, message: this.$t('ddd.a2'), trigger: 'blur' },
                        // { validator: validateAddress, trigger: 'blur' }
                    ],
                    branch: [
                        { required: true, message: this.$t('ddd.a3'), trigger: 'blur' },
                        // { validator: validateLength, trigger: 'blur' }
                    ],
                    card: [
                        { required: true, message: this.$t('ddd.a4'), trigger: 'blur' },
                        { validator: validateLength, trigger: 'blur' }
                    ],
                    transpw: [
                        { required: true, message: this.$t('input.a12'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                },
                ruleValidate1: {
                    alipay: [
                        { required: true, message: this.$t('bbb.a14'), trigger: 'blur' },
                        // { validator: validate, trigger: 'blur' }
                    ],
                    transpw1: [
                        { required: true, message: this.$t('input.a12'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                },
                ruleValidate2: {
                    wechat: [
                        { required: true, message: this.$t('bbb.a15'), trigger: 'blur' },
                        // { validator: validateMobile, trigger: 'blur' }
                    ],
                    transpw2: [
                        { required: true, message: this.$t('input.a12'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],
                },
                uploadHost: this.Global.uploadHost,
                ossParams: {
                     name:'',
                    key: "", // key后面有用，先默认设空字符串
                    policy: '',
                    OSSAccessKeyId: '',
                    success_action_status: '200', // 默认200
                    callback: '',
                    signature: '',
                },
                type: 1,
                a: new Date().format("yyyy-MM-dd"),
                b: '',
                ossarr: [],
                drags: true,
                 pathdir:'',
                pathName:''
            }
        },
        methods: {
            init() {
                this.FetchPost(this.requestUrl.FinanceCenter.Receivable, {}).then(res => {
                    if (res.status == 200) {
                        this.rzShow = Number(res.data.level);
                        this.xm = res.data.xm;
                        if (res.data.bank) {
                            this.unbinnd1 = false;
                            this.bank = res.data.bank.bank;
                            this.card = res.data.bank.card;
                        }
                        if (res.data.alipay) {
                            this.unbinnd2 = false;
                            this.alipay = res.data.alipay.alipay;
                            this.alipay_code = res.data.alipay.alipay_code;
                        }
                        if (res.data.wechat) {
                            this.unbinnd3 = false;
                            this.wechat = res.data.wechat.wechat;
                            this.wechat_code = res.data.wechat.wechat_code;
                        }
                    }
                })
            },
            tabToggle(idx) {
                this.currentIndex = idx;
                this.noclick = false;
                if (this.$refs['formRight1']) {
                    this.$refs['formRight1'].resetFields();
                } if (this.$refs['formRight2']) {
                    this.$refs['formRight2'].resetFields();
                }
                if (this.$refs['formRight']) {
                    this.$refs['formRight'].resetFields();
                }
                if (idx == 1) {
                    this.images = [];
                } else if (idx == 2) {
                    this.images1 = [];
                } else if (idx == 0) {
                    this.formRight.bank = "";
                }
                this.init();
            },
            goAuth() {
                this.$router.push("/security/authentication")
            },
            getOssKey() {
                return new Promise((resolve,reject)=>{
           
                    this.FetchGet(this.requestUrl.oss.upload)
                    .then(res =>{
                        let {
                            dir,
                            // key,
                            
                            policy,
                            signature,
                            callback,
                            accessid
                        } = res ;
                        let vm = this
                        this.pathdir=dir;
                         
                         
                        vm.ossParams.key = dir+'${filename}'
                        // vm.ossParams.host = host
                        vm.ossParams.policy = policy
                        vm.ossParams.signature = signature
                        vm.ossParams.callback = callback
                        vm.ossParams.OSSAccessKeyId = accessid
                       
                        resolve(res)
                    
                    })
                    .catch(e=>{
                        reject(e)
                    })
            })

            },
            // handleFormatError (file) {
            //     this.$Notice.warning({
            //         title: '文件格式不正确',
            //         // desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            //     });

            //      this.images[0]=false;
            // },
            // handleMaxSize (file) {

            //     this.$Notice.warning({
            //         title: '超出文件大小限制',
            //         // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'

            //     });
            //  this.images[0]=false;

            // },
        beforeUpload (file){
            
              var type=file.type.split('/')[1];
              var arrs=['png','jpeg','bmp','jpg']
              if(arrs.indexOf(type)==-1){
                  this.$Notice.warning({
                    title: this.$t('aaa.b2'),
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
                 return false
              }
            if(file.size > 5*1024*1024 ){
                  this.$Notice.warning({
                    title: this.$t('aaa.b1'),
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
                return false
            }
           this.onFileChange1(file)
         
            var name=file.type.split('/')[0];
            this.ossParams.name = file.name;
            this.b=file;
            this.ossParams.key=[]
             this.ossParams.key.push(this.pathdir+this.ossParams.name)
             this.ossarr=[];
            this.ossarr.push(this.ossParams.key[0])
        //   this.getOssKey()
        //   .then(r=>{
               
        //   })
        }, 
         beforeUploadz (file){
              
             var type=file.type.split('/')[1];
              var arrs=['png','jpeg','bmp','jpg']
              if(arrs.indexOf(type)==-1){
                  this.$Notice.warning({
                    title: this.$t('aaa.b2'),
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
                 return false
              }
            if(file.size > 5*1024*1024 ){
                  this.$Notice.warning({
                    title: this.$t('aaa.b1'),
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
                return false
            }
          
           this.onFileChange2(file)
         
            var name=file.type.split('/')[0];
            this.ossParams.name = file.name;
            this.b=file;
            this.ossParams.key=[]
             this.ossParams.key.push(this.pathdir+this.ossParams.name)
             this.ossarr=[];
            this.ossarr.push(this.ossParams.key[0])
        //   this.getOssKey()
        //   .then(r=>{
               
        //   })
        },  
        randomString() {
            return (new Date % 9e6).toString(36) + Math.random().toString(36).substring(2, 7)
        },
        handleSuccess(res, file) {
            this.imageUrl = this.uploadHost + '/' + this.ossParams.key
            
        },
            onFileChange1(file) {  //点击图片上传
                this.removeUp();
                if (this.images.length == 1) {
                    this.images = [];
                }
                var files={0:file,length:1}
                // e.target.files[0].name
                this.Url_list.append('file', file)

                if (!files.length) return false;
                this.createImage(files, file.name);

            },
            onFileChange2(file) {  //点击图片上传
                this.removeUp();
                if (this.images1.length == 1) {
                    this.images1 = [];
                }
                var files={0:file,length:1}
               
               
                this.Url_list.append('file',file)

                if (!files.length) return false;
                this.createImage2(files, file.name);

            },
            createImage(file, name) {
                /* alert(1); */
                var image = new Image();
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function (e) {
                        vm.images.forEach((item, index) => {
                            
                            if (item.image == e.target.result) {
                                return false
                            }
                        })
                        vm.images.push({ image: e.target.result, name: name });
                    };
                }
            },
            removeUp() {
                delete this.Url_list.allipy
                delete this.Url_list.types
                delete this.Url_list.transpwd
                delete this.Url_list.update
                delete this.Url_list.wechat
                this.noclick = false;
            },
            createImage2(file, name) {
                 
                var image = new Image();
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function (e) {
                         
                        vm.images1.forEach((item, index) => {
                            
                            if (item.image == e.target.result) {
                                return false
                            }
                        })
                        vm.images1.push({ image: e.target.result, name: name });
                    };
                }
            },
            bind(typ, name) {

                let config = {
                    headers: { 'Content-Type': 'multipart/form-data' }
                };
                let type = '';
                type = typ;
                if (type == 1) {
                    if (!this.formRight.bank) {
                        this.$Notice.warning({
                            title: this.$t('ddd.a2')
                        });
                        this.noclick = false;
                        return false;
                    }
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.noclick = true;
                            this.FetchPost(this.requestUrl.FinanceCenter.binBank, {
                                types: 1,
                                transpwd: this.md5(this.formRight.transpw),
                                bank: this.formRight.bank,
                                card: this.formRight.card,
                                branch: this.formRight.branch,
                                update: this.update
                            }).then(res => {
                                if (res.status == 200) {

                                    // this.noclick = true;
                                    delete this.Url_list.file
                                    // this.Url_list.delete('file')
                                    this.$Notice.success({
                                        title: this.$t('bbb.a16')
                                    });
                                } else if (res.status == 202) {
                                    // this.noclick = true;
                                    delete this.Url_list.file
                                    this.$Notice.success({
                                        title: this.$t('aaa.d5')
                                    });
                                } else if (res.status == 101) {
                                    this.noclick = false;
                                    delete this.Url_list.file
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c3')
                                    });
                                } else if (res.status == 102) {
                                    this.noclick = false;
                                    delete this.Url_list.file
                                    this.$Notice.warning({
                                        title: this.$t('ddd.a9')
                                    })
                                }
                                else if (res.status == 103) {
                                    this.noclick = false;
                                    delete this.Url_list.file
                                    this.$Notice.warning({
                                        title: this.$t('ddd.a10')
                                    });
                                } else if (res.status == 104) {
                                    this.noclick = false;
                                    delete this.Url_list.file
                                    this.$Notice.warning({
                                        title: this.$t('ddd.b1')
                                    });
                                } else if (res.status == 402) {
                                    this.noclick = false;
                                    delete this.Url_list.file
                                    this.$Notice.warning({
                                        title: this.$t('ddd.b2')
                                    });
                                }
                                else if (res.status == 401) {
                                    this.noclick = false;
                                    delete this.Url_list.file
                                    this.$Notice.warning({
                                        title: this.$t('ddd.b3')
                                    });
                                }
                                else if (res.status == 407) {
                                    this.noclick = false;
                                    delete this.Url_list.file
                                    this.$Notice.warning({
                                        title: this.$t('ddd.b6')
                                    });
                                }
                            })
                        } else {
                            this.noclick = false;
                            delete this.Url_list.file
                            this.$Notice.warning({
                                title: this.$t('aaa.b6')
                            })
                        }
                    })

                } else if (type == 2) {
                    this.Url_list.append("alipay", this.formRight1.alipay);
                    this.Url_list.append("types", 2);
                    this.Url_list.append("transpwd", this.md5(this.formRight1.transpw1));
                    this.Url_list.append("update", this.update1);
                    var list = {
                        "alipay": this.formRight1.alipay,
                        "types": "2",
                        "transpwd": this.md5(this.formRight1.transpw1),
                        "update": this.update1,
                        'img': this.ossarr[0]

                    }
                    if (this.images.length == 0) {
                        this.removeUp();
                        this.$Notice.warning({
                            title: this.$t('ddd.b4')
                        });
                        return false;
                    }

                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.FetchPost(this.requestUrl.FinanceCenter.binDing, list).then(res => {
                                if (res.status == 200) {

                                    this.noclick = true;
                                    this.$Notice.success({
                                        title: this.$t('bbb.a16')

                                    });
                                    this.init();
                                } else if (res.status == 202) {
                                    this.$Notice.success({
                                        title: this.$t('aaa.d5')
                                    });
                                    this.noclick = true;
                                    this.init();
                                } else if (res.status == 405) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c3')
                                    });
                                } else if (res.status == 401) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.b33')
                                    });
                                }
                                else if (res.status == 406) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c6')
                                    });
                                } else if (res.status == 403) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.b2')
                                    });
                                } else if (res.status == 402) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.b66')
                                    });
                                }
                                else if (res.status == 407) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('ddd.b6')
                                    });
                                }
                            })
                        }
                    })
                } else if (type == 3) {
                    this.Url_list.append("wechat", this.formRight2.wechat);
                    this.Url_list.append("types", 3);
                    this.Url_list.append("transpwd", this.md5(this.formRight2.transpw2));
                    this.Url_list.append("update", this.update2);
                    var list = {
                        "wechat": this.formRight2.wechat,
                        "types": "3",
                        "transpwd": this.md5(this.formRight2.transpw2),
                        "update": this.update2,
                        'img': this.ossarr[0]

                    }
                    if (this.images1.length == 0) {
                        this.removeUp();
                        this.$Notice.warning({
                            title: this.$t('ddd.b5')
                        });
                        return false;
                    }
                    this.$refs[name].validate((valid) => {
                        if (valid) {
                            this.FetchPost(this.requestUrl.FinanceCenter.binDing, list).then(res => {
                                if (res.status == 200) {
                                    this.noclick = true;
                                    this.$Notice.success({
                                        title: this.$t('bbb.a16')

                                    });
                                    this.init();
                                } else if (res.status == 202) {
                                    this.noclick = true;
                                    this.$Notice.success({
                                        title: this.$t('aaa.d5')
                                    });
                                    this.init();
                                } else if (res.status == 405) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c3')
                                    });
                                } else if (res.status == 401) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.b33')
                                    });
                                }
                                else if (res.status == 406) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.c6')
                                    });
                                } else if (res.status == 403) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.b2')
                                    });
                                } else if (res.status == 402) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('aaa.b66')
                                    });
                                }
                                else if (res.status == 407) {
                                    this.removeUp();
                                    this.$Notice.warning({
                                        title: this.$t('ddd.b6')
                                    });
                                }
                            })
                        }
                    })
                }

            },
            changeZ(idx) {
                this.noclick = false;
                if (idx == 2) {
                    this.unbinnd2 = true;
                    this.update1 = 1;
                    this.formRight1.alipay = "";
                    this.formRight1.transpw1 = "";
                    this.images = [];
                } else if (idx == 3) {
                    this.unbinnd3 = true;
                    this.update2 = 1;
                    this.formRight2.wechat = "";
                    this.formRight2.transpw2 = "";
                    this.images1 = [];
                } else if (idx == 1) {
                    this.unbinnd1 = true;
                    this.update = 1;
                    this.formRight.transpw = "";
                    this.formRight.bank = "";
                    this.formRight.card = "";
                    this.formRight.branch = "";
                }

            }
        },
        created() {
            this.init();
        },
        computed: {
            bankList() {
                return this.$t('bank')
            },

        },
        mounted(){
                this.getOssKey()
        },
        watch: {

        }
    }
</script>
<style lang="scss">
    .c_conent {
        width: 100%;
        height: 100%;
        /* .ivu-btn-primary {
            width: auto;
        } */
        .c_header {
            width: 100%; // height:0.78rem; 
            padding-top: 0.3rem;
            ;
            padding-bottom: 0.3rem;
            ;
            border-bottom: 1px solid #ebebeb;
            margin-bottom: 0.3rem;
            h2 {
                display: block;
                line-height: 0.25rem;
                padding-left: 0.16rem;
                margin-left: 0.3rem;
                border-left: 0.04rem solid #00aedd;
                height: 0.25rem;
            }
        }
        .c-main {
            .msg {
                background: #ffefef;
                border: 1px solid #ff9595;
                padding: 0.2rem 0;
                margin-top: 20px;
                margin-bottom: 30px;
                padding-left: 20px;
                font-size: 14px;
                button {
                    margin-left: 20px;
                }
            }
            width: 95%;
            margin: 0 auto;
            .topUl {
                width: 100%;
                min-height: 40px;
                padding-bottom: 70px;
                border-bottom: 1px dashed #cccccc;
                li {
                    float: left;
                    border: 1px solid #ededed;
                    padding: 8px 20px;
                    margin-right: 16px;
                    cursor: pointer;
                    text-align: center;
                    span {
                        font-size: 14px;
                    }
                }
                li:hover {
                    color: #00aedd;
                    border: 1px solid #00aedd;
                }
                .lis {
                    color: #00aedd;
                    border-bottom: 2px solid #00aedd;
                }
            }
        }

        form {
            width: 60%;
            margin: 0 auto;
            margin-top: 0.3rem;
            margin-left: 15%;
            p {
                font-size: 14px;
            }
            input {
                position: relative;
            }
            .formSpan {
                display: inline-block;
                position: absolute;
                top: 0;
                right: 10px;
                padding: 0 0.1rem;
                height: 70%;
                margin-top: 0.1rem;
                line-height: 0.35rem; // width: 0.92rem;
                border-left: 1px solid #e5e5e5;
                text-align: center;
            }
            .ivu-input {
                height: 40px;
            }
            .ivu-input-wrapper,
            .ivu-select {
                width: 85%;
            }
            .ivu-select-single,
            .ivu-select-selection,
            .ivu-select-placeholder,
            .ivu-select-selected-value {
                height: 40px!important;
                line-height: 40px!important;
            }
        }
        .btn {
            text-align: center;
        }
        .inps:hover {
            border-color: #57a3f3;

        }
        .wemUp {
            width: 68px;
            height: 68px;
            border: 1px dashed #ccc;
            cursor: pointer;
            position: relative;
            overflow: hidden; // input {
            //     width: 100%;
            //     height: 100%;
            //     display: block;
            //     position: absolute;
            //     left: 0;
            //     top: 0;
            //     z-index: 8;
            //     cursor: pointer;
            //     margin-right: 10px;
            // }
            .ivu-upload {
                height: 100%;
                .ivu-upload-drag {
                    height: 100%;

                }
            }
            h2 {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 7;
                line-height: 68px;
                text-align: center;
                cursor: pointer;
                font-weight: normal;
            }
        }
        .img_show {
            position: relative;
            margin-right: 10px;
            cursor: pointer;
            /* float: left; */
            width: 68px;
            height: 68px;
            border: 1px dashed #dddee1;
            img {
                width: 100%;
                height: 100%;
                /* display: inline-block; */
            }
        }
        .reloadMore {
            color: #00aedd;
            font-size: 14px;
            cursor: pointer;
            position: absolute;
            top: 45px;
            left: 80px;
            display: inline-block;
            z-index: 100px;

        }
        .reloadMore1 {
            cursor: pointer;
            position: absolute;
            top: 34px;
            width: 100px;
            left: 70px;
            /* left: 80px; */
            .ivu-upload-drag {
                border: none;
                color: #00aedd;
                font-size: 14px;
            }
            .ivu-upload-list {
                display: none;
            }
            .ivu-upload-drag:hover {
                border: none;
            }
        }
    }

    .ivu-select-selection,
    .ivu-select-selected-value {
        height: 40px!important;
        line-height: 40px!important;
    }
</style>