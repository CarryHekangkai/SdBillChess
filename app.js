// app.js

App({
  onLaunch() {
    wx.cloud.init({
      env: "sdqp-0gyj1xpu7e321640"
    })
    this.updateManager();
  },

  /*小程序主动更新*/
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '有新版本',
        content: '新版本已经准备好，即将重启',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      });
      updateManager.onUpdateFailed(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本下载失败',
          showCancel: false
        })
      });
    });
  },

  globalData: {
    userInfo: null
  }
})
