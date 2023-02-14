var loading = $.loading();
$(function (){
		/***************************************************************************************************
	    * 1. 변수 선언 영역
	    ****************************************************************************************************/
		var currForm = new FORM("formCodeInfo");
		
		var update     = false;
		var selectNo   = null;
		/***************************************************************************************************
	    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
	    ****************************************************************************************************/
		
		//datetimepicker 설정
		fn_initDate();
		
        //파라미터 초기화
		fn_initSetParam();
		
		//form 초기화
		fn_initFormData();

		//input disabled 처리
		fn_disableInputElement(true);
		
		//button hidden 처리
		fn_hiddenBtnElement('none');
		
		//form 데이터 초기화
		
		//페이지 로딩
		fn_loadWord();

		//

		function fn_loadWord(){
			
			//리스트 상단에 분야 선택 값 
			var fieldDataCode = $('#fieldDataCode option:selected').val();
			var params = {
				fieldDataCode : fieldDataCode
			}
			
			console.log('분야 데이터 값 확인중 ===== fieldDataCode' , fieldDataCode);
			Util.request("/mamager/dataMng/fieldDataReg/fieldDataList.ajax", params, function(resultData){
				
				if ( fieldDataCode != null || fieldDataCode == '') {
					$('#fieldDataCode').val(fieldDataCode);
				}
				
				console.log('resultData.fieldDataCode',resultData.fieldDataCode);
				console.log('resultData.fieldDataList',resultData.fieldDataList);
				
				//상단에 분야 선택 값 DB호출
				fn_fieldDataCode(resultData.fieldDataCode);
				
				if(resultData.fieldDataList.length == 0){
					alert("조회 결과 데이터가 없습니다.");
	    		}else{
	    			//리스트에 데이터 넣기
	    			fn_fieldDataList(resultData.fieldDataList);
	    		}
				
			});
		};
		
		function fn_initDate(){
			$('#iptstart_date').datetimepicker({
	    		format: 'YYYY-MM-DD',
	    	});
	    	
	    	$('#iptend_date').datetimepicker({
	    		format: 'YYYY-MM-DD'
	    	});
		}
		
		
	    /***************************************************************************************************
		* 3.Chart 영역
		****************************************************************************************************/
			    
		
	   /***************************************************************************************************
	    * 4.Grid 영역
		****************************************************************************************************/
			
		
	   /***************************************************************************************************
		* 6.Popup 영역
		****************************************************************************************************/
		    
		    
		    
	   /***************************************************************************************************
		* 7.일반 Function 영역
		****************************************************************************************************/
	   
		function fn_initSetParam(){
			
			update = false;
		}
		
		function fn_initFormData() {
			
			var code = document.getElementById("fldCd");
			if( code.children.length > 0 ){
				for( var j = 0 ; j < code.children.length; j++){
					if($(code.children[j]).attr('selected', true)){
						$(code.children[j]).attr('selected', false);
					}
				}
			}
			
			var divv = document.getElementById("fileSe");
			if( divv.children.length > 0 ){
				for( var j = 0 ; j < divv.children.length; j++){
					if($(divv.children[j]).attr('selected', true)){
						$(divv.children[j]).attr('selected', false);
					}
				}
			}
			$('input[name=fldCd]').val('');
			$('input[name=instNm]').val('');
			$('input[name=iptstart_date]').val('');
			$('input[name=iptend_data]').val('');
			$('input[name=dataNm]').val('');
			$('input[name=uploadFile]').val('');
			
			$('#tableY').prop("checked", false);
			$('#tableN').prop("checked", false);

			$('#headerY').prop("checked", false);
			$('#headerN').prop("checked", false);

			$('input[name=fileSe]').val('');
			$('input[name=sourceNm]').val('');
		};
		
		//분야 데이터 가져오기
		function fn_fieldDataCode(resultList){
			console.log('resultList :: ', resultList)
			//리스트 상단
			Util.selectAddOption(resultList, "fieldDataCode", true);
			//폼데이터
			Util.selectAddOption(resultList, "fldCd", true);
		}
		
		//리스트 데이터 가져오기
		function fn_fieldDataList(resultList){
			var html = '';
			$('#fieldDataList').html('');

			for (var i = 0; i< resultList.length; i++){
				html += '<tr data-eventtm="'+ resultList[i].fldNo+'">';
				html += '<td>' + (i+1) + '</td>';
				html += '<td class="t_l">'+ resultList[i].dataNm +'</td>';
				html += '<td>'+ resultList[i].createDataUser +'</td>';
				html += '<td>'+ resultList[i].regDate +'</td>';
				html += '</tr>'; 
			}
			
			$("#fieldDataList").html(html);
			
			var tag = document.getElementById("fieldDataList");
			
			//클릭 이벤트
			if( tag.children.length > 0 ){
				$(tag.children).on("click", function(){
					selectNo = $(this).data("eventtm");
					
					console.log('selectNo', selectNo);
					for( var j = 0 ; j < tag.children.length; j++){
						if($(tag.children[j]).hasClass('on')){
							$(tag.children[j]).removeClass('on');
						}
					}
					for( var i = 0 ; i < this.children.length; i++ ){
						if($(this.children[i]).hasClass('t_l')){
							$(this).addClass('on');
							//데이터 셋명 가져옴
							linkName = this.children[i].innerHTML;
							console.log('linkName', linkName);
						}
					}
					
				   fn_clickSelData(selectNo)
				   
				})
			}
		}
		
		//클릭 데이터 가져오기
		function fn_clickSelData(selectNo){
			console.log('selectNo', selectNo);
			var param = {};
			param.selectNo = selectNo;
			
			Util.request("/mamager/dataMng/fieldDataReg/selectData.ajax", param, function(resultData){
				// update 여부 
				fn_selectData(resultData.selectData);
			});			
		}
		
		//상세 데이터 가져오기
		function fn_selectData(resultData){
			console.log('resultData =======', resultData);
			
			$("#fldCd").val(resultData.fldCd);
			$("#instNm").val(resultData.instNm);
			$("#iptstart_date").val(resultData.startFileYmd);
			$("#iptend_date").val(resultData.endFileYmd);
			$("#dataNm").val(resultData.dataNm);
			// 테이블 생성여부 
			$(':input:radio[name=tableYn][value='+resultData.tableYn+']').prop('checked', true)
			// 헤더 존재 여부
			$(':input:radio[name=headerYn][value='+resultData.headerYn+']').prop('checked', true)
			$("#fileSe").val(resultData.fileSe);
			$("#sourceNm").val(resultData.sourceNm);
			
		}
		
		// input disabled 처리
		function fn_disableInputElement(disableFlag){
			$('#fldCd').attr("disabled", disableFlag);
			$('#instNm').attr("disabled", disableFlag);
			$('#iptstart_date').attr("disabled", disableFlag);
			$('#iptend_date').attr("disabled", disableFlag);
			$('#dataNm').attr("disabled", disableFlag);
			$('#uploadFile').attr("disabled", disableFlag);
			$('input:radio[name="tableYn"]').attr("disabled", disableFlag);
			$('input:radio[name="headerYn"]').attr("disabled", disableFlag);
			$('#fileSe').attr("disabled", disableFlag);
			$('#sourceNm').attr("disabled", disableFlag);
		}
		
		//button hidden 처리
		function fn_hiddenBtnElement(hiddenFlag){
			console.log('hiddenFlag', hiddenFlag)
			
			if(hiddenFlag == 'none'){
				$('#dataDel').css('display', '')
				$('#dataIns').css('display', '')
				$('#dataUpd').css('display', '')
			} else if (hiddenFlag == ''){
				$('#dataDel').css('display', 'none')
				$('#dataIns').css('display', 'none')
				$('#dataUpd').css('display', 'none')
			}
			
			$('#dataCancel').css('display', hiddenFlag)
			$('#dataSave').css('display', hiddenFlag)
			
		}
		
		function fn_fieldDataGet(){
			var formData = new FormData();

			if(update == true){
				formData.append('selectNo', selectNo);
			}
			var fldCd = $('#fldCd').val();
			var instNm = $('input[name=instNm]').val();
			var iptstart_date = $('input[name=iptstart_date]').val();
			var iptend_data = $('input[name=iptend_data]').val();
			var dataNm = $('input[name=dataNm]').val();
			var uploadFile = $("#uploadFile")[0].files[0];
		
			var tableYn = $(':input:radio[name=tableYn]:checked').val();
			var headerYn = $(':input:radio[name=headerYn]:checked').val();
			var fileSe = $('select[name=fileSe] option:selected').val();
			var sourceNm = $('input[name=sourceNm]').val();
			
//			console.log('fldCd??????',fldCd);
//			console.log('instNm',instNm);
//			console.log('iptstart_date',iptstart_date);
//			console.log('iptend_data',iptend_data);
//			console.log('dataNm',dataNm);
//			console.log('uploadFile',uploadFile);
//			console.log('tableYn',tableYn);
//			console.log('headerYn',headerYn);
			console.log('fileSe',fileSe);
//			console.log('sourceNm',sourceNm);			
			
			formData.append("fldCd", fldCd);
			formData.append("instNm", instNm);
			formData.append("startDate", iptstart_date);
			formData.append("endDate", iptend_data);
			formData.append("dataNm", dataNm);
			formData.append("uploadFile", uploadFile);
			formData.append("tableYn", tableYn);
			formData.append("headerYn", headerYn);
			formData.append("fileSe", fileSe);
			formData.append("sourceNm", sourceNm);
			
			return formData;
		}
		
		function fn_fieldDataSave(update) {
			// update : true  ====> 수정
			// update : false ====> 등록
			console.log('update======', update);
			console.log('selectNo===========', selectNo);
			//데이터 불러오기
			var param = fn_fieldDataGet()
			
			//데이터 빈칸 확인
			if(param.get('fldCd') == ''){
				alert('분야 데이터를 선택하세요.')
				return;
			} else if(param.get('instNm') == ''){
				alert('제공기관을 입력하세요.')
				return;
			}else if(param.get('startDate') == ''){
				alert('파일 시작기간을 입력하세요.')
				return;
			}else if(param.get('endDate') == ''){
				alert('파일 종료기간을 입력하세요.')
				return;
			}else if(param.get('dataNm') == ''){
				alert('데이터 셋명을 입력하세요.')
				return;
			}
			else if($('#uploadFile').val() != ''){
				var ext = $('#uploadFile').val().split('.').pop().toLowerCase();
				if(($.inArray(ext, ['csv']) == -1) && ($.inArray(ext, ['txt']) == -1)) {
					  alert('csv, txt 파일만 등록 가능합니다.');
					  return;
				} else if(param.get('tableYn') == '' || param.get('tableYn') == undefined){
					alert('DB테이블 생성 여부를 선택하세요.')
					return;
				}
			}
			
//			// DB테이블을 생성할 경우 
//			// 헤더 및 구분자 필수로 등록
//			else if(param.get('tableYn') == 'Y'){
//				if(param.get('headerYn') == '' || param.get('headerYn') == undefined){
//					alert('헤더 유무를 선택하세요.')
//					return;
//				}else if (param.get('fileSe') == ''){
//					alert('파일 구분자를 선택하세요.')
//					return;
//				}
//			}
//			else if(param.get('sourceNm') == ''){
//				alert('출처를 입력하세요.')
//				return;
//			}
//
//			//등록
			if(update == false){
				console.log('등록')
				Util.requestFileUplaod("/mamager/dataMng/fieldDataReg/fieldDataInsert.ajax", param, function(resultData){
					console.log('param', param);
					console.log('resultData' , resultData);
					fn_initFormData();
					fn_disableInputElement(true);
					fn_hiddenBtnElement('none');
					fn_loadWord()
				})
			}else if (update == true){
				Util.requestFileUplaod("/mamager/dataMng/fieldDataReg/fieldDataUpdate.ajax", param, function(resultData){
					console.log('param', param);
					console.log('resultData' , resultData);
					fn_disableInputElement(true);
					fn_hiddenBtnElement('none');
					fn_clickSelData(selectNo)
				})			
			}
		}
		
		/***************************************************************************************************
		 * 8.Button Event 영역
	     ****************************************************************************************************/
		
		//검색
		$('#btnCodeSearch').on('click', function(){
			fn_loadWord();
		})
		
		//삭제
		$("#dataDel").on("click", function(){
		})
		
		//신규 등록
		$("#dataIns").on("click", function(){
			update=false;

			fn_initFormData();
			fn_disableInputElement(false)
			fn_hiddenBtnElement('')
			
		})
		
		//수정
		$("#dataUpd").on("click", function(){
			update=true;

			fn_disableInputElement(false)
			fn_hiddenBtnElement('')
			
		})
		
		//--------신규등록 & 수정
		// 취소
		$("#dataCancel").on("click", function(){
			fn_disableInputElement(true)
			fn_hiddenBtnElement('none')
		})
		
		// 저장
		$("#dataSave").on("click", function(){
			fn_fieldDataSave(update);
			
		})
})




















