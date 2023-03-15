// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let roomId = event.roomId
  let time = event.time
  let userHead = event.userHead
  let userName = event.userName
  return cloud.database().collection("room").where({
    roomId: roomId
  }).update({
    data: {
      orderTime: time,
      lastUserImg: userHead,
      lastUserName: userName
    }
  });
}