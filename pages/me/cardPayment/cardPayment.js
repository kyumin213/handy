// pages/me/cardPayment/cardPayment.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hanPay: true,
    wxPay: false,
    payType: 2,
    totalMoney: '',
    pkCode: '',
    names:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var money = options.money
    var pkCode = options.pkCode
    let names = options.names
    that.setData({
      totalMoney: money,
      pkCode: pkCode,
      names:names
    })

  },
  // 选择汗支付
  hanPay: function() {
    var that = this
    var han = that.data.hanPay
    that.setData({
      hanPay: true,
      wxPay: false,
      payType: 2
    })
  },
  // 选择微信支付
  wxPay: function() {
    var that = this
    var wx = that.data.wxPay
    that.setData({
      wxPay: true,
      hanPay: false,
      payType: 1
    })
  },
  // 确认支付
  subPayment: function(e) {
    var that = this
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    var money = that.data.totalMoney
    console.log(money)
    var number = 1
    var wxPay = that.data.wxPay
    var payType = that.data.payType
    var pkCode = that.data.pkCode
    if (wxPay === true) {
      var payType = 1
      app.agriknow.buyHandyCard(id, pkCode, payType, number)
        .then(res => {
          that.setData({
            buyCourse: res.data
          })
          wx.requestPayment({
            'timeStamp': res.data.timeStamp + "",
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function(res) {
              // console.log("success == " + res)
              var success = '200'
              wx.navigateTo({
                url: '../../course/paymentSuccess/paymentSuccess?success=' + success + '&money=' + money,
              })
            },
            'fail': function(res) {
              // console.log("fail == " + res)
              var success = '400'
              wx.navigateTo({
                url: '../../course/paymentSuccess/paymentSuccess?success=' + success + '&money=' + money,
              })
            }
          })
        })
        .catch(res => {
          console.log(res)
        })
    } else {
      var payType = 2
      wx.showModal({
        title: '温馨提示',
        content: '是否确认支付',
        // showCancel: false,
        confirmText: '确认',
        success: function(res) {
          if (res.confirm) {
            app.agriknow.buyHandyCard(id, pkCode, payType, number)
              .then(res => {
                // if (res.success = '200') {
                var success = res.success
                var message = res.message
                wx.navigateTo({
                  url: '../../course/paymentSuccess/paymentSuccess?success=' + success + '&message=' + message + '&money=' + money,
                })
                // } 
              })
              .catch(res => {
                console.log(res)
              })
          }
        }

      })
    }

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