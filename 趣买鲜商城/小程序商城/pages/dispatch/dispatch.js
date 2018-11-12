// pages/dispatch/dispatch.js
var wCache = require('../../utils/wcache.js');
var Apps = require('../../utils/Apps.js');
var checkToken = require('../../utils/checkToken.js');//验证token,任何请求需先验证
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
		name:'',
		tel:'',
		address:'',
  },
  formSubmit: function (e) {
    var val=e.detail.value;
    var _this=this;
  	checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/User/updateInfo',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          openid: wCache.get('openid'),
          address:val.address,
          tel:val.phone,
          rename:val.name
        },
        success: function (res) {
        	console.log(res);
        	if(res.data.data!=undefined){
        		wx.showToast({
				      title: '提交成功',
				      icon: 'success',
				      duration: 2000,
				      success:function(){
				        wCache.put('address',val.address);
				        setTimeout(function(){
				          wx.navigateBack();
				        },500);
				      }
				    });
        	}else{
        		wx.showToast({
				      title: '提交失败，请重试！',
				      icon: 'none',
				      duration: 2000
				    });
        	}
        },
        fail(err) {
          console.log(err)
        }
      });
   });
  },
  getUserInfo(){
  	var _this=this;
  	checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/User/userInfo',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          openid: wCache.get('openid')
        },
        success: function (res) {
        	var data=res.data.data;
        	if(data!=undefined){
        		_this.setData({
        			name:data.rename,
							tel:data.tel,
							address:data.address
        		});
        	}else{
        		wx.showToast({
				      title: '未获取到收货人信息！',
				      icon: 'none',
				      duration: 2000
				    });
        	}
        },
        fail(err) {
          console.log(err)
        }
      });
   });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var orderInfo=wCache.get('orderInfo');
		this.getUserInfo();
		this.setData({
			name:orderInfo.order_rename,
			tel:orderInfo.order_tel,
			address:orderInfo.order_address,
		});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})