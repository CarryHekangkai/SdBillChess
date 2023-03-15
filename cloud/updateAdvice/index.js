// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id
  let count = event.count
  let type = event.type
  if(type == 1) {
    return cloud.database().collection("advice").doc(id).update({
      data: {
        supportCount: count
      }
    });
  } else {
    return cloud.database().collection("advice").doc(id).update({
      data: {
        hateCount: count
      }
    });
  }
  
}