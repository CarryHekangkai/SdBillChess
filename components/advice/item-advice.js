// components/advice/item-advice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    adviceList: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchSupport: function (e) {
      let index = e.currentTarget.dataset['index']
      let id = this.data.adviceList[index]._id
      let support = this.data.adviceList[index].support
      let supportCount = this.data.adviceList[index].supportCount
      let s = 'adviceList[' + index + '].support'
      let sc = 'adviceList[' + index + '].supportCount'
      if(!support) {
        supportCount += 1
      } else {
        supportCount -= 1
      }
      this.setData({
        [s]: !support,
        [sc]: supportCount
      })
      this.triggerEvent("supportOrHate", {
        type: 1,
        id: id,
        count: supportCount
      })
    },
    catchHate: function (e) {
      let index = e.currentTarget.dataset['index']
      let id = this.data.adviceList[index]._id
      let hate = this.data.adviceList[index].hate
      let hateCount = this.data.adviceList[index].hateCount
      let h = 'adviceList[' + index + '].hate'
      let hc = 'adviceList[' + index + '].hateCount'
      if(!hate) {
        hateCount += 1
      } else {
        hateCount -= 1
      }
      this.setData({
        [h]: !hate,
        [hc]: hateCount
      })
      this.triggerEvent("supportOrHate", {
        type: 2,
        id: id,
        count: hateCount
      })
    }
  }
})
