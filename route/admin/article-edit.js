module.exports=(req,res)=>{
    //标识，当前访问的是文章管理页面
    req.app.locals.currentLink='article';

    res.render('admin/article-edit.art');
}