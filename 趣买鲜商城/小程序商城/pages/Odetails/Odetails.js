// pages/Odetails/Odetails.js
var wCache = require('../../utils/wcache.js');
var Apps = require('../../utils/Apps.js');
var checkToken = require('../../utils/checkToken.js');//验证token,任何请求需先验证
const app = getApp();
let time=require('../../utils/formatTime.js'); //转换时间文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
		order_info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	var id=options.order_id;
		this.getOrerlist(id);
  },
  bindcopy(e){
  	wx.setClipboardData({
		  data: e.currentTarget.dataset.text,
		  success (res) {
		    wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
		  }
		})
  },
	getOrerlist(id){
  	var _this=this;
    checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/Useapi/getOrerInfo',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          order_id:id
        },
        success: function (res) {
        	console.log('获取订单详情----');
        	console.log(res);
          let data=res.data.data;
          if(data==undefined){
          	wx.showToast({
						  title:'网络问题',
						  icon: 'none',
						  duration: 2000
						})
          }else{
          	let goodsList=data.goodsList;
          	console.log(goodsList);
          		var createT=time.format(data.create_time,'Y/M/D h:m:s');
          		var updateT=time.format(data.update_time,'Y/M/D h:m:s');
          		data.create_time=createT;
          		data.update_time=updateT;
          		console.log(createT);
          		console.log(updateT);
          	_this.setData({
	          	order_info:data,
	          	goodsList
	          });
          }
        },
        fail(err) {
          console.log(err);
        }
      });
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