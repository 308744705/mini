// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData:"",
    btnAnimate:""
  },
  inputFocus(){
    //创建动画
    var intAnimate = wx.createAnimation({
      duration: 100,
      timingFunction: "ease",
      delay: 0
    })
    var btnAnimate = wx.createAnimation({
      duration: 100,
      timingFunction: "ease",
      delay: 0
    })
    intAnimate.width(300).step();
    btnAnimate.right(20).step();
    this.setData({
      intAnimate: intAnimate.export(),
      btnAnimate:btnAnimate.export()
    });
  },
  cancel(){
    //创建动画
    var intAnimate = wx.createAnimation({
      duration: 100,
      timingFunction: "ease",
      delay: 0
    })
    var btnAnimate = wx.createAnimation({
      duration: 100,
      timingFunction: "ease",
      delay: 0
    })
    intAnimate.width(350).step();
    btnAnimate.right(-28).step();
    this.setData({
      intAnimate: intAnimate.export(),
      btnAnimate: btnAnimate.export()
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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