//var loading = $.loading();
//$(function () {
//		/***************************************************************************************************
//	    * 1. 변수 선언 영역
//	    ****************************************************************************************************/
//		var currForm = new FORM("formCodeInfo");
//		
//		var fieldDataCode       = null;
//		
//		var fldCd               = null;
//		var instNm              = null;
//		var startDate           = null;
//		var endDate             = null;
//		var dataNm              = null;
//		
//		var selectNo            = null;
//		
//		var insertList = new Array();
//		var ax5GridView = null;
//		var ax5GridViewCheckIdx = -1;
//		var gridConfigInfo = {};
//		/***************************************************************************************************
//	    * 2. 화면 및 Element 설정 영역 (Default 및 Initialization)
//	    ****************************************************************************************************/
//
//		
//		// 날짜 데이터 초기화
//		fn_initDate();
//
//		// form 데이터 초기화 ( currForm )
//		fn_initFormData();
//		
//		// 파라미터 데이터 초기화
//		fn_initSetParam();
//		
//		// 페이지 로딩 함수
//		fn_loadWord();
//		
//		
//		
//		
//		
//		
//		
//		
//		// 입력항목 비활성화 시키기
//		
//		fn_hiddenBtnElement('none')
//		//페이지 로딩시 
//		function fn_loadWord(){
//			fn_initSetParam();
//			
//
//			Util.request("/manager/fieldDataReg/fieldDataList.do", param, function(resultData){
//				fn_disableInputElement(true);
//
//				console.log('param ===========!!!!!!!!', param);
//				console.log('param 재확인 중 ================' , param.fieldDataCode);
//				if(resultData.fieldDataList.length == 0){
//					alert("조회 결과 데이터가 없습니다.");
//    				$('#fieldDataCode option[value='+ param.fieldDataCode +']').attr('selected', true);
//	    			fn_fieldDataList(resultData.fieldDataList);
//
//	    		}else{
//	    			console.log('reusltData????' , resultData);
//	    			// 테이블에 데이터 넣기
//	    			fn_fieldDataList(resultData.fieldDataList);
//
//	    			// 코드값 불러오기
//	    			fn_fieldDataCode(resultData.fieldDataCode);
//	    			if(param.fieldDataCode != ''){
//	    				console.log('데이터 존재.')
//	    				$('#fieldDataCode option[value='+ param.fieldDataCode +']').attr('selected', true);
//	    			}
//	    		}
//			});
//			
//			
//		};
//
//		function fn_initDate(){
//			$('#iptstart_date').datetimepicker({
//	    		format: 'YYYY-MM-DD',
//	    	});
//	    	
//	    	$('#iptend_date').datetimepicker({
//	    		format: 'YYYY-MM-DD'
//	    	});
//		}
//		
//		function fn_fieldDataList(resultList){
//			
//			var html = '';
//			$('#fieldDataList').html('');
//			
//			console.log('resultList ========================' , resultList);
//
//			for (var i = 0; i< resultList.length; i++){
//				html += '<tr data-eventtm="'+ resultList[i].fldNo+'">';
//				html += '<td>' + resultList[i].fldNo + '</td>';
//				html += '<td class="t_l">'+ resultList[i].dataNm +'</td>';
//				html += '<td>'+ resultList[i].createDataUser +'</td>';
//				html += '<td>'+ resultList[i].regDate +'</td>';
//				html += '</tr>'; 
//			}
//			
//			$("#fieldDataList").html(html);
//			
//			var tag = document.getElementById("fieldDataList");
//			
//			//클릭 이벤트
//			if( tag.children.length > 0 ){
//				$(tag.children).on("click", function(){
//					selectNo = $(this).data("eventtm");
//					
//					for( var j = 0 ; j < tag.children.length; j++){
//						if($(tag.children[j]).hasClass('on')){
//							$(tag.children[j]).removeClass('on');
//						}
//					}
//					for( var i = 0 ; i < this.children.length; i++ ){
//						if($(this.children[i]).hasClass('t_l')){
//							$(this).addClass('on');
//							linkName = this.children[i].innerHTML;
//						}
//					}
//					
//					fn_clickSelData(selectNo)
//				})
//				
//			}
//			
//		}
//		
//		
//		function fn_clickSelData(selectNo){
//			
//			console.log('selectNo', selectNo)
//			
//			var param = {};
//			param.selectNo = selectNo;
//			
//			Util.request("/manager/fieldDataReg/selectData.do", param, function(resultData){
//
//				// 테이블에 데이터 넣기
//				if(resultData.selectData.length == 0){
//					
//	    		}else{
//					$('#fldCd').children().removeAttr('selected');
//					$('input[name=instNm]').attr('value','');
//					$('input[name=iptstart_date]').attr('value','');
//					$('input[name=iptend_data]').attr('value','');
//					$('input[name=dataNm]').attr('value','');
//					$('input[name=tableYn]').attr('value','');
//					$('input[name="headerYn]').attr('value', '');
//					$('input[name=fileSe]').attr('value','');
//					$('input[name=sourceNm]').attr('value','');
//					
//	    			fn_selectData(resultData.selectData);
//	    			$("#dataUpd").on("click", function(){
//	    				fn_disableInputElement(false)
//	    				fn_hiddenBtnElement('')
//	    			})
//	    		}
//			});
//		}
//		
//		function fn_selectData(resultList){
//			console.log('resultList===================', resultList);
//			
//			for( var i =0; i < resultList.length; i ++){
//				$('#fldCd option[value='+ resultList[i].fldCd +']').attr('selected', true);
//				$('input[name=fldCd]').attr('value',resultList[i].fldCd);
//				$('input[name=instNm]').attr('value',resultList[i].instNm);
//				$('input[name=iptstart_date]').attr('value',resultList[i].startFileYmd);
//				$('input[name=iptend_data]').attr('value',resultList[i].endFileYmd);
//				$('input[name=dataNm]').attr('value',resultList[i].dataNm);
//				$('input[name=tableYn]').attr('value',resultList[i].tableYn);
//				if(resultList[i].tableYn == 'y' || resultList[i].tableYn == 'Y'){
//					$('#tabelY').prop("checked", true);
//					$('#tabelN').prop("checked", false);
//					
//				} else if (resultList[i].tableYn == 'n' || resultList[i].tableYn == 'N'){
//					$('#tabelY').prop("checked", false);
//					$('#tabelN').prop("checked", true);
//				}
//				$('input[name="headerYn]').attr('value', resultList[i].headerYn);
//				if(resultList[i].headerYn == 'y' || resultList[i].headerYn == 'Y'){
//					$('#headerY').prop("checked", true);
//					$('#headerN').prop("checked", false);
//					
//				} else if (resultList[i].headerYn == 'n' || resultList[i].headerYn == 'N'){
//					$('#headerY').prop("checked", false);
//					$('#headerN').prop("checked", true);
//				}
//				
//				$('input[name=fileSe]').attr('value',resultList[i].fileSe);
//				$('input[name=sourceNm]').attr('value',resultList[i].sourceNm);
//			}
//
//		}
//		function fn_fieldDataCode(resultList){
//			console.log('resultList :: ', resultList)
//			Util.selectAddOption(resultList, "fieldDataCode", true);
//			Util.selectAddOption(resultList, "fldCd", true);
//			
////		    Util.selectAddOption(fldNm, "fieldDataCode", true);
//		}
//		
//		//param 초기화
//		function fn_initSetParam(){
//			fieldDataCode = $('#fieldDataCode option:selected').val();
//			console.log('')
//			param = {
//					fieldDataCode : fieldDataCode
//			};
//			
//			fldCd = $('#fldCd').val();
//			instNm = $('#instNm').val();
//			startDate = $('#iptstart_date').val();
//			endDate = $('#iptend_date').val();
//			dataNm = $('#dataNm').val();
//			// 파일 관련 데이터도 추가 필요
//			// 파일업로드 , DB테이블생성여부 , 헤더 여부 ,파일구분자, 출처 내용 제외한 params
//			
//			params = {
//					selectNo : selectNo,
//					fldCd : fldCd,
//					instNm : instNm,
//					startDate : startDate,
//					endDate : endDate,
//					dataNm : dataNm
//			}
//			
//		}
//		
//		function fn_disableInputElement(disableFlag){
//			
//			$('#fldCd').attr("disabled", disableFlag);
//			$('#instNm').attr("disabled", disableFlag);
//			$('#iptstart_date').attr("disabled", disableFlag);
//			$('#iptend_date').attr("disabled", disableFlag);
//			$('#dataNm').attr("disabled", disableFlag);
//			$('#tableY').attr("disabled", disableFlag);
//			$('#tableN').attr("disabled", disableFlag);
//			$('#headerY').attr("disabled", disableFlag);
//			$('#headerN').attr("disabled", disableFlag);
//			$('#fileSe').attr("disabled", disableFlag);
//			$('#sourceNm').attr("disabled", disableFlag);
//		}
//
//
//		function fn_hiddenBtnElement(hiddenFlag){
//			// 기존 버튼이랑 반대로 수행해줘야지됨 
//			console.log('hiddenFlag', hiddenFlag)
//			
//			if(hiddenFlag == 'none'){
//				$('#dataDel').css('display', '')
//				$('#dataIns').css('display', '')
//				$('#dataUpd').css('display', '')
//			} else if (hiddenFlag == ''){
//				$('#dataDel').css('display', 'none')
//				$('#dataIns').css('display', 'none')
//				$('#dataUpd').css('display', 'none')
//			}
//			
//			$('#dataCancel').css('display', hiddenFlag)
//			$('#dataSave').css('display', hiddenFlag)
//			
//		}
//		
//	    /***************************************************************************************************
//		* 6.일반 Function 영역
//	    ****************************************************************************************************/
//		/*
//  	     1) 파라미터 초기화 함수
//         2) 폼 데이터 초기화 함수	
//  	     3) input Disabled 처리 함수
//  	     4) button hidden 처리 함수
//        */
//		
//		function fn_initFormData() {
//			currForm.setValue("fldCdData", "");
//			currForm.setValue("fldFileId", "");
//			currForm.setValue("fldCd", "");
//			currForm.setValue("instNm", "");
//			currForm.setValue("iptstart_date", "");
//			currForm.setValue("iptend_date", "");
//			currForm.setValue("dataNm", "");
//			currForm.setValue("uploadFile", "");
//			currForm.setValue("tableY", "");
//			currForm.setValue("tableN", "");
//			currForm.setValue("headerY", "");
//			currForm.setValue("headerN", "");
//			currForm.setValue("fileSe", "");
//			currForm.setValue("sourceNm", "");
//		};
//		
//		
//		
//		/***************************************************************************************************
//		 * 7.Button Event 영역
//	     ****************************************************************************************************/		
//		/*
//		   - 분야별 검색 버튼
//		   - 삭제 버튼
//		   - 신규 등록 버튼
//		     1) 저장 버튼
//		     2) 취소 버튼
//		   - 수정 버튼
//		     1) 저장 버튼
//		     2) 취소 버튼
//		 */
//		$('#btnCodeSearch').on('click', function(){
//			fn_loadWord();
//		})
//		
//		$("#dataIns").on("click", function(){
//			selectNo = '';
//			
//			fn_initSetParam();
//			
//			var tag = document.getElementById("fieldDataList");
//			var code = document.getElementById("fldCd");
//			
//			//리스트 부분 체크 초기화 하기
//			if( tag.children.length > 0 ){
//					for( var j = 0 ; j < tag.children.length; j++){
//						if($(tag.children[j]).hasClass('on')){
//							$(tag.children[j]).removeClass('on');
//						}
//					}
//			}
//			
//			//분야 부분 초기화 시키기
//			if( code.children.length > 0 ){
//				for( var j = 0 ; j < code.children.length; j++){
//					if($(code.children[j]).attr('selected', true)){
//						$(code.children[j]).attr('selected', false);
//					}
//				}
//			}
//			
//			$('input[name=fldCd]').attr('value','');
//			$('input[name=instNm]').attr('value','');
//			$('input[name=iptstart_date]').attr('value','');
//			$('input[name=iptend_data]').attr('value','');
//			$('input[name=dataNm]').attr('value','');
//			$('input[name=tableYn]').attr('value','');
//			$('input[name=headerYn]').attr('value','');
//			$('input[name=fileSe]').attr('value','');
//			$('input[name=sourceNm]').attr('value','');
//			
//			fn_disableInputElement(false);
//			fn_hiddenBtnElement('')
//
//		})
//		
//		$("#dataDel").on("click", function(){
//			
//		})
//	    
//		$("#dataSave").on('click', function(){
//			// 변수 초기화
//			fn_initSetParam();
//			// 불용어 Validation Check
//			var validationItems = {
//			showType : 'top', 				// "top", "bottom"
//			rules : [
//				{fieldName:'fldCd', 	fieldTitle:'분야', 				ruleOption:["required"]},
//				{fieldName:'instNm', 		fieldTitle:'제공 기관', 		ruleOption:["required"]},
//				{fieldName:'iptstart_date', 	fieldTitle:'파일 시작 기간', 		ruleOption:["required"]},
//				{fieldName:'iptend_data', 	fieldTitle:'파일 종료 기간', 		ruleOption:["required"]},
//				{fieldName:'dataNm', 	fieldTitle:'데이터 셋명 ', 		ruleOption:["required"]},
//				{fieldName:'uploadFile', 	fieldTitle:'업로드 파일', 		ruleOption:["required"]}
////				{fieldName:'tableYn', 	fieldTitle:'DB테이블 생성 여부', 		ruleOption:["required"]},
////				{fieldName:'fileSe', 	fieldTitle:'파일 구분자', 		ruleOption:["required"]},
////				{fieldName:'sourceNm', 	fieldTitle:'출처', 		ruleOption:["required"]},
//			]
//	};
//		    	currForm.validate(validationItems, function(returnValidData, validSuccess){
//		    	
//					if(validSuccess){
//						console.log('체크')
//						console.log('validationItems', validationItems)
//						
//						
//						console.log('uploadFile', uploadFile)
//						console.log('currForm', currForm);
//						console.log('currForm.getValue(fldCd)', currForm.getValue('fldCd'));
//						console.log('currForm.getValue(instNm)', currForm.getValue('instNm'));
//						console.log('currForm.getValue(iptstart_date)', currForm.getValue('iptstart_date'));
//						console.log('currForm.getValue(iptend_data)', currForm.getValue('iptend_data'));
//						console.log('currForm.getValue(dataNm)', currForm.getValue('dataNm'));
//						console.log('currForm.getValue(uploadFile)', currForm.getValue('uploadFile'));
//
//					}
////		    		console.log('params=======' , params);
////		    		console.log('params selectNo============', params.selectNo);
////		    		var check = (params.selectNo == '')
////		    		console.log('check==', check);
////		    		if(validSuccess){
////		    			if(Util.isEmpty(params.fldCd)){
////		    				alert("분야를 선택 하세요.")
////		    			} else if (Util.isEmpty(params.instNm)){
////		    				alert("제공기관을 입력하세요.")
////		    			} else if (Util.isEmpty(params.startDate)){
////		    				alert("파일기간을 선택하세요.")
////		    			} else if (Util.isEmpty(params.endDate)){
////		    				alert("파일기간을 선택하세요.")
////		    			} else if (Util.isEmpty(params.dataNm)){
////		    				alert("데이터셋명을 입력하세요.")
////		    			}
////		    			else if (check == true){
////		    				Util.request("/manager/fieldDataReg/fieldDataInsert.do", params, function(resultData){
////		    					console.log('params', params);
////		    					console.log('resultData' , resultData);
////		    					fn_loadWord()
////		    				})
////		    			} else if (check == false){
////		    				Util.request("/manager/fieldDataReg/fieldDataUpdate.do", params, function(resultData){
////		    					console.log('params', params);
////		    					console.log('resultData' , resultData);
////		    					fn_loadWord()
////		    				})
////		    			}
////		    		}
//		    	})
//		    	
//		    	// 수정 
////		    				console.log('수정 되었습니다.')
////		    			
////		    	
////		    	// 파일 전송으로 인해서 form 통신으로 이루어져야함
////				
////				var validationItems = {
////	    			showType : 'top', 				// "top", "bottom"
////	    			rules : [
////	    				{fieldName:'fldCd', 	fieldTitle:'분야', 				ruleOption:["required"]},
////	    				{fieldName:'instNm', 		fieldTitle:'제공 기관', 		ruleOption:["required"]},
////	    				{fieldName:'iptstart_date', 	fieldTitle:'파일 시작 기간', 		ruleOption:["required"]},
////	    				{fieldName:'iptend_data', 	fieldTitle:'파일 종료 기간', 		ruleOption:["required"]},
////	    				{fieldName:'dataNm', 	fieldTitle:'데이터 셋명 ', 		ruleOption:["required"]},
////	    				{fieldName:'uploadFile', 	fieldTitle:'업로드 파일', 		ruleOption:["required"]},
////	    				{fieldName:'tableYn', 	fieldTitle:'DB테이블 생성 여부', 		ruleOption:["required"]},
////	    				{fieldName:'fileSe', 	fieldTitle:'파일 구분자', 		ruleOption:["required"]},
////	    				{fieldName:'sourceNm', 	fieldTitle:'출처', 		ruleOption:["required"]},
////	    			]
////	    	};
////			
////			// Validation Check
////			currForm.validate(validationItems, function(returnValidData, validSuccess){
////				
////				// Validate Success
////				if(validSuccess){
////						
////						setTimeout(function(){
////							var formData = new FormData();
////							
////							var uploadFile = $("#uploadFiles")[0].files[0];
////							
////							var codeId = currForm.getValue("codeId");
////							var atchFileId = currForm.getValue("atchFileId");
////							var targetMonth = currForm.getValue("targetMonth");
////							
////							formData.append("codeId", codeId);
////							formData.append("atchFileId", atchFileId);
////							formData.append("targetMonth", targetMonth);
////							formData.append("uploadFile", uploadFile);
////							console.log("uploadFile", uploadFile);
////							console.log("formData", formData);
////							// Ajax 방식으로 파일 업로드
////							Util.requestFileUplaod("/mamager/uploadDataMng/createUploadData.do", formData, function(result){
////								
////								//console.log(result);
////	
////					        	if(result.resultValue == "Y"){
////					        		console.log("uploadFile", uploadFile);
////									console.log("formData", formData); 
////					        		alert("데이터가 정상적으로 생성 되었습니다.");
////					        		
////					        		// 입력 항목 초기화 하기
////									fn_initFormData();
////									
////					        		// 데이터 유형 목록 데이터 가져오기
////					    	    	fn_getUploadDataList();
////					        	}else{
////									alert("처리중 오류가 발생했습니다.");
////								}
////					        });
////	
////						}, 500);
////					//});
////				};
////				
////			});
//		})
//		
//		$('#dataCancel').on('click', function(){
//			// 그냥 수정하다가 데이터를 취소한경우 어떻게 할것인가..? 단순히 false 처리로 끝내면 안됨
////			fn_disableInputElement(true);
//			fn_hiddenBtnElement('none')
//		})
//		
//		
//})