package kr.go.guri.dashBoard.main.web;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.dashBoard.main.service.MainService;
import kr.go.guri.manager.logMng.service.LogService;

/**
 * 메인 controller
 * @author 김성중
 * @since 2021. 08. 27.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일			         수정자				수정내용
 *  -------------    -------------   ----------------------
 *  2021. 08. 27.	        김 성 중              최초생성
 *   
 * </pre>
 */
@Controller
public class MainController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);

	@Resource(name = "mainService")
	private MainService mainService;

	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	@Autowired
	private MappingJackson2JsonView jsonView;
	
	/**
	 * 메인 화면
	 * @param 
	 * @param model
	 * @return 
	 * @throws Exception
	 */
	@RequestMapping(value = "/dashBoard/main.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
    public String main(/*@RequestBody Map<String, Object> params, */HttpServletRequest request, ModelMap model) throws NullPointerException, Exception {
		//메뉴코드
		String menuCode = "MENU_00002";
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		if(loginVO.getId() ==null) {
			return "/intro/intro";
		}else {
			
			// Parameter 객체
			Map<String, Object> paramInfo = new HashMap<String, Object>();
			paramInfo.put("loginId", loginVO.getId());
			paramInfo.put("menuCode", menuCode);
			logService.createMenuLog(paramInfo);
			logService.createUserLog(paramInfo);
			if( request.getParameter("menuCode") == null ) {
				
				return "/dashBoard/main";
			}else {
				
				return "dashBoard-content/dashBoard/main";
			}
		}
    }
	
	/**
	 * 메인 전체 데이터 조회
	 * @param request
	 * @param params
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping(value = "/dashBoard/mainData.do", method = RequestMethod.POST, produces = ("application/json; charset-UTF-8"))
	public ModelAndView mainData(HttpServletRequest request, @RequestBody Map<String, Object> params) throws SQLException, Exception {

		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		//
		List<Map<String, Object>> categoryList = mainService.getMainCategoryList();

		List<Map<String, Object>> admdArea = mainService.selectAdmdArea();
		// 코로나 확인자 현황
		Map<String, Object> covidInfo = mainService.getCovidInfo();
		
		Map<String, Object> populationInfo = mainService.getPopulationInfo();
		Map<String, Object> populationFlowInfo = mainService.getPopulationFlowInfo();
		//List<Map<String, Object>> businessList = mainService.getBusinessList();
		//List<Map<String, Object>> complaintList = mainService.getComplaintList();
		//List<Map<String, Object>> opinionList = mainService.getOpinionList();
		Map<String, Object> complaintReceived = mainService.getComplaintReceived();
		
		List<Map<String, Object>> newsList = mainService.getNewsList();
		
		List<Map<String, Object>> wordCloud = mainService.selectCompWordcloud();
		List<Map<String, Object>> selectCompStatus = mainService.selectCompStatus();
		Map<String, Object> weatherInfo = mainService.getWeatherInfo();
		Map<String, Object> airInfo = mainService.getAirInfo();
		
		List<List<Map<String, Object>>> tpList = new ArrayList<>();
		//행정동 속성정보 가져오기
		List<Map<String, Object>> attribute = mainService.selectDongAttribute();
		//민원 접수 현황 데이터 조회
		/*tpList.add(mainService.selectMainTpList("가로수"));
		tpList.add(mainService.selectMainTpList("신호등"));
		tpList.add(mainService.selectMainTpList("주차장"));
		tpList.add(mainService.selectMainTpList("어린이 보호구역"));
		tpList.add(mainService.selectMainTpList("공원수목"));
		tpList.add(mainService.selectMainTpList("안전표지"));
		tpList.add(mainService.selectMainTpList("어린이집"));
		tpList.add(mainService.selectMainTpList("횡단보도"));
		tpList.add(mainService.selectMainTpList("안전비상벨"));
		tpList.add(mainService.selectMainTpList("무료와이파이"));
		tpList.add(mainService.selectMainTpList("소방용수시설"));
		tpList.add(mainService.selectMainTpList("CCTV"));
		*/
		for( int i = 0 ; i < categoryList.size(); i++ ) {
			tpList.add(mainService.selectMainTpList(categoryList.get(i).get("tp").toString()));
		}
		
		modelAndView.addObject("categoryList", categoryList);
		modelAndView.addObject("admdArea", admdArea);
		modelAndView.addObject("covidInfo", covidInfo);
		modelAndView.addObject("populationInfo", populationInfo);
		modelAndView.addObject("populationFlowInfo", populationFlowInfo);
		//modelAndView.addObject("businessList", businessList);
		//modelAndView.addObject("complaintList", complaintList);
		//modelAndView.addObject("opinionList", opinionList);
		modelAndView.addObject("complaintReceived", complaintReceived);
		modelAndView.addObject("newsList", newsList);
		modelAndView.addObject("wordCloud", wordCloud);
		modelAndView.addObject("selectCompStatus", selectCompStatus);
		modelAndView.addObject("attribute", attribute);

		modelAndView.addObject("weatherInfo", weatherInfo);
		modelAndView.addObject("airInfo", airInfo);
		modelAndView.addObject("tpList", tpList);
		return modelAndView;
	}
}
