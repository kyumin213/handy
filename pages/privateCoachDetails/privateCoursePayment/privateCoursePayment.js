// pages/privateCoachDetails/privateCoursePayment/privateCoursePayment.js
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
    coachName: '',
    tm: '',
    hour: '',
    courseName: '',
    level: '',
    courseReleasePkcode: '',
    mobile: '',
    memberId: '',
    animationData: {},
    checked: false,
    subBtns: true,
    disable: true,
    chooseSize: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var mobile = loginData.mobile
    let coachName = options.coachName
    let hour = options.hour
    let tm = options.tm
    let courseName = options.courseName
    let hourIndex = options.level
    let courseReleasePkcode = options.courseReleasePkcode
    that.setData({
      coachName: coachName,
      hour: hour,
      courseName: courseName,
      tm: tm,
      level: hourIndex,
      courseReleasePkcode: courseReleasePkcode,
      memberId: id,
      mobile: mobile
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
  // 同意使用规则
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
    })
  },
  // 选择微信支付
  wxPay: function() {
    var that = this
    var wx = that.data.wxPay
    that.setData({
      wxPay: true,
      hanPay: false,
    })
  },
  // 确认支付
  subPayment: function() {
    var that = this
    var id = that.data.memberId
    var mobile = that.data.mobile
    var wxPay = that.data.wxPay
    var hanPay = that.data.hanPay
    var names = that.data.names
    var times = that.data.currentData
    var store = that.data.store
    var start = that.data.start
    var end = that.data.end
    let level = that.data.level
    let coachName = that.data.coachName
    let courseName = that.data.courseName
    let hour = that.data.hour
    let tm = that.data.tm
    // var payType = parseInt(that.data.payType)
    var discountPkid = ''
    var releaseId = that.data.courseReleasePkcode
    var courseType = 2
    if (wxPay) {
      var payType = 1
      app.agriknow.getBuyCourse(courseType, releaseId, id, mobile, payType, level,null)
        .then(res => {
          if (res.success = '200') {
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
                  url: '../../course/paymentSuccess/paymentSuccess?success=' + success + '&coachName=' + coachName + '&tm=' + tm + '&courseName=' + courseName + '&hour=' + hour,
                })
              },
              'fail': function(res) {
                // console.log("fail == " + res)
                var success = '400'
                wx.navigateTo({
                  url: '../../course/paymentSuccess/paymentSuccess?success=' + success + '&storeCoachId=' + storeCoachId
                })
              }
            })
          }
        })
    } else if (hanPay) {
      var payType = 2
      wx.showModal({
        title: '温馨提示',
        content: '是否确认支付',
        // showCancel: false,
        confirmText: "确定",
        success: function(res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.http_address + '/buyCourse',
              data: {
                courseType: 2,
                releaseId: releaseId,
                id: id,
                mobile: mobile,
                payType: 2,
                discountPkid: '',
                level: level
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                var success = res.data.success
                var mes = res.data.message
                wx.reLaunch({
                  url: '../../course/paymentSuccess/paymentSuccess?success=' + success + '&message=' + mes + '&coachName=' + coachName + '&tm=' + tm + '&courseName=' + courseName + '&hour=' + hour,
                })
              },
              fail: function(res) {
                console.log(res)
              }
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