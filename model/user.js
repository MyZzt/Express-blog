//创建用户集合
//mongoose
const mongoose=require('mongoose');
const Joi=require('joi');

//创建用户集合规则
const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,//查看数据库有没有当前邮箱
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    //0:启用
    //1:禁用
    state:{
        type: Number,
        default: 0
    }

});

//创建集合
const User=mongoose.model('User',userSchema);

/*async function createUser(){
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('',salt);
    const user = await User.create({
        username: 'zzt',
        email: '125754790@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    });
}*/
//createUser();

//验证用户信息
const validateUser =user=>{
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error("用户名不符合规则")),
        email: Joi.string().email().required().error(new Error("邮箱不符合规则")),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error("密码不符合规则")),
        role: Joi.string().valid('normal','admin').required().error(new Error("角色值不符合")),
        state: Joi.number().valid(0,1).required().error(new Error("状态值非法"))
    };

    //实施验证
    return Joi.validate(user, schema);
}


//导出的模块
module.exports= {
    User,
    validateUser
}