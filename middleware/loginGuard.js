const guard = (req,res,next)=>{
        //判断用户访问是否登录页面,登录状态
        if(req.url != '/login' && !req.session.username) {
            res.redirect('/admin/login');
        }else{
            //如果用户是登录状态并且是一个普通用户
            if(req.session.role=='normal'){
                //跳转到用户首页
                return res.redirect('/home/');
            }
            //如果用户是登录状态将请求放行
            next();
        }
    }

module.exports=guard;