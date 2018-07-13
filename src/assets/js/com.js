
class COM {
    constructor(){

    }
    init(){
        //手机自适应缩放
        this.moblieScale()
    }
    getBrowser(){
        //回到顶部只支持 谷歌 火狐
        let ua = window.navigator.userAgent;  
        let isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;  
        let isFirefox = ua.indexOf("Firefox") != -1;  
        let isOpera = window.opr != undefined;  
        let isChrome = ua.indexOf("Chrome") && window.chrome;  
        let isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        let isSougo = navigator.userAgent.toLowerCase().indexOf('se 2.x')>-1 ? true : false;
        if(isSougo){
            return false
        }
        if (isIE) {  
            return false
        } else if (isFirefox) {  
            return true
        } else if (isOpera) {  
            return false
        } else if (isChrome) {  
            return true;  
        } else if (isSafari) {  
            return false
        } else {  
            return false
        }  
    }
    jumpScroll(){
        if(!this.getBrowser()){
            if(sessionStorage.isReload){
                
            }else{
                location.reload()
            }
            sessionStorage.isReload = true
        }else{
            let osTop = document.documentElement.scrollTop || document.body.scrollTop;
            document.documentElement.scrollTop = document.body.scrollTop = 0; 
        }
    }
    moblieScale(){
        let docWidth = parent.document.documentElement.clientWidth;
        let docHeight = parent.document.documentElement.clientHeight;
        
        let docScale = docHeight / docWidth
            ,designWidth = 1920
            ,scale = docWidth / designWidth
            scale = scale.toFixed(1)

        let oMeta = document.getElementsByTagName('meta')[1]
            oMeta.setAttribute('content',`width=device-width, user-scalable=no, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}`)
    }
}
export default new COM()