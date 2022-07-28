// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
//导入分页模块
const pagination=require('mongoose-sex-page');
module.exports= async (req,res)=>{

    const page=req.query.page;

    //pagination中,page代表在第几个开始，size每次显示几个，display每次显示页数显示几页
    let result1=await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    //由于报错具体文章列表内容需要转换
    let str =JSON.stringify(result1);
    let result=JSON.parse(str);
	// 渲染模板并传递数据
	res.render('home/default.art',{
        result
    });
}
