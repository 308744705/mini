// pages/order/order.js
var wCache = require('../../utils/wcache.js');
var Apps = require('../../utils/Apps.js');
var checkToken = require('../../utils/checkToken.js');//验证token,任何请求需先验证
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_state:['全部','待付款','待发货','待收货','待取货'],
    nav_active:0, //当前下标
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500
  },
  getOrerlist(){ //获取订单列表
  	var _this=this;
    checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/Useapi/getOrerlist',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          openid: wCache.get('openid')
        },
        success: function (res) {
        	console.log('获取订单列表----');
        	console.log(res);
          let data=res.data.data;
          let length=0;
          if(data==undefined){
            length=0;
          	_this.setData({
          		order_length:length
          	});
          	wx.showToast({
              title:'网络问题',
              icon: 'none',
              duration: 2000
            });
          }else{
            length=data.length;
          	_this.setData({
	          	order_list:data,
	          	order_length:length
	          });
	          setTimeout(function(){
	          	_this.getSwiperHeight();
	          },50);
          }
          
        },
        fail(err) {
          console.log(err);
        }
      });
    });
  },
  toPay(e){
  	var idx=e.currentTarget.dataset.idx;
  	var order_list=this.data.order_list;
  	var type=order_list[idx].order_type;
  	console.log(order_list)
  	var _this=this;
  	checkToken(wCache, Apps, function () {
	  	wx.request({
	      url: getApp().globalData.domain + '/api/Orderpay/main',
	      method: 'post',
	      data: {
	        accessToken: wCache.get('accessToken'),
	        data:{
	        	openid: wCache.get('openid'),
	        	takeway:type==1?'门店自提':'配送到家',
	        	total_fee:order_list[idx].prince_total,
	        	order_id:order_list[idx].order_id
	        }
	      },
	      success(res) {
	      	wCache.remove('orderInfo');
	        console.log(res.data)
	        var data=res.data;
		      wx.requestPayment({
		        'timeStamp': data.timeStamp,
		        'nonceStr': data.nonceStr,
		        'paySign': data.paySign,
		        'signType': data.signType,//值为固定，如后台变动前台需要手动改一致
		        'package': data.package,
		        'success': function (res) {
		        	console.log(res)
		          console.log('支付成功----');
		          wx.showToast({
							  title: '支付成功！',
							  icon: 'success',
							  duration: 1500
							});
		          setTimeout(function(){
		          	wx.navigateTo({
						      url: '../order/order'
						    })
		          },1500);
		        },
		        'fail': function (err) {
		        	console.log(err);
		        	if(err.errMsg=='requestPayment:fail cancel'){
		        		wx.showToast({
								  title: '已取消支付！',
								  icon: 'none',
								  duration: 1500
								});
		        	}else{
		        		wx.showToast({
								  title: '支付失败！请稍后重试~',
								  icon: 'none',
								  duration: 1500
								});
		        	}
		        	setTimeout(function(){
		          	wx.navigateTo({
						      url: '../order/order'
						    })
		          },1500);
		        }
		      });
	      }
	    });
	  });
  },
  toRemind(){
  	wx.showToast({
		  title: '已提醒商家发货~',
		  icon: 'none',
		  duration: 2000
		});
  },
  checkGet(e){
  	var id=e.currentTarget.dataset.id;
  	var _this=this;
  	wx.showModal({
		  title: '提示',
		  content: '如果您已收到货物，请点击确定！',
		  success (res) {
		    if (res.confirm) {
			    checkToken(wCache, Apps, function () {
			      wx.request({
			        url: getApp().globalData.domain + '/api/User/updateOrder',
			        method: 'post',
			        data: {
			          accessToken: wCache.get('accessToken'),
			          openid: wCache.get('openid'),
			          order_id:id,
			          num:5 //订单完成，待评价
			        },
			        success: function (res) {
			        	console.log('改变状态----')
			        	console.log(res)
		          	wx.showToast({
								  title:'提交成功',
								  icon: 'success',
								  duration: 2000
								});
								setTimeout(function(){
									wx.navigateTo({
							      url: '../order/order',   
							    });
						    },500);
			        },
			        fail(err) {
			          console.log(err);
			        }
			      });
			    });
		    } else if (res.cancel) {
		      console.log('用户点击取消')
		    }
		  }
		})
  },
  toEval(){
  	wx.showToast({
		  title: '暂未开通评论功能，敬请期待~',
		  icon: 'none',
		  duration: 2000
		});
  },
  delOrder(e){
  	var id=e.currentTarget.dataset.id;
  	var type=e.currentTarget.dataset.type;
  	var content='';
  	if(type=='del'){
  		content='确定要删除此订单？';
  	}else{
  		content='确定要取消此订单？';
  	}
  	var _this=this;
  	wx.showModal({
      title: '提示',
      content: content,
      success(res) {
        if (res.confirm) {
          checkToken(wCache, Apps, function () {
			      wx.request({
			        url: getApp().globalData.domain + '/api/User/updateOrder',
			        method: 'post',
			        data: {
			          accessToken: wCache.get('accessToken'),
			          openid: wCache.get('openid'),
			          order_id:id,
			          num:7 //删除订单
			        },
			        success: function (res) {
			        	console.log('改变状态----')
			        	console.log(res)
			        	if(type=='del'){
			        		wx.showToast({
									  title:'删除成功',
									  icon: 'success',
									  duration: 2000
									});
			        	}else{
			        		wx.showToast({
									  title:'已取消订单',
									  icon: 'success',
									  duration: 2000
									});
			        	}
								setTimeout(function(){
									wx.navigateTo({
							      url: '../order/order',   
							    });
						    },500);
			        },
			        fail(err) {
			          console.log(err);
			        }
			      });
			    });
          //删除订单
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
  },
  orderNavClick(e){
    this.setData({
      nav_active: e.currentTarget.dataset.idx
    });
  },
  swiperChange(e) {
    this.setData({
      nav_active: e.detail.current
    });
    this.getSwiperHeight();
  },
  getSwiperHeight(val) {
  	var query = wx.createSelectorQuery();
  	//选择id
	  var _this = this;
	  var idx = this.data.nav_active;
    setTimeout(function(){
      query.selectAll('.orders_box').boundingClientRect(function (res) {
        if(res.length!=0){
          _this.setData({
            height:res[idx].height +'px'
          })
        }
      }).exec();
    },800);
  },
  // 点击跳转订单详情页++++++++++
  Odetails(e){
  	var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../Odetails/Odetails?order_id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		app.loading();
  	this.getOrerlist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		this.getSwiperHeight();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		this.getSwiperHeight();
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