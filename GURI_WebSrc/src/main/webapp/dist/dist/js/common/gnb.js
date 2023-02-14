$(function(){
	//gnb
	jQuery(".gnbL").mouseenter(function(e){		
		jQuery(".gnbL").stop().animate({height:199},200);
		jQuery(".gnbBg").stop().animate({height:111},200);
		jQuery(".gnbBg").css("border-bottom","1px solid #e0e0e0");
	}).focusin(function(){
		jQuery(".gnbL").mouseenter();
	})

	jQuery(".gnbL").mouseleave(function(e){		
		jQuery(".gnbL").stop().animate({height:45}, 200);
		jQuery(".gnbBg").stop().animate({height:0},200);
		jQuery(".gnbBg").css("border","none");
	}).focusout(function(){
		jQuery(".gnbL").mouseleave();
	})

	jQuery(".gnbBg").mouseenter(function(e){		
		jQuery(".gnbL").stop().animate({height:169},200);
		jQuery(".gnbBg").stop().animate({height:111},200);
		jQuery(".gnbBg").css("border-bottom","1px solid #e0e0e0");
	}).focusin(function(){
		jQuery(".gnbL").mouseenter();
	})

	jQuery(".gnbBg").mouseleave(function(e){		
		jQuery(".gnbL").stop().animate({height:45}, 200);
		jQuery(".gnbBg").stop().animate({height:0},200);
		jQuery(".gnbBg").css("border","none");
	}).focusout(function(){
		jQuery(".gnbL").mouseleave();
	})
});
