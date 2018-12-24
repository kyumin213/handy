import request from './request.js'
class agriknow {
  constructor() {
    // this._baseUrl = 'http://112.74.169.46:8093' //测试地址
    // this._baseUrl = 'https://www.handyfitness.com.cn/mini_member_api' //正式地址
    this._baseUrl = 'https://www.linkgooo.com/test_mini_member_api' //测试地址
    this._defaultHeader = {
      'Content-Type': 'application/json'
    }
    this._request = new request
    this._request.setErrorHandler(this.errorHander)
  }

  /**
   * 统一的异常处理方法
   */
  errorHander(res) {
    console.error(res)
  }
  // 获取个人中心课程
  getPersonalLoad(id) {
    let data = {
      id: id
    }
    return this._request.postRequest(this._baseUrl + '/personalLoad', data).then(res => res.data)
  }
  // 购买课程
  getBuyCourse(courseType, releaseId, id, mobile, payType, level, discountPkcode) {
    let data = {
      courseType: courseType,
      releaseId: releaseId,
      id: id,
      mobile: mobile,
      payType: payType,
      level: level,
      discountPkcode: discountPkcode
    }
    return this._request.postRequest(this._baseUrl + '/buyCourse', data).then(res => res.data).catch(res => res.data)
  }

  // 查询发布课程
  getCourseRelease(day, id, storeCoachId, storePkcode, storeCity, storeProvince, storeDistrict) {
    let data = {
      day: day,
      id: id,
      storePkcode: storePkcode,
      storeCoachId: storeCoachId,
      storeCity: storeCity,
      storeProvince: storeProvince,
      storeDistrict: storeDistrict
    }
    return this._request.postRequest(this._baseUrl + '/findTeamCourseRelease', data).then(res => res.data)
  }

  // 课程详情
  getCourseDetails(id, courseReleasePkcode) {
    let data = {
      id: id,
      courseReleasePkcode: courseReleasePkcode
    }
    return this._request.postRequest(this._baseUrl + '/courseDetail', data).then(res => res.data)
  }
  // 查询优惠券
  getCoupon(id) {
    let data = {
      id: id
    }
    return this._request.postRequest(this._baseUrl + '/meCoupon', data).then(res => res.data)
  }
  // 购买汗滴卡
  buyHandyCard(id, card, payType, number) {
    let data = {
      id: id,
      card: card,
      payType: payType,
      number: number
    }
    return this._request.postRequest(this._baseUrl + '/buyHandyCard', data).then(res => res.data).catch(res => res.data)
  }
  // 我的汗滴卡
  getMyhandyCard(id) {
    let data = {
      id: id
    }
    return this._request.postRequest(this._baseUrl + '/meHandyCard', data).then(res => res.data)
  }

  // 我的账单
  getMyBillData(id) {
    let data = {
      id: id
    }
    return this._request.postRequest(this._baseUrl + '/meBill', data).then(res => res.data)
  }
  // 我的团体课程
  getMyTeamCourse(id, status) {
    let data = {
      id: id,
      status: status
    }
    return this._request.postRequest(this._baseUrl + '/meTeamCourse', data).then(res => res.data)
  }
  // 余额充值
  balanceRecharge(id, money) {
    let data = {
      id: id,
      money: money + ''
    }
    return this._request.postRequest(this._baseUrl + '/balanceRecharge', data).then(res => res.data)
  }
  // 教练列表
  getCoachList(id, coachType, storeProvince, storeCity, storeDistrict) {
    let data = {
      id: id,
      coachType: coachType,
      storeProvince: storeProvince,
      storeCity: storeCity,
      storeDistrict: storeDistrict
    }
    return this._request.postRequest(this._baseUrl + '/findCoachList', data).then(res => res.data)
  }
  // 教练详情
  getCoachDetails(id, storeCoachId) {
    let data = {
      id: id,
      storeCoachId: storeCoachId
    }
    return this._request.postRequest(this._baseUrl + '/storeCoachDetail', data).then(res => res.data)
  }
  // 查询门店所有城市
  getStoreCity(id) {
    let data = {
      id: id
    }
    return this._request.postRequest(this._baseUrl + '/findCityList', data).then(res => res.data)
  }
  // 查询城市所有门店
  getStoreListByCity(id, storeCity) {
    let data = {
      id: id,
      storeCity: storeCity
    }
    return this._request.postRequest(this._baseUrl + '/findStoreListByCity', data).then(res => res.data)
  }
  // 用户信息
  getUserInfoData(id, nickName, gender, province, country, city, language, avatarUrl) {
    let data = {
      id: id,
      nickName: nickName,
      gender: gender,
      province: province,
      country: country,
      city: city,
      language: language,
      avatarUrl: avatarUrl
    }
    return this._request.postRequest(this._baseUrl + '/getUserInfo', data).then(res => res.data)
  }
  // 私教课程
  getPrivateCourse(id, storeCoachPkid) {
    let data = {
      id: id,
      storeCoachPkid: storeCoachPkid
    }
    return this._request.postRequest(this._baseUrl + '/storeCoachPrivateCourseList', data).then(res => res.data)
  }
  // 临时柜
  getTempLockerOrderList(id) {
    let data = {
      id: id
    }
    return this._request.postRequest(this._baseUrl + '/tempLockerOrderList', data).then(res => res.data)
  }
  // 修改储物柜密码
  updateLockerPwd(id, pwd) {
    let data = {
      id: id,
      pwd: pwd
    }
    return this._request.postRequest(this._baseUrl + '/updateLockerPwd', data).then(res => res.data)
  }
  // 团操月卡预约
  teamCardBook(id, courseReleasePkcode) {
    let data = {
      id: id,
      courseReleasePkcode: courseReleasePkcode
    }
    return this._request.postRequest(this._baseUrl + '/teamCardBook', data).then(res => res.data)
  }
  // 取消预约
  teamCourseRefund(id, memberCoursePkcode){
    let data = {
      id:id,
      memberCoursePkcode: memberCoursePkcode
    }
    return this._request.postRequest(this._baseUrl + '/teamCourseRefund', data).then(res => res.data)
  }
}
export default agriknow