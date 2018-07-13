'use strict'

const en = process.argv[2]
let API_ROOT,K_URL,UPLOAD_HOST,PUBLIC_INFO
if(en == 'pro'){
  // API_ROOT:'"http://coin.coinfor.org"', //弃用接口
  API_ROOT = "'https://code.btcfoo.com'"   // 正式接口

  K_URL = "'https://node.btcfoo.com'"

  UPLOAD_HOST = "'https://btcfoo-upload.oss-cn-beijing.aliyuncs.com'"
  
  
  PUBLIC_INFO = "'https://btcfoo-publics.oss-cn-beijing.aliyuncs.com'"

}else{
  
  API_ROOT = '"http://jys.chainshome.com"'//测试接口  

  K_URL = "'http://node.chainshome.com'"

  UPLOAD_HOST = "'https://bf-upload.oss-cn-qingdao.aliyuncs.com'"

  PUBLIC_INFO = "'https://bf-public.oss-cn-qingdao.aliyuncs.com'"


}

module.exports = {
  NODE_ENV: '"production"',
  API_ROOT, //测试接口
  K_URL,
  UPLOAD_HOST,
  PUBLIC_INFO,
}
