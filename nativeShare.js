/**
 * Author shenyuan.yue.
 * Create Time: 2018-04-09 10:52
 */
var nativeShare = function (config, shareSuccess, shareFail) {

    var qApiSrc = {
        lower: "//3gimg.qq.com/html5/js/qb.js",
        higher: "//jsapi.qq.com/get?api=app.share"
    };
    var bLevel = {
        qq: {forbid: 0, lower: 1, higher: 2},
        uc: {forbid: 0, allow: 1}
    };
    var UA = navigator.appVersion;
    var isqqBrowser = (UA.split("MQQBrowser/").length > 1) ? bLevel.qq.higher : bLevel.qq.forbid;
    var isucBrowser = (UA.split("UCBrowser/").length > 1) ? bLevel.uc.allow : bLevel.uc.forbid;
    var version = {
        uc: "",
        qq: ""
    };
    var isWeixin = false;
    var isQunar = false;

    config = config || {};
    this.url = config.url || document.location.href || '';
    this.title = config.title || document.title || '';
    this.desc = config.desc || document.title || '';
    this.img = config.img || document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src || '';
    this.img_title = config.img_title || document.title || '';
    this.from = config.from || window.location.host || '';
    this.ucAppList = {
        sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
        weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
        weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
        QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
        QZone: ['kQZone', 'QZone', '3', 'QQ空间']
    };
    this.shareSuccess = shareSuccess || function(){};
    this.shareFail = shareFail || function(){};

    this.share = function (to_app) {
        var title = this.title, url = this.url, desc = this.desc, img = this.img, img_title = this.img_title, from = this.from;
        if (isucBrowser) {
            to_app = to_app == '' ? '' : (platform_os == 'iPhone' ? this.ucAppList[to_app][0] : this.ucAppList[to_app][1]);
            if (to_app == 'QZone') {
                B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+img+"&title="+title+"&description="+desc+"&url="+url+"&app_name="+from;
                k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
                    k && k.parentNode && k.parentNode.removeChild(k)
                }, 5E3);
            }
            if (typeof(ucweb) != "undefined") {
                ucweb.startRequest("shell.page_share", [title, title, url, to_app, "", "@" + from, ""])
            } else {
                if (typeof(ucbrowser) != "undefined") {
                    ucbrowser.web_share(title, title, url, to_app, "", "@" + from, '')
                } else {
                }
            }
        } else {
            if (isqqBrowser && !isWeixin) {
                to_app = to_app == '' ? '' : this.ucAppList[to_app][2];
                var ah = {
                    url: url,
                    title: title,
                    description: desc,
                    img_url: img,
                    img_title: img_title,
                    to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
                    cus_txt: "请输入此时此刻想要分享的内容"
                };
                ah = to_app == '' ? '' : ah;
                if (typeof(browser) != "undefined") {
                    if (typeof(browser.app) != "undefined" && isqqBrowser == bLevel.qq.higher) {
                        browser.app.share(ah)
                    }
                } else {
                    if (typeof(window.qb) != "undefined" && isqqBrowser == bLevel.qq.lower) {
                        window.qb.share(ah)
                    } else {
                    }
                }
            } else {
            }
        }
    };

    this.html = function() {
        var share = document.createElement('div');
        share.setAttribute('id', 'nativeShare');
        share.setAttribute('class', 'nativeShare');
        var html = '<div class="label">分享到</div>'+
            '<div class="list clearfix">'+
            '<span data-app="sinaWeibo" class="nativeShare weibo"><i></i>新浪微博</span>'+
            '<span data-app="weixin" class="nativeShare weixin"><i></i>微信好友</span>'+
            '<span data-app="weixinFriend" class="nativeShare weixin_timeline"><i></i>微信朋友圈</span>'+
            '<span data-app="QQ" class="nativeShare qq"><i></i>QQ好友</span>'+
            '<span data-app="QZone" class="nativeShare qzone"><i></i>QQ空间</span>'+
            '<span data-app="" class="nativeShare more"><i></i>更多</span>'+
            '</div>';
        share.innerHTML = html;
        document.body.appendChild(share);
    };

    this.isloadqqApi = function () {
        if (isqqBrowser) {
            var b = (version.qq < 5.4) ? qApiSrc.lower : qApiSrc.higher;
            var d = document.createElement("script");
            var a = document.getElementsByTagName("body")[0];
            d.setAttribute("src", b);
            a.appendChild(d)
        }
    };

    this.getPlantform = function () {
        ua = navigator.userAgent;
        if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPod") > -1)) {
            return "iPhone"
        }
        return "Android"
    };

    this.is_weixin = function () {
        var a = UA.toLowerCase();
        if (/MicroMessenger/ig.test(a)) {
            return true
        } else {
            return false
        }
    };

    this.getVersion = function (c) {
        var a = c.split("."), b = parseFloat(a[0] + "." + a[1]);
        return b
    };

    // 获取微信appId 签名等信息
    this.getWXConfig = function(cb) {
        var self = this;
        var url = window.location.href;
        var settings = {
            "url": "https://xxx.com",
            "type": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            "data": {
                "url": encodeURIComponent(url)
            }
        }
     
        $.ajax(settings).done(function (response) {
            var config = response.data;
            try{
                wx.config({
                    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: config.appId, // 必填，公众号的唯一标识
                    timestamp: config.timestamp, // 必填，生成签名的时间戳
                    nonceStr: config.nonceStr, // 必填，生成签名的随机串
                    signature: config.signature,// 必填，签名，见附录1
                    jsApiList: [
                        'getLocation',
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'onMenuShareQZone'
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });

                cb ? cb.call(self) : '';
            }catch(e){
                alert(e);
            }
        });
    };
    // 微信内分享配置
    this.setWXConfig = function(){
        var self = this;
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                alert(res);
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                // var speed = res.speed; // 速度，以米/每秒计
                // var accuracy = res.accuracy; // 位置精度
                alert(latitude);
            },
            fail: function(e){
                alert(e.toString());
            }
        });
        wx.onMenuShareTimeline({
            title: self.title, // 分享标题
            link: self.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.img, // 分享图标
            trigger: function(){
                // 触发
            },
            success: function () {
                // 用户确认分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: self.title, // 分享标题
            desc: self.desc, // 分享描述
            link: self.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: self.img, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQQ({
            title: self.title, // 分享标题
            desc: self.desc, // 分享描述
            link: self.url, // 分享链接
            imgUrl: self.img, // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            },
            cancel: function () {
            // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareWeibo({
            title: self.title, // 分享标题
            desc: self.desc, // 分享描述
            link: self.url, // 分享链接
            imgUrl: self.img, // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            },
            cancel: function () {
            // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareQZone({
            title: self.title, // 分享标题
            desc: self.desc, // 分享描述
            link: self.url, // 分享链接
            imgUrl: self.img, // 分享图标
            success: function () {
            // 用户确认分享后执行的回调函数
            },
            cancel: function () {
            // 用户取消分享后执行的回调函数
            }
        });
    };

    // Qunar客户端内分享
    this.setQunarConfig = function(){
        var self = this;
        hysdk.onMenuShare({
            title: self.title, // 标题
            link: self.url, // 链接URL
            desc: self.desc, // 描述
            imgUrl: self.img // 分享图标
        });
    };

    this.init = function () {
        platform_os = this.getPlantform();
        version.qq = isqqBrowser ? this.getVersion(UA.split("MQQBrowser/")[1]) : 0;
        version.uc = isucBrowser ? this.getVersion(UA.split("UCBrowser/")[1]) : 0;
        isWeixin = this.is_weixin();

        isQunar = navigator.userAgent.indexOf('QunariPhone')>-1?true:false;
        if ((isqqBrowser && version.qq < 5.4 && platform_os == "iPhone") || (isqqBrowser && version.qq < 5.3 && platform_os == "Android")) {
            isqqBrowser = bLevel.qq.forbid
        } else {
            if (isqqBrowser && version.qq < 5.4 && platform_os == "Android") {
                isqqBrowser = bLevel.qq.lower
            } else {
                if (isucBrowser && ((version.uc < 10.2 && platform_os == "iPhone") || (version.uc < 9.7 && platform_os == "Android"))) {
                    isucBrowser = bLevel.uc.forbid
                }
            }
        }
        this.isloadqqApi();
        if (isqqBrowser || isucBrowser) {
            this.html();
        } else if(isWeixin){
            this.getWXConfig(this.setWXConfig);
        } else if(isQunar){
            hysdk.config();
            this.setQunarConfig();
        } else{
            this.html();
            alert('目前分享功能仅支持微信客户端、手机UC浏览器和QQ浏览器');
        }
    };

    this.init();

    var share = this;
    var items = document.getElementsByClassName('nativeShare');
    for (var i=0;i<items.length;i++) {
        items[i].onclick = function(){
            share.share(this.getAttribute('data-app'));
        }
    }

    return this;
};
