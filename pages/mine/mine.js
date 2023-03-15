// pages/mine/mine.js
const defaultAvatarUrl = '/images/ic_user_default.png'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHead: defaultAvatarUrl,
    userName: '微信用户',
    showAvaModal: false,
    banner: [
      {"imagePath":"cloud://sdqp-0gyj1xpu7e321640.7364-sdqp-0gyj1xpu7e321640-1309120049/banner1.png"},
      {"imagePath":"cloud://sdqp-0gyj1xpu7e321640.7364-sdqp-0gyj1xpu7e321640-1309120049/banner2.png"},
      {"imagePath":"cloud://sdqp-0gyj1xpu7e321640.7364-sdqp-0gyj1xpu7e321640-1309120049/banner3.png"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getBannerList();
    wx.getStorage({
      key: 'userHead',
      success: res => {
        this.setData({
          userHead: res.data,
        })
      },
      fail: err => {
        this.setData({
          showAvaModal: true
        })
      }
    });

    wx.getStorage({
      key: 'userName',
      success: res => {
        this.setData({
          userName: res.data,
        })
      },
      fail: err => {
        this.setData({
          showAvaModal: true
        })
      }
    });
  },

  getBannerList() {
    wx.cloud.callFunction({
      name: 'getBannerList',
      success: res => {
        this.setData({
          banner: res.result.data
        });
      }
    })
  },

  getAvaNickData(res) {
    const { avatarUrl, nickName } = res.detail
    if (!avatarUrl) {
      wx.showToast({
        title: '请设置头像',
        icon: 'none'
      })
      return;
    }
    if (!nickName) {
      wx.showToast({
        title: '请设置昵称',
        icon: 'none'
      })
      return;
    }

    this.uploadFile(avatarUrl)
    wx.setStorageSync('userName', nickName);

    this.setData({
      userHead: avatarUrl,
      userName: nickName,
      showAvaModal: false
    })
  },

  uploadFile(path) {
    let head = new Date().getTime() + '.png';
    wx.cloud.uploadFile({
      cloudPath: head, // 上传至云端的路径
      filePath: path, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        wx.setStorageSync('userHead', res.fileID);
      },
      fail: console.error
    })
  },

  bindSetHead() {
    if (this.data.showAvaModal) {
      this.setData({
        showAvaModal: true
      })
    }
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