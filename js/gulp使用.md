## gulp 使用

### 1. 安装NodeJS

### 2. 安装Gulp环境
``` javascript
npm config set registry http://registry.cnpmjs.org/

npm install gulp –g
```
### 3. 项目中使用Gulp

	1.进入项目的适当位置（一般为根本目录或前端代码的最上层），运行安装本地Gulp环境，运行命令：
	2.安装css,js压缩的环境，运行命令：npm install gulp-minify-css gulp-uglify gulp-concat gulp-rename gulp-jshint del --save-dev
```
		1.css压缩 　　gulp-minify-css
		2.js压缩　　　gulp-uglify
		3.js合并　　　gulp-concat　
		4.重命名　　   gulp-rename
		5.js代码检测　 gulp-jshint　(或gulp-jslint)
		6.文件删除    del
```
	3.新建文件名为 gulpfile.js 文件，样本文件：
``` js
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');


//压缩css
gulp.task('minify_css',["clean"], function () {
    var cssSrc = ['./css/*.css'];

    return gulp.src(cssSrc)      //压缩的文件
        .pipe(concat('all.css'))    //合并所有css到all.css
        .pipe(gulp.dest('./main/css'))   //输出文件夹
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./main/css')); //执行压缩
});

//压缩js
gulp.task('minify_js',["clean"], function() {
    var jsSrc = ['./lib/*.js','!./lib/*.src.js'];

    return gulp.src(jsSrc)
        .pipe(concat('all.js'))    //合并所有js到all.js
        .pipe(gulp.dest('./lib'))    //输出all.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('./lib'));  //输出
});


//执行压缩前，先删除以前压缩的文件
gulp.task('clean', function() {
    return del(['./css/all.css', './css/all.min.css', './lib/all.js', './lib/all.min.js'])
});

// 默认任务
gulp.task('default', function(){
    gulp.run('minify_css', 'minify_js');
});

 ```

	> 4.根据业务需求修改 gulpfile.js

	> 5.直接运行gulp命令

	> 6.检查压缩文件，是否正常
```