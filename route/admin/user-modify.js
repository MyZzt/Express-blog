const {User}=require('../../model/user');
const bcrypt=require('bcrypt');

module.exports = async (req,res,next) =>{
    //接收客户端传递过来的请求参数
    const {username,password,email,role,state}=req.body;
    //将要修改的用户id
    const id=req.query.id;

    let user= await User.findOne({_id:id});

    //密码比对
    const isValid = await bcrypt.compare(password,user.password);
    
    if(isValid){
        //密码比对成功,更新用户信息
         await User.updateOne({_id:id},{
            username,
            email,
            role,
            state
        });

        //重定向到用户列表
        res.redirect('/admin/user');

    }else{
        //密码比对失败
        let obj={path: '/admin/user-edit',message:'密码比对失败，不能进行用户信息修改',id:id};
        next(JSON.stringify(obj));
    }
    
    
}

