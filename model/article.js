const mongoose=require('mongoose');

//创建文章集合规则
const articleSchema=new mongoose.Schema({
    title:{
        type:String,
        maxlength:20,
        minlength:4,
        required:[true,'请填写文章标题']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:  'User',
        required:[true,'请写入作者名称']
    },
    publishDate:{
        type: Date,
        default: Date.now
    },
    cover:{     //文章封面
        type:String,
        default: null
    },
    content:{   //文章内容
        type:String
    }
});
//创建集合
const Article=mongoose.model('Article',articleSchema);
//将集合规则作为模块成员进行导出
module.exports={
    Article
}