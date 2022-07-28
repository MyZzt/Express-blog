const {Article}=require('../../model/article');
//导入评论集合
const {Comment}=require('../../model/comment');
module.exports= async (req,res)=>{
    //接收客户端传递过来的文章id
    const id=req.query.id;
    //根据id查询文章详细信息，并传递作者的详细信息
    let article1=await Article.findOne({_id:id}).populate('author');
     //查询文章当前所对应的评论信息
    let comments1=await Comment.find({aid:id}).populate('uid');
    //由于报错具体文章列表内容需要转换
    let str =JSON.stringify(article1);
    let str2=JSON.stringify(comments1);
    let article=JSON.parse(str);
    let comments=JSON.parse(str2);
   

    res.render('home/article.art',{article,comments});
}