//引用
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const session=require('express-session');
//导入art-template模板引擎
const template=require('art-template');
const dateFormat=require('dateformat');//设置日期格式处理的npm包
//导入morgan(前端请求信息打印到控制台)
//导入config模块，设置config文件夹，写入开发、生产以及默认环境下的文件内容
const morgan=require('morgan');
const config=require('config');

//创建网站服务器
const app=express();

//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyParser.urlencoded({extended: false}))

//配置session
app.use(session({secret: 'secret key',
            saveUninitialized:false,
            cookie:{
                maxAge:24 * 60 * 60 * 1000//设置过期时间，一天后失效
            }
        }))


//告诉express框架所在的位置
app.set('views',path.join(__dirname,'views'));
//告诉express模板框架默认后缀
app.set('view engine','art');
//当渲染后缀为art模板时候，所使用的模板引擎是
app.engine('art',require('express-art-template'));
//向模板内部调用dateformat
template.defaults.imports.dateFormat=dateFormat


//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));

console.log(config.get("title"))

//获取系统环境变量,返回值是对象
if(process.env.NODE_ENV=='development'){
    //当前是开发环境
    console.log('注意：当前是开发环境');
    //在开发环境中将客户端发送到服务器端请求信息打印到控制台
    app.use(morgan('dev'));
}else{
    //当前是生产环境
    console.log('注意：当前是生产环境');
}

//调用路由
const home=require('./route/home');
const admin=require('./route/admin');
const { nextTick } = require('process');

//拦截请求（如果用户没有登录）
app.use('/admin',require('./middleware/loginGuard'));

//为路由匹配请求路径
app.use('/',home);
app.use('/home',home);
app.use('/admin',admin);

//错误处理中间件
app.use((err,req,res,next)=>{
    //将字符串转换成json对象
    const result=JSON.parse(err);

    let params=[];
    for(let attr in result){
        if(attr != 'path'){
            params.push(attr + '=' + result[attr]);
            
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})

//监听端口
app.listen(80);
console.log('网站服务器启动成功,localhost');