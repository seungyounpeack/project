var loading = $.loading();
$(function(){
	
	var nowZoom = 50;
	
	$("dd").on("click", "a", function() {
		
		var menuItem = $(this);
		// Content 영역에 표시할 화면을 Load 한다
		var menuParam = menuItem.attr("menucode");
		//$("#divLoading").show();
		Util.loadContentPage(menuParam);
	});
	
	function zooms() {
	   document.body.style.zoom = nowZoom + "%";
	   //{margin:0 327px 0 432px !important}
	   var left = 327;
	   var right = 432;
	   //$(".mn02").css("margin", "0 "+left+"px 0 "+right+"px !import");
	   /*if(nowZoom == 70) {
	      alert("더 이상 축소할 수 없습니다.");   // 화면 축소율이 70% 이하일 경우 경고창
	   }
	   if(nowZoom == 200) {
	      alert("더 이상 확대할 수 없습니다.");   // 화면 확대율이 200% 이상일 경우 경고창
	   }*/
	}
	zooms();
	
	function fn_deptClick(){
		$(".show-modal-btn").click(function(e){
	        
			/*var tag = document.getElementsByClassName('b_yellow');
			var cnt = document.getElementsByClassName('b_yellow').length;
			for( var i = 0 ; i < tag.length; i++){
				$(tag[i]).removeClass("on");
			}
	    	if($(this).hasClass("on")){
				$(this).removeClass("on");
			}else{
				  $(this).addClass("on");
				  fn_getSubOrganization(this);
				  
			}*/
			fn_getSubOrganization(this);
	        $(".modal_02").show("fade", {}, 200, function(){
	            $(".modal_body_02").scrollTop(0);
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
	            $(".modal_dialog_02").slideDown(200,function(){} );
	        } );
	        

	    });
		
		/*$('dt.b_yellow').click(function() {
			var tag = document.getElementsByClassName('b_yellow');
			var cnt = document.getElementsByClassName('b_yellow').length;
			for( var i = 0 ; i < tag.length; i++){
				$(tag[i]).removeClass("on");
				if( tag[i] == this  ) {
					//$(this).addClass("on");
					//$('.pollSlider').animate({"margin-right": '-='+slider_width},'slow','easeInQuart');
				}
			}
			//$(this).addClass("on");
			if($(this).hasClass("on")){
				$(this).removeClass("on");
				//$('.pollSlider').animate({"margin-right": '-='+slider_width},'slow','easeInQuart');
			}else{
				  $(this).addClass("on");
				  fn_getSubOrganization(this);
				  if( parseInt($('.modal').css("margin-right").replace('px','')) > -200 ) {
					  //$('.pollSlider').animate({"margin-right": '+='+slider_width},'slow','easeInQuart');
				  }else{
					  //fn_subOrganization();
					  $('.modal').animate({"margin-right": '+='+slider_width},'slow','easeInQuart');
				  }
				  
				 // $('.pollSlider').animate({"margin-right": 0},'slow','easeInQuart');
				  //$('.pollSlider').animate({"margin-right": '+='+slider_width},'slow','easeInQuart');
			}	  
				  

		  });*/
	}
	
	
	
	//조직도 데이터 넣기
	function initData(){
		Util.request("/dashBoard/organization/selectOrganization.do", null, function(resultData){
			console.log("data : ", resultData.data)
			
			//조직도 생성 함수 호출
			fn_createOrganization(resultData.data);
			fn_deptClick()
		});
	}

	initData();
	
	
	//하위 조직도 생성 함수 
	/*function fn_subCreateOrganization(data){
		
		})
	}*/
	
	//조직도 생성 함수 호출
	function fn_createOrganization(data){
		var htmlDepth1 = '';
		var htmlDepth2 = '';
		var htmlDepth3 = '<p class="branch_vertical">세로연결선</p><p class="branch_line mn02">가로연결선</p>';
		var htmlSort1 = '';
		var htmlSort2 = '';
		var htmlSort3 = '';
		var htmlSort4 = '';
		var htmlSort5 = '';
		var htmlSort6 = '';
		var list1 = [];
		var list2 = [];
		var list3 = [];
		var list4 = [];
		var list5 = [];
		var list6 = [];
		var list7 = [];
		var cnt1 = 0;
		var cnt2 = 0;
		var cnt3 = 0;
		var cnt4 = 0;
		var cnt5 = 0;
		var cnt6 = 0;
		var cnt7 = 0;
		var cnt8 = 0;
		/*
		data.forEach(function(item,index){
			if( item.sortLvl == '1' ){
				list1.push(item);
			}else if( item.sortLvl == '2' ){
				list2.push(item);
			}else if( item.sortLvl == '3' ){
				list3.push(item);
			}else if( item.sortLvl == '4' ){
				list4.push(item);
			}else if( item.sortLvl == '5' ){
				list5.push(item);
			}else if( item.sortLvl == '6' ){
				list6.push(item);
			}else if( item.sortLvl == '7' ){
				list7.push(item);
			}
		})*/
		
		data.forEach(function(item,index){
			var imgPath = 'http://105.3.10.31:3100/ntis/ubiportal/files/org/';
			var imgNm = item.imgUrl;
			if(imgNm == undefined || imgNm == '')  {
				imgPath = '/dist/images/organ/';
				imgNm = 'man_pic.png';
			}
			if( item.sortLvl == '6' ){
				
				if( item.rankLvl == '4' ){
					htmlSort5 += '<div class="secretary_all"><p class="connect_line loc_left">연결선</p><div class="secretary_area">';
					node = item.node;
					/*if( cnt6 > 0 ) {
						htmlSort5 += '</div>';
						htmlSort5 += '</div>';
						htmlSort5 += '</div>';
					}*/
					htmlSort5 += '<div class="dept01_1">';
					htmlSort5 += '<dl class="name_box">';
					//htmlSort5 += '<dt class="b_yellow">비서실장</dt>';
					htmlSort5 += '<dt class="b_yellow"  style ="cursor: pointer;">';
					htmlSort5 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
					htmlSort5 += '<span class="b_yellow name_part">' + item.deptRankName + '</span>'; 
					htmlSort5 += '</dt>';
					htmlSort5 += '<a class="openPop" href="#">';
					htmlSort5 += '<dd>';
					htmlSort5 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
					htmlSort5 += '<span class="org_name">' + item.userNm + '</span>';
					htmlSort5 += '</dd>';
					htmlSort5 += '</dl>';
					htmlSort5 += '</div>';
					htmlSort5 += '</a>';
					if( item.count == '1' ){
						
						htmlSort5 += '<div class="below_area d_only">';
					}else{
						
						htmlSort5 += '<div class="below_area">';
					}
					htmlSort5 += '<p class="branch_vertical">세로연결선</p>';
					htmlSort5 += '<p class="branch_line">가로연결선</p>';
					
					/*for( var i = 0 ; i < data.length; i++ ){
						if( data[i].parentNode == item.node ) cnt6 += 1;
					}*/
					//if( cnt6 > 1 ){
					/*if( item.count > 1 ){	
						htmlSort5 += '<p class="branch_vertical">세로연결선</p>';
					}*/
					
				}else if( item.rankLvl == '5' || item.deptRankName == '비서실 업무'  ){
					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){
							
							htmlSort5 += '<div class="dept01_1_2">';
							htmlSort5 += '<dl class="name_box">';
							htmlSort5 += '<dt class="b_orange"  style ="cursor: pointer;">';
							htmlSort5 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlSort5 += '<span class="b_orange name_part">' + item.deptRankName + '</span>'; 
							htmlSort5 += '</dt>';
							htmlSort5 += '<a class="openPop" href="#">';
							htmlSort5 += '<dd>';
							htmlSort5 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlSort5 += '<span class="org_name">' + item.userNm + '</span>';
							htmlSort5 += '</dd>';
							htmlSort5 += '</dl>';
							htmlSort5 += '</div>';
							htmlSort5 += '</a>';
						}
					}
					
					htmlSort5 += '</div>';
					htmlSort5 += '</div>';
					htmlSort5 += '</div>';
					htmlSort5 += '<p class="branch_vertical hg150">하위단 잇는 하단 세로연결선</p>';
					
				}
			}else if( item.sortLvl == '7' ){
				
				if( item.rankLvl == '4' ){
					htmlSort6 += '<div class="inspection_all"><p class="connect_line loc_right">연결선</p><div class="inspection_area">';
					node = item.node;
					
					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){
							htmlSort6 += '<div class="dept01_1">';
							htmlSort6 += '<dl class="name_box">';
							//below_area d_only
							//htmlSort5 += '<dt class="b_yellow">비서실장</dt>';
							htmlSort6 += '<dt class="b_yellow"  style ="cursor: pointer;">';
							htmlSort6 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlSort6 += '<span class="b_yellow name_part">' + item.deptRankName + '</span>'; 
							htmlSort6 += '</dt>';
							htmlSort6 += '<a class="openPop" href="#">';
							htmlSort6 += '<dd>';
							htmlSort6 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlSort6 += '<span class="org_name">' + item.userNm + '</span>';
							htmlSort6 += '</dd>';
							htmlSort6 += '</dl>';
							htmlSort6 += '</div>';
							htmlSort6 += '</a>';
							htmlSort6 += '<div class="below_area">';
							htmlSort6 += '<p class="branch_vertical">세로연결선</p>';
							htmlSort6 += '<p class="branch_line">가로연결선</p>';
							cnt7 += 1;
							
							
							if( cnt7 == 1 ) {
								//htmlSort6 += '</div>';
								
							}
							
						}
						
						//htmlSort6 += '</div>';
						//htmlSort6 += '</div>';
					}
					
				}else if( (item.rankLvl == '5' || item.deptRankName == '비서실 업무' ) ){
					
					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){
							
							htmlSort6 += '<div class="dept01_1_2">';
							htmlSort6 += '<dl class="name_box">';
							//htmlSort5 += '<dt class="b_orange">행정비서</dt>';
							htmlSort6 += '<dt class="b_orange"  style ="cursor: pointer;">';
							htmlSort6 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlSort6 += '<span class="b_orange name_part">' + item.deptRankName + '</span>'; 
							htmlSort6 += '</dt>';
							htmlSort6 += '<a class="openPop" href="#">';
							htmlSort6 += '<dd>';
							htmlSort6 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlSort6 += '<span class="org_name">' + item.userNm + '</span>';
							htmlSort6 += '</dd>';
							htmlSort6 += '</dl>';
							htmlSort6 += '</div>';
							htmlSort6 += '</a>';
						}
					}
					
				}
			}else if( item.sortLvl == '1' ){
				if( item.rankLvl == '1' ){
					htmlDepth1 += '<div class="dept01">';
					htmlDepth1 += '<dl class="name_box">';
					htmlDepth1 += '<dt class="b_blue"  style ="cursor: pointer;">';
					htmlDepth1 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
					htmlDepth1 += '<span class="b_blue name_part">' + item.deptRankName + '</span>'; 
					htmlDepth1 += '</dt>';
					//htmlDepth1 += '<dt class="b_blue">' + item.deptRankName + '</dt>';
					htmlDepth1 += '<a class="openPop" href="#">';
					htmlDepth1 += '<dd>';
					htmlDepth1 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
					htmlDepth1 += '<span class="org_name">' + item.userNm + '</span>';
					htmlDepth1 += '</dd>';
					htmlDepth1 += '</dl>';
					htmlDepth1 += '</div>';
					htmlDepth1 += '</a>';
					
				}else if( item.rankLvl == '2' ){
					
					htmlDepth2 += '<div class="dept02">';
					htmlDepth2 += '<dl class="name_box" style="position: relative; z-index:1">';
					htmlDepth2 += '<dt class="b_blgreen"  style ="cursor: pointer;">';
					htmlDepth2 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
					htmlDepth2 += '<span class="b_blgreen name_part">' + item.deptRankName + '</span>'; 
					htmlDepth2 += '</dt>';
					//htmlDepth2 += '<dt class="b_blgreen">' + item.deptRankName + '</dt>';
					htmlDepth2 += '<a class="openPop" href="#">';
					htmlDepth2 += '<dd>';
					htmlDepth2 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
					htmlDepth2 += '<span class="org_name">' + item.userNm + '</span>';
					htmlDepth2 += '</dd>';
					htmlDepth2 += '</dl>';
					htmlDepth2 += '</div>';
					htmlDepth2 += '</a>';
				}else if( item.rankLvl == '3' ){
					if( cnt1 > 0 ) {
						htmlDepth3 += '</div>';
						htmlDepth3 += '</div>';
					}
					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){
							htmlDepth3 += '<div class="bureau fst_chd">';
							htmlDepth3 += '<p class="branch_vertical">세로연결선</p>';
							htmlDepth3 += '<div class="dept03">';
							htmlDepth3 += '<dl class="name_box">';
							htmlDepth3 += '<dt class="b_green"  style ="cursor: pointer;">';
							htmlDepth3 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlDepth3 += '<span class="b_green name_part">' + item.deptRankName + '</span>'; 
							htmlDepth3 += '</dt>';
							//htmlDepth3 += '<dt class="b_green">' + item.deptRankName + '</dt>';
							htmlDepth3 += '<a class="openPop" href="#">';
							htmlDepth3 += '<dd>';
							htmlDepth3 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlDepth3 += '<span class="org_name">' + item.userNm + '</span>';
							htmlDepth3 += '</dd>';
							htmlDepth3 += '</dl>';
							htmlDepth3 += '</div>';
							htmlDepth3 += '<div class="below_area">';
							htmlDepth3 += '<p class="branch_vertical">세로연결선</p>';
							htmlDepth3 += '<p class="bureau_line">가로연결선</p>';
							htmlDepth3 += '</a>';
							cnt1 += 1;
						}
					}
				}else if( item.rankLvl == '4' && item.deptRankName !='감사담당관담당관'  ){

					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){
							var telNo = item.telNo.substr(item.telNo.length-4,4);
							
							htmlDepth3 += '<div class="dept04">';
							htmlDepth3 += '<p class="branch_vertical">세로연결선</p>';
							htmlDepth3 += '<dl class="name_vbox">';
							htmlDepth3 += '<dt class="show-modal-btn"  style ="cursor: pointer;">';
							htmlDepth3 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlDepth3 += '<span class="b_yellow name_part">' + item.deptRankName + '</span>'; 
							htmlDepth3 += '</dt>';
							htmlDepth3 += '<a class="openPop" href="#">';
							htmlDepth3 += '<dd>';
							htmlDepth3 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlDepth3 += '<span class="org_name">' + item.userNm + '</span>';
							htmlDepth3 += '<span class="org_name" style="font-size: 12px;">' + telNo + '</span>';
							htmlDepth3 += '</dd>';
							htmlDepth3 += '</dl>';
							htmlDepth3 += '</div>';
							htmlDepth3 += '</a>';
							
						}
					}
				}
			}else if(  item.sortLvl == '2'  ){
				if(  item.rankLvl == '3' ){
					if( cnt2 > 0 ) {
						htmlSort1 += '</div>';
						htmlSort1 += '</div>';
					}
					
					if( item.deptRankName == item.userNm ){
						
						htmlSort1 += '<p class="title_box">' + item.deptRankName + '</p>';
					}else{
						for( var i = 0 ; i < item.path.length; i++ ){
							if( item.path[i] == item.parentNode ){
								htmlSort1 += '<div class="bureau">';
								htmlSort1 += '<p class="branch_vertical">세로연결선</p>';
								htmlSort1 += '<div class="dept03">';
								htmlSort1 += '<dl class="name_box">';
								htmlSort1 += '<dt class="b_green"  style ="cursor: pointer;">';
								htmlSort1 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
								htmlSort1 += '<span class="b_green name_part">' + item.deptRankName + '</span>'; 
								htmlSort1 += '</dt>';
								//htmlSort1 += '<dt class="b_green">' + item.deptRankName + '</dt>';
								htmlSort1 += '<a class="openPop" href="#">';
								htmlSort1 += '<dd>';
								htmlSort1 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
								htmlSort1 += '<span class="org_name">' + item.userNm + '</span>';
								htmlSort1 += '</dd>';
								htmlSort1 += '</dl>';
								htmlSort1 += '</div>';
								htmlSort1 += '<div class="below_area">';
								htmlSort1 += '<p class="branch_vertical">세로연결선</p>';
								htmlSort1 += '<p class="bureau_line">가로연결선</p>';
								htmlSort1 += '</a>';
								cnt2 += 1;
							}
						}
					}
				}else if( item.rankLvl == '4' ){ 

					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){
							var telNo = item.telNo.substr(item.telNo.length-4,4);
							
							htmlSort1 += '<div class="dept04">';
							htmlSort1 += '<p class="branch_vertical">세로연결선</p>';
							htmlSort1 += '<dl class="name_vbox">';
							htmlSort1 += '<dt class="show-modal-btn"  style ="cursor: pointer;">';
							htmlSort1 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlSort1 += '<span class="b_yellow name_part">' + item.deptRankName + '</span>'; 
							htmlSort1 += '</dt>';
							htmlSort1 += '<a class="openPop" href="#">';
							htmlSort1 += '<dd>';
							htmlSort1 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlSort1 += '<span class="org_name">' + item.userNm + '</span>';
							htmlSort1 += '<span class="org_name" style="font-size: 12px;">' + telNo + '</span>';
							htmlSort1 += '</dd>';
							htmlSort1 += '</dl>';
							htmlSort1 += '</div>';
							htmlSort1 += '</a>';
						}
					}
				}
				
				
			}else if( item.sortLvl == '3' ){
				if(  item.rankLvl == '3'  ){
					if( cnt3 > 0 ) {
						htmlSort2 += '</div>';
						htmlSort2 += '</div>';
					}
					
					if( item.deptRankName == item.userNm ){
						
						htmlSort2 += '<p class="title_box">' + item.deptRankName + '</p>';
					}else{
						for( var i = 0 ; i < item.path.length; i++ ){
							if( item.path[i] == item.parentNode ){
								
								htmlSort2 += '<div class="bureau">';
								htmlSort2 += '<p class="branch_vertical">세로연결선</p>';
								htmlSort2 += '<div class="dept03">';
								htmlSort2 += '<dl class="name_box">';
								htmlSort2 += '<dt class="b_green"  style ="cursor: pointer;">';
								htmlSort2 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
								htmlSort2 += '<span class="b_green name_part">' + item.deptRankName + '</span>'; 
								htmlSort2 += '</dt>';
								//htmlSort2 += '<dt class="b_green">' + item.deptRankName + '</dt>';
								htmlSort2 += '<a class="openPop" href="#">';
								htmlSort2 += '<dd>';
								htmlSort2 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
								htmlSort2 += '<span class="org_name">' + item.userNm + '</span>';
								htmlSort2 += '</dd>';
								htmlSort2 += '</dl>';
								htmlSort2 += '</div>';
								htmlSort2 += '<div class="below_area">';
								htmlSort2 += '<p class="branch_vertical">세로연결선</p>';
								htmlSort2 += '<p class="bureau_line">가로연결선</p>';
								htmlSort2 += '</a>';
								cnt3 += 1;
							}
						}
					}
				}else if( item.rankLvl == '4' ){
					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){

							var telNo = item.telNo.substr(item.telNo.length-4,4);
							htmlSort2 += '<div class="dept04">';
							htmlSort2 += '<p class="branch_vertical">세로연결선</p>';
							htmlSort2 += '<dl class="name_vbox">';
							htmlSort2 += '<dt class="show-modal-btn"  style ="cursor: pointer;">';
							htmlSort2 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlSort2 += '<span class="b_yellow name_part">' + item.deptRankName + '</span>'; 
							htmlSort2 += '</dt>';
							htmlSort2 += '<a class="openPop" href="#">';
							htmlSort2 += '<dd>';
							htmlSort2 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlSort2 += '<span class="org_name">' + item.userNm + '</span>';
							htmlSort2 += '<span class="org_name" style="font-size: 12px;">' + telNo + '</span>';
							htmlSort2 += '</dd>';
							htmlSort2 += '</dl>';
							htmlSort2 += '</div>';
							htmlSort2 += '</a>';
						}
					}
				}
				
				htmlSort2 += '';
				
				
			}else if( item.sortLvl == '4' ){
				if(  item.rankLvl == '3'  ){
					if( cnt4 > 0 ) {
						htmlSort3 += '</div>';
						htmlSort3 += '</div>';
					}
					
					if( item.deptRankName == item.userNm ){
						
						htmlSort3 += '<p class="title_box">' + item.deptRankName + '</p>';
					}else{
						for( var i = 0 ; i < item.path.length; i++ ){
							if( item.path[i] == item.parentNode ){
								htmlSort3 += '<div class="bureau">';
								htmlSort3 += '<p class="branch_vertical">세로연결선</p>';
								htmlSort3 += '<div class="dept03">';
								htmlSort3 += '<dl class="name_box">';
								htmlSort3 += '<dt class="b_green"  style ="cursor: pointer;">';
								htmlSort3 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
								htmlSort3 += '<span class="b_green name_part">' + item.deptRankName + '</span>'; 
								htmlSort3 += '</dt>';
								//htmlSort3 += '<dt class="b_green">' + item.deptRankName + '</dt>';
								htmlSort3 += '<a class="openPop" href="#">';
								htmlSort3 += '<dd>';
								htmlSort3 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
								htmlSort3 += '<span class="org_name">' + item.userNm + '</span>';
								htmlSort3 += '</dd>';
								htmlSort3 += '</dl>';
								htmlSort3 += '</div>';
								htmlSort3 += '<div class="below_area">';
								htmlSort3 += '<p class="branch_vertical">세로연결선</p>';
								htmlSort3 += '<p class="bureau_line">가로연결선</p>';
								htmlSort3 += '</a>';
								cnt4 += 1;
								
							}
						}
					}
				}else if( item.rankLvl == '4' ){
					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){
							var telNo = item.telNo.substr(item.telNo.length-4,4);
							
							htmlSort3 += '<div class="dept04">';
							htmlSort3 += '<p class="branch_vertical">세로연결선</p>';
							htmlSort3 += '<dl class="name_vbox">';
							htmlSort3 += '<dt class="show-modal-btn"  style ="cursor: pointer;">';
							htmlSort3 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlSort3 += '<span class="b_yellow name_part">' + item.deptRankName + '</span>'; 
							htmlSort3 += '</dt>';
							htmlSort3 += '<a class="openPop" href="#">';
							htmlSort3 += '<dd>';
							htmlSort3 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlSort3 += '<span class="org_name">' + item.userNm + '</span>';
							htmlSort3 += '<span class="org_name" style="font-size: 12px;">' + telNo + '</span>';
							htmlSort3 += '</dd>';
							htmlSort3 += '</dl>';
							htmlSort3 += '</div>';
							htmlSort3 += '</a>';
						}
					}
				}
				
				
				
			}else if( item.sortLvl == '5' ){
				if(  item.rankLvl == '3'  ){
					if( cnt5 > 0 ) {
						htmlSort4 += '</div>';
						htmlSort4 += '</div>';
						htmlSort4 += '</div>';
						htmlSort4 += '</div>';
						cnt8 = 0;
					}
					
					if( item.deptRankName == item.userNm ){
						
						htmlSort4 += '<p class="title_box">' + item.deptRankName + '</p>';
					}else{
						for( var i = 0 ; i < item.path.length; i++ ){
							if( item.path[i] == item.parentNode ){
								
								htmlSort4 += '<div class="bureau">';
								htmlSort4 += '<p class="branch_vertical">세로연결선</p>';
								htmlSort4 += '<div class="dept03">';
								htmlSort4 += '<dl class="name_box">';
								htmlSort4 += '<dt class="b_green"  style ="cursor: pointer;">';
								htmlSort4 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
								htmlSort4 += '<span class="b_green name_part">' + item.deptRankName + '</span>'; 
								htmlSort4 += '</dt>';
								//htmlSort4 += '<dt class="b_green">' + item.deptRankName + '</dt>';
								htmlSort4 += '<a class="openPop" href="#">';
								htmlSort4 += '<dd>';
								htmlSort4 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
								htmlSort4 += '<span class="org_name">' + item.userNm + '</span>';
								htmlSort4 += '</dd>';
								htmlSort4 += '</dl>';
								htmlSort4 += '</div>';
								htmlSort4 += '<div class="below_area">';
								htmlSort4 += '<p class="dong_vertical">세로연결선</p>';
								htmlSort4 += '<p class="bureau_line">가로연결선</p>';
								htmlSort4 += '</a>';
								cnt5 += 1;
							}
						}
					}
				}else if( item.rankLvl == '4' ){
					/*if( item.deptRankName.indexOf("동장") != -1 ){
						
						htmlSort4 += '<div class="dong_branch">';
						htmlSort4 += '<p class="dong_title">동 주민센터</p>';
					}*/
					
					for( var i = 0 ; i < item.path.length; i++ ){
						if( item.path[i] == item.parentNode ){
							if( item.commCtGb == '1' ){
								if( cnt8 == 0 ){
									htmlSort4 += '<div class="dong_branch">';
									htmlSort4 += '<p class="dong_title">동 주민센터</p>';
								}
								
								cnt8 += 1;
								
							}
							var telNo = item.telNo.substr(item.telNo.length-4,4);

							htmlSort4 += '<div class="dept04">';
							htmlSort4 += '<p class="branch_vertical">세로연결선</p>';
							htmlSort4 += '<dl class="name_vbox">';
							htmlSort4 += '<dt class="show-modal-btn"  style ="cursor: pointer;">';
							htmlSort4 += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
							htmlSort4 += '<span class="b_yellow name_part">' + item.deptRankName + '</span>'; 
							htmlSort4 += '</dt>';
							htmlSort4 += '<a class="openPop" href="#">';
							htmlSort4 += '<dd>';
							htmlSort4 += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
							htmlSort4 += '<span class="org_name">' + item.userNm + '</span>';
							htmlSort4 += '<span class="org_name" style="font-size: 12px;">' + telNo + '</span>';
							htmlSort4 += '</dd>';
							htmlSort4 += '</dl>';
							htmlSort4 += '</div>';
							htmlSort4 += '</a>';
							/*if( cnt8 == cnt5 ){
								htmlSort4 += '</div>';
							}*/
						}
					}
				}
				
			}
			$("#firstDepth").html(htmlDepth1+htmlDepth2+htmlSort5+htmlSort6);
			$("#secondDepth").html(htmlDepth3);
			$("#twoSort").html(htmlSort1);
			$("#thirdSort").html(htmlSort2);
			$("#fourthSort").html(htmlSort3);
			$("#fivethSort").html(htmlSort4);
			//$("#firstDepthSub").html(htmlSort5);
		})
		//html += '';
		
		//팝업창 이벤트	
		$(".openPop").click(function() {
			//클릭 한 조직원 데이터 조회
			fn_detailOragnization(this)
		});

		
		
	};
	
	//조직원 클릭 시 속성정보 로딩
	function fn_detailOragnization(a){
		var param = {};
		param.uniqSeq = $(a.parentNode.children[0].children[0].children[0]).val();
		var url = "/dashBoard/organization/selectDetailMember.do";
		
		if( a.children[0].children[1].innerText == '공 석' ) return;
		
		//조직원 속성정보 ajax 호출
		Util.request(url, param, function(resultData){
			console.log("resultData: ", resultData.data);
			
			//결과 조회 없을경우 체크
			if( resultData.data.length == 0 ){
				alert("조회 결과가 없습니다.");
			}else{
				
				//팝업 생성 함수 호출
				fn_createPopup(resultData.data[0]);
			}
			
		})
	}
	
	//부서 팀장 클릭시 데이터 로드 함수 호출
	function fn_getSubOrganization(a){
		
		var param = {};
		param.uniqSeq = $(a.children[0].children[0]).val();
		var url = "/dashBoard/organization/selectSubOrganization.do";
		
		//조직원 속성정보 ajax 호출
		Util.request(url, param, function(resultData){
			fn_subOrganization(resultData.data)
			console.log("resultData: ", resultData.data);
		})
	}
	
	//부서 팀장 클릭시 우측 레이어 함수
	function fn_subOrganization(data){
		var html = '';
		var cnt = 0;
		$("#pollSlider").html('');	
		//html += '<div class="modal-dialog">';
		//html += '<div class="modal-body">';
		//<p class="sl_btarea"><a href="#" class="log-btn-cancel">창 닫기</a></p>
		
		html += '<div class="slider_area">';
		html += '<p class="sl_btarea"><a class="log-btn-cancel" id="bt_slclose" href="#">창 닫기</a></p>';
		data.forEach(function(item,index){
			var imgPath = 'http://105.3.10.31:3100/ntis/ubiportal/files/org/';
			var imgNm = item.imgUrl;
			if(imgNm == undefined || imgNm == '')  {
				imgPath = '/dist/images/organ/';
				imgNm = 'man_pic.png';
			}
			if(item.rankLvl == '4'){
				
				html += '<div class="dept03">';
				html += '<dl class="name_box">';
				html += '<dt class="b_yellow"  style ="cursor: pointer;">';
				html += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
				html += '<span class="b_yellow name_part">' + item.deptRankName + '</span>'; 
				html += '</dt>';
				html += '<a class="openPop" href="#">';
				html += '<dd>';
				html += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
				html += '<span class="org_name">' + item.userNm + '</span>';
				html += '</dd>';
				html += '</dl>';
				html += '</div>';
				html += '</a>';
				html += '<div class="below_area">';
				html += '<p class="branch_vertical">세로연결선</p>';
				html += '<p class="slider_line">가로연결선</p>';
			}else if(item.rankLvl == '5'){
				var telNo = item.telNo.substr(item.telNo.length-4,4);
				if( cnt > 0 ) html += '</div>';
				html += '<div class="team_all">';
				html += '<div class="dept04">';
				html += '<p class="branch_vertical">세로연결선</p>';
				html += '<dl class="name_vbox">';
				html += '<dt class="b_orange"  style ="cursor: pointer;">';
				html += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
				html += '<span class="b_orange name_part">' + item.sectionName + '</span>'; 
				html += '</dt>';
				html += '<a class="openPop" href="#">';
				//html += '<dt class="b_orange">기획팀장</dt>';
				html += '<dd>';
				html += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
				html += '<span class="org_name">' + item.userNm + '</span>';
				html += '<span class="org_name" style="font-size: 12px;">' + telNo + '</span>';
				html += '</dd>';
				html += '</dl>';
				html += '</div>';
				html += '</a>';
				cnt += 1;
			}else if(item.rankLvl == '9'){
				var telNo = item.telNo.substr(item.telNo.length-4,4);
				html += '<div class="dept05">';
				html += '<p class="branch_vertical">세로연결선</p>';
				html += '<dl class="name_vbox">';
				html += '<dt class="b_gray57"  style ="cursor: pointer;">';
				html += '<label for=""><input id="" class="hide_index" value="' + item.uniqSeq + '" type="checkbox" /></label>';
				html += '<span class="b_gray57 name_part">' + item.sectionName + '</span>'; 
				html += '</dt>';
				html += '<a class="openPop" href="#">';
				//html += '<dt class="b_gray57">주무</dt>';
				html += '<dd>';
				html += '<p class="org_pic"><img src="' + imgPath + imgNm + '" alt="" /></p>';
				html += '<span class="org_name">' + item.userNm + '</span>';
				html += '<span class="org_name" style="font-size: 12px;">' + telNo + '</span>';
				html += '</dd>';
				html += '</dl>';
				html += '</div>';
				html += '</a>';
			}
		});
		html += '</div>';
		html += '</div>';
		html += '</div>';
		
		//$(".modal-dialog").show();
		$("#pollSlider").html(html);
		//$(".modal-dialog").css("display", "");
		//팝업창 이벤트	
		$(".openPop").click(function() {
			//클릭 한 조직원 데이터 조회
			fn_detailOragnization(this)
		});
		
		
	    //닫기 버튼 클릭시		
		$('#bt_slclose').click(function() {
				$(".modal_dialog_02").hide();
				//$("#pollSlider").removeClass("on");
				//$('.pollSlider').animate({"margin-right": '-='+slider_width},'slow','easeInQuart');
		})
	}
	
	//팝업창 html 함수
	function fn_createPopup(data){
		$("#pop_wrap").html();
		var imgPath = 'http://105.3.10.31:3100/ntis/ubiportal/files/org/';
		var imgNm = data.imgUrl;
		if(imgNm == undefined || imgNm == '')  {
			imgPath = '/dist/images/organ/';
			imgNm = 'pic_profile_man.png';
		}

		var userName = data.userName;
		var rankName = data.rankName;
		var deptName = data.deptName;
		var sectionName = data.sectionName;
		var tel = data.tel;
		var mobile = data.mobile;
		var mail = data.mail;
		if(userName == undefined) userName = '';
		if(rankName == undefined) rankName = '';
		if(deptName == undefined) deptName = '';
		if(sectionName == undefined) sectionName = '';
		if(tel == undefined) tel = '';
		if(mobile == undefined) mobile = '';
		if(mail == undefined) mail = '';
		
		
		var html = '';
		
		html += '<div class="pop_all">';
		html += '<a id="close_button" href="#">닫기</a>';
		html += '<div class="work_info">';
		html += '<p class="pic_profile"><img src="' + imgPath + imgNm + '" alt="" /></p>';
		html += '<dl class="text_profile">';
		html += '<dt>'+ userName +'</dt>';
		html += '<dd>직&nbsp;&nbsp;&nbsp;&nbsp;급 : <span class="pl5">'+ rankName +'</span></dd>';
		html += '<dd>부&nbsp;&nbsp;&nbsp;&nbsp;서 : <span class="pl5">'+ deptName +'</span></dd>';
		html += '<dd>팀&nbsp;&nbsp;&nbsp;&nbsp;명 : <span class="pl5">'+ sectionName +'</span></dd>';
		html += '<dd>연락처 : <span class="pl5">'+ tel +'</span></dd>';
		html += '<dd>휴대폰 : <span class="pl5">'+ mobile +'</span></dd>';
		html += '<dd>이메일 :  <span class="pl5">'+ mail +'</span></dd>';
		html += '</dl>';
		html += '</div>';
		/*html += '<div class="work_do">';
		html += '<ul class="work_list">';
		html += '<li>의정부시 예산</li>';
		html += '<li>마을복지계획 추진</li>';
		html += '<li>洞지역사회보장협의체 관리</li>';
		html += '<li>통합사례관리 및 사업비 집행</li>';
		html += '<li>복지톡톡 아카데미, 천사통장 운영</li>';
		html += '<li>복지사각지대 조사·발굴 및 지원·연계</li>';
		html += '<li>종합상담 및 찾아가는 복지상담</li>';
		html += '</ul>';
		html += '</div>';*/
		html += '</div>';
		
		$("#pop_wrap").html(html);
		$("#pop_wrap").fadeIn();
		
		$("#close_button").click(function(){
			$("#pop_wrap").fadeOut();
		});
		
	}

	
	
})