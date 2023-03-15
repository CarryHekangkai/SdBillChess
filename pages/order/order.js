// pages/order/order.js
const defaultAvatarUrl = '/images/ic_user_default.png'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    topBarItems: [
      { id: 0, name: '台球', selected: true },
      { id: 1, name: '麻将', selected: false },
    ],
    roomList: {},
    currentId: 0,
    userHead: defaultAvatarUrl,
    userName: '微信用户',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: 'userHead',
      success: res => {
        this.setData({
          userHead: res.data,
        })
      }
    });

    wx.getStorage({
      key: 'userName',
      success: res => {
        this.setData({
          userName: res.data,
        })
      }
    });

    this.getRoomList(0)
  },

  getRoomList(type) {
    wx.cloud.callFunction({
      name: 'getRoomList',
      data: {
        type: type
      },
      success: res => {
        this.setData({
          roomList: res.result.data
        })
      },
      fail: err => {
        console.log("getRoomList error ", err)
      }
    })
  },

  onTapTag: function (e) {
    var id = e.currentTarget.id
    var topBarItems = this.data.topBarItems
    for (var i = 0; i < topBarItems.length; i++) {
      if (id == topBarItems[i].id) {
        topBarItems[i].selected = true;
      } else {
        topBarItems[i].selected = false;
      }
    }
    this.setData({
      topBarItems: topBarItems,
      currentId: id,
    })
    this.getRoomList(parseInt(id))
  },

  orderRoom: function (e) {
    let { roomId, time } = e.detail

    wx.getStorage({
      key: 'orderDate',
      success: res => {
        if (time == res.data) {
          wx.showToast({
            title: '今天已预定过，请明日再来！',
            icon: 'none'
          })
        } else {
          this.orderRoomImpl(roomId, time)
        }
      },
      fail: _ => {
        this.orderRoomImpl(roomId, time)
      }
    });
  },

  orderRoomImpl: function(roomId, time) {
    wx.cloud.callFunction({
      name: 'orderRoom',
      data: {
        roomId: roomId,
        time: time,
        userHead: this.data.userHead,
        userName: this.data.userName,
      },
      success: res => {
        wx.showToast({
          title: '预定成功！',
          icon: 'none'
        })
        wx.setStorageSync('commentDate', time);
        this.getRoomList(this.data.currentId)
      },
      fail: err => {
        console.log("orderRoom error ", err)
        wx.showToast({
          title: '预定失败请重试！',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})