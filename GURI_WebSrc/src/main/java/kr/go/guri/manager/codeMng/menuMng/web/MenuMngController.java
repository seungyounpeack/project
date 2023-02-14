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
package kr.go.guri.manager.codeMng.menuMng.web;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.codeMng.menuMng.service.MenuMngService;
import kr.go.guri.manager.logMng.service.LogService;

/**
 * 메뉴 관리 Controller 클래스
 * @author 김부권
 * @since 2022. 06. 17.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *       수정일			     수정자		               수정내용
 *  --------------    -------------   ----------------------
 *  2022. 06. 17.   	     김부권                        최초 생성
 *   
 * </pre>
 */
@Controller
@RequestMapping( "/mamager/menuMng" )
public class MenuMngController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MenuMngController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "menuMngService")
	private MenuMngService menuMngService;						// DB 서비스 호출
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	
	/**
	 * 관리자 > 메뉴관리 화면
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/menuMng.do", method = {RequestMethod.GET, RequestMethod.POST}, produces={"application/json; charset=UTF-8"})
    public String commonCodeMng(/*@RequestBody Map<String, Object> params, */HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		LoginVO loginVO = CommonUtil.getLoginInfo();
		//메뉴코드
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		
		String menuCode = request.getParameter("menuCode");
		try {
			// 로그인 사용자 정보를 Session에서 가져오기
			paramInfo.put("loginId", loginVO.getId());
			paramInfo.put("menuCode", menuCode);
			logService.createMenuLog(paramInfo);
			logService.createUserLog(paramInfo);
	        if( menuCode == null ) {
	        	return "manager-content/manager/codeMng/menuMng";
			}else {
				return "/manager/codeMng/menuMng";
			}
			}catch (SQLException e) {
				LOGGER.info("userAuthMng SQLException Error");
				return "/common/errorPage/error";
			}catch (Exception e) {
				LOGGER.info("userAuthMng Error");
				return "/common/errorPage/error";
			}
		
        
    }
	
	
	/**
	 * 메뉴 목록 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws SQLException
	 * @throws Exception
	 */
	@RequestMapping(value = "/getMenuList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getMenuList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> menuList = new ArrayList<Map<String, Object>>(); 
		try {
			
			// 메뉴 목록 조회
			menuList = menuMngService.selectMenuList();
			// ModelAndView 객체 생성
			modelAndView = CommonUtil.makeModelAndView(jsonView);
		}catch( SQLException e ) {
			LOGGER.info("SQLException : " + e);
		}catch(Exception e) {
			LOGGER.info("Exception : " + e);
			
		}

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("gridList", menuList);

		return modelAndView;
	}
	
	/**
	 * 메뉴 목록 조회 및 생성
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws SQLException
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectAuthMenuList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView selectAuthMenuList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> menuList = new ArrayList<Map<String, Object>>(); 
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> menuInfo = CommonUtil.convertMapToJson(params, "menuInfo");
		
		
		try {
			System.out.println("menuInfo :: "+ menuInfo);
			// 메뉴 목록 조회
			menuList = menuMngService.selectAuthMenuList(menuInfo);
			// ModelAndView 객체 생성
			modelAndView = CommonUtil.makeModelAndView(jsonView);
		}catch( SQLException e ) {
			LOGGER.info("SQLException : " + e);
		}catch(Exception e) {
			LOGGER.info("Exception : " + e);
			
		}
		
		//modelAndView.addObject("loginUserInfo", loginVO.getId());
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("menuList", menuList);
		
		return modelAndView;
	}
	
	/**
	 * 메뉴 다음 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectMenuNext.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView selectMenuNext(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> menuInfo = CommonUtil.convertMapToJson(params, "menuInfo");
		
		System.out.println("menuInfo ================ : " + menuInfo);
		//ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> menuNext = new ArrayList<Map<String, Object>>(); 
		if( menuInfo != null ) {
			
			try {
				
				// 메뉴 다음 조회
				menuNext = menuMngService.selectMenuNext(menuInfo);
				// ModelAndView 객체 생성
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				modelAndView.addObject("resultValue", "Y");
			}catch( SQLException e ) {
				LOGGER.info("SQLException : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("Exception : " + e);
				modelAndView.addObject("resultValue", "N");
			}
		}
		
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("menuNext", menuNext);
		return modelAndView;
	}
	
	
	/**
	 * 공통코드 정보 저장하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertMenuList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView insertMenuList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> menuInfo = CommonUtil.convertMapToJson(params, "menuInfo");
		System.out.println("menuInfo :: " + menuInfo);
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		// 메뉴 정보 저장
		int resultCnt = 0;
		// ModelAndView 객체 생성
		modelAndView = CommonUtil.makeModelAndView(jsonView);
		if( menuInfo != null ) {
			
			try {
				Map<String, Object> depth = menuMngService.selectMenuDp(menuInfo);
				if( depth.get("menuDp") != null ) {
					menuInfo.put("menuDp", depth.get("menuDp").toString());
				}else {
					menuInfo.put("menuDp", "1");
				}
				menuInfo.put("imgClass", "fa fa-folder-open-o");
				resultCnt = menuMngService.insertTopMenuInfo(menuInfo);
				// ModelAndView 객체 생성
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				// ModelAndView에 데이터 넣기
				modelAndView.addObject("resultValue", "Y");
			}catch( DuplicateKeyException e ) {
				LOGGER.info("DuplicateKeyException : " + e);
				modelAndView.addObject("resultValue", "D");
			}catch(SQLException e) {
				LOGGER.info("SQLException : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("Exception : " + e);
				modelAndView.addObject("resultValue", "N");
			}
		}
		modelAndView.addObject("resultCnt", resultCnt);
		
		return modelAndView;
	}
	
	
	/**
	 * 메뉴 정보 수정하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateMenuList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateMenuList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> menuInfo = CommonUtil.convertMapToJson(params, "menuInfo");
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		// 메뉴 정보 저장
		int resultCnt = 0;
		System.out.println("menuInfo :: " + menuInfo);
		// ModelAndView 객체 생성
		modelAndView = CommonUtil.makeModelAndView(jsonView);
		if( menuInfo != null ) {
			
			try {
				Map<String, Object> depth = menuMngService.selectMenuDp(menuInfo);
				System.out.println("depth.get(\"menuDp\") : "+depth.get("menuDp"));
				if( depth.get("menuDp") != null ) {
					System.out.println("menuDp :::::: " + depth.get("menuDp"));
					System.out.println("menuDp :::::: " + depth.get("menuDp"));
					menuInfo.put("menuDp", depth.get("menuDp").toString());
				}else {
					menuInfo.put("menuDp", "1");
					
				}
				resultCnt = menuMngService.updateTopMenuInfo(menuInfo);
				// ModelAndView 객체 생성
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				// ModelAndView에 데이터 넣기
				modelAndView.addObject("resultValue", "Y");
			}catch(SQLException e) {
				LOGGER.info("SQLException : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("Exception : " + e);
				modelAndView.addObject("resultValue", "N");
			}
		}
		modelAndView.addObject("resultCnt", resultCnt);
		// ModelAndView에 데이터 넣기

		return modelAndView;
	}
	
	
	/**
	 * 메뉴정보 정보 삭제하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/deleteMenuList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView deleteMenuList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception {
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> menuInfo = CommonUtil.convertMapToJson(params, "menuInfo");
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		// 메뉴 정보 저장
		int resultCnt = 0;
		// ModelAndView 객체 생성
		modelAndView = CommonUtil.makeModelAndView(jsonView);
		if( menuInfo != null ) {
			try {
				if( menuInfo.get("sort").toString() == "1" ) {
					resultCnt = menuMngService.deleteTopMenuInfo(menuInfo);
				}else {
					resultCnt = menuMngService.deleteSubMenuInfo(menuInfo);
				}
				// ModelAndView 객체 생성
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				// ModelAndView에 데이터 넣기
				modelAndView.addObject("resultValue", "Y");
			}catch(SQLException e) {
				LOGGER.info("SQLException : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("Exception : " + e);
				modelAndView.addObject("resultValue", "N");
			}
		}
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);

		return modelAndView;
	}
	
}
