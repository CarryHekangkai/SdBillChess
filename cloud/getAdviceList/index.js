// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  let num = event.num
  let page = event.page
  return cloud.database().collection("advice").orderBy('date', 'desc').skip(page * num).limit(num).get();
}