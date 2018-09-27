var express = require('express');
var router = express.Router();

// 引入连接数据库的模块
const connection = require('./connection');
// 调用连接方法
connection.connect(() =>{
  console.log('服务器连接成功了！')
});


// 接收添加账号的请求
router.post('/addusers',(req,res) => {
  // 接收数据
  let {username,password,usergroup} = req.body;
  // console.log(username,password,usergroup);

  // 构造sql语句
  const sqlStr = 'insert into customer(username,password,usergroup) values(?,?,?)';
  const sqlStrParams = [username,password,usergroup];

  // 执行sql语句
  connection.query(sqlStr,sqlStrParams,(err,data) => {
    if(err){
      throw err;
    }else{
     // console.log(data);
     // 打印出来的数据是一个对象，其中有affectedRows属性，大于0，表示添加成功，否则添加失败
     if(data.affectedRows > 0){
        res.send({"errcode":1,"msg":"添加成功"});
     }else{
      res.send({"errcode":0,"msg":"添加失败"});

     }
    }
  })
})

// 接收显示所有用户列表的请求
router.get('/userlist',(req,res) => {
  // 构造sql语句，去数据库查询所有数据
  const sqlStr = 'select * from customer order by ctime desc';
  // 执行sql语句
  connection.query(sqlStr,(err,data) => {
    // 如果有错，抛出错误
    if(err){
      throw err;
    }else{
      // 直接把查询的数据响应给前端
      res.send(data);
    }
  })
})

// 接收点击删除单个用户的请求
router.get('/deleteuser',(req,res) => {
  // 接收传入的id
  let {id} = req.query;
  // 构造sql语句
  const sqlStr = `delete from customer where id = ${id}`;
  // 执行构造语句
  connection.query(sqlStr,(err,data) => {
    if(err){
      throw err;
    }else{
      // 根据接收到的数据的 affectedRows属性的值来判断，是否操作成功，大于0代表成功，否则为失败
      if(data.affectedRows > 0){
        res.send({"errcode":1,"msg":"删除成功"});
      
      }else{
        res.send({"errcode":0,"msg":"删除失败"});

      }
    }
  })
})
module.exports = router;
