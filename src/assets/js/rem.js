    //设置rem单位为屏幕宽度,适配神器
    ! function() {
        function rem() {
            var width = document.documentElement.clientWidth || document.body.clientWidth;
            document.documentElement.style.fontSize = width / 19.2 + 'px';
            //设置body字体大小，不影响body内字体大小
            document.body.style.fontSize = '12px';
            if(width<1920){
                document.documentElement.style.fontSize = 1920/19.2+'px';
            }
        }
        rem();
        window.addEventListener('resize', rem, false);
    }();