// pages/authorization/authorization.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl: '',
    nickName: '',
    memberId: '',
    shareBtn: false,
    chooseSize: false,
    animationData: {},
    checked: false,
    subBtns: true,
    disable:true
  },
  onLoad: function(options) {
    var that = this;
    let memberId = options.memberId
    if (memberId != undefined) {
      that.setData({
        memberId: memberId,
        shareBtn: true
      })
    }
    that.setData({
      memberId: memberId
    })

    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })

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
  chooseSezi: function (e) {
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
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  // 隐藏
  hideModal: function (e) {
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
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  // 同意使用规则
  checkboxChange: function () {
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
  getPhoneNumber: function(e) {
    let that = this
    if (e.detail.encryptedData) {
      wx.showLoading({
        title: '发送中，请稍后',
      })
      getApp().globalData.temporaryLogin(e.detail.encryptedData, e.detail.iv)
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您拒绝了授权微信绑定手机号，允许授权后将为您自动登陆',
      })
    }
  },
  getPhone: function(e) {
    let that = this
    let memberId = that.data.memberId
    if (e.detail.encryptedData) {
      wx.showLoading({
        title: '发送中，请稍后',
      })
      getApp().globalData.temporaryLogins(e.detail.encryptedData, e.detail.iv, memberId)

    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您拒绝了授权微信绑定手机号，允许授权后将为您自动登陆',
      })
    }
  },
  // temporaryLogin: function(encryptedData, iv, memberId) {
  //   wx.login({
  //     success: function(res) {
  //       if (res.code) {
  //         wx.request({
  //           url: getApp().globalData.http_address + '/wechatLogin',
  //           data: {
  //             encryptedData: encryptedData,
  //             iv: iv,
  //             js_code: res.code,
  //             memberId: memberId
  //           },
  //           header: {
  //             'content-type': 'application/json'
  //           },
  //           method: 'POST',
  //           success: function(rs) {
  //             if (rs.data.success != '200') {
  //               wx.showModal({
  //                 title: '提示',
  //                 showCancel: false,
  //                 content: rs.data.message
  //               })
  //               return false
  //             } else {
  //               wx.switchTab({
  //                 url: '/pages/index/index',
  //               })
  //             }

  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */


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