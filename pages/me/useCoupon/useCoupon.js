// pages/course/useCoupon/useCoupon.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useCoupons: true,
    unUse: false,
    select: false,
    couponList: {},
    hashList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  // 选择可用
  selectUse: function(e) {
    var that = this
    var use = that.data.useCoupon
    that.setData({
      useCoupons: true,
      unUse: false
    })
  },
  //  不可用优惠券
  SelectUnUse: function(e) {
    var that = this
    var unUse = that.data.unUse
    that.setData({
      useCoupons: false,
      unUse: true
    })
  },
  // 可用选择优惠券
  selectOn: function() {
    var that = this
    var select = that.data.select
    if (select===true) {
      that.setData({
        select: false
      })
    } else {
      that.setData({
        select: true
      })
    }
  },
  // 查询优惠券
  getCouponList:function(){
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    app.agriknow.getCoupon(id)
      .then(res => {
        if (res.data.success = '200') {
          that.setData({
            couponList: res.data
          })
        }
      })
      .catch(res => {
        wx.showToast({
          title: '出错了！',
          icon: 'none'
        })
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