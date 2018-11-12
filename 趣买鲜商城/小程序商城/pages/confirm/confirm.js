// pages/confirm/confirm.js
var wCache = require('../../utils/wcache.js');
var Apps = require('../../utils/Apps.js');
var checkToken = require('../../utils/checkToken.js');//验证token,任何请求需先验证
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    take_way:['门店自提','配送到家'],
    takenav_idx:1, //默认第二个，当前下标
    selfTake:false, //默认第二个，是否自提
    multiArray: [['2018-10-25'], ['10:00-11:00','11：00-12：00', '12：00-13：00', '13：00-14：00','14:00-15:00','15：00-16：00', '16：00-17：00', '17：00-18：00','18:00-19:00','19：00-20：00', '20：00-21：00']], //picker数组
    multiIndex: [0, 0], //多列选择器下标
    address:'请填入收货信息'
  },
  takeWayClick(e){ //如需进行tab切换，放开以下代码
    // var idx=e.currentTarget.dataset.idx;
    // this.setData({
    //   takenav_idx:idx,
    //   selfTake:idx==0?true:false
    // });
  },
  bindMultiPickerChange: function (e) {
//  console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
//  console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
  },
  bindPay(){ //支付订单
  	var _this=this;
  	var selfTake=this.data.selfTake;
  	var orderInfo=this.data.orderInfo;
  	var address=this.data.address;
		if(!selfTake&&address==undefined){
			wx.showToast({
			  title: '收货信息未填写~',
			  icon: 'none',
			  duration: 1500
			});
		}else{
			console.log('是否自提-----');
			console.log(selfTake?'门店自提':'配送到家');
	    checkToken(wCache, Apps, function () {
		  	wx.request({
		      url: getApp().globalData.domain + '/api/Orderpay/main',
		      method: 'post',
		      data: {
		        accessToken: wCache.get('accessToken'),
		        data:{
		        	openid: wCache.get('openid'),
		        	takeway:selfTake?'门店自提':'配送到家',
		        	total_fee:orderInfo.prince_total, //总价
		        	order_id:orderInfo.order_id
		        }
		      },
		      success(res) {
		      	wCache.remove('orderInfo');
		        console.log(res.data)
		        var data=res.data;
			      wx.requestPayment({ //小程序支付接口
			        'timeStamp': data.timeStamp,
			        'nonceStr': data.nonceStr,
			        'paySign': data.paySign,
			        'signType': data.signType,
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
			        	//err.errMsg 两种状态，取消支付和支付失败
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
		}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	//确认订单   数据均从addOrder提交成功后后台返回
  	var orderInfo=wCache.get('orderInfo');
  	var takeInfo=wCache.get('takeInfo');
  	console.log('orderInfo-------');
  	console.log(orderInfo);
  	if(orderInfo==undefined){
  		wx.showToast({
			  title: '订单未提交！请重新提交~',
			  icon: 'none',
			  duration: 1500
			});
  	}
  	var address=takeInfo.address==undefined?'请填写收货信息':takeInfo.address;
  	var goodsList=orderInfo.goodsList;
  	var goods_cover=[]; //商品列表 图片数组
  	console.log('订单信息-----');
  	console.log(orderInfo);
  	var num=0;
		goodsList.forEach(function(val){
			goods_cover.push(val.goods_thumbimgurl);
			num+=val.num
		});
    var date=new Date();
    var current_time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var multiIndex=this.data.multiIndex;
    var arr='multiArray[0]['+multiIndex[0]+']'; //data中动态改变值
    if(address==null){
    	address='请填入收货信息'
    }
    this.setData({
      [arr]:current_time, //当前的时间  [变量]
      orderInfo,
      address,
      goods_cover,
      total_num:num
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
  onShow: function () { //监听从dispatch页面返回的值   通过本地储存
    var address=wCache.get('address');
    this.setData({
      address:address
    });
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
  	console.log('页面被卸载啦----');
		wCache.remove('orderInfo');
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