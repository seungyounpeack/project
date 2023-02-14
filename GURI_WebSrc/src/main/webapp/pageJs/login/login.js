var loading = $.loading();

$(function(){
	
	
	var userForm = new FORM("divUserLogin");
	var createForm = new FORM("divUserCreate");
	
	//로그인 함수 호출
	function fn_login(param){
		Util.request("/login/loginCheck.do", param, function(resultData){
			console.log("resultData : ", resultData)
			if( resultData.resultSuccess == "N" ){
				alert(resultData.resultMsg);
			}else{
				location.replace("/intro.do");
			}
			
		})
	};
	
	//유저정보 넣기
	function fn_searchUserInfo(param){
		Util.request("/login/loginSerachUserId.do", param, function(resultData){
			console.log("resultData.userId : ", resultData.userId)
			if( resultData.userId.length > 0 ){
				$("#selectId").css("display", "");
				//검색한 결과 ID넣기
				Util.selectAddOption(resultData.userId, "selectUserInfo",  false);
			}else{
				alert("검색 결과가 없습니다.");
			}
			
		})
	}
	
	//유저 회원가입하는 함수
	function fn_createUser(param){
		Util.request("/login/createUser.do", param, function(resultData){
			
			if( resultData.resultSuccess == "N" ){
				alert("회원 가입에 실패하였습니다.");
			}else{
				location.replace("/login.do");
			}
		})
	}
	

	//입력 항목 초기화 하기
	function fn_initbusiSaveParam() {
		userForm.setValue("userId", "");
		userForm.setValue("userPassword", "");
		
		createForm.setValue("selectUserInfo", "");
		createForm.setValue("createPassword", "");
		createForm.setValue("createPasswordCheck", "");
		createForm.setValue("searchId", "");
		createForm.setValue("searchUserName", "");
	};
	
	//엔터 이벤트 감지 함수
	function enterkey() {
		//회원가입인지 기존 회원인지 체크
		var sort = $('input:checkbox[input[name="radio"]:checked').val();
        if (window.event.keyCode == 13) {
        	
        	if( sort === "new" ){
        		
        	}else if( sort === "exist" )
             // 엔터키가 눌렸을 때 실행할 내용
             login();
        }
	}


	
	/*
	 * 클릭 이벤트
	 * */
	//radio 버튼 클릭
	$("input[name='member']").on('click', function(){
		var value =	$(this).val();
		
		console.log("value : ", value)
		
		//기존 회원 이거나 신규가입
		if( value == "new" ){
			$("#divUserLogin").css("display", "none");
			$("#divUserCreate").css("display", "");
			// 입력 항목 초기화 하기
			fn_initbusiSaveParam();
		}else {
			$("#divUserCreate").css("display", "none");
			$("#divUserLogin").css("display", "");
			// 입력 항목 초기화 하기
			fn_initbusiSaveParam();
		}
		
	})
	
	//id로 사용자 검색
	$("#searchInfo").on("click", function(){
		var searchId = $("#searchId").val();
		var searchUserName = $("#searchUserName").val();
		var param = {};
		param.userId = searchId;
		param.userName = searchUserName;
		
		if( searchId == "" ){
			alert("검색 하실 유저 ID를 입력하세요");
		}else if( searchUserName == "searchUserName" ){
			alert("검색 하실 성함을 입력하세요");
		}else{
			
			//유저 검색 함수 호출
			fn_searchUserInfo(param);
		}
	})
	
	//회원가입하기 버튼 클릭
	$("#userCreate").on("click", function(){
		var param = {};
		
		var id = createForm.getValue("selectUserInfo");
		///var name = createForm.getValue("createUserName");
		var password = createForm.getValue("createPassword");
		var passwordCheck = createForm.getValue("createPasswordCheck");
		param.createUserId = id;
		//param.createUserName = name;
		param.createPassword = password;
		param.createPasswordCeck = passwordCheck;
		console.log("param : ", param)
		if( password != passwordCheck ){
			alert("패스워드를 다시 한번 확인하세요");
		}else if( id == "" ){
			alert("유저 아이디를 검색해주세요");
		}else if( password == "" ){
			alert("패스워드를 입력해주세요");
		}else{
			//유저 회원가입하는 함수 호출
			fn_createUser(param);
		}
		
	})
	
	//유저 로그인 버튼 크릭
	$("#userLogin").on("click", function(){
		var param = {};
		
		var id = userForm.getValue("userId");
		///var name = createForm.getValue("createUserName");
		var password = userForm.getValue("userPassword");
		param.userId = id;
		param.createPassword = password;
		//로그인 함수 호출
		fn_login(param);
	});
	
	$("#createCancel").on("click", function(){
		
	})
})