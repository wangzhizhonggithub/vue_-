import axios from 'axios';
import Qs from 'qs';

//配置axios 请求时长，及默认路径
// axios.defaults.timeout = 15000;
axios.defaults.baseURL = process.env.API_ROOT;
axios.defaults.withCredentials = true;


//axios  request拦截器
axios.interceptors.request.use(
    config => {
        // console.log(config)
        // if(config.method == 'post' && config.url!='User/uploadImg' && config.url!='User/chkVideo' && config.url!='Account/binDing'){
        if(config.method == 'post'  ){
            
            config.data = Qs.stringify(config.data);
        }
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);
//axios response 拦截器

axios.interceptors.response.use(
    response => {
        // console.log(response.data)
        if( response.data.status == 201){
            
            delete localStorage.iflogin
            delete localStorage.chkEmail
            delete localStorage.chkReal
            delete localStorage.chkAuth
            // delete localStorage.detailid
            delete localStorage.id
            delete localStorage.ifchkMoble
            delete localStorage.iflogin
            delete localStorage.iftranspw
            // delete localStorage.name
            delete localStorage.phone
            var pathName = location.pathname
            var tradingArr = ['/tradingCNHA','/tradingETF','/tradingETH',"/index","/tradMoreRecode","/tradingAIRDROP"]
                ,isTrad = tradingArr.indexOf(pathName) > -1 
            //未登录有缓存的情况下刷新页面
            // if( isTrad ||  pathName == '/tradMoreRecode'){
            
            if( isTrad ){                
               if(localStorage.user){
                   location.reload()              
               }
            }else{
                 location.href="/login"
            }
            delete localStorage.user
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

//get请求方法封装
function FetchGet(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(response=>{
            resolve(response.data);
        }).catch(err=>{
            reject(err)
        })
    })
}


//post请求方法封装
function FetchPost(url,data={},config){
    return new Promise((resolve,reject)=>{
        axios.post(url,data,config).then(response=>{
            resolve(response.data);
        },err=>{
            reject(err)
        })
    })
}
//发送并发请求 gc 
function FetchAll(opt){
    //简单封一个
    
    axios.all([axios.get(opt.url1,{params:opt.params1}), axios.get(opt.url2,{params:opt.params2})])
    .then(axios.spread((res1,res2) => {
        opt.callback(res1.data,res2.data)
    }))
    .catch(e => { console.log(e) })
}

export {FetchGet,FetchPost,FetchAll}