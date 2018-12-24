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
        money: 500,
      },
      {
        expiryDate: 1,
        money: 1000,
      },
      {
        expiryDate: 1,
        money: 2000,
      }

    ],
    check: 0,
    totalMoney: 500,
    tabOne: true,
    tabTwo: false,
    allMonty: '0.00',
    disable: true,
    imgs: 'http://112.74.169.46:8094/api/file/uploadfile/file/images/memberCard/chongzhi.png',

    chooseSize: false,
    animationData: {},
    checked: false,
    subBtns: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var allMonty = options.allMoney
    var that = this
    if (allMonty == 0) {
      that.setData({
        allMonty: '0.00'
      })
    }

  },
  // 查看会员
  memberCard: function() {
    wx.navigateTo({
      url: '../myCardList/myCardList',
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

  // 选择充值卡金额
  selectCard: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var datas = that.data.cardList
    var money = datas[index].money
    let check = that.data.check
    let checked = that.data.checked
    that.setData({
      check: index,
      totalMoney: money
    })
    // if (subBtns && !checked) {
    //   that.setData({
    //     disable: false
    //   })
    // } else {
    //   that.setData({
    //     disable: true
    //   })
    // }
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
              let success = '400'
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