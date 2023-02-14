package kr.go.guri.manager.userAuth.userSearch.web;

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

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.logMng.service.LogService;
import kr.go.guri.manager.userAuth.userSearch.service.UserSearchService;


@Controller
@RequestMapping( "/mamager/userSearch" )
public class UserSearchController {
private static final Logger LOGGER = LoggerFactory.getLogger(UserSearchController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "userSearchService")
	private UserSearchService userSearchService;						// DB 서비스 호출

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
	@RequestMapping(value = "/userSearch.do", method = {RequestMethod.GET, RequestMethod.POST}, produces={"application/json; charset=UTF-8"})
    public String userSearch(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception {
		
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
				
	        	return "manager-content/manager/userAuth/userSearch";
			}else {
				
				return "/manager/userAuth/userSearch";
			}
	        
			}catch (SQLException e) {
				LOGGER.info("userSearch SQLException Error");
				return "/common/errorPage/error";
			}catch (Exception e) {
				LOGGER.info("userSearch Error");
				return "/common/errorPage/error";
			}
		
		
    }
	
	/**
	 * 부서 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/userSearchList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView userSearchList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		List<Map<String, Object>> userSearchList  = userSearchService.selectSearchList(params);
		List<Map<String, Object>> deptAllList     = userSearchService.getDeptAllGetList();
		List<Map<String, Object>> positionList    = userSearchService.getPositionList();

		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		modelAndView.addObject("userSearchList"   , userSearchList);
		modelAndView.addObject("deptAllList"      , deptAllList);
		modelAndView.addObject("positionList"     , positionList);
		
		return modelAndView;
	}
	
}
