// pages/cart/cart.js
var Apps = require('../../utils/Apps.js');
var wCache = require('../../utils/wcache.js');
var checkToken = require('../../utils/checkToken.js');//验证token,任何请求需先验证
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkArr:[true,true],
    hasGoods:false,
    cart_list:[
      {
      	goods_id:61,
        good_img:'http://img11.360buyimg.com/n1/jfs/t7078/248/668346765/103679/debc301c/5982cb20N053fa0b8.jpg',
        title:'树熟榴莲肉250g/份',
        good_text:'自然成熟果肉 急冻锁鲜',
        price:19.90,
        num:2,
        good_total:39.80,
        add_state:true
      },
      {
      	goods_id:66,
        good_img: 'http://img12.360buyimg.com/n1/jfs/t11083/357/2255543158/1408427/954a64a8/5a12836dN8a13718c.jpg',
        title: '精品百香果 12个装',
        good_text: '精品中果12个装 单果50-80g 新鲜水果',
        price: 16.80,
        num: 1,
        good_total: 16.80,
        add_state: false
      }
    ],
    goods_img:[
      'http://img11.360buyimg.com/n1/jfs/t7078/248/668346765/103679/debc301c/5982cb20N053fa0b8.jpg', 'http://img11.360buyimg.com/n1/jfs/t7078/248/668346765/103679/debc301c/5982cb20N053fa0b8.jpg', 'http://img11.360buyimg.com/n1/jfs/t7078/248/668346765/103679/debc301c/5982cb20N053fa0b8.jpg'
    ],
    checked:true,
    total:null,
    total_num:null,
    animateData:null
  },
  clearAll(){
		var _this=this;
		wx.showModal({
		  title: '提示',
		  content: '确定要清空购物车吗？',
		  success (res) {
		    if (res.confirm) {
		      checkToken(wCache, Apps, function () {
			      wx.request({
			        url: getApp().globalData.domain + '/api/User/clearCar',
			        method: 'post',
			        data: {
			          accessToken: wCache.get('accessToken'),
			          openid: wCache.get('openid')
			        },
			        success: function (res) {
			          wx.showToast({
								  title: '清除成功',
								  icon: 'none',
								  duration: 1500
								});
			          setTimeout(function(){
			          	_this.onLoad();
			          },1000);
			        },
			        fail(err) {
			          console.log(err)
			        }
			      });
			    });
		    } else if (res.cancel) {
		      console.log('取消清空------')
		    }
		  }
		})
    
  },
  allCheck(){
    var _this=this;
    var checkArr=this.data.checkArr;
    let total_num=null,total=null;
    let cart_list=this.data.cart_list;
    if (!this.data.checked){
      checkArr.forEach(function(val,i){
        checkArr[i]=true;
        total=total+cart_list[i].good_total
        total_num = total_num + cart_list[i].num
      });
    }else{
      checkArr.forEach(function(val,i){
        checkArr[i]=false;
      });
      total=0;
      total_num=0;
    }
    this.setData({
      checked: !_this.data.checked,
      checkArr:checkArr,
      total:total.toFixed(2),
      total_num
    });
  },
  goShop(){
    wx.switchTab({
      url: '../index/index'
    });
  },
  singleClick(e){
    var idx = e.currentTarget.dataset.idx;
    let arr=this.data.checkArr;
    let checkArr = 'checkArr['+idx+']';
    let checked=true;
    let total=parseFloat(this.data.total);
    let cart_list = this.data.cart_list;
    let total_num=this.data.total_num;
    this.setData({
      [checkArr]: !this.data.checkArr[idx]
    });
    if(!this.data.checkArr[idx]){
      arr.forEach(function(val,i){
        if(arr[i]==false){
          checked=false;
        }
      });
      total=total-cart_list[idx].good_total;
      total_num=total_num-cart_list[idx].num;
    }else{
//    console.log(total);
      total = total + cart_list[idx].good_total;
      total_num=total_num+cart_list[idx].num;
    }
    this.setData({
      checked,
      total:total.toFixed(2),
      total_num
    });
  },
  subClick(e){
    this.countTotal(e, this,0);
  },
  addClick(e){
    var _this = this;
    var id=e.currentTarget.dataset.id;
    _this.buyCaradd(id,1);
    this.countTotal(e, this,1);
    // 动画
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease",
      delay: 0
    });
    animation.opacity(1).translateY(-10).step().opacity(0).translateY(-40).step(); 
    this.setData({
      animateData: animation.export()
    });
    var _this=this;
    setTimeout(function(){
      animation.translateY(20).step();
      _this.setData({
        animateData: animation.export()
      });
    },1000);
  },
  buyCarremove(id,num){
    var _this=this;
    console.log(id);
    checkToken(wCache, Apps, function () {
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
//      	console.log('删除商品-----');
//        console.log(res.data);
        },
        fail(err) {
          console.log(err)
        }
      });
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
          console.log(res.data)
