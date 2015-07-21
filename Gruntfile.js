// 包装函数
module.exports = function(grunt){

	// LiveReload的默认端口号，你也可以改成你想要的端口号
    var lrPort = 35729;
    // 使用connect-livereload模块，生成一个与LiveReload脚本
    // &lt;script src=&quot;http://127.0.0.1:35729/livereload.js?snipver=1&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
    var lrSnippet = require('connect-livereload')({ port: lrPort });
    // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
    var lrMiddleware = function(connect, options) {
        return [
            // 把脚本，注入到静态文件中
            lrSnippet,
            // 静态文件服务器的路径
            connect.static(options.base[0]),
            // 启用目录浏览(相当于IIS中的目录浏览)
            connect.directory(options.base[0])
        ];
    };

	//任务配置,所有插件的配置信息
	grunt.initConfig({

		//获取 package.json 的信息
		pkg : grunt.file.readJSON('package.json'),

		// uglify插件的配置信息
		uglify : {
			options: {
				report: "min",
				stripBanners : true,
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			buildA : {
				files: {
	                'build/main.min.js': ['src/js/main.js']
	            }
            },
            buildB : {
                files: {
                    'build/beauty.min.js': ['src/js/beauty.js']
                }
            }
		},


		//jshint插件的配置信息
		jshint : {
			build: ['Gruntfile.js', 'src/js/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		// 通过connect任务，创建一个静态服务器
		connect: {
            options: {
                // 服务器端口号
                port: 8686,
                // 服务器地址(可以使用主机名localhost，也能使用IP)
                hostname: '*',
                // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                base: '.'
            },
            livereload: {
                options: {
                    // 通过LiveReload脚本，让页面重新加载。
                    middleware: lrMiddleware
                }
            }
        },

        watch : {
        	client: {
                // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
                options: {
                    livereload: lrPort
                },
                // '**' 表示包含所有的子目录
                // '*' 表示包含所有的文件
                files: ['src/js/*', 'src/css/*', '*.html','Gruntfile.js'],
				tasks: ['jshint', 'uglify'],
            }
		}

	});

	// 告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// 告诉grunt当我们在终端中输入grunt时需要做些什么(注意先后顺序)
	grunt.registerTask('default', ['jshint','uglify','connect','watch']);
};