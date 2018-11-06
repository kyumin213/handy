// pages/me/payPwd/payPwd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd:false,
    hiddenPwd: false,
    types:"password",
    pwdType:'password'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
//显示密码
  showPwd:function(){
    var that = this
    var showPwd = that.data.pwd
    if(showPwd===true){
      that.setData({
        pwd: false,
        types: 'password'
      })
    } else {
      that.setData({
        pwd: true,
        types: 'text'
      })
    }
  },
  // 确认密码显示
  comfirPwd:function(){
    var that = this
    var showPwd = that.data.hiddenPwd
    if (showPwd === true) {
      that.setData({
        hiddenPwd: false,
        pwdType: 'password'
      })
    } else {
      that.setData({
        hiddenPwd: true,
        pwdType: 'text'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})