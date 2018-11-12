// pages/mine/mine.js
var wCache = require('../../utils/wcache.js');
var Apps = require('../../utils/Apps.js');
var checkToken = require('../../utils/checkToken.js');//验证token,任何请求需先验证
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_data:[ //订单列表
      {
        list_url:'../order/order', //跳转页面
        list_icon:'../../images/list.svg', //列表图标
        list_title:'我的订单', //列表名称
        arr_text:'' //我的 列表右侧显示文字
      },
      {
        list_url:'',
        list_icon: '../../images/wallet.svg', 
        list_title: '账户余额',
        arr_text: '去充值'
      },
      {
        list_url:'',
        list_icon: '../../images/coupon.svg',
        list_title: '优惠券',
        arr_text: '0张'
      }
    ],
    userInfo:null
  },
  bindVip(){
    wx.showToast({
      title: '服务暂未开通',
      icon: 'none',
      duration: 1500
    })
  },
  bindList(e){
  	var url=e.currentTarget.dataset.url;
  	if(!url){
  		wx.showToast({
	      title: '服务暂未开通',
	      icon: 'none',
	      duration: 1500
	   });
  	}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	var userInfo=app.globalData.userInfo || wCache.get('userInfo');
		this.setData({
			userInfo:userInfo
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