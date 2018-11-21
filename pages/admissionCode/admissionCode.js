// pages/admissionCode/admissionCode.js
var QRCode = require('../../utils/weapp-qrcode.js')

var qrcode;

Page({
  data: {
    text: '',
    image: '',
    loadingTime: '',
    courseCode: '',
    id: ''
  },
  onLoad: function(options) {
    let that = this
    let times = options.times
    let courseCode = options.memberCode
    var loginData = wx.getStorageSync("userInfo")
    var id = loginData.id
    let text = that.data.text
    let datas = {
      id: id,
      courseCode: courseCode,
      nowDate: times
    }
    that.setData({
      text: JSON.stringify(datas),
      id: id,
      courseCode: courseCode
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

  // 自动刷新
  refresh: function() {
    let that = this
    let newData = new Date()
    let y = newData.getFullYear()
    let month = newData.getMonth()+1
    let d = newData.getDate()
    let h = newData.getHours()
    let m = newData.getMinutes()
    let s = newData.getSeconds()
    if (month < 10) {
      month = '0' + month
    }
    if (d < 10) {
      d = '0' + d
    }
    if (h < 10) {
      h = '0' + h
    }
    if (m < 10) {
      m = '0' + m
    }
    if (s < 10) {
      s = '0' + s
    }
    let times = y + '-' + month + '-' + d + ' ' + h + ':' + m + ':' + s
    let id = that.data.id
    let courseCode = that.data.courseCode
    let datas = {
      id: id,
      courseCode: courseCode,
      nowDate: times
    }
    let txt = JSON.stringify(datas)
    qrcode.makeCode(txt)
  },
  onShow: function() {
    let that = this
    var txt = that.data.text
    let loadingTime = that.data.loadingTime
    that.setData({
      loadingTime: setInterval(function() {
        // qrcode.makeCode(txt)
        that.refresh()
      }, 10000)
    })
    setTimeout(function() {
      wx.hideLoading()
    }, 400)
  },
  onUnload: function() {
    let that = this
    let loadingTime = that.data.loadingTime
    clearInterval(loadingTime)
  },
  // 长按保存
  save: function() {
    console.log('save')
    wx.showActionSheet({
      itemList: ['保存图片'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          qrcode.exportImage(function(path) {
            wx.saveImageToPhotosAlbum({
              filePath: path,
            })
          })
        }
      }
    })
  }
})