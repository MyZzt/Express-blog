//管理页面路由
const express=require('express');

//创建博客展示页面
const admin=express.Router();

//渲染登录页面
admin.get('/login',require('./admin/loginPage'));

//登录功能
admin.post('/login',require('./admin/login'));

//创建用户列表路由
admin.get('/user',require('./admin/userPage'));

//退出功能
admin.get('/logout',require('./admin/logout'));

//用户编辑页面路由
admin.get('/user-edit',require('./admin/user-edit'));

//用户添加
admin.post('/user-edit',require('./admin/user-edit-fn'));

//修改用户
admin.post('/user-modify',require('./admin/user-modify'));

//删除用户
admin.get('/delete',require('./admin/user-delete'));

//文章列表页面
admin.get('/article',require('./admin/article'));

//文章编辑页面
admin.get('/article-edit',require('./admin/article-edit'));

//文章添加功能
admin.post('/article-add',require('./admin/article-add'));

module.exports=admin;