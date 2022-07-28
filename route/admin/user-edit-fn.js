//用户集合构造函数
const {User,validateUser} = require('../../model/user');
const bcrypt=require('bcrypt');

module.exports = async (req,res,next)=>{

    try{
        await validateUser(req.body);
    }catch (e){
        //e.message
        //重定向回用户添加
        //return res.redirect(`/admin/user-edit?message=${e.message}`);
        return next(JSON.stringify({path: '/admin/user-edit', message: e.message}));
    }

    //根据邮箱地址查询用户是否存在
    let user=await User.findOne({email: req.body.email});
    let username= await User.findOne({username: req.body.username});
    //如果用户已经存在，邮箱地址已经被人占用
    if(user){
         //重定向回用户添加
         //return res.redirect(`/admin/user-edit?message=邮箱地址被占用`);
         return next(JSON.stringify({path: '/admin/user-edit',message: '邮箱地址被占用'}));
    }else if(username){
         return next(JSON.stringify({path: '/admin/user-edit',message: '用户名被占用'}));
    }
    //对密码进行加密处理
    //随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    const password=await bcrypt.hash(req.body.password,salt);
    //替换成加密的
    req.body.password=password;

    //将user信息添加到数据库
    await User.create(req.body);

    //重定向到用户列表页面
    res.redirect('/admin/user');
}