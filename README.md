# Express-blog
简易博客项目:前端Express,后端Node.js,数据库MongoDB
## 使用方法
需要安装前置:Node.js

1.项目下载：git代码：git clone https://github.com/MyZzt/Express-blog.git  或  打包下载

2.项目依赖包安装: npm install

3.项目启动: node app.js

4.项目访问: localhost/home

## 注册用户
需要安装好前置：mongoDB，python3.0+版本

在model中打开user.js文件，把在集合User中创建用户的对象注释去除，

这样会使服务器在下一次启动的时候创建一个超级管理员用户，

超级管理员用户可以访问文章管理系统页面。

## 注意事项
1. 如果报错："db.pwd"is not defined时候，请检查文件夹中的config文件设置你自己数据库的账户密码
2. 如果数据库报错，请检查数据库是否存在！
