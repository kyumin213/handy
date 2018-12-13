// pages/me/guardCode/guardCode.js
var QRCode = require('../../../utils/weapp-qrcode.js')

var qrcode;

Page({
  data: {
    text: '',
    image: '',
    loadingTime: '',
    courseCode: '',
    id: ''
  },
  onLoad: function (options) {
    let that = this
    let times = options.times
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    let text = that.data.text
    let datas = {
      id: id,
      nowDate: times
    }
    that.setData({
      text: JSON.stringify(datas),
      id: id,
    })
    qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: JSON.stringify(datas),
      image: '/images/bg.jpg',
      width: 180,
      height: 180,
      colorDark: "black",
      colorLight: "white",
      correctLevel: QRCode.CorrectLevel.H,
    });
    qrcode.makeCode(this.data.text)
    wx.showLoading({
      title: '加载中',
    })

  },
// 购课
  toBuyCourse:function(){
    wx.switchTab({
      url: '../../course/course'
    })
  },
  onShow: function () {
    let that = this
    var txt = that.data.text
    let loadingTime = that.data.loadingTime
    // that.setData({
    //   loadingTime: setInterval(function () {
    //     // qrcode.makeCode(txt)
    //     that.refresh()
    //   }, 60000)
    // })
    setTimeout(function () {
      wx.hideLoading()
    }, 400)
  }
})