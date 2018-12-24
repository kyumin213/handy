// pages/course/coursePayment/coursePayment.js
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
    price: '',
    start: '',
    end: '',
    index: '',
    store: '',
    money: '',
    discountPkcode: null,
    useCoupon: false,
    couponNum: '',
    couponList: false,
    couponMoney: '',
    nowPrice: '0.00',
    moneys: '0',
    address: '',
    coupons: false,
    totalPrice: '',
    useNum: {},
    animationData: {},
    checked: false,
    subBtns: true,
    disable: true,
    chooseSize: false,
    checkCoupon: false,
    couponIndex: null,
    count: '',
    disCount: false,
    teamCardPay: false,
    hashTeamCard: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var pkcode = options.courseReleasePkcode
    var index = options.index
    var datas = options.currentData
    var price = options.price
    var start = options.start
    var end = options.end
    var names = options.names
    var store = options.store
    let address = options.address
    let count = options.count
    if (count == 1) {
      that.setData({
        disCount: true,
      })
    } else {
      that.setData({
        disCount: false
      })
    }
    if (price > 2) {
      let jsMoney = (price * 0.05).toFixed(2)
      that.setData({
        moneys: jsMoney
      })
    }
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var mobile = loginData.mobile
    that.setData({
      memberId: id,
      mobile: mobile,
      courseReleasePkcode: pkcode,
      currentData: datas,
      price: price,
      start: start,
      end: end,
      index: index,
      store: store,
      names: names,
      address: address,
      totalPrice: price
    })
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    var that = this
    app.agriknow.getCourseDetails(id, pkcode)
      .then(res => {
        var courseList = res.data
        that.setData({
          courseList: courseList
        })

      })
      .catch(res => {
        console.log(res)
      })
    that.getCouponList()

  },
  // 团操卡预约
  getTeamCardBook: function() {
    let that = this
    let loginData = wx.getStorageSync("userInfo")
    let id = loginData.id
    var names = that.data.names
    var times = that.data.currentData
    var store = that.data.store
    var start = that.data.start
    var end = that.data.end
    let code = that.data.courseReleasePkcode
    app.agriknow.teamCardBook(id, code).then(res => {
      console.log(res.success)
      if (res.success == '200') {
        let success = '200'
        wx.navigateTo({
          url: '../paymentSuccess/paymentSuccess?success=' + success + '&names=' + names + '&times=' + times + '&store=' + store + '&start=' + start + '&end=' + end,
        })
      } else {
        let success = '400'
        wx.navigateTo({
          url: '../paymentSuccess/paymentSuccess?success=' + success + '&names=' + names + '&times=' + times + '&store=' + store + '&start=' + start + '&end=' + end,
        })
      }
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
  // 开通会员卡
  memberCard: function() {
    wx.navigateTo({
      url: '../../me/myCardList/myCardList',
    })
  },
  // 查询优惠券
  getCouponList: function() {
    let that = this
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    let price = that.data.price
    app.agriknow.getCoupon(id)
      .then(res => {
        let datas = res.data
        for (var i = 0; i < datas.length; i++) {
          let use = datas[i].useStatus
          if (use == 0) {
            that.setData({
              couponNum: res.data.length,
              couponList: true
            })
          } else {
            that.setData({
              couponList: false
            })
          }
        }
        // if (res.data.useStatus =='0') {
        //   console.log(res.data.length)
        //   that.setData({
        //     couponNum: res.data.length,
        //     couponList: true
        //   })
        // } else {
        //   that.setData({
        //     // couponNum: res.data.length,
        //     couponList: false
        //   })
        // }

      })
      .catch(res => {

      })
  },
  // 选择汗支付
  hanPay: function() {
    var that = this
    var han = that.data.hanPay
    that.setData({
      hanPay: true,
      wxPay: false,
      teamCardPay: false
    })
  },
  // 选择微信支付
  wxPay: function() {
    var that = this
    var wx = that.data.wxPay
    that.setData({
      wxPay: true,
      hanPay: false,
      teamCardPay: false
    })
  },
  // 月卡支付
  teamCardPay: function() {
    var that = this
    var wx = that.data.wxPay
    that.setData({
      wxPay: false,
      hanPay: false,
      teamCardPay: true
    })
  },
  // 选择优惠券
  coupon: function() {
    let that = this
    let price = that.data.price
    let checkCoupon = false
    let couponIndex = that.data.couponIndex
    wx.navigateTo({
      url: '../../me/useCoupon/useCoupon?price=' + price + '&checkCoupon=' + checkCoupon + '&couponIndex=' + couponIndex,
    })
  },
  // 确认支付
  subPayment: function(e) {
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
    var payType = parseInt(that.data.payType)
    var discountPkid = ''
    var releaseId = that.data.courseReleasePkcode
    var courseType = 1
    var discountPkcode = that.data.discountPkcode
    var level = ''
    if (wxPay == true) {
      var payType = 1
      app.agriknow.getBuyCourse(courseType, releaseId, id, mobile, payType, null, discountPkcode)
        .then(res => {
          if (res.success === '200') {
            that.setData({
              buyCourse: res.data
            })
            // if (discountPkcode != undefined) {
            wx.requestPayment({
              'timeStamp': res.data.timeStamp + "",
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'signType': 'MD5',
              'paySign': res.data.paySign,
              'discountPkcode': discountPkcode,
              'success': function(res) {
                // console.log("success == " + res)
                var success = '200'
                console.log(success)
                wx.navigateTo({
                  url: '../paymentSuccess/paymentSuccess?success=' + success + '&names=' + names + '&times=' + times + '&store=' + store + '&start=' + start + '&end=' + end,
                })
              },
              'fail': function(res) {
                // console.log("fail == " + res)
                var success = '400'
                console.log(success)
                wx.navigateTo({
                  url: '../paymentSuccess/paymentSuccess?success=' + success + '&names=' + names + '&times=' + times + '&store=' + store + '&start=' + start + '&end=' + end,
                })
              }
            })
            // }
          } else {
            var success = res.success
            var message = res.message
            wx.navigateTo({
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
                // discountPkid: '',
                discountPkcode: discountPkcode
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
  hanPayment: function() {
    var that = this
    var id = that.data.memberId
    var mobile = that.data.mobile
    // var wxPay = that.data.wxPay
    // var hanPay = that.data.hanPay
    var payType = parseInt(that.data.payType)
    var discountPkid = ''
    var releaseId = that.data.courseReleasePkcode
    var courseType = 1
    var payType = 2
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
        var success = res.success
        console.log(res)
        var mes = res.data.message
        wx.reLaunch({
          url: '../paymentSuccess/paymentSuccess?success=' + success + '&message=' + mes,
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
    // app.agriknow.getBuyCourse(courseType, releaseId, id, mobile, payType, discountPkid)
    //   .then(res => {
    //       console.log(res.data)
    //       var suc = res.data.success
    //       var mes = res.data.message
    //       wx.navigateTo({
    //         url: '../paymentSuccess/paymentSuccess?success=' + suc + '&message=' + mes,
    //       })
    //       console.log('33')
    //   })
    //   .catch(res => {
    //     console.log(res.data)
    //   })
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
    let that = this
    let price = that.data.price
    let useCoupon = that.data.coupons
    let checkCoupon = that.data.checkCoupon
    let couponNum = that.data.couponNum
    if (useCoupon && checkCoupon) {
      let totalPrice = price - couponNum
      that.setData({
        totalPrice: totalPrice,
      })
    } else {
      that.setData({
        totalPrice: price
      })
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
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
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