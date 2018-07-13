<template>
    <div class="a_conent">
        <div class="a_header">
            <h2>{{$t("authen.title")}}</h2>
        </div>
        <Steps :current="step">
            <Step :title="$t('authen.title1')"></Step>
            <Step :title="$t('authen.title2')"></Step>
            <Step :title="$t('authen.title3')"></Step>
            <Step :title="$t('authen.title4')"></Step>
        </Steps>
        <!-- 第一步 -->
        <div class="one" v-if="step==0">
            <div class="info">
                <p>{{$t("authen.msg3")}}</p>
            </div>
            <div class="first">
                <Form :model="formRight" label-position="right" :label-width="200" ref="formRight" :rules="ruleValidate">
                    <FormItem :label="$t('authen.form1')" prop="name">
                        <Input v-model="formRight.name"></Input>
                    </FormItem>
                    <FormItem :label="$t('authen.form2')" prop="address">
                        <Select v-model="formRight.address" @on-change="change()">
                            <Option v-for="(item,index) in placeList" :value="item[1]" :key="item[0]">{{item[1]}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('authen.form3')" prop="idtype">
                        <Select v-model="formRight.idtype" :disabled="ctype">
                            <!-- <Option value="">{{$t("config.action7")}}</Option> -->
                            <Option value="1">{{$t("config.action8")}}</Option>
                            <Option value="2">{{$t("config.action9")}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="$t('authen.form4')" prop="idcard">
                        <Input v-model="formRight.idcard" type="text"></Input>
                    </FormItem>

                </Form>
                <div class="btn">
                    <Button type="primary" size="large" @click="handleSubmit('formRight')">{{$t("config.action11")}}</Button>
                    <!-- <Button type="ghost" size="large">{{$t("authen.msg2")}}</Button> -->
                    <span style="color:#00aade;font-size:14px;cursor:pointer" @click="goRate">{{$t("config.a1")}}</span>
                </div>
            </div>
        </div>
        <!-- 第二步 -->
        <div class="two" v-if="step==1">
            <!-- <oss-upload></oss-upload>  -->
            <div class="infos" v-if="onphoto">
                <p>{{$t("authen.info1")}}</p>
                <p>{{$t("authen.info2")}}</p>
                <p>{{$t("authen.info3")}}</p>
                <p>{{$t("authen.info4")}}</p>
            </div>
            <!-- 上传身份证未通过 -->
            <div class="info" v-if="onphoto1" style="margin-top:0.45rem;">
                <p>
                    <span style="margin-right:0.25rem;">{{$t("a.a2")}}</span>
                    <Button type="primary" @click="onemore">{{$t("a.a4")}}</Button>
                </p>
            </div>
            <!-- 上传身份证正在审核 -->
            <div class="info" v-if="onphoto2" style="margin-top:0.45rem;">
                <p>
                    <span style="margin-right:0.25rem;">{{$t("a.a3")}}</span>
                </p>
            </div>
            <!-- 上传身份证 -->
            <div class="second" v-if="onphoto">
                <Form :model="formRight1" label-position="right" :label-width="200">
                    <FormItem :label="$t('authen.form1')">
                        <span>{{username}}</span>
                    </FormItem>
                    <FormItem :label="$t('authen.form2')">
                        <span>{{area}}</span>
                        
                    </FormItem>
                    <FormItem :label="$t('authen.form3')">
                        <span v-if="cardtype == 1 ">{{$t('config.action8')}}</span>
                        <span v-if="cardtype == 2">{{$t('config.action9')}}</span>
                    </FormItem>
                    <FormItem :label="$t('authen.form4')">
                        <span>{{idcard}}</span>
                    </FormItem>
                    <!-- 中国上传身份证和手持 -->
                    <FormItem :label="$t('authen.form5')" v-if="!onpass"> 
                        <div class="img_show" v-for="(item,index) in images">
                            <img :src="images[index].image" alt="" v-if="index!=2">
                            <div class="demo-upload-list-cover" v-if="index!=2">
                                <Icon type="ios-eye-outline" @click.native="handleView1(index)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove1(index,item.name)"></Icon>
                            </div>
                        </div>
                        <div class="upload" v-if="!images[1]">
                            <!-- <h2>+</h2>
                            <input type="file" value="123" mutiple @change="onFileChange" accept="image/png,image/gif,image/jpeg" style="opacity:0;" ref="ipus"> -->
                             <Upload 
                                multiple
                                type="drag"
                                :action="uploadHost"
                                :before-upload="beforeUploadz"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png','bmp']"
                                :max-size="5120"
                                :on-format-error="handleFormatErrorz"
                                :on-exceeded-size="handleMaxSizez"
                                :data="ossParams">
                                <div style="padding: 20px 0">
                                     +
                                </div>
                                </Upload>
                        </div>
                        <div class="show1">
                                <span>{{$t('authen.form6')}}</span>
                                <img src="/static/img/idcard.jpg" alt="">
                                <img src="/static/img/idcard1.jpg" alt="">
                            </div>
                 </FormItem>
                 <FormItem :label="$t('authen.form7')" v-if="!onpass">
                    <div class="upload" v-if="!images2[0]">
                        <!-- <h2>+</h2>
                        <input type="file"  mutiple @change="onFileChange2" accept="image/png,image/gif,image/jpeg" style="opacity:0;"> -->
                         <Upload 
                                multiple
                                type="drag"
                                :action="uploadHost"
                                :before-upload="beforeUploadzd"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png','bmp']"
                                :max-size="5120"
                                :on-format-error="handleFormatErrorzw"
                                :on-exceeded-size="handleMaxSizezw"
                                :data="ossParams">
                                <div style="padding: 20px 0">
                                     +
                                </div>
                                </Upload>
                    </div>
                    <div class="img_show" v-for="(item,index)  in images2" :key="index">
                        <img :src="images2[index].image" alt="">
                        <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView2(index)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove2(index,item.name)"></Icon>
                        </div>
                    </div>
                    <div class="show">
                            <span>{{$t('authen.form6')}}</span>
                            <img src="/static/img/card.png" alt="">
                    </div>
                </FormItem>

                    <!-- 国外上传护照 -->
                <FormItem :label="$t('authen.form7')" v-if="onpass">
                        <div class="upload" v-if="!images[0]">
                            
                            <Upload 
                                multiple
                                type="drag"
                                :action="uploadHost"
                                :before-upload="beforeUpload"
                                :on-success="handleSuccess"
                                :data="ossParams"
                                :format="['jpg','jpeg','png','bmp']"
                                :max-size="5120"
                                :on-format-error="handleFormatErrorw"
                                :on-exceeded-size="handleMaxSizew"
                                >
                                <div style="padding: 20px 0">
                                     +
                                </div>
                                </Upload>
                        </div>
                        <div class="img_show" v-if="images[0]" >
                                <img :src="images[0].image" alt="">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView()"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(images[0].name)"></Icon>
                            </div>
                        </div>
                        <div class="show3">
                            <span>{{$t('authen.form6')}}</span>
                            <img src="/static/img/pcard.png" alt="">
                        </div>
                </FormItem>

                </Form>


            </div>
            <div class="btn" v-if="onphoto">
                <Button type="primary" size="large" @click="gothree" :disabled="noclick">{{$t("config.action11")}}</Button>
                <span style="color:#00aade;font-size:14px;cursor:pointer" @click="goRate">{{$t("config.a1")}}</span>
            </div>
        </div>
        <Modal title="大图" v-model="visible">
            <img :src="bigImg" v-if="visible" style="width: 100%;height:100%;">
        </Modal>
        <!-- 第三步 -->
        <div class="three" v-if="step==2">
            <div class="infoss" v-if="onvideo">
                <p>{{$t('a.a10')}}</p>
                <p>{{$t('a.a11')}}</p>
                <p>{{$t('a.a12')}}</p>
                <P>{{$t('a.a13')}}</P>
            </div>
            <div class="info" v-if="onvideo1" style="margin-top:0.45rem;">
                <p>
                    <span style="margin-right:0.25rem;">{{$t('a.a14')}}</span>
                    <Button type="primary" @click="onemore1">{{$t('a.a4')}}</Button>
                </p>
            </div>
            <div class="info" v-if="onvideo2" style="margin-top:0.45rem;">
                <p>
                    <span style="margin-right:0.25rem;">{{$t('a.a15')}}</span>
                </p>
            </div>
            <div class="third" style="height:5.2rem;" v-if="onvideo">
                <Form :model="formRight1" label-position="right" :label-width="200" ref="formRight1">
                    <FormItem :label="$t('authen.form1')">
                        <span>{{username}}</span>
                    </FormItem>
                    <FormItem :label="$t('authen.form2')">
                        <span>{{area}}</span>
                       
                    </FormItem>
                    <FormItem :label="$t('authen.form3')">
                        <span v-if="cardtype == 1 ">{{$t('config.action8')}}</span>
                        <span v-if="cardtype == 2">{{$t('config.action9')}}</span>
                    </FormItem>
                    <FormItem :label="$t('authen.form4')">
                        <span>{{idcard}}</span>
                    </FormItem>

                    <FormItem :label="$t('e.b1')">
                        <!-- <Upload :action="http://code.btcfoo.com/User/chkVideo" class="upVideo" :with-credentials="true" :before-upload="handleUpload"
                            v-if="file == null">+</Upload> -->
                            <div class="upVideo" v-if="file == null" >
                            
                            <Upload 
                                multiple
                                type="drag"
                                :action="uploadHost"
                                :before-upload="beforeUploadv"
                                :on-success="handleSuccess"
                                :data="ossParams"
                                 :format="['mp4','avi']"
                                :max-size="51200"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                >
                                <div style="padding: 0px 0">
                                     +
                                </div>
                                </Upload>
                        </div>
                        <div v-if="file !== null" style="width:250px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ file.name }}</div>
                        <!-- <Upload :action="http://code.btcfoo.com/User/chkVideo" :with-credentials="true" :before-upload="handleUpload" v-if="file != null">
                            <Button  style="margin-left:25px;border:1px solid #cccccc;background:#f9f9f9;width:100px;height:30px;"
                                v-if="file !== null">{{$t('a.a9')}}</Button>
                        </Upload> -->
                         <Upload 
                         v-if="file !== null"
                                multiple
                                type="drag"
                                :action="uploadHost"
                                :before-upload="beforeUploadv"
                                :on-success="handleSuccess"
                                :data="ossParams"
                                 :format="['mp4','avi']"
                                :max-size="51200"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                >
                                <div style="margin-left:25px;border:1px solid #cccccc;background:#f9f9f9;width:100px;height:30px;padding: 0px 0;line-height: 30px;">
                                     {{$t('a.a9')}}
                                </div>
                                </Upload>
                        <div class="upShow">
                            <p>{{$t('authen.form6')}}</p>
                            <dl>
                                <dt>
                                    <img src="/static/img/rz1.png" alt="">
                                </dt>
                                <dd>{{$t('authen.info8')}}</dd>
                            </dl>
                            <dl>
                                <dt>
                                    <img src="/static/img/rz2.png" alt="">
                                </dt>
                                <dd>{{$t('authen.info7')}}</dd>
                            </dl>
                        </div>
                    </FormItem>


                    <!-- 国外上传护照 -->
                </Form>
            </div>
            <div class="btn1" v-if="onvideo">
                <!-- <Button type="primary" size="large">{{$t("authen.info9")}}</Button> -->
                <Button type="primary" @click="videoSuccess" :disabled="novideo">{{$t('authen.msg1')}}</Button>
                <span style="color:#00aade;font-size:14px;cursor:pointer" @click="goRate">{{$t("config.a1")}}</span>
                <!-- <Button type="ghost" size="large" @click="gotwo">{{$t("authen.msg2")}}</Button> -->
            </div>
        </div>
        <!-- 认证完成 -->
        <div class="four" v-if="step==3">
            <dl>
                <dt>
                    <img src="/static/img/rzwc.png" alt="">
                </dt>
                <dd>
                    <span>{{$t("a.a1")}}</span>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>
   import ossUpload from './ossUpload.vue';
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
} 
    export default {
         components: {
             ossUpload
         },
        data() {
            const validateMobile = (rule, value, callback) => {
                if (this.formRight.idtype == '1') {
                    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
                        callback(new Error(this.$t('input.a4')));
                    } else {
                        callback();
                    }

                } else {
                    if (!Number.isInteger(+value)) {
                        callback(new Error(this.$t('input.a4')));
                    } else {
                        callback();
                    }
                }
            };
            const validateName = (rule, value, callback) => {
                if (!/[a-zA-Z\u4E00-\u9FA5]+$/.test(value)) {
                    callback(new Error(this.$t('input.a2')));
                } else {
                    callback();
                }
            };
            return {
                onphoto: true,//上传图片
                onphoto1: false,//上传图片不通过
                onphoto2: false,//正在审核
                onvideo: true,//
                onvideo1: false,//上传视频不通过
                onvideo2: false,//正在审核
                step: 0,  //步骤条
                ctype: false,
                file: null,
                loadingStatus: false,
                username: "",
                area: "",
                idcard: "",
                someimg: 0,
                cardtype: "",
                bigImg: "",
                noclick: false,
                novideo:false,
                onpass: false,
                formRight: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                    name: '',
                    address: '',
                    idtype: '',
                    idcard: '',
                },
                ruleValidate: { 
                    name: [
                        { required: true, message: this.$t('input.a1'), trigger: 'blur' },
                        { validator: validateName, trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: this.$t('action.action2'), trigger: 'change' }
                    ],
                    idtype: [
                        { required: true, message: this.$t('action.action3'), trigger: 'change' }
                    ],
                    idcard: [
                        { required: true, message: this.$t('input.a3'), trigger: 'blur' },
                        { validator: validateMobile, trigger: 'blur' }
                    ],

                },
                formRight1: {
                    input1: '',
                    input2: '',
                    input3: '',
                    input4: '',
                },
                defaultList: [
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                place: '',
                uploadList1: [],//身份证正反面
                getUserMedia: "",
                vedio_if: true,
                images: [],
                images2: [],
                Url_list: new FormData(),
                uploadHost:this.Global.uploadHost,
                ossParams:{
                    name:'',
                    key: "", // key后面有用，先默认设空字符串
                    policy: '',
                    OSSAccessKeyId: '',
                    success_action_status: '200', // 默认200
                    callback: '',
                    signature: '',
                    // host: "",
                    // keys:[]
                },
                type:1,
                a:new Date().format("yyyy-MM-dd"),
                b:'',
                ossarr:[],
                pathdir:'',
                pathName:''
            }
        },
        methods: {
            handleView1(index) {
                this.bigImg = this.images[index].image;
                // this.imgName = name;
                this.visible = true;
            },
            handleUpload(file) {
               
                this.file = file;
                return false;
            },
            handleView2(index) {
                this.bigImg = this.images2[index].image;
                // this.imgName = name;
                this.visible = true;
            },
            handleView(name) {
                
                this.bigImg = this.images[0].image;
                this.visible = true;
            },
            handleRemove(index,name) {
                // console.log(this.images[0])
                this.images = [];
                this.ossarr.pop();
                this.Url_list.delete('k1');
            },
            handleRemove2(index,name) {
                // console.log(this.images[0])
                this.images2.splice(index, 1)
                // this.images[index]="";
                // console.log(this.images2)
                // console.log(this.Url_list2)
                 this.ossarr.pop();
                this.Url_list.delete("k3");
                // const fileList = this.$refs.upload.fileList;
                // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            getOssKey (){
                
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
                         
                        // console.log(this.pathdir)
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
                this.ossParams.keys=[]
                this.ossParams.keys.push(this.pathdir+this.ossParams.name)
                this.ossarr.push(this.ossParams.keys[0])
            
            // console.log(this.ossarr)
          
          
        },//上传视频
         beforeUploadv (file){
            var type=file.type.split('/')[1];
              var arrs=['mp4','avi']
              if(arrs.indexOf(type)==-1){
                  this.$Notice.warning({
                    title: this.$t('aaa.b2'),
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
                 return false
              }
            if(file.size > 50*1024*1024 ){
                  this.$Notice.warning({
                    title: this.$t('aaa.b2'),
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
                return false
            }
          
          this.file=file;
         
            var name=file.type.split('/')[0];
             this.ossParams.name = file.name;
            this.b=file;
            this.ossParams.keys=[]
             this.ossParams.keys.push(this.pathdir+this.ossParams.name)
            this.ossarr.push(this.ossParams.keys[0])
        //   this.getOssKey()
        //   .then(r=>{
               
        //   })
        },
        handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    // desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
                this.file=null
            },
            handleMaxSize (file) {
              
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
             this.file=null
                 
            },//国外身份证上传
             handleFormatErrorw (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    // desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
                 this.images[0]=false;
            },
            handleMaxSizew (file) {
              
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
            
                 this.images[0]=false;
            },//国内身份证上传
              handleFormatErrorz (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    // desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
                this.images[1]=true;
            },
            handleMaxSizez(file) {
              
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
            
                  this.images[1]=true;
            },
             handleFormatErrorzw (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    // desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
               
            },
            handleMaxSizezw(file) {
              
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    // desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                  
                });
           
                
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
          
           this.onFileChange(file)
         
            var name=file.type.split('/')[0];
            this.ossParams.name = file.name;
            this.b=file
            this.ossParams.keys=[];
             this.ossParams.keys.push(this.pathdir+this.ossParams.name)
            this.ossarr.push(this.ossParams.keys[0])
        
        },
         beforeUploadzd (file){
             
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
             this.ossParams.keys=[];
             this.ossParams.keys.push(this.pathdir+this.ossParams.name)
            this.ossarr.push(this.ossParams.keys[0])
        //   this.getOssKey()
        //   .then(r=>{
               
        //   })
        },
        randomString() {
            return (new Date % 9e6).toString(36) + Math.random().toString(36).substring(2, 7)
        },
        handleSuccess(res, file) {
            this.imageUrl = this.uploadHost + '/' + this.ossParams.keys
             
        },
            videoSuccess() {
                this.loadingStatus = true;
                let file = this.file;
                if(file==null){
                    return false;
                }
                let param = new FormData()  // 创建form对象
                param.append('file', file, file.name)  // 通过append向form对象添加数据
                param.append('chunk', '0') // 添加form表单中其他数据

                let config = {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
                this.novideo=true;

                this.FetchPost(this.requestUrl.user.chkVideo, {video:this.ossarr[0]}).then(res => {
                    if (res.status == 200) {
                        // this.$Message.success(res.message)
                        this.onvideo2 = true;
                        this.onvideo = false; 0
                        this.file = null;
                        this.loadingStatus = false;
                    } else if(res.status==401){
                        this.$Notice.warning({
                            title:this.$t('aaa.b1')
                        });
                        this.novideo=false;
                        this.loadingStatus = false;
                    }else if(res.status==402){
                        this.$Notice.warning({
                            title:this.$t('aaa.b3')
                        });
                        this.loadingStatus = false;
                        this.novideo=false;
                    }
                    else if(res.status==403){
                        this.$Notice.warning({
                            title:this.$t('aaa.b2')
                        });
                        this.novideo=false;
                    }
                })

            },
            goRate() {
                this.$router.push({
                    path: "/rate",
                    name:'Rate',
                    query: {
                        currIndex: 1
                    }
                })
            },
            onemore() {  //身份证重新认证
                this.onphoto1 = false;
                this.onphoto = true;
                if (this.area == '中国大陆') {
                     
                      this.onpass = false;
                   
                  } else {
                 
                      this.onpass = true;
                  
                  }
            },
            onemore1() {  //视频从新认证
                this.onvideo1 = false;
                this.onvideo = true;
            },
            goone() {
                this.step = 0;
            },
            onFileChange(file) {  //点击图片上传
                // alert(1)
                // let files = e.target.files || e.dataTransfer.files;
                // this.Url_list.append(files[0].name, e.target.files[0])
        
                // if (!files.length) return false;
                // this.createImage(files,e.target.files[0].name);
                var files={0:file,length:1}
                this.Url_list.append(files[0].name, file)
        
                if (!files.length) return false;
                this.createImage(files,file.name);
                //在这里清楚input的value就行
                // console.log(files[0])

            },
            onFileChange2(file) {  //点击图片上传
            
                // let files = e.target.files || e.dataTransfer.files;
                // // console.log(e.target.files[0])

                // this.Url_list.append("k3", e.target.files[0])

                // if (!files.length) return false;
                // this.createImage2(files, e.target.files[0].name);
                 var files={0:file,length:1}
                // console.log(e.target.files[0])

                this.Url_list.append("k3", file)

                if (!files.length) return false;
                this.createImage2(files, file.name);

                },
            onFileChange1(file) {  //点击图片上传
               
                // let files = e.target.files || e.dataTransfer.files;
                // console.log(files)
                // var files=[];
                var files={0:file,length:1}
                this.Url_list.append('k1', file)
                if (!files.length) return false;
                this.createImage(files, file.name);

            },
            handleRemove1(index, name) {  //删除图片
                // console.log(this.images)
                let images = this.images;
                this.images.splice(index, 1)
                // this.images[index]="";
                this.ossarr.pop();
                this.Url_list.delete(name);
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
                        // console.log(e);
                        vm.images.forEach((item, index) => {
                            // console.log(item, index);
                            if (item.image == e.target.result) {
                                return false
                            }
                        })
                        vm.images.push({ image: e.target.result, name: name });
                        // console.log(vm.$refs.ipus.outerHTML)
                        // if(vm.$refs.ipus.outerHTML) { // for IE, Opera, Safari, Chrome
                        //     vm.$refs.ipus.outerHTML ='<input type="file" value="123" mutiple @change="onFileChange" accept="image/png,image/gif,image/jpeg" style="opacity:0;" ref="ipus">'; //重新赋值HTML片段
                        // }else { //FF(version 3.5+)
                            // vm.$refs.ipus.value=''; //清空上传成功后的value值 
                        // }
                    };
                }
            },
            createImage2(file, name) {
                /* alert(1); */
                var image = new Image();
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {

                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function (e) {
                        // console.log(e);
                        vm.images2.forEach((item, index) => {
                            // console.log(item, index);
                            if (item.image == e.target.result) {
                                return false
                            }
                        })
                        vm.images2.push({ image: e.target.result, name: name });

                    };
                }
                // console.log(this.images2);
            },
            uploadImage() {

                if (Number(this.images.length)+Number(this.images2.length) < 3 && this.area == '中国大陆') {
                    this.$Notice.warning({
                        title: this.$t('aaa.b4')
                    })
                    return false;
                }
                if (Number(this.images.length)<1 && this.area != '中国大陆') {
                    this.$Notice.warning({
                        title: this.$t('seo.ccc')
                    })
                    return false;
                }
                let config = {
                    headers: { 'Content-Type': 'multipart/form-data' }
                };
                this.noclick = true;
                // console.log(this.Url_list)
                this.FetchPost(this.requestUrl.user.UserUpload, this.ossParams.keys, config).then(res => {
                    if (res.status == 200) {
                        // this.$Notice.success({
                        //     title: res.message
                        // })
                        this.onphoto2 = true;
                        this.onphoto = false;
                    } else if(res.status==401){
                        this.$Notice.warning({
                            title:this.$t('aaa.b33')
                        })
                        this.noclick = false;
                    }else if(res.status==402){
                        this.$Notice.warning({
                            title:this.$t('aaa.b3')
                        })
                        this.noclick = false;
                    }else if(res.status==403){
                        this.$Notice.warning({
                            title:this.$t('aaa.b2')
                        })
                        this.noclick = false;
                    }

                })
            },
            handleSubmit(name) {  //跳转到第二步
                // this.step = 1;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.FetchPost(this.requestUrl.user.UserCheck, { xm: this.formRight.name, card: this.formRight.idcard, ctype: this.formRight.idtype, country: this.formRight.address }).then(res => {
                            if (res.status == 200) {
                                // this.$Notice.success({
                                //     title: res.message
                                // })
                                this.step = 1;
                                this.username = res.data.xm;
                                this.idcard = res.data.card;
                                this.area = res.data.country;
                                if (this.area == "中国大陆") {

                                    this.onpass = false;
                                } else {
                                  
                                    this.onpass = true;
                                }
                                this.cardtype = res.data.ctype;
                            }else if(res.status==402){
                                this.$Notice.warning({
                                    title: this.$t('bbb.a10')
                                })
                            }else if(res.status==403){
                                this.$Notice.warning({
                                    title: this.$t('bbb.a11')
                                })
                            }else {
                                this.$Notice.warning({
                                    title: this.$t('aaa.b5')
                                })
                            }
                        })
                    }
                })
            },
            gothree() { //跳转到第三步
                
                     
                    // this.step = 2;
                /* this.step = 3; */
                //this.uploadImage();
          this.ossParams.keys = this.ossarr
          if(this.ossParams.keys.length==0){
                this.$Notice.warning({
                    title:this.$t('aaa.e11')
                             })
                         return; 
          }
          if(this.area == "中国大陆"){
              
              if(this.ossParams.keys.length!==3){
                this.$Notice.warning({
                    title:this.$t('aaa.e12')
                             })
                 return; 
          }
          }
         
                this.FetchPost(this.requestUrl.user.UserUpload,{img:this.ossParams.keys}).then(res => {
                    if (res.status == 200) {
                        // this.$Notice.success({
                        //     title: res.message
                        // })
                        this.onphoto2 = true;
                        this.onphoto = false;
                    } else if(res.status==401){
                        this.$Notice.warning({
                            title:this.$t('aaa.b33')
                        })
                        this.noclick = false;
                    }else if(res.status==402){
                        this.$Notice.warning({
                            title:this.$t('aaa.b3')
                        })
                        this.noclick = false;
                    }else if(res.status==403){
                        this.$Notice.warning({
                            title:this.$t('aaa.b2')
                        })
                        this.noclick = false;
                    }else if(res.status==400){
                    this.$Notice.warning({
                                title:this.$t('aaa.e11')
                                            })
                        this.noclick = false;
                    }else if(res.status==407){
                        this.$Notice.warning({
                            title:this.$t('aaa.e13')
                                 })
                            }

                })
            },
            change() {
                // console.log(this.formRight.address)
                if (this.formRight.address == '中国大陆' || this.formRight.address == 'China') {
                    this.formRight.idtype = "1";
                    this.ctype = true;
                } else {
                    this.ctype = true;
                    this.formRight.idtype = "2";
                }
            },
        },
        computed: {
            placeList() {
                return this.$t('address')
            },
            
        },
        mounted() {
            this.FetchGet(this.requestUrl.user.UserReal, {}).then(res => {
                if (res.status == 401 && res.data.level == 1) { //身份在审核
                    this.onphoto2 = true;
                    this.onphoto = false;
                    this.onphoto1 = false;
                } else if (res.status == 403 && res.data.level == 1) {//身份未通过
                    this.onphoto1 = true;
                    this.onphoto = false;
                    this.onphoto2 = false;

                } else if (res.status == 401 && res.data.level == 2) {  //视频在审核
                    this.onvideo2 = true;
                    this.onvideo = false;
                    this.onvideo1 = false;
                } else if (res.status == 403 && res.data.level == 2) {//视频未通过
                    this.onvideo1 = true;
                    this.onvideo = false;
                    this.onvideo2 = false;
                } else if (res.status == 200 && res.data.level == 1) {
                    if (res.data.country == '中国大陆') {
                        this.onphoto2 = false;
                        this.onphoto = true;
                        this.onpass = false;
                        this.onphoto1 = false;
                    } else {
                        this.onphoto2 = false;
                        this.onphoto = true;
                        this.onpass = true;
                        this.onphoto1 = false;
                    }
                }else if (res.status == 202 && res.data.level == 1) {
                    if (res.data.country == '中国大陆') {
                        this.onphoto2 = false;
                        this.onphoto = true;
                        this.onpass = false;
                        this.onphoto1 = false;
                    } else {
                        this.onphoto2 = false;
                        this.onphoto = true;
                        this.onpass = true;
                        this.onphoto1 = false;
                    }
                }
                this.step = Number(res.data.level);
                //console.log(res)
                this.username = res.data.xm;
                this.idcard = res.data.card;
                this.area = res.data.country;
                this.cardtype = res.data.ctype;
            })
              //
              this.getOssKey()
        },
       
    }
</script>
<style lang="scss">
    @import "../../assets/css/authentication.scss"
</style>