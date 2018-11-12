function checkToken(wCache, app, fn) {//缓存方法，appid,回调函数,
  console.log(wCache.get('accessToken')+'------check')
  // if (wCache.get('accessToken', 'none') == 'none') {
    wx.request({
      url: getApp().globalData.domain + '/api/Base/accessToken',
      data: {
        'appId': app.appId,
        'appSecret': app.appSecret
      },
      method: 'POST',
      dataType: 'JSON', 
      success(res) {
        res.data = JSON.parse(res.data);
        let accessToken = res.data.accessToken;
        getApp().globalData.accessToken = accessToken;
        wCache.put('accessToken', accessToken);
        fn();
      },
      fail(err) {
        // console.log(err);
        wx.showToast({
          title: '网络问题',
          icon: 'none',
          duration: 2000
        })
      }
    });
  // } else {
  //   fn();
  // }

}
module.exports = checkToken;
