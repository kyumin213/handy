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
    select: 1,
    scrollLeft: 0,
    allScroll: 0,
    len: 0,
    itemWidth: 270,
    disable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  // 查询我的汗滴卡
  getCardList: function() {
    var that = this
    var userData = wx.getStorageSync('userInfo')
    var id = userData.id
    app.agriknow.getMyhandyCard(id)
      .then(res => {
        var len = res.data.length
        if (res.data.length > 0) {
          var len = res.data.length
          var allScroll = len * 270
          that.setData({
            hashList: true,
            handyCardList: res.data,
            allScroll: allScroll,
            len: len
          })
        } else {
          that.setData({
            hashList: false
          })
        }
        // if (res.data.success = '200') {
        //   that.setData({
        //     handyCardList: res.data
        //   })
        // }
      })
      .catch(res => {
        // wx.showToast({
        //   title: '出错了！',
        //   icon: 'none'
        // })
      })
  },
  // 选择卡片
  selectCardType: function(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    that.setData({
      check: index
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
      disable: false
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
    wx.navigateTo({
      url: '../cardPayment/cardPayment?money=' + money + '&pkCode=' + pkCode,
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
    var that = this
    this.getCardList()
    const query = wx.createSelectorQuery()
    query.select('#cardImgBox').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res) {
      console.log(res)
      // that.setData({
      //   items1Height: res[0].
      // })
    })
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