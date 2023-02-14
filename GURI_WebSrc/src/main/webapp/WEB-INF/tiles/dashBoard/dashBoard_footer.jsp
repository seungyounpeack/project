<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
  /**
  * @Class Name : dashBoard_footer.jsp
  * @Description : dashBoard footer 영역
  * @Modification Information
  *
  *     수정일         	  수정자                           수정내용
  *  ----------   -------------   ----------------------
  *  2021.07.07      김 부 권             최초 생성
  */
%>

	<!-- footer -->
        <div id="footer">
			Copyright ⓒ 2021 Uijeongbu CITY.All rights reserved.
		</div>
		
		<div class="jogger">
			<ul class="menu_jog">
				<li><a href="javascript:fn_callBack();" index="0" id="menu_prev" class="menu_prev">이전 메뉴로</a></li>
				<li><a href="javascript:fn_goHome('MENU_00002');"  menucode="MENU_00002" linkurl="/dashBoard/main.do"  class="menu_home">홈으로</a></li>
				<li><a href="javascript:fn_forward();" index="0" id="menu_next" class="menu_next">다음 메뉴로</a></li>
			</ul>
		</div>
        <!-- footer End -->
  		<!-- 20210826 음성버튼 추가 -->
		<p id="voice" class="btn_voice" style="display: none;"><a href="javascript:Start();" ><img id="voiceImg" src="${pageContext.request.contextPath}/dist/images/btn_mic_stop.png" alt="음성인식버튼"></a></p>
		<input type="hidden" id="speech_result" value="">

		<script type="text/javascript">
			//홈으로가기
			function fn_goHome(menuCode){
				var menuItem = $(this);
				console.log("this : ", this)
				// Content 영역에 표시할 화면을 Load 한다
				var menuParam = menuCode;
				Util.loadContentPage(menuParam);
			}
		
		
			//뒤로가기		
			function fn_callBack(){
				console.log("뒤로가기 menuBeforeList : 	", menuList)
				
				if( parseInt($("#menu_prev").attr("index")) > 0 ){
					console.log("실행")
					var cnt = parseInt($("#menu_prev").attr("index"))-1;
				console.log("뒤로가기 cnt  : " , cnt)
					Util.loadContentPage(menuList[cnt], cnt);
				console.log("map zomm : " , map.getCenter());
				console.log("map zomm : " , map.getBounds());
				//map.setZoom(11)
				//127.06842172797155, lat: 37.73619329481254
				//map.setCenter([127.039054678593,37.7325924013584]);
					//menuAfterList.pop();
				}
			}
			
			function fn_forward(){
				console.log("앞으로가기menuList : " , menuList)
				console.log("앞으로가기menuList.length : " , menuList.length)
				if( parseInt($("#menu_next").attr("index")) < menuList.length-1 ){
					
					var cnt = parseInt($("#menu_prev").attr("index"))+1;
					Util.loadContentPage(menuList[cnt], cnt);
				}
			}


		</script>