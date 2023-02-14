/**
 * @Description		: 공통코드 조회 Controller
 * @Source        	: CommonController.java
 * @author 			: 신용삼
 * @since 			: 2019. 8. 14. 
 * @version 		: 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2019. 8. 14.    신용삼          최초 생성
 *   
 * </pre>
 */
package kr.go.guri.common.web;

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
import kr.go.guri.common.service.CommonService;


@Controller
public class CommonController {

	private static final Logger LOGGER = LoggerFactory.getLogger(CommonController.class);
	
	@Resource(name = "commonService")
	private CommonService commonService;					// 공통코드 서비스
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	
	
	/**
	 * 권한별 메뉴 목록 조회
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectRoleMenuList.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView selectRoleMenuList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException ,Exception {
	
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> menuInfo = CommonUtil.convertMapToJson(params, "menuInfo");
		LoginVO loginVO = CommonUtil.getLoginInfo();
		// 권한별 메뉴 목록 조회
		List<Map<String, Object>> menuList = commonService.selectRoleMenuList(menuInfo);
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		modelAndView.addObject("menuList", menuList);								// ModelAndView에 데이터 넣기
		modelAndView.addObject("loginUserInfo", loginVO.getId());
		return modelAndView;
	}
	
	
	/**
	 * 메뉴 권한 체크
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/checkRoleMenuCnt.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView checkRoleMenuCnt(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		LoginVO loginVO = CommonUtil.getLoginInfo();
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> menuInfo = CommonUtil.convertMapToJson(params, "menuInfo");
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		// 메뉴 권한 체크
		System.out.println("params : "+ params);
		System.out.println("menuInfo : "+ menuInfo);
		Map<String, Object> chkMenuInfo = new HashMap<String, Object>();
		
		try {
			chkMenuInfo = commonService.checkRoleMenuCnt(menuInfo);
			
		}catch( SQLException e ) {
			LOGGER.info("SQLException : " + e);
		}catch(Exception e) {
			LOGGER.info("Exception : " + e);
			
		}
		modelAndView.addObject("loginUserInfo", loginVO.getId());
		modelAndView.addObject("menuInfo", chkMenuInfo);						// ModelAndView에 데이터 넣기
		
		return modelAndView;
	}
	
}
