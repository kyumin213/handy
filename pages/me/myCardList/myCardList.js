// pages/me/myCardList/myCardList.js
var agri = require("../../../utils/agriknow.js")
var login = require("../../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hashList: false,
    handyCardList: {},
    totalMoney: '0.00',
    yhCard: false,
    check: 0,
    select: null,
    scrollLeft: 0,
    allScroll: 0,
    len: 0,
    itemWidth: 270,
    chooseSize: false,
    animationData: {},
    disable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    that.getCardList()
  },
  chooseSezi: function(e) {
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 400,
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

  // // 使用规则
  // useMsg: function() {
  //   let that = this
  //   that.setData({
  //     shows: true
  //   })
  // },
  // close:function(){
  //   let that = this
  //   that.setData({
  //     shows: false
  //   })
  // },
  // 查询所有会员卡片
  getCardList: function() {
    let that = this
    let userData = wx.getStorageSync('userInfo')
    let id = userData.id
    app.agriknow.getMyhandyCard(id)
      .then(res => {
        let datas = res.data
        let dat = datas.slice(0,1)
        that.setData({
          handyCardList:dat,
          hashList: true
        })
      })
      .catch(res => {
   
      })
  },
  // 选择卡片
  selectCardType: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    that.setData({
      check: index,
      disable: false
    })
    var cardType = that.data.yhCard
    if (cardType === true) {
      that.setData({
        yhCard: false
      })
    } else {
      that.setData({
        yhCard: true,

      })
    }
    console.log(that.data.dis)
  },
  // 选择金额
  selectCard: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var datas = that.data.handyCardList
    var select = that.data.select
    var money = datas[index].handyCardMoney
    that.setData({
      select: index,
      totalMoney: money,
      disable: true
    })
    if (select === index) {
      that.setData({
        select: -1,
        totalMoney: '0.00',
        disable: true
      })
    }
  },
  //  确认支付
  subPayment: function() {
    var that = this
    var money = that.data.totalMoney
    var index = that.data.check
    var datas = that.data.handyCardList
    var pkCode = datas[index].handyCardPkcode
    let names = datas[index].handyCardName
    wx.navigateTo({
      url: '../cardPayment/cardPayment?money=' + money + '&pkCode=' + pkCode + '&names=' + names,
    })
  },
  // 滑动距离
  scroll: function(e) {
    var that = this
    var scroll = e.detail.scrollLeft
    var scrollL = parseInt(scroll)
    var allScroll = that.data.allScroll
    console.log(scrollL)
    var itemW = 270
    var len = that.data.len
    var num = allScroll / len
    var scroNum = scroll / num
    // console.log(scroNum)
    // console.log(num)
    // console.log(e.detail.scrollLeft)
    // that.setData({
    //   scrollLeft: scroll,
    //   check: 2,
    // })
    if (scrollL < itemW) {
      that.setData({
        check: 0
      })
    }
    if (scrollL > itemW && scrollL < itemW * 2) {
      that.setData({
        check: 1
      })
    }
    if (scrollL > itemW * 2 && scrollL < itemW * 3) {
      that.setData({
        check: 2
      })
    }
    if (scrollL > itemW * 3 && scrollL < itemW * 4) {
      that.setData({
        check: 3
      })
    }
    if (scrollL > itemW * 4 && scrollL < itemW * 5) {
      that.setData({
        check: 4
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
    // var that = this
    // const query = wx.createSelectorQuery()
    // query.select('#cardImgBox').boundingClientRect()
    // query.selectViewport().scrollOffset()
    // query.exec(function(res) {
    //   console.log(res)
    //   // that.setData({
    //   //   items1Height: res[0].
    //   // })
    // })
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