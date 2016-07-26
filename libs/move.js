function move(dom,target,fn){
	clearInterval(dom.timer);
	dom.timer = setInterval (function(){
		var isOK = true;
		for(var attr in target){
			if(attr == 'opacity'){
				var current = Math.round(patseFloat(getStyle(dom,attr))*100);
			}else{
				var current = parseInt(getStyle(dom,attr));
			}
			if(current != target[attr]){
				isOK = false;
			}
			var dis = target[attr] - current;
			var speed = dis > 0 ? Math.ceil(dis/10):Math.floor(dis/10);
			if(attr == 'opacity'){
				dom.style[attr] = (current + speed)/100;
				dom.style.filter = 'alpha(opacity=' + (current + speed) + ')';
			}else{
				dom.style[attr] = (current + speed )+ 'px';
			}
		}
		if(isOK){
			clearInterval(dom.timer);
			if(fn){
				fn();
			}
			return;
		}
	},30)
}

function getStyle(dom,property){
	if(dom.currentStyle){
		return dom.currentStyle[property];
	}else{
		return getComputedStyle(dom)[property];
	}
}