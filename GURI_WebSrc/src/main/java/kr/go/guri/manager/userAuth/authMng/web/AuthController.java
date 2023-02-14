/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package kr.go.guri.manager.userAuth.authMng.web;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import egovframework.rte.fdl.idgnr.EgovIdGnrService;
import kr.go.guri.cmm.util.ComStringUtil;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.logMng.service.LogService;
import kr.go.guri.manager.userAuth.authMng.service.AuthService;

/**
 * 관리자 > 권한 관리 Controller 클래스
 * @author 김부권
 * @since 2021. 08. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.08.25.   	김부권          최초 생성
 *   
 * </pre>
 */
@Controller
@RequestMapping( "/mamager/authMng" )
public class AuthController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "authService")
	private AuthService authService;						// DB 서비스 호출

	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	//@Resource(name = "roleIdGnrService")
	//private EgovIdGnrService idgenService;
		
		
	/**
	 * 관리자 > 권한관리 화면
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/authMng.do", method = {RequestMethod.GET, RequestMethod.POST}, produces={"application/json; charset=UTF-8"})
    public String authMng(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws NullPointerException, Exception {
		
		LoginVO loginVO = CommonUtil.getLoginInfo();
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		try {
		//메뉴코드
		String menuCode = request.getParameter("menuCode");
		// 로그인 사용자 정보를 Session에서 가져오기
		paramInfo.put("loginId", loginVO.getId());
		paramInfo.put("menuCode", menuCode);
		logService.createMenuLog(paramInfo);
		logService.createUserLog(paramInfo);
		if( menuCode == null ) {
			
        	return "manager-content/manager/userAuth/authMng";
		}else {
			
			return "/manager/userAuth/authMng";
		}
		}catch (SQLException e) {
			LOGGER.info("authMng SQLException Error");
			return "/common/errorPage/error";
		}catch (Exception e) {
			LOGGER.info("authMng Error");
			return "/common/errorPage/error";
		}
    }
	
	
	
	/**
	 * 권한 목록 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getAuthList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getAuthList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> roleInfo = CommonUtil.convertMapToJson(params, "roleInfo");

		// 권한 목록 조회
		List<Map<String, Object>> roleList = authService.selectAuthList(roleInfo);
		
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("gridList", roleList);
		}catch (SQLException e) {
			LOGGER.info("getAuthList SQLException Error");
		}catch (Exception e) {
			LOGGER.info("getAuthList Error");
		}
		return modelAndView;
	}
	
	
	
	/**
	 * 권한 정보 저장하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertAuthList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView insertAuthList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> roleInfo = CommonUtil.convertMapToJson(params, "roleInfo");
		
		// 신규 Menu ID 만들기
		//String nextRoleId = idgenService.getNextStringId();
		
		// Menu Code 설정
		//roleInfo.put("RoleCode", nextRoleId);

		int resultCnt = authService.insertAuthInfo(roleInfo);

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);
		modelAndView.addObject("resultValue", "Y");
		}catch (SQLException e) {
			LOGGER.info("insertAuthList SQLException Error");
		}catch (Exception e) {
			LOGGER.info("insertAuthList Error");
		}
		return modelAndView;
	}
	
	
	
	/**
	 * 권한 정보 수정하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateAuthList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateAuthList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> roleInfo = CommonUtil.convertMapToJson(params, "roleInfo");

		// 수정 처리
		int resultCnt = authService.updateAuthInfo(roleInfo);

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);
		modelAndView.addObject("resultValue", "Y");
		}catch (SQLException e) {
			LOGGER.info("updateAuthList SQLException Error");
		}catch (Exception e) {
			LOGGER.info("updateAuthList Error");
		}
		return modelAndView;
	}
	
	
	
	/**
	 * 권한 정보 삭제하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteAuthList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView deleteAuthList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);

		try {
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> roleInfo = CommonUtil.convertMapToJson(params, "roleInfo");

		// 삭제 처리
		int resultCnt = authService.deleteAuthInfo(roleInfo);
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);
		modelAndView.addObject("resultValue", "Y");
		}catch (SQLException e) {
			LOGGER.info("deleteAuthList SQLException Error");
		}catch (Exception e) {
			LOGGER.info("deleteAuthList Error");
		}
		return modelAndView;
	}
	
	
	
	/**
	 * 권한 코드별 선택한 메뉴 목록 조회하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAuthMenuList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView selectAuthMenuList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> roleInfo = (Map)params.get("roleInfo");
				//CommonUtil.convertMapToJson(params, "roleInfo");
		// 메뉴 목록 조회
		List<Map<String, Object>> menuList = authService.selectAuthMenuList(roleInfo);
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("gridList", menuList);
		}catch (SQLException e) {
			LOGGER.info("selectAuthMenuList SQLException Error");
		}catch (Exception e) {
			LOGGER.info("selectAuthMenuList Error");
		}
		return modelAndView;
	}
	
	
	/**
	 * 권한별 메뉴 설정 정보 수정하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateAuthMenuList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateAuthMenuList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
		// 권한 정보 받기
		Map<String, Object> AuthInfo = CommonUtil.convertMapToJson(params, "roleInfo");
		
		// 메뉴 목록 받기
		List<Map<String, Object>> paramMenuList = (List)params.get("menuList");
				//CommonUtil.convertListToJson(params, "menuList");
		
		// 처리 건수
		int resultCnt = 0;
		
		String strRoleCode = AuthInfo.get("roleCode").toString();
		String userId = AuthInfo.get("loginId").toString();
		
		// 권한 코드값이 있는지 체크
		if(!ComStringUtil.isEmpty(strRoleCode)) {
			
			// Parameter로 받은 메뉴 데이터가 있는지 체크
			if(paramMenuList.size() > 0) {
				
				// 권한별 메뉴 정보를 삭제한다
				authService.deleteAuthMenuInfo(AuthInfo);
				
				// 선택한 메뉴 목록을 저장한다
				for(Map<String, Object> menuInfo : paramMenuList) {
					
					// 권한 정보에서 권한 코드 가져오기
					menuInfo.put("roleCode", strRoleCode);
					menuInfo.put("loginId", userId);
					
					// 메뉴 정보 저장하기
					resultCnt += authService.insertAuthMenuInfo(menuInfo);
					
				};
			}
		}

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);
		modelAndView.addObject("resultValue", "Y");
		}catch (SQLException e) {
			LOGGER.info("updateAuthMenuList SQLException Error");
		}catch (Exception e) {
			LOGGER.info("updateAuthMenuList Error");
		}
		return modelAndView;
	}
	
}
