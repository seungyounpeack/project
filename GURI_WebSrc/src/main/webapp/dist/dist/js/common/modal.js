/*
소스코드: modal.js
*/

jQuery(function($){
    $(".show-modal-btn").click(function(e){
        
    	console.log("this : ", this)
        $(".modal").show("fade", {}, 200, function(){
            $(".modal-body").scrollTop(0);
            
            /*
            effect - http://api.jqueryui.com/effect/        
            ================================
            $(".modal-dialog").effect("slide",{direction:"down",distance:-100},200, function(){});
            */

            /*
            slideDown - http://api.jquery.com/slideDown/
            ================================
            slideDown은 effect와 동일하게 동작한다.
            주의점은 slideDown 사용시 해당 박스가 숨겨진 상태에 있어야 한다는 것이다.
            */
            $(".modal-dialog").slideDown(200,function(){} );
        } );
        

    });

    $(".log-btn-cancel").click(function(){
        //창을 닫은 후 다시 띄울때 동일하게 슬라이드를 적용하기 위해 숨깁니다.
        $(".modal-dialog").hide();
        //배경처리를 담당하는 박스에 fade 효과를 주어 사라지게 만듭니다.
        $(".modal").hide("fade", {}, 200, function(){} );
        
    });
});