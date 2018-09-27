var express = require('express');
var router = express.Router();

/* 接收根目录的请求 */
router.get('/',(err,data) => {
  if(err){
    throw err;
  }else{
    console.log('服务器启动成功！')
  }
})


module.exports = router;