//        _this.setData({
//          cate_list:res.data.data
//        });
        },
        fail(err) {
          console.log(err)
        }
      });
    });
  },
  countTotal(e,_this,type){
    let idx = e.currentTarget.dataset.idx;
    let num = e.currentTarget.dataset.num;
    let price = _this.data.cart_list[idx].price;
    let stock=_this.data.cart_list[idx].stock;
    let total = null, total_num = null;
    let cart_list = 'cart_list[' + idx + '].num';
    let good_total = 'cart_list[' + idx + '].good_total';
    var id=e.currentTarget.dataset.id;
    if(type==1){ //添加
    	num>=stock?stock:num++;
    }else{ //减少
      if(num<=1){
        wx.showModal({
				  title: '提示',
				  content: '确定不要了吗？',
				  success (res) {
				    if (res.confirm) {
//				      console.log('删除商品----')
							_this.buyCarremove(id,1);
							num=0;
				      _this.onLoad();
				    } else if (res.cancel) {
//				      console.log('用户点击取消')
				      num=1;
				    }
				  }
				})
      }else{
      	num--;
      	_this.buyCarremove(id,1);
      }
    }
    _this.setData({
      [cart_list]: num,
      [good_total]: num * price
    });
    let arr = _this.data.cart_list;
    arr.forEach(function (i) {
      total = i.good_total + total;
      total_num = i.num + total_num;
      // console.log(i.good_total)
    });
    _this.setData({
      total: total.toFixed(2),
      total_num: total_num
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	this.getbuyCartlist();
    
  },
  formSubmit(){
  	let checkArr=this.data.checkArr;
  	let cart_list=this.data.cart_list;
		console.log('提交订单啦----')
//	console.log(checkArr);
  	checkArr.forEach(function(val,i){
  		if(!val){
  			cart_list.splice(i,1);
  		}
  	});
	  let str=JSON.stringify(cart_list);
    console.log(str); 
  	var _this = this;
    checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/User/addOrder',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          data:{
          	openid:wCache.get('openid'),
          	prince_total:_this.data.total,
          	num_total:_this.data.total_num
          },
          cartlist:str
        },
        success: function (res) {
//        console.log('addOrder--------');
          var data=res.data.data;
          console.log(res)
//        console.log(data);
          if(data!=null){
          	wCache.put('orderInfo',data.result);
          	wCache.put('takeInfo',data.userInfo);
          	wx.navigateTo({
						  url:'../confirm/confirm'
						});
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
  },
  addOver(){
  	wx.showToast({
		  title: '暂时没有那么多库存~',
		  icon: 'none',
		  duration: 1500
		});
  },
  getbuyCartlist(){
    var _this = this;
    checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/User/getbuyCarlist',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
          openid: wCache.get('openid')
        },
        success: function (res) {
//        console.log('购物车列表--------')
//        console.log(res.data.data)
          let data=res.data.data;
          let total = null, total_num=null;
          let checkArr=[];
          let hasGoods=false;
          if(data.length==0){
          	hasGoods=false;
          	total = 0;
			      total_num = 0;
          }else{
          	hasGoods=true;
          	data.forEach(function(val,i){
	          	checkArr.push(true);
	          	data[i].good_total=data[i].price*data[i].num;
	          	if(data[i].num>=data[i].stock){
	          		data[i].num=data[i].stock
	//console.log(data[i].num+'-------'+data[i].stock);
	          		data[i].add_state=false;
	          	}else{
	          		data[i].add_state=true;
	          	}
	          	total = data[i].good_total + total;
				      total_num = data[i].num + total_num;
	          });
          }
         	_this.setData({
           	cart_list: data,
           	checkArr,
           	hasGoods,
           	total: total.toFixed(2),
			      total_num: total_num
         	});
        },
        fail(err) {
//        console.log(err)
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
//  console.log('第二次进来啦----');
    this.getbuyCartlist();
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