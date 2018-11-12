// pages/goodList/goodList.js
var wCache=require('../../utils/wcache.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[
      {
        good_img:'https://img-tmdetail.alicdn.com/bao/uploaded///img.alicdn.com/bao/uploaded/TB2FyuItY1YBuNjSszhXXcUsFXa_!!1870785190-0-item_pic.jpg_160x160q90.jpg',
        title:'夏季草莓新鲜水果2盒',
        price:9.99,
        num:2
      },
      {
        good_img:'https://img.alicdn.com/imgextra/i1/2200198180/TB2XRIEX71M.eBjSZFOXXc0rFXa_!!2200198180.jpg_430x430q90.jpg',
        title:'马来西亚猫山王榴莲250g/份',
        price:16.98,
        num:1
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		var orderInfo=wCache.get('orderInfo');
		console.log('goodList-----');
		console.log(orderInfo);
		var goodList=orderInfo.goodsList;
		this.setData({
			goodList
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