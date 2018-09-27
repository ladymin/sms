var express = require('express');
var router = express.Router();

// 引入连接数据库
const connection = require('./connection');

// 调用连接方法
connection.connect(() => {
  console.log('服务器连接成功！可以开始运行代码');
})

// 接收添加商品的请求
router.post('/addgoods',(req,res) => {
  res.send('1');
})

module.exports = router;

