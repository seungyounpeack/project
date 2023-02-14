package kr.go.guri.solution.workList.web;

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
import kr.go.guri.cmm.util.FrequentlyUtil;
import kr.go.guri.manager.logMng.service.LogService;
import kr.go.guri.solution.workList.service.WorkListService;

/**
 * 관리자 > 공지사항 Controller 클래스
 * @author 권기완
 * @since 2022. 10. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2022.10.26.   	권기완          최초 생성
 *   
 * </pre>
 */
@Controller
@RequestMapping("/solution/workList/")
public class WorkListController {
	private static final Logger LOGGER = LoggerFactory.getLogger(WorkListController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	@Resource(name = "workListService")
	private WorkListService WorkListService;						// DB 서비스 호출
	/**
	 * 솔루션 워크플로워 리스트 페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "workList.do", produces={"application/json; charset=UTF-8"})
	public String noticeMngMain(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws Exception{
		
		//메뉴코드
		//String menuCode = "MENU_00057";
		// Parameter 객체
		//Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		//LoginVO loginVO = CommonUtil.getLoginInfo();
		try {/*
		paramInfo.put("loginId", loginVO.getId());
		paramInfo.put("menuCode", menuCode);
		logService.createMenuLog(paramInfo);
		model.addAttribute("startDate", logService.selectLogDate());*/
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		
		return "/solution/workList/workList";
	}
	
	/**
	 * 워크플로워 리스트 초기데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "workList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView workList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		
		Map<String, Object> param = FrequentlyUtil.pageSetParam(params);
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		//공지사항 리스트 조회
		List<Map<String, Object>> workList = new ArrayList<Map<String, Object>>();
		Map<String, Object> page = new HashMap<String, Object>();
		List<Map<String, Object>> category = new ArrayList<Map<String, Object>>();
		try {
			if(params.get("sort") != null) {
				param.put("sort", params.get("sort").toString());
				}
			param.put("keyword", params.get("keyword").toString());
			if(params.get("chkCat") != null) {
				List<String> chkCat = (List<String>) params.get("chkCat");
				param.put("chkCat", chkCat.toArray());
				System.out.println("22222222 : " + params.get("chkCat"));
				}
			if(params.get("chkFee") != null) {
				param.put("chkFee", params.get("chkFee").toString());
				}
			System.out.println("param : " + param);
			System.out.println("params : " + params);
		workList = WorkListService.selectWorkList(param);
		category = WorkListService.selectCategory();
		
		param = CommonUtil.getParam(workList, param);
		page = FrequentlyUtil.pageParam(param);
		modelAndView.addObject("resultValue", "Y");	
		}catch(SQLException e){
			modelAndView.addObject("resultValue", "N");	
			LOGGER.info("error ============== : " + e);
		}catch(Exception e){
			modelAndView.addObject("resultValue", "N");	
			LOGGER.info("error ============== : " + e);
		}
		modelAndView.addObject("page", page);	
		modelAndView.addObject("workList", workList);
		modelAndView.addObject("category", category);
		return modelAndView;
	}
	
	
}
