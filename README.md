# JS-share
一款支持微信和QQ、UC手机浏览器的分享工具，可以自定义标题、链接、icon等

## 使用方法
```
var config = {
    url:'http://www.baidu.com',
    title:'分享标题',
    desc:'欢迎加入XX大家庭',
    img:'http://www.wangjunfeng.com/img/face.jpg',
    img_title:'IMG_TITLE',
    from:'from shenyuan.yue'
};
var success = function(){
    alert('分享成功');
}
var fail = function(e){
    alert('分享失败');
}
var share_obj = new nativeShare(config, success, fail);
```


## 注意
    获取微信签名需要更改 getWXConfig() 方法中逻辑
    UC浏览器无法自定义图片，分享之后展示的是页面截图
