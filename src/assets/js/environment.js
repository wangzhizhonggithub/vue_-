var URL = process.env.API_ROOT
    ,K_URL = process.env.K_URL
    ,uploadHost = process.env.UPLOAD_HOST
    ,publicInfor = process.env.PUBLIC_INFO
   
//    ,en = process.argv[2]

// if(process.env.NODE_ENV === 'development'){ //dev

//     URL = 'http://jys.chainshome.com/' //图片的地址

//     K_URL = 'http://node.chainshome.com/'

//     uploadHost = "https://bf-upload.oss-cn-qingdao.aliyuncs.com/"

// }else{
       
//     if(en !== "pro"){

//         URL = 'http://jys.chainshome.com/' // pro 测试
//         K_URL = 'http://node.chainshome.com/' //pro 测试
//         uploadHost = "https://bf-upload.oss-cn-qingdao.aliyuncs.com/" // 测试服务器
//     }else{

//         // 生产环境的地址
//         uploadHost = "https://btcfoo-upload.oss-cn-beijing.aliyuncs.com/" 
//         URL = 'https://code.btcfoo.com/' 
//         K_URL = 'https://node.btcfoo.com/' 
//     }
//         // URL = 'http://coin.coinfor.org/' // pro 弃用
//         // K_URL = 'http://node.coinfor.org/' //pro 弃用
// }

if(URL == 'https://code.btcfoo.com'){
    //百度统计
    var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c391bae55a31ef8fbe1a1b9b9a33064a";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
   
}

export default {
    URL,
    K_URL,
    uploadHost,
    publicInfor
}   