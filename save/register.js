$(function(){
	// console.log(creatCode());
	var info = '';
	$('input').not(":button").focus(function(){
		$(this).css('borderColor',"pink");
	})
	$('input').blur(function(){
		$(this).css("borderColor","#e8e8e8");
	})
	var login = {};
	// 手机号验证
	// var userName = null;
	var phoneNum = '';
	$('.telNum').blur(function(){
		var num = $(this).val();
		// console.log(typeof num);
		var pattern = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
		// alert(1);
		// console.log(pattern.test(num));
		if (num == '') {
			alert('请输入手机号码');
			return;
		}else if (!pattern.test(num)) {
			alert('手机号输入错误，请重新输入！');
			return;
		}
		var users=$.cookie('user');
		if(users){
			users = users.split(',');
			users.pop();
			for(var j = 0 ; j < users.length ; j++){
				var usn = users[j].split(':');
				if (usn[0] == num) {
					alert('该手机号已经注册，请输入正确的手机号码！')
					return ;
				}
			}
			
		}
			
		login.telNum = num;
		phoneNum = num;
	})


	var codeStr = '';
	$('.test').on('click','.next,.code',function(){
		var codeTest = [];
		$('.code li').each(function(){
			var codeTmp = creatCode();
			$(this).text(codeTmp);
			codeTest.push($(this).text());
			console.log(codeTest);
		});
		console.log(codeTest);
		codeStr = codeTest.join('').toLowerCase();
		// console.log(codeStr);
	})

	// 验证码验证
	var codeVal = '';
	$('.test input').blur(function(){
		codeVal = $(this).val().toLowerCase();
		if (codeVal != codeStr ) {
			alert('验证码输入错误！');
			return;
		}
		login.codeTest = true;
	})

	
	// 密码验证
	var passWord = '';
	$(':password').eq(0).blur(function(){
		var pwd = $(this).val();
		var pattern = /^[0-9a-zA-Z]{6,12}$/
		if (pwd == '') {
			alert('请输入密码');
			return ; 
		}else if (pwd.length < 6) {
			alert('密码必须大于6位，请重新输入！')
			return;
		}
		if (!pattern.test(pwd)) {
			alert('密码必须是6~12位数字字母组成，请重新输入！')
			return;
		}
		passWord = pwd;
		// console.log(passWord);
	})

	// 确认密码
	$(':password').eq(1).blur(function(){
		var confirmPwd = $(this).val();
		if (confirmPwd == '') {
			alert('请输入确认密码');
			return;
		}else if(confirmPwd != passWord){
			alert("两次密码输入不一致，请重新输入！");
			return;
		}
		login.password = passWord;

	})

	// 获取手机验证码按钮点击，北京变色
	$('.button').click(function(){
		// e.preventDefault();
		$(this).css({
			'backgroundPosition':'-56px -260px',
			"color":'#ccc'
		});

	})

	// 提交按钮点击
	$(':submit').click(function(e){
		e.preventDefault();
		var isOk = true;
		if(phoneNum == ''){
			alert('请输入手机号码');
			return;
		}else if(codeVal == ''){
			alert('请输入验证码');
			return;
		}else if(passWord == ''){
			alert('请输入密码');
			return;
		}
		
		for(var i in login){
			// alert(1);
			// console.log(login[i]);
			var boolean = Boolean(login[i]);
			if (!boolean) {
				isOk = false;
			}
		}
		
		
		if (isOk) {
			alert('注册成功');
			console.log(login);
			info += login.telNum +":"+ login.password+',';
			// console.log(info);
			// $.cookie("user",info,{expires:30,path:"/"});
			$.cookie("user",info,{expries:30,path:"/"});
			// console.log($.cookie("user"));
			location.href="login.html";
		}else{
			alert('注册失败');
		}
	})



})





function creatCode(){
	var num = Math.floor(Math.random()* 75+ 48);
	if ((num >=65&&num<=90)||(num >=97&&num<=122)||(num >=48 && num <=57)) {
// 		 console.log(String.fromCharCode(num));
		return String.fromCharCode(num);
	}else{
		return creatCode();
	}
}







