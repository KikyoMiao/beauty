# 一键美肤功能--beauty #

----------
在allyoteam上看到一篇文章([http://www.alloyteam.com/2012/07/convert-picture-to-sketch-by-canvas/](http://www.alloyteam.com/2012/07/convert-picture-to-sketch-by-canvas/ "使用CANVAS把照片转换成素描画"))萌生了想写个美肤功能的念头
在度娘搜了一个ps教程 戳这里--->[http://jingyan.baidu.com/article/acf728fd18e8eef8e510a3c8.html](http://jingyan.baidu.com/article/acf728fd18e8eef8e510a3c8.html "PS快速美白照片")

然后~(￣▽￣)~* 我们来分析下功能--拆解步骤就是

1. 复制图层


2. 图层模式滤色


3. 高斯模糊


4. 透明度降至75%


5. 调整图片饱和度


第2点的滤色实现也较为简单
> 结果色 = 255 - 混合色的补色 * 基色补色 / 255

alloyteam上有高斯模糊的实现不多说了~~~ 详情戳代码

第4点主要就素降至透明度后的效果图层君要覆盖在背景层上，使用putImageData和drawImage都会完全覆盖掉其他的方法 然后搜啊搜~ 搜到了一个属性君 当当当~~ 就是

> ctx.globalCompositeOperation="destination-over";
> 
> w3school上的解释是在源图像上方显示目标图像。
>
> 当当当~~ 酱紫就搞定了图层分层的问题了喵~ ＞▽＜ 

(づ￣ 3￣)づ最后是关于饱和度的实现啦

- 首先要把rgb转为hsv --->o(╯□╰)o 因为人家只搜到rgb转hsv的转换方法啦

- 然后捏调整饱和度我调了一米米 大家可以根据需要来改数值

- 最后再转为rgb就好了喵~o( =∩ω∩= )m 