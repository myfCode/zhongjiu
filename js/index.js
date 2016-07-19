$(window).load(function(){


// banner轮播图	
	var index = 0;
	var zIndex = 3;
	var bannerImgS = $('.banner ul li').size();
	// console.log(bannerImgS);
	var timer = null;
	clearInterval(timer);
	function bannerMove(){
		timer = setInterval(function(){
			// alert(1);
			if(index >= bannerImgS - 1){
				index = 0 ;
			}else{
				index++;
			}
			$('.banner ul li').eq(index).css('opacity',0.5);
			$('.bannerIndex span').removeClass('backChange');
			$('.bannerIndex span').eq(index).addClass('backChange');
			$('.banner ul li').eq(index).css('zIndex',zIndex++).animate({'opacity':1},500);
			//点击换图片
			$('.bannerIndex span').click(function(){
				// alert(1);
				$('.bannerIndex span').removeClass('backChange');
				$(this).addClass('backChange');
				index = $(this).index();
				$('.banner ul li').eq(index).css('zIndex',zIndex++).animate({'opacity':1},500);
				// console.log(index);
			})
			// console.log(index);
		},4000)
	}
	bannerMove();



//鼠标移入移出轮播图 
	$('.banner ul li').hover(function(){
		clearInterval(timer);
	},function(){
		bannerMove();
	})



// 轮播图上面数字居中
	var left = parseInt(($(window).width()-$('.bannerIndex').width())/2)
	// console.log(left);
	$('.bannerIndex').css('left',left);



// 品牌特卖,mouseenter图片变大;
	// 定义存取原始宽度高度
	var width=$('.discountContent ul li a img').eq(0).width();
	var height=$('.discountContent ul li a img').eq(0).height();
	//移入变大移出变小事件
	$('.discountContent ul li a img').hover(function(){
			$(this).stop().animate({
				'width':width+20,
				'height':height+20,
				'left':-20/2,
				'top':-20/2
			},500)
	},function(){
			$(this).stop().animate({
				'width':width,
				'height':height,
				'left':0,
				'top':0
			},500)
	})



// 限时特购
	// 限时特购倒计时
	var dateTimer = null;
	dateTimer = setInterval(function(){
		var date = new Date();
		var outDate = new Date(2016,6,29);
		var timeLeft = outDate - date;
		var day = parseInt(timeLeft / 1000 / 60 / 60 /24) ;
		var hour = parseInt((timeLeft - day * 24*60*60 *1000) / 1000 /60/60);
		var minute = parseInt((timeLeft - day * 24*60*60 *1000 - hour * 60 * 60 *1000) / 1000 /60);
		var second = parseInt((timeLeft - day * 24*60*60 *1000 - hour * 60 * 60 *1000 - minute * 60 * 1000) / 1000 );
		var html = '还剩'+day+'天'+hour+'时'+minute+'分'+second+'秒';
		// console.log(html);
		$('#timeLeft').text(html);

		if (timeLeft == 0) {
			clearInterval(dateTimer);
		}
	},300)
	



// 白酒arrow箭头
	$('.title ul li').mouseover(function(){
		var left = $(this).position().left+parseInt($(this).innerWidth() /2);
		// console.log(left);
		$('.arrow').css('left',left);
	})



})