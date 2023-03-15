// pages/advice/advice.js
const num = 5
const defaultAvatarUrl = '/images/ic_user_default.png'
const date = new Date()
const year = date.getFullYear()
const month = date.getMonth()
const day = date.getDate()
const time = year + ":" + month + ":" + day

Page({

  /**
   * 页面的初始数据
   */
  data: {
    adviceList: [],
    curPage: 0,
    dataLoadEnd: false,
    showEditDialog: false,
    userHead: defaultAvatarUrl,
    userName: '微信用户',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAdviceList(this.data.curPage)

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
  },

  getAdviceList(page) {
    wx.cloud.callFunction({
      name: 'getAdviceList',
      data: {
        num: num,
        page: page
      },
      success: res => {
        if (res.result.data.length != 0) {
          this.data.adviceList.push(...res.result.data)
          this.data.curPage++
          this.setData({
            adviceList: this.data.adviceList
          })
          wx.stopPullDownRefresh()
        } else {
          this.data.dataLoadEnd = true
        }
      },
      fail: err => {
        wx.stopPullDownRefresh()
        console.log("getAdviceList error ", err)
      }
    })
  },


  getCommentValue: function (e) {
    let content = e.detail.value
    let authorHead = this.data.userHead
    let authorName = this.data.userName
    wx.cloud.callFunction({
      name: 'addComment',
      data: {
        authorHead: authorHead,
        authorName: authorName,
        content: content
      },
      success: res => {
        wx.showToast({
          title: '评论成功！',
          icon: 'none'
        })
        this.addCommentSuccess()
      },
      fail: err => {
        wx.showToast({
          title: '评论失败，请重试！',
          icon: 'none'
        })
      }
    })
  },

  addCommentSuccess() {
    wx.setStorageSync('commentDate', time);
    this.setData({
      showEditDialog: false
    })
    this.onPullDownRefresh()
  },

  supportOrHate: function (e) {
    let { type, id, count } = e.detail
    wx.cloud.callFunction({
      name: 'updateAdvice',
      data: {
        type: type,
        id: id,
        count: count
      }
    })
  },

  showDialog: function () {
    wx.getStorage({
      key: 'commentDate',
      success: res => {
        if (time == res.data) {
          wx.showToast({
            title: '今天已评论过，请明日再来！',
            icon: 'none'
          })
        } else {
          this.setData({
            showEditDialog: true
          })
        }
      },
      fail: _ => {
        this.setData({
          showEditDialog: true
        })
      }
    });
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
    this.data.articleList = []
    this.data.curPage = 0
    this.getAdviceList(this.data.curPage)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.dataLoadEnd) {
      this.getAdviceList(this.data.curPage)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})