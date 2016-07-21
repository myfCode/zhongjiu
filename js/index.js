//dom加载完成执行	
	$(document).ready(function(){
		
		//三级导航
		console.log($('.menu_two_ul>li').get());
		$('.menu_two_ul>li').hover(function(){
			$(this).find('.menu_three').show();
		},function(){
			$(this).find('.menu_three').hide();
		})



		//箭头初始位置
		$('.whiteWine .arrow').css('left',$('.whiteWine .title ul li:first').position().left+parseInt($('.whiteWine .title ul li:first').innerWidth() /2));
		$('.redWine .arrow').css('left',$('.redWine .title ul li:first').position().left+parseInt($('.redWine .title ul li:first').innerWidth() /2));
		$('.foreignWine .arrow').css('left',$('.foreignWine .title ul li:first').position().left+parseInt($('.foreignWine .title ul li:first').innerWidth() /2));
		$('.otherWine .arrow').css('left',$('.otherWine .title ul li:first').position().left+parseInt($('.otherWine .title ul li:first').innerWidth() /2));
		
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
				},300)
		},function(){
				$(this).stop().animate({
					'width':width,
					'height':height,
					'left':0,
					'top':0
				},300)
		})
	
		//品牌特卖换页
		$.ajax({
			type:'get',
			url:'../data/discount.json',
			success:function(data){
				$('.discountTitle a').click(function(){
					$(".discountTitle a").css({
						"color":"#666",
						"background":'#fff',
					})
					$(this).css({
						'color':'#fff',
						'background':'url(../img/icon_index.png) no-repeat',
						'background-position':"-320px -80px"
					})
					var discountId = $(this).attr("id");
					for(var i = 0 ; i < data[discountId].length ;i++){
						$(".discountContent ul li img").eq(i).attr({
							'src':data[discountId][i]
						})
					}
					
				})
			}
		})
		
	
		// 限时特购换页
		$.ajax({
			type:'get',
			url:'../data/timetobuy.json',
			success:function(data){
				// alert(1);
				$('.timeToBuyTitle a').click(function(){
					$(".timeToBuyTitle a").css({
						"color":"#666",
						"background":'#fff',
					})
					$(this).css({
						'color':'#fff',
						'background':'url(../img/icon_index.png) no-repeat',
						'background-position':"-320px -80px"
					})
					var timeToBuyId = $(this).attr("id");
					if (timeToBuyId == 'xiaqiyugao') {
						$('.buy').css('background',"#ccc")
					}else{
						$('.buy').css('background',"#b81c22")
					}
					for(var i = 0 ; i < data[timeToBuyId].src.length ;i++){
						$(".timeToBuyCont ul li img").eq(i).attr({
							'src':data[timeToBuyId].src[i]
						})
						$(".namePrice p").eq(i).text(data[timeToBuyId].name[i]);
						$('.namePrice span').eq(i).text(data[timeToBuyId].price[i]);
					}				
				})
			}
		})
	
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
	
			
		//白酒产品信息
		$.ajax({
			type:'get',
			url:"../data/whiteWine.json",
			success:function(data){
//				alert(1);
				$('.white_tab li').mouseover(function(){
					
					// 白酒arrow箭头
					var left = $(this).position().left+parseInt($(this).innerWidth() /2);
					// console.log(left);
					$('.whiteWine .arrow').css('left',left);
					//对应的产品信息更换
					var currentId = $(this).attr('id');
					// console.log(currentId);

					for (var i = 0 ; i < data[currentId].price.length;i++) {
						$(".white_cont_c .sales img").eq(i).attr({'src':data[currentId].sales[i]});
						$(".white_cont_c .wineImg").eq(i).attr({'src':data[currentId].wineImg[i]});
						$('.white_cont_c .details p').eq(i).text(data[currentId].name[i]);
						$('.white_cont_c .details span').eq(i).text(data[currentId].price[i]);
					}
			
				})
			},
			error:function(){
				alert("error");
			}
		})
		
		
		//红酒产品信息
		$.ajax({
			type:'get',
			url:"../data/redWine.json",
			success:function(data){
//				alert(1);
				$('.red_tab li').mouseover(function(){
					
					// 白酒arrow箭头
					var left = $(this).position().left+parseInt($(this).innerWidth() /2);
					// console.log(left);
					$('.redWine .arrow').css('left',left);
					//对应的产品信息更换
					var currentId = $(this).attr('id');
					// console.log(currentId);

					for (var i = 0 ; i < data[currentId].price.length;i++) {
						$(".redWine .sales img").eq(i).attr({'src':data[currentId].sales[i]});
						$(".redWine .wineImg").eq(i).attr({'src':data[currentId].wineImg[i]});
						$('.redWine .details p').eq(i).text(data[currentId].name[i]);
						$('.redWine .details span').eq(i).text(data[currentId].price[i]);
					}
			
				})
			},
			error:function(){
				alert("error");
			}
		})
		
		
		//洋酒产品信息
		$.ajax({
			type:'get',
			url:"../data/foreignWine.json",
			success:function(data){
//				alert(1);
				$('.foreign_tab li').mouseover(function(){
					
					// 白酒arrow箭头
					var left = $(this).position().left+parseInt($(this).innerWidth() /2);
					// console.log(left);
					$('.foreignWine .arrow').css('left',left);
					//对应的产品信息更换
					var currentId = $(this).attr('id');
					// console.log(currentId);

					for (var i = 0 ; i < data[currentId].price.length;i++) {
						$(".foreignWine .sales img").eq(i).attr({'src':data[currentId].sales[i]});
						$(".foreignWine .wineImg").eq(i).attr({'src':data[currentId].wineImg[i]});
						$('.foreignWine .details p').eq(i).text(data[currentId].name[i]);
						$('.foreignWine .details span').eq(i).text(data[currentId].price[i]);
					}
			
				})
			},
			error:function(){
				alert("error");
			}
		})
		
		//其他产品信息
		$.ajax({
			type:'get',
			url:"../data/otherWine.json",
			success:function(data){
//				alert(1);
				$('.other_tab li').mouseover(function(){
					
					// 白酒arrow箭头
					var left = $(this).position().left+parseInt($(this).innerWidth() /2);
					// console.log(left);
					$('.otherWine .arrow').css('left',left);
					//对应的产品信息更换
					var currentId = $(this).attr('id');
					// console.log(currentId);

					for (var i = 0 ; i < data[currentId].price.length;i++) {
						$(".otherWine .sales img").eq(i).attr({'src':data[currentId].sales[i]});
						$(".otherWine .wineImg").eq(i).attr({'src':data[currentId].wineImg[i]});
						$('.otherWine .details p').eq(i).text(data[currentId].name[i]);
						$('.otherWine .details span').eq(i).text(data[currentId].price[i]);
					}
			
				})
			},
			error:function(){
				alert("error");
			}
		})
		
		
	})


//页面加载完成才执行
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




})