// 接口前缀都加/  
const requestUrl = {  //请求路径
    user:{
        UserSafe:'/User/safe/',  //配置
        UserCheck:'/User/chkReal/',  //实名
        Userupdatepwd:'/User/updatepwd',//更改登录密码User/
        UsersetTransPw:'/User/setTransPw',//设置交易密码User/resetTransPw
        UserupdateTransPw:'/User/updateTransPw',//更改交易密码
        UserresetTransPw:'/User/resetTransPw',//重置交易密码
        Usersetcode:'/Common/setcode',//发送短信验证码
        UsersendEmail:'/User/setcode',//发送邮箱验证码
        UserupdateMoble:'/User/updateMoble',//修改手机号,
        UsernewMoble:'/User/newMoble',//修改手机号,
        UserchkMoble:'/User/chkMoble',//绑定手机号/User/sendEmail/
        UserrestMoble:'/User/restMoble',//充值手机号
        Uservideo:"/User/chkVideo",//上传视频
        UserUpload:'/User/uploadImg',  //图片上传,
       shangchuan:'/Oss/plupload',
        chkVideo:'/User/chkVideo',  //视频上传,
        UserReal:'/User/Real',  //实名认证判断第几步,
        UserchkEmail:'/User/chkEmail',  //绑定邮箱
        Usermoble:'/User/moble',//判断用户手机是否认证
        Usertranspw:'/User/transpw',//判断用户交易密码是否认证
        Userpassword:'/User/password',//判断用户登录密码是否认证
        Useremail:'/User/email',//判断用户邮箱是否认证
        Usergoogle:'/User/google',//判断用户谷歌是否认证
        changeGoogle:"/User/saveGoogle",//修改goole
        UserupdategoogleAuth:'/User/updategoogleAuth',//修改谷歌
        UsercloseGoogle:'/User/closeGoogle',//关闭谷歌
        UsergoogleAuth:'/User/checkgoogleAuth', //判断用户谷歌是否认证
        UseropenGoogle:'/User/openGoogle', //开启
        UseruserLoginLog:'/User/userLoginLog', //登录历史
        ispwd:"/User/ispwd",//判断密码是都一直
        istranspw:"/User/istranspw",//判断交易等旧交易,
   
    },
    login:{
        register:'/Login/reg/',
        login:'/Login/go/',
        out:'/Login/loginout/',//用户退出
        find:'/Login/setpw',//找回密码
        getpwd:'/Login/getpwd',//发送验证码
        againEmail:'/Login/again_activation',
        chkemail:"/Login/chkemail",//判断手机号码被使用
        checkmoble:"/Login/checkmoble",//判断手机号码被使用
    },
    tradingCenter:{
        bList:'/Xian/index', //交易币列表
        hqList:'/Xian/hq', //高低量列表
        limitBS:'/GuaDan/work', //限价买入 卖出
        marketBS:'/GuaDan/marketPrice',//市价买入 卖出
        currEntrust:'/Hall/Entrust', //当前委托
        logEntrust:'/Hall/EntrustLog', //历史委托
        cancelEntrust:'Hall/cancel',//撤销当前委托
        sdList:'/Xian/sd',//深度图,
        RealList:'/Xian/RealTrans',//实时交易,
        KineList:'/Xian/Kxianadd',//实时交易,
        currencyClass:'/Xian/currency',//币种分类
    },
    FinanceCenter:{
        log:'/Tiemail/translogindex',//交易记录币种,
        show:'/TransLog/index',//交易记录展示的数据, 
        addressList:'/Address/index',//地址管理列表,
        delAddress:'/Address/addressDel',//地址管理列表删除,
        editAddress:'/Address/addressEdit',//地址管理列表删除,
        addAddress:'/Address/addressAdd',//地址管理列表删除,
        accountList:'/Account/index',//账户资产列表,
        headList:'/Tiemail/txindex',//头部,
        CZaddress:'/ChongZhiLog/Address',//充值钱包地址
        CZlog:'/ChongZhiLog/chongzhishow',//充值记录
        CZ:'/ChongZhiLog/chongzhi',//区块链上的交易记录
        TXlog:'/TiXian/Withdrawalslog',//提现记录
        TB:'/TiXian/TixianAdd',//提币
        cancel:'/TiXian/Revoke',//撤销记录
        Txaddress:"/TiXian/addressshow",//提现地址接口
        TixianAdd:"/TiXian/TixianAdd",//提币
        TiCheck:"/TiXian/check",//提现,
        Receivable:"/Account/Receivable",//收款地址认证  
        binDing:"/Account/binDing",//收款地址  图片
        binBank:"/Account/binBank",//收款地址  银行卡
        uploadImg:"/Account/uploadImg",//
        TxSuc:"/TiXian/TxSuc",//wande
        lockPosition:"/Account/lockPosition", //锁仓
    },
    Arts:{
        agreetment:'/Art/lists',//用户协议,
        mainIndex:"/Index/mainIndex",//首页新交易区
        list:'/Art/tb',//官方公告,
        artCon:'/Art/artCon',//文章内容,
        stFee:'/Art/stFee',//标准费率,
        wdra:'/Art/wdra',//提现限额,
        jyq:'/Index/indexs',//交易区，
        // topPrice:'/TopPrice',//头部
        banners:'/Index/banner',//banner图片
        transpwd:'/TiXian/transpwd',//登陆后先注交易密码,
        headTrading:"/Xian/head_Trading",//交易区,
        bannernew:"/Art/Notice"
    },
    trendLine:{
        trendIndex:'/Index/trend'
    },
    twoCen:{  
        userBala:"/Merchant/userBala",//商户中心 买入卖出
        Supplement:"/Merchant/Supplement",//补充cnha,
        Revoke:"/Merchant/Revoke",//取消委托
        Entrust:"/Merchant/Entrust",//商家买入卖出CNHA,
        transLog:"/Merchant/transLog",//商家卖出买入记录
        payMent:"/Merchant/payMent",//买入确定付款
        Receiva:"/Merchant/Receiva",//买入确定收款,
        juserBala:"/Acceptant/userBala",//交易区可用余额,
        work:"/Acceptant/work",//交易区买入卖出
        jyqtransLog:"/Acceptant/transLog",//交易区记录
        jyqpayMent:"/Acceptant/payMent",//确认付款
        jyqReceiva:"/Acceptant/Receiva",//确认收款
        Cancellation:"/Acceptant/Cancellation",//取消订单
        sendCode:"/Acceptant/sendCode",//给商户发短信
    },
    oss:{
        upload:"/Oss/plupload?dirs=image"
    }
}

const GlobalUrl = {

    TradingArea:'/Index/indexs',//交易区，    
}

export { requestUrl, GlobalUrl };