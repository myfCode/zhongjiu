$(function(){
	//登录退出用户信息
	if ($.cookie("current")) {
		$('.current').text($.cookie('current'));
		$('.userRegister').hide()
	}else{
		$('.userRegister').show();
		$('.quit').hide();
	}
	
	$('.quit').click(function(){
		$('.current').text("请登录");
		$(this).hide();
		$('.userRegister').show();
	})
	$('.last td').eq(1).css({
		"font-size":"20px",
		"color":"#de3a3a"
	})
	
	// 商品列表
	var goods = JSON.parse($.cookie('pay'));
	for(var i in goods){
		var html = '<tr id="'+i+'"><td><img src="'+goods[i].src
		+'" class="image"></td><td><span class="name">'+goods[i].name
		+'</span></td><td>￥<span class="price">'+goods[i].price
		+'</span></td><td><span class="num">'+goods[i].num
		+'</span></td><td>￥<span class="sum"></span></td></tr>'
		$('tbody').append(html);
	}
	var total = 0 ;
	$('.sum').each(function(){
		var sum = Number($(this).parent().parent().find('.price').text()) * Number($(this).parent().parent().find('.num').text());
		$(this).text(sum.toFixed(2));
		total += Number($(this).text());
	})
	
	$('.total').text(total.toFixed(2));
})
