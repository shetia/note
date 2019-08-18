var http = require('http');
var cheerio = require('cheerio');
http.get('http://tuijian.hao123.com/hotrank',function(res){
    var data = '';
    res.on('data',function(chunk){
        data += chunk;
    });
    res.on('end',function(){
        filter(data);
    })
});
function filter(data){
    //保存各部分搜索量前10的名称
    //对象名为榜单名，如'实时热点'
    //对象内容为10个标题名称组成的数组
    var result = {};
    //将页面源代码转换为$对象
    var $ = cheerio.load(data);
    //查找'实时热点'、'今日热点'、'民生热点'、'电影'、'电视剧'、'综艺'这6个榜单所在的div
    var temp_div = $('.top-wrap');
    //保存榜单名称
    var temp_title = [];
    temp_div.each(function(index,item){
        //查找榜单名，并保存到temp_title文件夹中
        temp_title.push($(item).find('h2').text());
        //查找每类下每个标题的外层div
        var temp_arr = $(item).find('.point-bd').find('.point-title');
        //将result下的每个榜单初始化为一个数组
        var innerResult = result[temp_title[index]] = [];
        //将节目标题依次保存到相应榜单的数组中
        temp_arr.each(function(_index,_item){
            innerResult.push($(_item).text())
        })
    })
    console.log(result);
}