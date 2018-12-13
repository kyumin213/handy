// pages/me/teamCardPay/teamCardPay.js
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
    names: '',
    chooseSize: false,
    animationData: {},
    checked: false,
    subBtns: true,
    disable: true,
    coachShow: false,
    chooseSize: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var money = options.money
    var pkCode = options.pkCode
    let names = options.names
    let coachShow = options.coachShow
      // that.setData({
      //   coachShow: coachShow
      // })
      that.setData({
        totalMoney: money,
        pkCode: pkCode,
        names: names,
        coachShow: coachShow
      })

  },
  chooseSezi: function(e) {
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 300,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(500).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  // 私教协议显示
  coachView: function(e) {
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 300,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(500).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSizes: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  // 隐藏
  hideModal: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(500).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  // 私教月卡协议
  hideModals: function(e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(500).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSizes: false
      })
    }, 200)
  },
  checkboxChange: function() {
    let that = this
    let checked = that.data.checked
    let subBtns = that.data.subBtns
    if (checked) {
      that.setData({
        checked: false
      })
    } else {
      that.setData({
        checked: true
      })
    }
    if (checked == false && subBtns) {
      that.setData({
        disable: false
      })
    } else {
      that.setData({
        disable: true
      })
    }

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