// banner轮播图
$(window).load(function(){
	var timer = null;
	var i = 1;
	var zIndex = 3;
	var bannerImgS = $('.banner ul li').size();
	clearInterval(timer);
	timer = setInterval(function(){
		// alert(1);
		$('.banner ul li').eq(i).css('opacity',0.5);

		$('.banner ul li').eq(i++).css('zIndex',zIndex++).animate({'opacity':1},500);
		if(i > bannerImgS){
			i = 0 ;
		}
	},4000)




})