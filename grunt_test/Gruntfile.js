//包装函数
module.exports=function(grunt){
    //任务配置，所有插件的配置信息
	 grunt.initConfig({
         //获取package.json的信息
	   pkg:grunt.file.readJSON('package.json'),
         //压缩文件
	   uglify:{
	     options:{
		    stripBanners:true,
			banner:'/*!<%-pkg.name%>*/\n'     //压缩文件的第一句注释
		 },
		 build:{
		     src:'src/test.js',  //要压缩的文件
			 dest:'build/hyd.min.js'  //压缩后的文件名  不是在build文件下的？
		 }
	   },
	  //检查js文档
	   jshint:{
		build:['Gruntfile.js', 'src/**.js'],
		// test1:['Gruntfile.js'],
		// test2:['src/*.js'],  //不一定要build   怎么写都可以 只要符合js格式
		options:{                 //检查规则 一般都是规定的几个
			jshintrc:'.jshintrc'
		}
	 },
		 //我这里监听的是 src下面的所有js文件 一旦这些文件被修改  会立即执行 jshint uglify这两个插件（但是如果你该了插件内容 他执行的插件是原来的 除非你ctrl_c 重新grunt ）
	 watch:{
		build:{
			files:['src/**.js'],
			tasks:['jshint','uglify'],
			options:{spawn:false}
		}
	 },
	//复制文件
         copy:{
             build:{
                 files:[
                      {expend:true,cwd:'src/img',src:'**',dest:'bulid/img'}
                     ]
             }
         }

	 });

	 //加载插件  没有先后顺序
       grunt.loadNpmTasks('grunt-contrib-copy');
	   grunt.loadNpmTasks('grunt-contrib-watch');
	   grunt.loadNpmTasks('grunt-contrib-jshint');
	   grunt.loadNpmTasks('grunt-contrib-uglify');
    //告诉grunt当我们在终端中输入grunt时需要做什么(注意先后顺序)  如果不需要压缩 就不写uglify
	   grunt.registerTask('default',['jshint','copy','uglify']);




    // Contrib-jshint——javascript语法错误检查；
    //
    // Contrib-watch——实时监控文件变化、调用相应的任务重新执行；
    //
    // Contrib-clean——清空文件、文件夹；
    //
    // Contrib-uglify——压缩javascript代码
    //
    // Contrib-copy——复制文件、文件夹
    //
    // Contrib-concat——合并多个文件的代码到一个文件中
    //
    // karma——前端自动化测试工具

};