// pages/index1/index1.js
var getRight = require('../../utils/getRight.js');
var wCache = require('../../utils/wcache.js');
var Apps = require('../../utils/Apps.js');
var checkToken = require('../../utils/checkToken.js');//验证token,任何请求需先验证
const app = getApp()
getRight.getRight(wCache);
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navText: [
      '全部','热带水果','葡萄类','苹果/梨/香蕉','橘子/橙子'
    ],
    goods_list:[
      {
        ad_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539836182786&di=48054ba5c5d181d6cd6aed94a825c793&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F17%2F21%2F50%2F27i58PIChsU_1024.jpg',
        good_list:[
          {
            good_id: 0,
            cover_img: 'https://img.alicdn.com/imgextra/i4/3894694451/TB2SnKrrIUrBKNjSZPxXXX00pXa_!!3894694451.jpg_430x430q90.jpg',
            cover_text: '精品山竹1份（5斤装±2两）',
            title: '5斤泰国进口山竹新鲜水果特级现摘现发',
            dispatch_time: '2018-10-19 18：00：00',
            discount: '119.00',
            old_price: '199.00',
            sold: 10,
            remain: 12,
            sale_state: true
          },
          {
            good_id: 1,
            cover_img: 'https://img.alicdn.com/imgextra/i4/1910146537/TB2TyHPbjrguuRjy0FeXXXcbFXa_!!1910146537.jpg_430x430q90.jpg',
            cover_text: '橙子',
            title: '橙子',
            dispatch_time: '2018-10-19 18：00：00',
            discount: '16.80',
            old_price: '25.80',
            sold: 20,
            remain: 10,
            sale_state: false
          },
          {
            good_id: 1,
            cover_img: 'http://img13.360buyimg.com/n1/jfs/t22306/62/1429957140/252095/e8392a4e/5b28c4b5N74904a72.jpg',
            cover_text: '南非进口红西柚葡萄柚4个装',
            title: '南非进口红西柚葡萄柚 柚子 优选大果 4个装',
            dispatch_time: '2018-10-20 15：00：00',
            discount: '18.90',
            old_price: '34.90',
            sold: 10,
            remain: 12,
            sale_state: true
          }
        ]
      },
      {
        ad_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539838723579&di=ce3cfbb3cf8e306bd17f61c09a570fbe&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d36b554bb455000001bf724a7475.jpg%401280w_1l_2o_100sh.jpg',
        good_list: [
          {
            good_id: 0,
            cover_img: 'https://img.alicdn.com/imgextra/i4/3894694451/TB2SnKrrIUrBKNjSZPxXXX00pXa_!!3894694451.jpg_430x430q90.jpg',
            cover_text: '精品山竹1份（5斤装±2两）',
            title: '5斤泰国进口山竹新鲜水果特级现摘现发',
            dispatch_time: '2018-10-19 18：00：00',
            discount: '119.00',
            old_price: '199.00',
            sold: 10,
            remain: 12,
            sale_state: true
          },
          {
            good_id: 1,
            cover_img: 'https://img.alicdn.com/imgextra/i4/1910146537/TB2TyHPbjrguuRjy0FeXXXcbFXa_!!1910146537.jpg_430x430q90.jpg',
            cover_text: '橙子',
            title: '橙子',
            dispatch_time: '2018-10-19 18：00：00',
            discount: '16.80',
            old_price: '25.80',
            sold: 20,
            remain: 10,
            sale_state: false
          },
          {
            good_id: 1,
            cover_img: 'http://img13.360buyimg.com/n1/jfs/t22306/62/1429957140/252095/e8392a4e/5b28c4b5N74904a72.jpg',
            cover_text: '南非进口红西柚葡萄柚4个装',
            title: '南非进口红西柚葡萄柚 柚子 优选大果 4个装',
            dispatch_time: '2018-10-20 15：00：00',
            discount: '18.90',
            old_price: '34.90',
            sold: 10,
            remain: 12,
            sale_state: true
          }
        ]
      },
      {
        ad_url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539836265917&di=71951fc352141efbc33f08bd37c86ca3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b754554bb455000001bf72e04262.jpg%401280w_1l_2o_100sh.jpg',
        good_list: [
          {
            good_id: 0,
            cover_img: 'https://img.alicdn.com/imgextra/i4/3894694451/TB2SnKrrIUrBKNjSZPxXXX00pXa_!!3894694451.jpg_430x430q90.jpg',
            cover_text: '精品山竹1份（5斤装±2两）',
            title: '5斤泰国进口山竹新鲜水果特级现摘现发',
            dispatch_time: '2018-10-19 18：00：00',
            discount: '119.00',
            old_price: '199.00',
            sold: 10,
            remain: 12,
            sale_state: true
          },
          {
            good_id: 1,
            cover_img: 'https://img.alicdn.com/imgextra/i4/1910146537/TB2TyHPbjrguuRjy0FeXXXcbFXa_!!1910146537.jpg_430x430q90.jpg',
            cover_text: '橙子',
            title: '橙子',
            dispatch_time: '2018-10-19 18：00：00',
            discount: '16.80',
            old_price: '25.80',
            sold: 20,
            remain: 10,
            sale_state: false
          },
          {
            good_id: 1,
            cover_img: 'http://img13.360buyimg.com/n1/jfs/t22306/62/1429957140/252095/e8392a4e/5b28c4b5N74904a72.jpg',
            cover_text: '南非进口红西柚葡萄柚4个装',
            title: '南非进口红西柚葡萄柚 柚子 优选大果 4个装',
            dispatch_time: '2018-10-20 15：00：00',
            discount: '18.90',
            old_price: '34.90',
            sold: 10,
            remain: 12,
            sale_state: true
          }
        ]
      }
    ],
    swiper_current:0,
    itemNum:5,
    duration: 1000,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo(e) {
    var _this=this;
    // console.log(e)
    getApp().globalData.userInfo = e.detail.userInfo
    wx.getUserInfo({
      success: res => {
        getApp().globalData.userInfo = res.userInfo
        getApp().globalData.getRight = true
        wCache.put('getRight', true);
        wCache.put('userInfo', res.userInfo);
        _this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 储存用户数据
        getApp().userSave();
      },
      fail: res => {

      },
      complete: res => {
        // console.log(getApp().globalData)
        app.loadInfo();
      }
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  swiperChange(e){
    // console.log(e.detail.current);
    this.setData({
      swiper_current: e.detail.current 
    });
    this.getSwiperHeight();
  },
  navClick(e){
    // console.log(e.currentTarget.dataset);
    this.setData({
      nav_idx: e.currentTarget.dataset.idx
    });
  },
  goodClick(e){
    var id=e.currentTarget.dataset.id;
    wx:wx.navigateTo({
      url: '../detail/detail?id='+id
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.loading();
    this.hasRight();
    var globalRight = app.globalData.getRight;
    var userInfo = app.globalData.userInfo || wCache.get('userInfo');
    var right = globalRight == undefined ? wCache.get('getRight') : globalRight;
    var _this=this;
    console.log(right);
    console.log(globalRight);
    console.log(wCache.get('getRight'));
    if (right) { //已授权
    	console.log('已授权1----')
      _this.setData({
        hasUserInfo:true
      });
    }else{
    	console.log('未授权1----')
    }
    this.getCateList();
    this.getGoodList();
  },
  hasRight(){
  	if (getApp().globalData.userInfo) {
      this.setData({
        userInfo: getApp().globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      getApp().userInfoReadyCallback = res => {
        // console.log(res.userInfo)
        getApp().globalData.userInfo = res.userInfo
        this.setData({
          hasUserInfo: true,
          nickName: getApp().globalData.userInfo
        })
        // 储存用户数据
        getApp().userSave();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          getApp().globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // 储存用户数据
          getApp().userSave();
        },
        fail: res => {

        },
        complete: res => {
          console.log(getApp().globalData)
        }
      })
    }
  },
  getSwiperHeight(){ //设置内容高度
    //swiper组件有固定高度,如需全屏需先获取内容高度
		var query = wx.createSelectorQuery();
    //选择id
    var that = this;
    var idx=this.data.swiper_current;
    setTimeout(function(){
      query.selectAll('.goods_box').boundingClientRect(function (res) {
        console.log(res);
        that.setData({
          height: res[idx].height + 'px'
        })
      }).exec();
    },800);
  },
  getCateList(){
    var _this=this;
    checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/Useapi/getCateList',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
        },
        success: function (res) {
//        console.log(res.data.data)
          _this.setData({
            cate_list:res.data.data
          });
        },
        fail(err) {
          console.log(err)
        }
      });
    });
  },
  getGoodList(){
    var _this=this;
    checkToken(wCache, Apps, function () {
      wx.request({
        url: getApp().globalData.domain + '/api/Useapi/getGoodsData',
        method: 'post',
        data: {
          accessToken: wCache.get('accessToken'),
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          var data=res.data.data;
          data.forEach(function(arr,i){
          	var newArr=arr.data;
          	newArr.forEach(function(val,i){
	          	if(val.stock!=0){
	          		val.sale_state=true;
	          	}else{
	          		val.sale_state=false;
	          	}
	          	val.sale_stock=val.start_stock-val.stock;
	          });
          });
          _this.setData({
            goods_list:data
          });
			    setTimeout(function(){
			    	_this.getSwiperHeight();
			    },200);
        },
        fail(err) {
          // console.log(err)
        }
      })
    })
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
//	console.log('再次---')
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