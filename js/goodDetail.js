//dom加载完成执行	
	$(document).ready(function(){


		// 用户登录信息
		var current = $.cookie('current');
		if (current) {
			$('.user').html('欢迎用户'+current).css("color","#b81c22").append($("<a class='quit' href='javascript:;'>退出登录</a>"));
			$('.quit').css('marginLeft',20).click(function(){
				$('.user').html('<a href="login.html">请登录</a><a href="register.html" class="login_color">注册</a>');
			});

		}
		
		// cart购物车
		$('.cart').hover(function(){
			$('.cart_down').show();
			if($.cookie('myCart')){
				var myCart = JSON.parse($.cookie('myCart'));
				for(var i in myCart){
					var html = '<li><dl id="'+i+'"><dt><img src="'+myCart[i].src+'" class="cartImg"></dt><dd><p class="cartName">'+myCart[i].name
								+'</p><p><a href="javascript:;" class="cartRemove">删除</a><span class="cartPrice">￥'+myCart[i].price
								+'</span> X <span class="cartNum">'+myCart[i].num+'</span> </p></dd></dl></li>'
					$('.cartInfo').append(html);
					}
				}else{
					$('.cartEmpty').show().next().hide();
				}

			},function(){
			$('.cart_down').hide();
		})
		//从首页跳转至此页
		$.ajax({
			type:"get",
			url:"../data/whiteList.json",
			success:function(data){
				var goodId = $.cookie('goodId');
				// console.log(data[goodId]);
				$('.name').attr('id',goodId);
				$('.img,.showImg').attr("src",data[goodId].src);
				$('.name h2').text(data[goodId].name);
				$('.winePrice').text(data[goodId].price);
				// $.cookie("goodId","aaa",{expries:-1,path:"/"});
				var html='';
				for(var i = 0 ; i <data[goodId].images.length;i++ ){
					html += '<li><img src="'+data[goodId].images[i]+'" alt=""></li>'
				}
				var everyWidth = $('.det_mid_img ul li:first').outerWidth(true); 
				$('.det_mid_img ul').empty().append(html).css("width",i*everyWidth+1);
				// $('.img,.showImg').attr('src',data[goodId].src);
				$('.det_mid_img ul li:first').addClass('borderColor');
				$('.det_mid_img ul li').mouseover(function(){
					$('.det_mid_img ul li').removeClass("borderColor");
					$(this).addClass('borderColor');
					$('.img,.showImg').attr('src',$(this).find('img').attr('src'));
				});

				$('.leftBtn').click(function(){
					$('.det_mid_img ul').css('left',0);			
				})
				$('.rightBtn').click(function(){

					$('.det_mid_img ul').css('left',-$('.det_mid_img ul li:first').outerWidth(true)*4);
				})
			},
			error:function(){
				alert("error");
			}
		})
		
		//二级导航
		$('.menu_one').hover(function(){
			$('.menu_two').show();
		},function(){
			$('.menu_two').hide();
		})

		//三级导航
		// console.log($('.menu_two_ul>li').get());
		$('.menu_two_ul>li').hover(function(){
			$(this).find('.menu_three').show();
		},function(){
			$(this).find('.menu_three').hide();
		})

		// details中酒的放大镜

		$('.mask').hover(function(){
			//移入显示
			$('.squre,.show').show();
			$(this).mousemove(function(e){
				

				// 确定小方块的left、top定位
				var left = e.offsetX - parseInt($('.squre').outerWidth() /2)
			 	var top = e.offsetY - parseInt($('.squre').outerWidth()/2)
			 	$('.squre').css({
					'left':left,
					"top":top
				});
				// 计算百分比
				var rateX = left / ($('.mask').width() - $('.squre').outerWidth());
				var rateY = top / ($('.mask').height() - $('.squre').outerHeight());
				var X = parseInt(rateX * ($('.showImg').width() - $('.show').width()));
				var Y = parseInt(rateY * ($('.showImg').height() - $('.show').height()))
				$('.showImg').css({
					"left":-X,
					"top":-Y
				})
			})
		},function(){
			// 移除隐藏
			$('.squre,.show').hide();
		})
		
		

		// 热销排行榜
		$('.hot_list dt').mouseover(function(){
			$('.hot_list dd').hide();
			$('.hot_list dt').show();
			$(this).hide();
			$('.hot_list dd').eq($(this).index('.hot_list dt')).show();
		})


		//scanCode二维码
		$('.codeShow').hover(function(){
			$('.scanCode').show();
			$('.icon_mobile').css('background',"url(../img/icon_detail.png) no-repeat -300px -50px");
			$('.icon_move').css('background',"url(../img/icon_detail.png) no-repeat -350px -50px");
		},function(){
			$('.scanCode').hide();
			$('.icon_mobile').css('background',"url(../img/icon_detail.png) no-repeat -300px 0px");
			$('.icon_move').css('background',"url(../img/icon_detail.png) no-repeat -350px 0px");
		})

		// 吸顶，选项卡切换
		var top = $('.tab_box').offset().top;
		// console.log(top);
		$(window).scroll(function(){
			// console.log($(window).scrollTop());
			if (top <= $(window).scrollTop()) {
				$('.tab_box').css({
					"position":"fixed",
					'top':0,
					"zIndex":5
				});
			}else{
				$('.tab_box').css({
					'position':'static'
				})
			}
		})

		// 选项卡切换
		$('.tab li').click(function(){
			$('.tab li').removeClass('change');
			$(this).addClass('change');
			if ($(this).index() == 1) {
				$('.intro,.saleService').hide();
				$('.evalute').show();
			}else if($(this).index() == 2){
				$('.intro,.evalute').hide();
				$('.saleService').show();
			}else{
				$('.intro,.comments').show();
				$('.saleService').hide();
			}
		})
		
		//购物数量必须是数值
//		var goodNum = 0;
//		$('.num input').focus(function(){
//			goodNum = $(this).val();
//		})
//		$('.num input').blur(function(){
//			var value = $(this).val();
//			alert(typeof value);
//			if((typeof value) != "number"){
//				//alert("数量输入错误！");
//				$(this).val(goodNum);
//			}
//		})
		// 加入购物车
		$('.addCart,.addCart_tab').click(function(){
			var num = $('.num input').val();
			var myCart = $.cookie('myCart')? JSON.parse($.cookie('myCart')):{};
			var goodId = $('thead tr td').attr('id');
			if(goodId in myCart){
				myCart[goodId].num = num;
				$.cookie('myCart',JSON.stringify(myCart),{expires:30,path:"/"});
				// alert(1);
			}else{
				myCart[goodId] = {
					"name":$('.name').text(),
					"price":$('.winePrice').text(),
					"src":$('.img').attr('src'),
					"num":num
				}
				$.cookie('myCart',JSON.stringify(myCart),{expries:30,path:"/"});
			}
			// console.log(JSON.parse($.cookie('myCart')));
			$('.success').stop().show(800,function(){
				$(this).hide();
			});
		})
		// 立即购买
		$('.purchase').click(function(e){
			e.preventDefault();
			var num = $('.num input').val();
			//console.log(num);
			var myCart = $.cookie('myCart')? JSON.parse($.cookie('myCart')):{};
			var goodId = $('thead tr td').attr('id');
			if(goodId in myCart){
				myCart[goodId].num = num;
				$.cookie('myCart',JSON.stringify(myCart),{expires:30,path:"/"});
				// alert(1);
			}else{
				myCart[goodId] = {
					"name":$('.name').text(),
					"price":$('.winePrice').text(),
					"src":$('.img').attr('src'),
					"num":num
				}
				$.cookie('myCart',JSON.stringify(myCart),{expries:30,path:"/"});
			}
			// console.log(JSON.parse($.cookie('myCart')));
			location.href="myCart.html";
		})

		// 商品数量增加减少
		$('.increase').click(function(){
			var num = $('.num input').val();
			// console.log(num);
			num++;
			$('.num input').val(num);
		})
		$('.decrease').click(function(){
			var num = $('.num input').val();
			if (num == 0) {
				num = 0;
			}else{
				num--;
			}
			$('.num input').val(num);
		})
	})


