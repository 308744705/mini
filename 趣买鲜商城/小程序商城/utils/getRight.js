function getRight(wCache){ //判断是否授权
  var _this = this;
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo','scope.userLocation']) { //授权
        console.log('已授权');
        wCache.put('getRight', true);
        getApp().globalData.getRight=true;
      } else {
        console.log('未授权');
        wCache.put('getRight', false);
        getApp().globalData.getRight=false
      }
    }
  })
}
module.exports = {
  getRight
}