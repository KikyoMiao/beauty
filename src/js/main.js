(function(){
	var $ = function(id){
		return document.getElementById(id);
	};

	var ToBeauty = function(obj){
		var fc = 5;
		var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		window.Miao.Beauty(imgData,fc);
		ctx.putImageData(imgData, 0, 0);
		ctx.globalCompositeOperation="destination-over";
		ctx.drawImage(obj, 0, 0, canvas.width, canvas.height);
	};

	var SetCanvasSize = function(width,height){
		var scale = height / width;
		var defaultScale = defaultHeight / defaultWidth;
		if ( scale > defaultScale && height > defaultHeight ){
			height = defaultHeight;
			width = height / scale;
		}
		if ( scale > defaultScale && width > defaultWidth ){
			width = defaultWidth;
			height = width * scale;
		}
		canvas.width = width;
		canvas.height = height;
	};

	var DrawImage = function(obj){
		new SetCanvasSize(obj.width,obj.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(obj, 0, 0, canvas.width, canvas.height);
		new ToBeauty(obj);
	};

	var canvas        =    $('canvas'),
		drop          =    $('drop'),
		defaultWidth  =    480,
		defaultHeight =    360,
		ctx  		  =    canvas.getContext('2d');

	drop.addEventListener('drop',function(e){
		e.preventDefault();
		drop.innerHTML = '';
		var file = e.dataTransfer.files[0];
		var reader = new FileReader();
		reader.onload = function(e){
			var image = new Image();
			image.onload = function(){
				new DrawImage(this);
			};
			image.src = e.target.result;
		};
		reader.readAsDataURL(file);
	}, false);
    drop.addEventListener('dragover', function(e){
        e.preventDefault();
    }, false);
    drop.addEventListener('dragenter', function(e){
        e.preventDefault();
    }, false);

}());