// pages/course/comfirPayment/comfirPayment.js
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
    memberId: '',
    mobile: '',
    courseReleasePkcode: '',
    buyCourse: {},
    currentData: '',
    courseList: {},
    storeCoachId: '',
    disBtn: false,
    store: '',
    price: '',
    start: '',
    end: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var pkcode = options.courseReleasePkcode
    var index = options.index
    var datas = options.currentData
    console.log(datas)
    var store = options.store
    var price = options.price
    var start = options.start
    var end = options.end
    var names = options.names
    var storeCoachId = options.storeCoachId
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var mobile = loginData.mobile
    if (storeCoachId != undefined) {
      that.setData({
        storeCoachId: storeCoachId
      })
      app.agriknow.getCourseRelease(datas, id, storeCoachId)
        .then(res => {
          if (res.data.success = '200') {
            var courseList = res.data[index]
            that.setData({
              courseList: courseList
            })
          }
        })
        .catch(res => {
          console.log(res)
        })
    }
    // app.agriknow.getCourseRelease(datas, id)
    //   .then(res => {
    //     if (res.data.success = '200') {
    //       var courseList = res.data[index]
    //       that.setData({
    //         courseList: courseList
    //       })
    //     }
    //   })
    //   .catch(res => {
    //     console.log(res)
    //   })
    that.setData({
      memberId: id,
      mobile: mobile,
      courseReleasePkcode: pkcode,
      currentData: datas,
      store: store,
      names: names,
      price: price,
      start: start,
      end: end
    })

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
  subPayment: function(e) {
    var that = this
    var id = that.data.memberId
    var mobile = that.data.mobile
    var wxPay = that.data.wxPay
    var hanPay = that.data.hanPay
    var payType = parseInt(that.data.payType)
    var discountPkid = ''
    var releaseId = that.data.courseReleasePkcode
    var names = that.data.names
    var times = that.data.currentData
    var store = that.data.store
    var start = that.data.start
    var end = that.data.end
    var courseType = 1
    that.setData({
      disBtn: true
    })
    if (wxPay == true) {
      var payType = 1
      app.agriknow.getBuyCourse(courseType, releaseId, id, mobile, payType, discountPkid)
        .then(res => {
          that.setData({
            buyCourse: res.data
          })
          console.log(res.success)
          if (res.success == '200') {
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
                  url: '../paymentSuccess/paymentSuccess?success=' + success + '&names=' + names + '&times=' + times + '&store=' + store + '&start=' + start + '&end=' + end,
                })
              },
              'fail': function(res) {
                // console.log("fail == " + res)
                var success = '400'
                wx.navigateTo({
                  url: '../paymentSuccess/paymentSuccess?success=' + success + '&names=' + names + '&times=' + times + '&store=' + store + '&start=' + start + '&end=' + end,
                })
              }
            })
          } else {
            var success = '400'
            var message = res.message
            wx.reLaunch({
              url: '../paymentSuccess/paymentSuccess?success=' + success + '&message=' + message,
            })
          }

        })
        .catch(res => {
          console.log(res)
        })
    } else if (hanPay === true) {
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
                courseType: 1,
                releaseId: releaseId,
                id: id,
                mobile: mobile,
                payType: 2,
                discountPkid: ''
              },
              method: 'POST',
              header: {
                'content-type': 'application/json' // 默认值
              },
              success: function(res) {
                var success = res.data.success
                var mes = res.data.message
                wx.reLaunch({
                  url: '../paymentSuccess/paymentSuccess?success=' + success + '&message=' + mes + '&names=' + names + '&times=' + times + '&store=' + store + '&start=' + start + '&end=' + end,
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
  // 汗的支付
  // hanPayment: function() {
  //   var that = this
  //   var id = that.data.memberId
  //   var mobile = that.data.mobile
  //   // var wxPay = that.data.wxPay
  //   // var hanPay = that.data.hanPay
  //   var payType = parseInt(that.data.payType)
  //   var discountPkid = ''
  //   var releaseId = that.data.courseReleasePkcode
  //   var courseType = 1
  //   var payType = 2
  //   wx.request({
  //     url: 'https://www.handyfitness.com.cn/mini_member_api/buyCourse',
  //     data: {
  //       courseType: 1,
  //       releaseId: releaseId,
  //       id: id,
  //       mobile: mobile,
  //       payType: 2,
  //       discountPkid: ''
  //     },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: function(res) {
  //       var success = res.data.success
  //       var mes = res.data.message
  //       wx.reLaunch({
  //         url: '../paymentSuccess/paymentSuccess?success=' + success + '&message=' + mes,
  //       })
  //       console.log(res.data)
  //     },
  //     fail: function(res) {
  //       console.log(res)
  //     }
  //   })
  //   // app.agriknow.getBuyCourse(courseType, releaseId, id, mobile, payType, discountPkid)
  //   //   .then(res => {
  //   //       console.log(res.data)
  //   //       var suc = res.data.success
  //   //       var mes = res.data.message
  //   //       wx.navigateTo({
  //   //         url: '../paymentSuccess/paymentSuccess?success=' + suc + '&message=' + mes,
  //   //       })
  //   //       console.log('33')
  //   //   })
  //   //   .catch(res => {
  //   //     console.log(res.data)
  //   //   })
  // },

  // 选择优惠券
  coupon: function() {
    wx.navigateTo({
      url: '../../me/useCoupon/useCoupon',
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