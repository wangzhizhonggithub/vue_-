<template>

    <div>
        <Upload
        multiple
        type="drag"
        action="http://bf-upload.oss-cn-qingdao.aliyuncs.com"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :data="ossParams">
            <div style="padding: 20px 0">
                1
            </div>
        </Upload>
        <div @click='hu'>qwe</div>
    </div>
</template>

<script>
// window.mOxie = require( './plupload-2.1.2/js/moxie.js')
// console.log(mOxie)
// require( './plupload-2.1.2/js/plupload.full.min.js')
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

// import './plupload-2.1.2/upload.js'
import axios from 'axios';

export default {
    name:'ossUpload',
    data () {
        return {
            uploadHost:'https://btcfoo-upload.oss-cn-beijing.aliyuncs.com',
            ossParams:{
                key: '', // key后面有用，先默认设空字符串
                success_action_status: '200', // 默认200
            },
            type:1,
            a:new Date().format("yyyy-MM-dd"),
            b:''
        }
    },
    created (){
        this.init()
    },
    methods: {
        init (){
            
        },
        getOssKey (){
            return new Promise((resolve,reject)=>{
                 axios.get('http://jys.chainshome.com/Oss/plupload?dirs=image')
                .then(res =>{
                    // Object.assign(this.ossParms,r.body)
                    resolve(res)
                   
                })
                .catch(e=>{
                    reject(e)
                })
            })
           
        },
 
        beforeUpload (file){
            console.log(file)
            
            var name=file.type.split('/')[0];
            this.b=file
             this.ossParams.key = `${name}/${this.a}/${this.randomString()}.${file.type.split('/').pop()}`
            
          this.getOssKey()
          .then(r=>{
               
          })
        },
        randomString() {
            return (new Date % 9e6).toString(36) + Math.random().toString(36).substring(2, 7)
        },
        handleSuccess(res, file) {
            this.imageUrl = this.uploadHost + '/' + this.ossParams.key
            console.info(this.imageUrl)
        },
        hu(){
            
            this.getOssKey()
                .then(r=>{
                    
                })
        }
    }
}
</script>
