// pages/me/RechargeableCard/RechargeableCard.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [{
        expiryDate: 1,
        money: 100,
      },
      {
        expiryDate: 2,
        money: 300,
      }
    ],
    check: -1,
    totalMoney: 0,
    tabOne: true,
    tabTwo: false,
    allMonty: '',
    disable:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var allMonty = options.allMoney
    var that = this
    that.setData({
      allMonty: allMonty
    })

  },
  // 选择充值卡金额
  selectCard: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var datas = that.data.cardList
    var money = datas[index].money
    that.setData({
      check: index,
      totalMoney: money,
      disable:false
    })

  },
  // 点击tab充值
  tabOne: function() {
    var that = this
    that.setData({
      tabOne: true,
      tabTwo: false
    })
  },
  // 点击消费记录
  tabTwo: function() {
    var that = this
    that.setData({
      tabOne: false,
      tabTwo: true
    })
  },
  //  确认充值
  subPayment: function() {
    var that = this
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    var money = that.data.totalMoney
    app.agriknow.balanceRecharge(id, money)
      .then(res => {
        if (res.data.success = '200') {
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
              wx.navigateTo({
                url: '../../course/paymentSuccess/paymentSuccess?success=' + success + '&money=' + money,
              })
            }
          })
        }
      }).catch(res => {
        console.log(res)
      })

    // wx.navigateTo({
    //   url: '../cardPayment/cardPayment?money=' + money,
    // })
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