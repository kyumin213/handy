// pages/me/me.js
var agri = require("../../utils/agriknow.js")
var login = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    personAll: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    this.setData({
      id: id
    })
    this.personalLoad()
    if (app.globalData.userInfo) {
      var that = this
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取上课、私教次数
  personalLoad() {
    var that = this
    app.agriknow.getPersonalLoad(this.data.id)
      .then(res => {
        that.setData({
          personAll: res.data
        })
      })
      .catch(res => {
        // wx.stopPullDownRefresh()
        console.log(res)
      })
  },
  // 我的账单
  myBill:function(){
    wx.navigateTo({
      url: './myBill/myBill',
    })
  },
  // 支付密码
  payPpwd: function() {
    wx.navigateTo({
      url: './payPwd/payPwd',
    })
  },
  // 汗滴卡
  myHandyCard: function() {
    wx.navigateTo({
      url: './myCardList/myCardList',
    })
  },
  // 充值卡
  rechargeCard: function() {
    var that = this
    var allMoney = that.data.personAll.memberBalanceMoney
    wx.navigateTo({
      url: './RechargeableCard/RechargeableCard?allMoney=' + allMoney,
    })
  },
  // 我的预约
  myTeamCourse: function() {
    wx.navigateTo({
      url: './myAppointment/myAppointment',
    })
  },
  // 我的预约状态待进行
  djxShow:function(){
    var status = 'djx'
    wx.navigateTo({
      url: './myAppointment/myAppointment?status=' + status,
    })
  },
  // 我的预约状态进行中
  jxzShow: function () {
    var status = 'jxz'
    wx.navigateTo({
      url: './myAppointment/myAppointment?status=' + status,
    })
  },
  // 我的预约状态已完成
  ywcShow: function () {
    var status = 'ywc'
    wx.navigateTo({
      url: './myAppointment/myAppointment?status=' + status,
    })
  },
  // 我的预约状态已取消
  yqxShow: function () {
    var status = 'yqx'
    wx.navigateTo({
      url: './myAppointment/myAppointment?status=' + status,
    })
  },
  // 查看二维码
  viewQRcode: function() {
    wx.navigateTo({
      url: './QRcode/QRcode',
    })
  },
  // 邀请汗友
  invitingFriends: function() {
    wx.navigateTo({
      url: './InvitingFriends/InvitingFriends',
    })
  },
  // 优惠券
  coupon: function() {
    wx.navigateTo({
      url: './useCoupon/useCoupon',
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
    var loginData = wx.getStorageSync("userInfo")
    var that = this
    login.login()
    if (loginData) {
      that.personalLoad()
    }


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