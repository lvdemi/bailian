// 给gulp编写任务
//1、引入一个gulp对象
const gulp = require("gulp");
/* 
    第一个参数，任务的名字
    第二个参数，回调函数
*/
/* 
    gulp.src()  源路径
    gulp.dest() 目的路径
    pipe()   理解管道
*/
/* 拷贝.html文件 */
gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload());
})
/* 
    拷贝图片
*/
gulp.task("images", function(){
    return gulp.src("img/**/*")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

gulp.task("data", function(){
    return gulp.src("json/*.json")
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})
/* 
    js代码  jquery 不能压缩
*/
gulp.task("scripts", function(){
    return gulp.src(["*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})
//一次性执行多个任务
gulp.task("build", ["copy-html","images","data", "scripts","sass"], function(){
    console.log("项目建立成功");
})

const sass = require('gulp-sass');
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task('sass', function(){
    return gulp.src("stylesheet/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());

})

//监听
 /* 
        第一个参数，监听文件的路径
        第二个参数，文件发生变化以后执行的任务，必须是数组
    */
gulp.task("watch", function(){
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("img/**/*", ["images"]);
    gulp.watch("json/*.json", ["data"]);
    gulp.watch(["*.js", "!gulpfile.js"], ["scripts"]);
    gulp.watch("stylesheet/*.scss", ['sass']);
})

const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "dist",//指定根目录
        port: 8888,
        livereload: true//设置实时刷新
    })
})

//同时启动监听和服务
gulp.task("default", ["watch", "server"]);