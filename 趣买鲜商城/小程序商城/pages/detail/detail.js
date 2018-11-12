// pages/detail/detail.js
var wCache = require('../../utils/wcache.js');
var Apps = require('../../utils/Apps.js');
var checkToken = require('../../utils/checkToken.js');//验证token,任何请求需先验证
var WxParse=require('../../wxParse/wxParse.js');
let time=require('../../utils/formatTime.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_info:{
      imgUrl: ['https://img.alicdn.com/imgextra/i1/TB1jHqaQVXXXXcWXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg', 'https://img.alicdn.com/imgextra/i1/1870785190/TB2HvkUm1J8puFjy1XbXXagqVXa_!!1870785190.jpg_430x430q90.jpg','https://img.alicdn.com/imgextra/i3/1870785190/TB2lX4JpSFmpuFjSZFrXXayOXXa_!!1870785190.jpg_430x430q90.jpg'],
      title:'夏季草莓新鲜水果2盒顺丰包邮说案时看到分级管理扩大解放了的事件发生',
      text:'现摘现发 顺丰空运',
      price:59.00,
      old_price:89.00,
      num:71
    },
    detail_nav:['宝贝详情','成交记录'],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    nav_active:0,
    good_num:0, //用户购买个数
    cart_total:10,
    addLimit:true, //添加btn 是否限制
    flag:true, //
    vol_length:null //成交记录数据的长度
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) { //分享商品
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.good_info.goods_name,
      path: '/pages/detail/detail?id='+this.data.goods_id
    }
  },
  toCart(){
  	wx.switchTab({
      url: '../cart/cart'
   });
  },
  toPay(){
  	let good_info=this.data.good_info;
  	let good_num=this.data.good_num;
  	let cart_list=[];
  	good_info.num=good_num;
  	good_info.goods_id=this.data.goods_id;
  	cart_list.push(good_info);
  	let str=JSON.stringify(cart_list);
  	console.log(str);
  	console.log(good_info);
  	var _this = this;
  	if(good_num==0){
  		wx.showToast({
			  title: '还没有添加商品哦~',
			  icon: 'none',
			  duration: 1500
			});
  	}else{
	    checkToken(wCache, Apps, function () {
	      wx.request({
	        url: getApp().globalData.domain + '/api/User/addOrder',
	        method: 'post',
	        data: {
	          accessToken: wCache.get('accessToken'),
	          data:{
	          	openid:wCache.get('openid'),
	          	prince_total:good_num*good_info.price,
	          	num_total:good_num
	          },
	          cartlist:str
	        },
	        success: function (res) {
	          console.log('addOrder---det-----');
	          console.log(res)
	          var data=res.data.data;
	          if(data!=null){
	          	wCache.put('orderInfo',data.result);
	          	wCache.put('takeInfo',data.userInfo);
	          	setTimeout(function(){
	          		wx.navigateTo({
								  url:'../confirm/confirm?code='+data.order_id
								});
	          	},500);
	          }else{
	          	wx.showToast({
							  title: '网络问题，请稍后再试！',
							  icon: 'none',
							  duration: 1500
							})
	          }
	        },
	        fail(err) {
	          console.log(err)
	        }
	      });
	    });
	  }
  },
  noStock(){
  	wx.showToast({
		  title: '库存不足~',
		  icon: 'none',
		  duration: 1500
		});
  },
  subClick(){
    var num=this.data.good_num;
    var cart_total=this.data.cart_total;
    var id=this.data.goods_id;
    var stock=this.data.good_info.stock;
    var addLimit=null;
    var flag=this.data.flag;
    num<=0?0:num--;
    if(num>0){
    	cart_total--;
    }
    if(num<stock){
    	addLimit=true;
    }
    console.log(cart_total);
    console.log('数量-------');
    console.log(num);
    if(num>0){
    	this.buyCarremove(id,1); //id，删除数量
    }
    if(num==0&&flag){
    	flag=false;
    	cart_total--;
    	this.buyCarremove(id,1); //id，删除数量
    	if(num==stock){
	    	addLimit=false;
	    	wx.showToast({
				  title:'库存不足~',
				  icon: 'none',
				  duration: 1200
				})
	    }
    }
    if(!flag){
    	wx.showToast({
			  title:'不能再减了~',
			  icon: 'none',
			  duration: 1200
			})
    }
    
    this.setData({
      good_num:num,
      cart_total,
      addLimit,
      flag
    });
  },
  addClick(){
    var num=this.data.good_num;
    var cart_total=this.data.cart_total;
    var id=this.data.goods_id;
    var stock=this.data.good_info.stock;
    var addLimit=true;
    console.log('库存----');
    console.log(stock);
    num>=stock?stock:num++;
    if(num>=stock){
    	console.log(num+'--------'+stock)
    	addLimit=false;
    }
    this.buyCaradd(id,1);
    this.setData({
      good_num:num,
      cart_total:cart_total+1,
      addLimit:addLimit
    });
  },
  buyCaradd(id,num){
    var _this=this;
    checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/User/buyCaradd',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          openid: wCache.get('openid'),
          goods_id:id,
          num:num
        },
        success: function (res) {
          let data=res.data.data;
          if(data!=undefined){
          	wx.showToast({
						  title:data,
						  icon: 'none',
						  duration: 1200
						})
          }else{
          	wx.showToast({
						  title:'网络问题',
						  icon: 'none',
						  duration: 2000
						})
          }
        },
        fail(err) {
          console.log(err)
        }
      });
    });
  },
  buyCarremove(id,num){
    var _this=this;
    checkToken(wCache, Apps, function () {
    	console.log('id----'+id);
    	console.log('num------'+num);
      wx.request({
        url: getApp().globalData.domain + '/api/User/buyCarremove',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          openid: wCache.get('openid'),
          goods_id:id,
          num:num
        },
        success: function (res) {
        	let data=res.data.data;
         	if(data!=undefined){
          	wx.showToast({
						  title:data,
						  icon: 'none',
						  duration: 1200
						})
          }else{
          	wx.showToast({
						  title:'网络问题',
						  icon: 'none',
						  duration: 2000
						})
          }
        },
        fail(err) {
          console.log(err)
        }
      });
    });
  },
  detailNavClick(e){
    this.setData({
      nav_active: e.currentTarget.dataset.idx
    });
  },
  getGoodsInfo(id){
  	var _this=this;
  	checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/Useapi/getGoodsInfo',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          goods_id:id,
          openid: wCache.get('openid')
        },
        success: function (res) {
        	console.log('商品信息----');
        	let data=res.data.data;
        	let addLimit=true;
        	console.log(data);
        	if(data.hasbuy_num>=data.stock){
        		addLimit=false;
        	}
        	data.goods_describe=WxParse.wxParse('describe', 'html',data.goods_describe, _this);
        	data.sale_stock=data.start_stock-data.stock;
          _this.setData({
          	good_info:data,
          	good_num:data.hasbuy_num,
          	addLimit:addLimit
          });
        },
        fail(err) {
          console.log(err)
        }
      });
    });
  },
  getBuylist(id){
  	var _this=this;
  	checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/Useapi/getBuylist',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          goods_id:id
        },
        success: function (res) {
        	console.log('getBuylist----');
        	console.log(res);
        	let data=res.data.data;
        	let length=0;
        	console.log(data);
        	console.log(data.length);
        	if(data==undefined){
        		length=0;
        	}else{
        		length=data.length;
        	}
        	data.forEach(function(val,i){
        		var updateT=time.format(val.update_time,'Y/M/D h:m:s');
        		val.update_time=updateT;
        	});
          _this.setData({
          	volume:data,
          	vol_length:length
          });
        },
        fail(err) {
          console.log(err);
        }
      });
    });
  },
  getbuyCarnum(id){ //获取购物车总数
  	var _this=this;
  	checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/User/getbuyCarnum',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          openid: wCache.get('openid')
        },
        success: function (res) {
        	console.log('getbuyCarnum----');
        	let data=res.data.data;
        	console.log(data);
          _this.setData({
          	cart_total:data
          });
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
  	app.loading();
		var id=options.id;
		this.getGoodsInfo(id);
		this.getbuyCarnum();
		this.getBuylist(id);
		this.setData({
			goods_id:id
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

  }
  
})