//将文章集合的构造函数导入到当前文件中
const {Article} =require('../../model/article');
//导入mongoose-sex-page模块
const pagination=require('mongoose-sex-page');
module.exports= async (req,res)=>{
    //接收文章每页标识符

    const page=req.query.page;

    //标识，当前访问的是文章管理页面
    req.app.locals.currentLink='article';
    //查询所有文章数据(多集合联合查询)
    //page:指定显示当前页
    //size:指定每页显示的具体数据条数
    //display:指定客户端要显示的页码数量
    //exec:向数据库发送查询请求
    let article=await pagination(Article).find().page(page).size(1).display(3).populate('author').exec();

    //由于报错具体文章列表内容需要转换
    let str =JSON.stringify(article);
    let articles=JSON.parse(str);
    //渲染文章列表页面模板
    res.render('admin/article.art',{
        articles:articles
    });
}