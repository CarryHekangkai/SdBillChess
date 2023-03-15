// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let authorHead = event.authorHead
  let authorName = event.authorName
  let content = event.content
  return cloud.database().collection("advice").add({
    data: {
      authorHead: authorHead,
      authorName: authorName,
      content: content,
      date: new Date(),
      hateCount: 0,
      supportCount: 0
    }
  });
}