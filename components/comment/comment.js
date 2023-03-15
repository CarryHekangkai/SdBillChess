// components/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showEditDialog: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showEditDialog: false,
    wordsCount: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 阻止页面滑动
     **/
    catchtouchmove() {},

    bindFormSubmit: function (e) {
      var value = e.detail.value.textarea
      this.triggerEvent("getCommentValue", {
        value
      })
    },

    getValueLength: function(e) {
      let value = e.detail.value
      let len = parseInt(value.length)
      this.setData({
        wordsCount: len
      })
    },

    closeModalTap() {
      this.setData({
        showEditDialog: false
      })
    },
  }
})
