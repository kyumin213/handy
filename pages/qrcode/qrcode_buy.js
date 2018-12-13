// pages/qrcode/qrcode_buy.js
var app = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: "",
    memberBalanceMoney: "0",
    courseReleaseMoney: '',
    id: null,
    phone: null,
    releaseId: null,
    courseType: null,
    deviceId: null,
    storeid: null,
    level: null,
    hanPay: false,
    wxPay: true,
    fitnessCourseName: '',
    storeAddress: '',
    hashTime: false,
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.q !== undefined) { //通过二维码进入
      //获取路径
      var scan_url = decodeURIComponent(options.q);
      console.log(scan_url);
      //获取路径参数
      var urlparam = scan_url.substring(scan_url.indexOf("?") + 1, scan_url.length)
      //解析参数
      var urlparamArray = urlparam.split("&")
      var param = {}

      for (var i = 0; i < urlparamArray.length; i++) {
        var p = urlparamArray[i];
        var pArray = p.split("=")
        var key = pArray[0]
        var value = pArray[1]
        param[key] = value
      }
      this.setData({
        param: JSON.stringify(param),
        releaseId: param.courseReleasePkcode,
        deviceId: param.deviceId,
        storeid: param.storeid,
        level: param.level
      })
      var that = this;
      //获取js_code
      wx.login({
        success: function(res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              method: "POST",
              url: app.http_address + '/qrcode/checkMemberBuyCourse',
              data: {
                js_code: res.code,
                courseReleasePkcode: param.courseReleasePkcode,
                level: parseInt(param.level)
              },
              success: function(res) {
                var data = res.data;
                if (data.success == "200") {
                  if (data.data.time == '' || data.data.time == undefined || data.data.time == null) {
                    that.setData({
                      hashTime: false
                    })
                  } else {
                    that.setData({
                      hashTime: true,
                      time: data.data.time
                    })
                  }
                  that.setData({
                    memberBalanceMoney: data.data.memberBalanceMoney,
                    courseReleaseMoney: data.data.courseReleaseMoney,
                    phone: data.data.phone,
                    id: data.data.id,
                    courseType: data.data.courseType,
                    fitnessCourseName: data.data.fitnessCourseName,
                    storeAddress: data.data.storeAddress
                  })
                } else {
                  wx.showModal({
                    title: '错误',
                    content: data.message,
                  })
                }
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })

      //获取余额信息 课程信息
      //选择支付方式
      //拉起支付或直接支付

    } else { //未通过二维码进入
      this.setData({
        param: '123'
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
  submitPayment: function() {
    var that = this
    var wxPay = that.data.wxPay
    var hanPay = that.data.hanPay
    if (wxPay == true) {
      var courseReleaseMoney = this.data.courseReleaseMoney;
      if (!courseReleaseMoney) {
        wx.showModal({
          title: '错误',
          content: '未获得课程信息',
        })
        return;
      }
      wx.showModal({
        title: '设备',
        content: that.data.deviceId,
      })
      wx.request({
        method: "POST",
        url: app.http_address + '/buyCourse',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          courseType: that.data.courseType,
          id: that.data.id,
          phone: that.data.phone,
          releaseId: that.data.releaseId,
          payType: 1,
          discountPkid: null,
          deviceId: that.data.deviceId,
          storeid: that.data.storeid,
          level: that.data.level
        },
        success: function(res) {
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp + "",
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function(payres) {
              wx.switchTab({
                url: '../index/index',
              })
              wx.showModal({
                title: '支付返回',
                content: JSON.stringify(payres),
              })
            },
            'fail': function(payres) {
              wx.switchTab({
                url: '../index/index',
              })
              wx.showModal({
                title: '支付返回',
                content: JSON.stringify(payres),
              })
            }
          })
        }
      })
    } else if (hanPay === true) {
      var courseReleaseMoney = this.data.courseReleaseMoney;
      if (!courseReleaseMoney) {
        wx.showModal({
          title: '错误',
          content: '未获得课程信息',
        })
        return;
      }
      wx.request({
        method: "POST",
        url: app.http_address + '/buyCourse',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          courseType: that.data.courseType,
          id: that.data.id,
          phone: that.data.phone,
          releaseId: that.data.releaseId,
          deviceId: that.data.deviceId,
          payType: 2,
          discountPkid: null,
          level: that.data.level
        },
        success: function(res) {
          var data = res.data;
          if (data.success == "200") {
            wx.showModal({
              title: 'ok',
              content: "ok",
            })
          } else {
            wx.showModal({
              title: '错误',
              content: data.message,
            })
          }
        }
      })
    }
  },
  //  返回
  back:function(){
    wx.switchTab({
      url: '../index/index',
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