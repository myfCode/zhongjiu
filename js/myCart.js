$(function(){
	$.cookie('pay',111,{
		expires:-1,
		path:"/"
	})
	////登录退出用户信息
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
	
	//购物数量必须是数值
//	var goodNum = 0;
//	$('.num').focus(function(){
//		goodNum = $(this).val()
//	})
//	$('.num').blur(function(){
//		var value = $(this).val();
//		//alert(value);
//		if((typeof value) != "number"){
//			//alert("数量输入错误！");
//			$(this).val(goodNum);
//		}
//	})
		
	// 我的购物车
	// console.log($.cookie('myCart'));
	var myCart = JSON.parse($.cookie('myCart'));
	if (!isEmptyObject(myCart)) {
		$('.cartEmpty').hide();
		$('.cart table').show();
		var myCart = JSON.parse($.cookie('myCart'));
		for(var i in myCart){
			var html = '<tr class="shopList" id="'+i+'"><td><input type="checkbox" name="goods"/></td><td><a href=""><img src="'+myCart[i].src
			+'" alt=""></a><a href="">'+myCart[i].name
			+'<span class="tips">[闪购商品]</span></a></td><td>￥<span class="price">'+myCart[i].price
			+'</span></td><td><span class="decrease"></span><input class="num" type="text" name="" value="'+myCart[i].num
			+'"><span class="increase"></span></td><td>￥<span class="sum">'+""
			+'</span></td><td><a href="">加入收藏夹</a><br /><a class="remove" href="javascript:;">移除</a></td></tr>'
			$('.cart tbody').append(html);
		}
	}else{
		$('.cartEmpty').show();
		$(".cart table").hide();
	}
	$('thead input').css({
		"margin":"5px",
		"vertical-align":"middle",
		"text-align":"center"
	})
	$('tbody tr td').has('img').css({
		"paddingLeft":"50px",
		"textAlign":"left"
	})

	// 全选
	$('thead tr th:first').click(function(){
		// alert('click');
		// console.log($(this).find('input').prop("checked"));
		// console.log($("thead input"));
		if (true == $(this).find('input').prop("checked")) {
			// alert(1);
			$('tbody tr td input[type="checkbox"]').prop("checked",true);
			total()
			
		}else if(false == $(this).find('input').prop("checked")){
			$('tbody tr td input[type="checkbox"]').prop("checked",false);
			total();
		}
	})

	// 勾选
	
	$('tbody tr td').has('input').click(function(){
		total();	
//		if($('tbody tr td').find('input[type="checkbox"]').prop('checked') == true){
//			$('thead tr input[type="checkbox"]').prop('checked',true);
//		}
	})
	

	// 商品数量增减及金额的变化
	$('.shopList').each(function(){
		sum($(this));
		$(this).find('.increase').click(function(){
			var num = $(this).prev().val();
			num++;
			$(this).prev().val(num);
			// alert($(this).prev().val());
			sum($(this).parent().parent());
		
			// 修改cookie中的商品数量
			var goodId=$(this).parent().parent().attr('id');
			var info = JSON.parse($.cookie('myCart'));
			info[goodId].num = num;
			$.cookie('myCart',JSON.stringify(info),{expires:30,path:"/"});
			// 勾选情况下修改总的商品数量和金钱
			if (true == $(this).parent().parent().find('input[type="checkbox"]').prop('checked')) {
				total();
			}
		})
		$(this).find('.decrease').click(function(){
			var num = $(this).next().val();
			num--;
			var goodId=$(this).parent().parent().attr('id');
			var info = JSON.parse($.cookie('myCart'));
			if (num == 0) {
				$(this).parent().parent().remove();
				var newInfo = {};
				for(var i in info){
					if (i != goodId) {
						newInfo[i] = info[i];
					}
				}
				$.cookie('myCart',JSON.stringify(newInfo),{expires:30,path:"/"});
			}else{
				$(this).next().val(num);
				sum($(this).parent().parent());
			}
			// 修改cookie中的商品数量
			info[goodId].num = num;
			$.cookie('myCart',JSON.stringify(info),{expires:30,path:"/"});
			// 勾选情况下修改总的商品数量和金钱
			if (true == $(this).parent().parent().find('input[type="checkbox"]').prop('checked')) {
				total();
			}
		})
		
	})

	// 手动改变数量值
	$('tbody tr td input[type="text"]').change(function(){
		sum($(this).parent().parent());
		// 修改cookie中的商品数量
		var goodId=$(this).parent().parent().attr('id');
		var info = JSON.parse($.cookie('myCart'));
		info[goodId].num = $(this).val();
		$.cookie('myCart',JSON.stringify(info),{expires:30,path:"/"});
	})


	// 点击移除
	$('.remove').click(function(){
		var goodId=$(this).parent().parent().attr('id');
		var info = JSON.parse($.cookie('myCart'));
		var newInfo = {}
		for(var i in info){
			if (i != goodId) {
				newInfo[i] = info[i];
			}
		}
		$.cookie('myCart',JSON.stringify(newInfo),{expires:30,path:"/"});
		$(this).parent().parent().remove();
		totalNum -= $(this).parent().parent().find('.num').val();
		if (totalNum == 0) {
			$('.cart table').hide();
			$('.cartEmpty').show();
		}
	})

	

})
function sum(selector){
	var num = selector.find('.num').val();
	var price = parseInt(selector.find('.price').text());
	var sum = num * price;
	sum = sum.toFixed(2);
	// console.log(sum);
	selector.find('.sum').text(sum);
}
function isEmptyObject(obj){
	for(var key in obj){
		return false;
	}
	return true;
}
function total (){
	var a = 0;
	$('.total').text(a.toFixed(2));
	$('.totalNum').text(0);
	$('tbody tr td').has('input[type="checkbox"]').each(function(){
		if (true == $(this).find('input[type="checkbox"]').prop('checked')) {
			var sum=Number($('.total').text())+Number($(this).parent().find('.sum').text());
			$('.total').text(sum.toFixed(2));
			var num = Number($(this).parent().find('input[type="text"]').val()) + Number($('.totalNum').text());
			$('.totalNum').text(num);
			// 设置pay cookie
			var info = $.cookie('pay')?JSON.parse($.cookie('pay')):{};
			var goodId = $(this).parent().attr('id');
			// console.log(goodId);
			var myCart = JSON.parse($.cookie('myCart'));
			info[goodId] = myCart[goodId];	
			$.cookie('pay',JSON.stringify(info),{expires:10,path:"/"});
			// console.log($.cookie('pay'));
		}
	})
}
