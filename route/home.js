//展示页面路由
const express=require('express');

//创建博客展示页面
const home=express.Router();

//博客前台首页的展示页面
home.get('/',require('./home/index'));

//博客前台文章详情展示页面
home.get('/article',require('./home/article'));

//博客评论功能
home.post('/comment',require('./home/comment'));

module.exports=home;