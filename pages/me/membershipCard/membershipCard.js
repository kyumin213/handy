// pages/me/membershipCard/membershipCard.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // cardList: [{
    //   expiryDate: 1,
    //   money: 100,
    // },
    // {
    //   expiryDate: 2,
    //   money: 300,
    // }
    // ],
    check: -1,
    totalMoney: 0,
    handyCardList: {},
    handyCardTimeType:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 查询汗滴卡
  getCardList: function() {
    var that = this
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    app.agriknow.getCoupon(id)
      .then(res => {
        if (res.data.success = '200') {
          that.setData({
            handyCardList: res.data
          })
        }
      })
      .catch(res => {
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
  },
  // 选择汗滴卡金额
  selectCard: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    console.log(index)
    var datas = that.data.handyCardList
    var money = datas[index].handyCardMoney
    that.setData({
      check: index,
      totalMoney: money
    })

  },
  //  确认支付
  subPayment: function() {
    var that = this
    var money = that.data.totalMoney
    var index = that.data.check
    var datas = that.data.handyCardList
    var pkCode = datas[index].handyCardPkcode
    wx.navigateTo({
      url: '../cardPayment/cardPayment?money=' + money + '&pkCode=' + pkCode,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCardList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})