$(function(){
	// console.log(creatCode());
	$('.code li').each(function(){
		$(this).text(creatCode());
	});

	// 看不清换一张click事件
	// $('.test span').click(function(){
	// 	$('.code li').each(function(){
	// 		$(this).text(creatCode());
	// 	});
	// })
	// $('.code').click(function(){
	// 	$('.code li').each(function(){
	// 		$(this).text(creatCode());
	// 	});
	// })
	$('.test').on('click',$('.code,.test span'),function(){
		$('.code li').each(function(){
			$(this).text(creatCode());
		});
	})

	$('.button').click(function(){
		// e.preventDefault();
		// $(this).css('backgroundPosition','-34px -64px')
	})


})
function creatCode(){
	var num = Math.floor(Math.random()* 75+ 48);
	if ((num >=65&&num<=90)||(num >=97&&num<=122)||(num >=48 && num <=57)) {
		var codeNum = num;
		return String.fromCharCode(codeNum);
	}else{
		creatCode();
	}
}







