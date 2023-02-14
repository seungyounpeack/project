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
package kr.go.guri.manager.codeMng.commonCodeMng.web;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.postgresql.util.PSQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.codeMng.commonCodeMng.service.CommonCodeMngService;
import kr.go.guri.manager.logMng.service.LogService;

/**
 * 관리자 공통코드 관리 Controller 클래스
 * @author 김부권
 * @since 2022. 06. 15.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일                         수정자                            수정내용
 *  -----------       -------------   ----------------------
 *  2022.06.15.           김부권                          최초 생성
 *   
 * </pre>
 */
@Controller
@RequestMapping( "/mamager/commonCodeMng" )
public class CommonCodeMngController {

	private static final Logger LOGGER = LoggerFactory.getLogger(CommonCodeMngController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "commonCodeMngService")
	private CommonCodeMngService commonCodeMngService;						// DB 서비스 호출
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
		
	/**
	 * 관리자 > 공통코드관리 화면
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/commonCodeMng.do", method = {RequestMethod.GET, RequestMethod.POST}, produces={"application/json; charset=UTF-8"})
    public String commonCodeMng(/*@RequestParam String code,*/ HttpServletRequest request, ModelMap model) throws SQLException, Exception {
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
			System.out.println("menuCodemenuCode : " +menuCode);
			if( menuCode == null ) {
	        	return "manager-content/manager/codeMng/commonCodeMng";
			}else {
				
				return "/manager/codeMng/commonCodeMng";
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
	 * 상위 공통코드 목록 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getCommonCodeList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getCommonCodeList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> codeInfo = CommonUtil.convertMapToJson(params, "codeInfo");
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		System.out.println("1111111111111111111");
		// 메뉴 목록 조회
		List<Map<String, Object>> codeList = new ArrayList<Map<String, Object>>();
		try {
			// 메뉴 목록 조회
			codeList = commonCodeMngService.selectTopCodeList();
			System.out.println("2222222222222");
			
			// ModelAndView 객체 생성
			modelAndView = CommonUtil.makeModelAndView(jsonView);
			
			// ModelAndView에 데이터 넣기
			modelAndView.addObject("gridList", codeList);
		}catch(BadSqlGrammarException e) {
			
			LOGGER.info("BadSqlGrammarException : " + e);
		}catch(PSQLException e) {
			
			LOGGER.info("PSQLException : " + e);
		}catch(SQLException e) {
			
			LOGGER.info("SQLException : " + e);
		}catch(Exception e) {
			LOGGER.info("Exception : " + e);
		}



		return modelAndView;
	}
	
	/**
	 * 상위 코드 클릭시 공통코드 목록 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getCommonSubCodeList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getCommonSubCodeList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> codeInfo = CommonUtil.convertMapToJson(params, "codeInfo");
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		// 메뉴 목록 조회
		List<Map<String, Object>> codeList = new ArrayList<Map<String, Object>>();
		if( codeInfo != null ) {
			
			try {
				// 메뉴 목록 조회
				codeList = commonCodeMngService.selectSubCodeList(codeInfo);
				
				
				// ModelAndView 객체 생성
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				
				// ModelAndView에 데이터 넣기
				modelAndView.addObject("gridList", codeList);
			}catch(BadSqlGrammarException e) {
				
				LOGGER.info("BadSqlGrammarException : " + e);
			}catch(PSQLException e) {
				
				LOGGER.info("PSQLException : " + e);
			}catch(SQLException e) {
				
				LOGGER.info("SQLException : " + e);
			}catch(Exception e) {
				LOGGER.info("Exception : " + e);
			}
		}
		
		
		return modelAndView;
	}
	
	
	/**
	 * 상위 코드 다음정보 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getCommonTopCodeNext.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getCommonTopCodeNext(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> codeInfo = CommonUtil.convertMapToJson(params, "codeInfo");
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		// 메뉴 목록 조회
		Map<String, Object> codeNextInfo = new HashMap<String, Object>();
		Map<String, Object> codeNextSqe = new HashMap<String, Object>();
		Map<String, Object> codeNext = new HashMap<String, Object>();
		if( codeInfo != null ) {
			
			try {
				// 메뉴 목록 조회
				codeNextInfo = commonCodeMngService.selectNextTopCode();
				codeInfo.put("groupCode", "ROOT");
				codeNextSqe = commonCodeMngService.selectCodeSqe(codeInfo);
				
				// ModelAndView 객체 생성
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				
				codeNext.put("codeNextInfo", codeNextInfo.get("nextCode"));
				codeNext.put("codeNextSqe", codeNextSqe.get("cdSqe"));
				
				// ModelAndView에 데이터 넣기
				modelAndView.addObject("codeNext", codeNext);
			}catch(BadSqlGrammarException e) {
				
				LOGGER.info("BadSqlGrammarException : " + e);
			}catch(PSQLException e) {
				
				LOGGER.info("PSQLException : " + e);
			}catch(SQLException e) {
				
				LOGGER.info("SQLException : " + e);
			}catch(Exception e) {
				LOGGER.info("Exception : " + e);
			}
		}
		
		
		
		return modelAndView;
	}
	
	/**
	 * 하위 코드 다음정보 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getCommonSubCodeNext.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getCommonSubCodeNext(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> codeInfo = CommonUtil.convertMapToJson(params, "subCodeInfo");
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		// 메뉴 목록 조회
		Map<String, Object> codeNextSqe = new HashMap<String, Object>();
		if( codeInfo != null ) {
			
			try {
				// 메뉴 목록 조회
				codeNextSqe = commonCodeMngService.selectCodeSqe(codeInfo);
				
				// ModelAndView 객체 생성
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				
				
				// ModelAndView에 데이터 넣기
				modelAndView.addObject("codeNextSqe", codeNextSqe.get("cdSqe"));
			}catch(BadSqlGrammarException e) {
				
				LOGGER.info("BadSqlGrammarException : " + e);
			}catch(PSQLException e) {
				
				LOGGER.info("PSQLException : " + e);
			}catch(SQLException e) {
				
				LOGGER.info("SQLException : " + e);
			}catch(Exception e) {
				LOGGER.info("Exception : " + e);
			}
		}else {
			
		}
		
		
		
		return modelAndView;
	}
	
	
	/**
	 * 상위 공통코드 정보 저장하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertCommonTopCodeList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView insertCommonTopCodeList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> codeInfo = CommonUtil.convertMapToJson(params, "codeInfo");
		
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		
		int resultCnt = 0;
		if( codeInfo != null ) {
			
			try {
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				
				//상위 공통코드 insert
				resultCnt = commonCodeMngService.insertTopCodeInfo(codeInfo);
				// ModelAndView 객체 생성
				
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
		}else {
			modelAndView.addObject("resultValue", "N");
		}
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);

		return modelAndView;
	}
	
	/**
	 * 하위 공통코드 정보 저장하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/insertCommonSubCodeList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView insertCommonSubCodeList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> codeInfo = CommonUtil.convertMapToJson(params, "subCodeInfo");
		
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		
		int resultCnt = 0;
		int subCnt = 0;
		if( codeInfo != null ) {
			try {
				
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				
				//하위 공통코드 insert
				resultCnt = commonCodeMngService.insertSubCodeInfo(codeInfo);
				subCnt = commonCodeMngService.selectGroupCodeCnt(codeInfo).size();
				codeInfo.put("lwrtCdHavCnt", subCnt);
				System.out.println("codeInfo ============= "+codeInfo); 
				commonCodeMngService.updateTopCodeInfo(codeInfo);
				// ModelAndView 객체 생성
				
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
		}else {
			modelAndView.addObject("resultValue", "N");
		}
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);

		return modelAndView;
	}
	
	
	/**
	 * 상위 공통코드 정보 수정하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateCommonTopCodeList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateCommonTopCodeList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> codeInfo = CommonUtil.convertMapToJson(params, "codeInfo");
		
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		
		int resultCnt = 0;
		if( codeInfo != null ) {
			try {
				
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				
				//하위 공통코드 insert
				resultCnt = commonCodeMngService.updateTopCodeInfo(codeInfo);
				// ModelAndView 객체 생성
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
		}else {
			modelAndView.addObject("resultValue", "N");
		}
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);

		return modelAndView;
		
	}
	
	/**
	 * 하위 공통코드 정보 수정하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/updateCommonSubCodeList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView updateCommonSubCodeList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> subCodeInfo = CommonUtil.convertMapToJson(params, "subCodeInfo");
				
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		
		int resultCnt = 0;
		if( subCodeInfo != null ) {
			try {
				
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				
				//하위 공통코드 insert
				resultCnt = commonCodeMngService.updateSubCodeInfo(subCodeInfo);
				// ModelAndView 객체 생성
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
		}else {
			modelAndView.addObject("resultValue", "N");
		}
		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);

		return modelAndView;
	}
	
	
	/**
	 * 공통코드 정보 삭제하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	/*@RequestMapping(value = "/mamager/codeMng/deleteCommonCodeList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView deleteCommonCodeList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> codeInfo = CommonUtil.convertMapToJson(params, "codeInfo");

		int resultCnt = commonCodeMngService.deleteCodeInfo(codeInfo);
		
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("resultCnt", resultCnt);
		modelAndView.addObject("resultValue", "Y");

		return modelAndView;
	}*/
	
}
