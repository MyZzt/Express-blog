const formidable=require('formidable');
const { readFile } = require('fs');
const path=require('path');
const {Article}=require('../../model/article');

module.exports=(req,res)=>{
    //创建表单解析对象
    //配置上传文件的地址
    //保留上传文件的后缀(true)(不保留则是false)
    const form=formidable({multiples:true,
                           uploadDir:path.join(__dirname,'../','../','public','uploads'),
                           keepExtensions:true
                         });
    //解析表单
    form.parse(req, async (err,fields,files)=>{
        //err:错误对象--如果表单解析失败，err解析错误信息，如果成功则err是null
        //fields：对象，保存普通表单数据
        //files: 对象,保存了和上传文件相关的数据
       await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.filepath.split('public')[1],//保留public之后的路径
            content: fields.content
        });
        //console.log(files.cover.filepath.split('public')[1]);
        //完成后返回文章列表
        res.redirect('/admin/article');
      
    });
    
}