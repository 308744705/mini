//app.js
var wCache = require('./utils/wcache.js');
var Apps = require('./utils/Apps.js');
var checkToken = require('./utils/checkToken.js');//验证token,任何请求需先验证
var QQMapWX  = require('./utils/qqmap-wx.js'); //微信jssdk
App({
  globalData:{
    userInfo:null,
    domain:'https://wei.yaboshikq.com',
    openid:null,
    checkToken:null,
    getRight:false
  },
  loadInfo(){ //定位信息
    let qqmapsdk = new QQMapWX({
      key: '7R7BZ-LQ2KU-WAQVK-4J4BT-JK6IF-YRFLN' // 必填 腾讯地图开发者密钥
    });
    //1、获取当前位置坐标
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
      	console.log('getLocation----------');
        console.log(res);
		    const latitude = res.latitude //维度
		    const longitude = res.longitude //经度
		    const speed = res.speed //速度
		    const accuracy = res.accuracy //精准度
		    
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
//      qqmapsdk.reverseGeocoder({
//        location: {
//          latitude: res.latitude,
//          longitude: res.longitude
//        },
//        success: function (addressRes) {
//          var address = addressRes.result.formatted_addresses.recommend;
//          console.log('addressRes----------');
//          console.log(addressRes);
//        }
//      })
      }
    })
  },
  getOpenid() {
    var _this=this;
    return new Promise(function (resolve, reject) { //同步执行
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log("code------" + res.code)
          if (res.code) {
            wx.request({
              url: getApp().globalData.domain + '/api/Useapi/getSessioncode',
              method: 'post',
              data: {
                appId: Apps.appId,
                appSecret: Apps.appSecret,
                js_code: res.code
              },
              success: function (res) {
                console.log(res)
                var openid = res.data.openid //返回openid
                wCache.put('openid', openid)
                _this.globalData.openid = openid
                console.log('openid为' + openid);
                resolve(openid)
              },
              fail(err) {
                console.log(err)
              }
            })
          } else {
            console.log('登陆失败' + res.errMsg)
          }
        }
      })
    })
  },
  loading() {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1800);
  },
  userSave() {
    // 储存用户数据
    getApp().getOpenid().then(function (openid) {
    	var userInfo=wCache.get('userInfo');
      checkToken(wCache, Apps, function () {
          wx.request({
            url: getApp().globalData.domain + '/api/User/userSave',
            method: 'post',
            data: {
              accessToken: wCache.get('accessToken'),
              data:{
                avatarUrl: getApp().globalData.userInfo.avatarUrl || userInfo.avatarUrl,
                nickName: getApp().globalData.userInfo.nickName || userInfo.nickName,
                openId: wCache.get('openid') || openid
              }
            },
             header: {
               'content-type': 'application/json' // 默认值
             },
             success: function (res) {
              var data = {
                 accessToken: wCache.get('accessToken'),
                 avatarUrl: getApp().globalData.userInfo.avatarUrl || userInfo.avatarUrl,
                 nickName: getApp().globalData.userInfo.nickName || userInfo.nickName,
                 openId: wCache.get('openid') || openid
              }
              getApp().globalData.userInfo=data;
              console.log('存储数据')
              console.log(res.data)
              wCache.put('getRight', true);
              wCache.put('userInfo', userInfo);
             },
             fail(err) {
               // console.log(err)
             }
           })
      })
    });
  },
  onLaunch: function () {
    var _this = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo','scope.userLocation']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log('已授权-------')
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              _this.globalData.userInfo = res.userInfo
              _this.globalData.getRight = true
              wCache.put('getRight', true);
              wCache.put('userInfo', res.userInfo);
              console.log(_this.globalData.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (_this.userInfoReadyCallback) {
                _this.userInfoReadyCallback(res);
              }

              // 储存用户数据
              getApp().userSave();
            }
          })
        }
      }
    })
  }
})