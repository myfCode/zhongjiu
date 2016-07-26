$(function(){
	$('input').not(":button").focus(function(){
		$(this).css('borderColor',"pink");
	})
	$('input').blur(function(){
		$(this).css("borderColor","#e8e8e8");
	})
	// 获取cookie
	
	// 输入用户名
	$('.account').blur(function(){
		var users = $.cookie('user');
		console.log(users);
		var account = $(this).val();
		var has = true;
		if (users) {
			users=users.split(",");
			users.pop();
			for (var i = 0; i < users.length; i++) {
				var current = users[i].split(':');
				if (account == current[0]) {
					has = true;
					break;
				}else{
					has=false;
				}
			}
		}else{
			alert('该用户不存在，请注册！')
		}
			
		if (!has) {
			alert('该用户不存在，请注册！')
			return;
		}
	})
	// 点击登录
	$('.submit').click(function(e){
		e.preventDefault();
		// alert(1);
		var pwd = $(':password').val();
		// alert(pwd);
		var user = $(".account").val();
		// alert(user);
		// console.log(users);
		if (pwd==''&user=='') {
			alert('请输入用户名密码');
		}
		var users = $.cookie('user').split(",");
		users.pop();
		for (var i = 0; i < users.length; i++) {

			var userCurrent = users[i].split(":");
			// console.log(userCurrent);
			// alert(1);
			if(userCurrent[0]== user && userCurrent[1]==pwd){
				// alert(2);
				$.cookie("current","aaa",{expires:-1,path:"/"});
				$.cookie('current',userCurrent[0],{expires:1,path:"/"});
				// alert(3);
				// console.log($.cookie("current"));
				location.href='index.html';
				
			}
		}
	})
})
function isEmptyObject(obj){
	for(var i in obj){
		return false;
	}
	return true;
}