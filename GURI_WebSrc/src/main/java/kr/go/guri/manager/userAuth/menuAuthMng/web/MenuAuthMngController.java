package kr.go.guri.manager.userAuth.menuAuthMng.web;

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
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.logMng.service.LogService;
import kr.go.guri.manager.userAuth.menuAuthMng.service.MenuAuthMngService;

/**
 * 메뉴 권한 조회 controller
* @author 김부권
* @since 2022. 06. 22.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*     수정일                         수정자                            수정내용
*  -----------       -------------   ----------------------
*  2022.06.22.           김부권                          최초 생성
*   
* </pre>
*/
@Controller
@RequestMapping( "/mamager/menuAuthMng" )
public class MenuAuthMngController {
private static final Logger LOGGER = LoggerFactory.getLogger(MenuAuthMngController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "menuAuthMngService")
	private MenuAuthMngService menuAuthMngService;						// DB 서비스 호출

	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	/**
	 * 관리자 > 사용자 조회 화면
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/menuAuthMng.do", method = {RequestMethod.GET, RequestMethod.POST}, produces={"application/json; charset=UTF-8"})
    public String menuAuthMng(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception {
		
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
				
	        	return "manager-content/manager/userAuth/menuAuthMng";
			}else {
				
				return "/manager/userAuth/menuAuthMng";
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
	 * 권한 리스트 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/menuAuthMngList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView menuAuthMngList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		List<Map<String, Object>> authList = new ArrayList<Map<String, Object>>();
		
		ModelAndView modelAndView = new ModelAndView();
		try {
			authList  = menuAuthMngService.selectAuthList(params);
			modelAndView = CommonUtil.makeModelAndView(jsonView);
		}catch(SQLException e) {
			LOGGER.info("SQLEXCEPTION : " + e);
			modelAndView.addObject("resultValue", "N");
		}catch(Exception e) {
			LOGGER.info("EXCEPTION : " + e);
			modelAndView.addObject("resultValue", "N");
			
		}
		modelAndView.addObject("authList"      , authList);
		return modelAndView;
	}
	
	/**
	 * 메뉴 권한 리스트 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getMenuAuthMngList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getMenuAuthMngList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		List<Map<String, Object>> menuList = new ArrayList<Map<String, Object>>();
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		try {
			menuList  = menuAuthMngService.selectAuthMenuList(params);
		}catch(SQLException e) {
			LOGGER.info("SQLEXCEPTION : " + e);
			modelAndView.addObject("resultValue", "N");
		}catch(Exception e) {
			LOGGER.info("EXCEPTION : " + e);
			modelAndView.addObject("resultValue", "N");
			
		}
		modelAndView.addObject("menuList"   , menuList);
		
		return modelAndView;
	}
	
	
	/**
	 * 권한별 메뉴 접근 정보 저장
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/saveMenuAuthMng.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView saveMenuAuthMng(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> paramInfo = CommonUtil.convertMapToJson(params, "menuInfo");
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> check = new ArrayList<Map<String, Object>>();
		int resultCnt = 0;
		if( paramInfo != null ) {
			System.out.println("==========================paramInfo : " + paramInfo);
			try {
				List<Map<String, Object>> checkList = (List) params.get("roleList");
				
				//권한별 메뉴 있는지 체크
				check = menuAuthMngService.selectCheckMenuAuth(paramInfo);
				int checkCnt = check.size();
				modelAndView = CommonUtil.makeModelAndView(jsonView);
				if( checkCnt > 0 ) {
					
					//삭제
					menuAuthMngService.deleteAuthMenuInfo(paramInfo);
					for( int i = 0 ; i < checkList.size(); i++ ) {
						Map<String, Object> insertParam = checkList.get(i);
						insertParam.put("loginId", paramInfo.get("loginId"));
						insertParam.put("roleCode", paramInfo.get("roleCode"));
						//재등록
						resultCnt = menuAuthMngService.insertAuthMenuInfo(insertParam);
						modelAndView.addObject("resultValue", "Y");
					}
				}else {
					//등록
					for( int i = 0 ; i < checkList.size(); i++ ) {
						Map<String, Object> insertParam = checkList.get(i);
						insertParam.put("loginId", paramInfo.get("loginId"));
						insertParam.put("roleCode", paramInfo.get("roleCode"));
						//재등록
						resultCnt = menuAuthMngService.insertAuthMenuInfo(insertParam);
						modelAndView.addObject("resultValue", "Y");
					}
				}
			}catch(SQLException e) {
				LOGGER.info("SQLEXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
			}catch(Exception e) {
				LOGGER.info("EXCEPTION : " + e);
				modelAndView.addObject("resultValue", "N");
				
			}
		}
		
		modelAndView.addObject("resultCnt"   , resultCnt);
		//modelAndView.addObject("positionList"     , positionList);
		
		return modelAndView;
	}
	
}
