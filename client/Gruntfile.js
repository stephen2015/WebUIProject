/**
 * Created by Stephen on 2016/3/20.
 */
module.exports = function (grunt) {
    //livereload的默认端口号
    var LIVERELOAD_PORT = 35729;
    //使用connect-livereload模块，生成一个liverelaod脚本
    var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
    //使用middleware（中间件），就必须关闭livereload的浏览器插件
    var serveStatic = require("serve-static");
    var serveIndex = require("serve-index");
    var lrMiddleware = function (connect, options, middlewares) {
        return [
            lrSnippet, //把脚本注入到静态文件中
            serveStatic(options.base[0]), //静态文件服务其的路径
            serveIndex(options.base[0])//启用目录浏览
        ];
    };
    var cfg = {
        serverHost: 'localhost',
        serverPort: 8200,
        livereload: LIVERELOAD_PORT
    };
    //配置Grunt各种模块的参数
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        cfg: cfg,
        //compass编译
        compass: {
            development: {
                options: {
                    sassDir: 'styles/**/*.sass',
                    cssDir: 'styles/**/*.css'
                }
            }
        },
        connect: {
            options: {
                port: cfg.serverPort,
                hostname: cfg.serverHost,
                //项目根目录
                base: '.'
            },
            livereload: {
                options: {
                    //通过livereload脚本，让页面重新加载
                    middleware: lrMiddleware
                }
            }
        },
        open: {
            server: {
                url: "http://localhost:" + cfg.serverPort
            }
        },
        //grunt watch
        watch: {
            compass: {
                files: 'styles/**/*.sass',
                tasks: ['compass']
            },
            client: {
                options: {
                    livereload: true
                },
                files: [
                    "index.html",
                    "views/**/*.html",
                    "scripts/**/*.js",
                    "styles/**/*.css",
                    "images/*.{png,jpg,jpeg,gif,svg}"
                ]
            }
        }
    });
    //从node_modules目录加载模块文件
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //每行registerTask定义一个任务
    grunt.registerTask('default', ['compass', 'connect', 'open', 'watch']);
};
