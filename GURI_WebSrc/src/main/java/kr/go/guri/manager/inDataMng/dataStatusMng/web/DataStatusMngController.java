package kr.go.guri.manager.inDataMng.dataStatusMng.web;

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
import kr.go.guri.cmm.util.FrequentlyUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.inDataMng.dataStatusMng.service.DataStatusMngService;
import kr.go.guri.manager.logMng.service.LogService;
/**
 * @Description		: 주요업무등록 Controller
 * @Source        	: DataStatusMngController.java
 * @author 김부권
 * @since 2021. 09. 23.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.09.23.   	김부권          최초 생성
 *   
 * </pre>
 */
@Controller
public class DataStatusMngController {
private static final Logger LOGGER = LoggerFactory.getLogger(DataStatusMngController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	

	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	
	@Resource(name = "dataStatusMngService")
	private DataStatusMngService DataStatusMngService;						// DB 서비스 호출
	
	/**
	 * 데이터 현황 관리 메인페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/dataStatusMng.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public String dataStatusMng(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws NullPointerException, Exception{
		
		
		//메뉴코드
		String menuCode = "MENU_00056";
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		paramInfo.put("loginId", loginVO.getId());
		paramInfo.put("menuCode", menuCode);
		logService.createMenuLog(paramInfo);
		
		return "/manager/inDataMng/dataStatusMng";
	}
	
	/**
	 * 데이터 현황 초기데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/dataStatusInit.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView dataStatusInit(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		
		//스키마 리스트 조회
		List<Map<String, Object>> scmaList = DataStatusMngService.selectScmaList();
		
		//스키마별 테이블 갯수 조회
		List<Map<String, Object>> scmaDataCnt = DataStatusMngService.selectScmaStatusCnt();
		
		int totalPage = 0;        //전체 페이지
		int totalCnt = 0;         //전체 데이터
		int nowPage = 0;          //현재 페이지
		Map<String, Object> param = FrequentlyUtil.pageSetParam(params);
		
		if( param.get("name") == null ) {
			
			if( scmaList.size() > 1 ) {
				param.put("name", scmaList.get(0).get("name").toString());
			}
		}
		
			
		//스키마별 데이터 리스트 조회
		List<Map<String, Object>> scmaStatusList = DataStatusMngService.selectScmaStatus(param);
		
		
		if( scmaStatusList.size() > 0 ) {
			totalPage = (int)Math.ceil(Double.parseDouble(scmaStatusList.get(0).get("cnt").toString())/Double.parseDouble(param.get("nowPageCnt").toString()));
			totalCnt = Integer.parseInt(scmaStatusList.get(0).get("cnt").toString());
		}
		nowPage = Integer.parseInt(param.get("nowPage").toString());
		param.put("cnt", totalCnt);
		param.put("nowPage", nowPage);
		param.put("totalPage", totalPage);
		Map<String, Object> page = FrequentlyUtil.pageParam(param);
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		
		
		modelAndView.addObject("scmaList", scmaList);	
		modelAndView.addObject("page", page);	
		modelAndView.addObject("scmaDataCnt", scmaDataCnt);	
		modelAndView.addObject("scmaStatusList", scmaStatusList);	
		
		return modelAndView;
	}
	/**
	 * 데이터 현황 검색데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/dataStatusSearch.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView dataStatusSearch(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		List<Map<String, Object>> scmaStatusList = DataStatusMngService.selectScmaStatus(params);
		
		int totalPage = 0;        //전체 페이지
		int totalCnt = 0;         //전체 데이터
		int nowPage = 0;          //현재 페이지
		Map<String, Object> param = FrequentlyUtil.pageSetParam(params);
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		if( scmaStatusList.size() > 0 ) {
			totalPage = (int)Math.ceil(Double.parseDouble(scmaStatusList.get(0).get("cnt").toString())/Double.parseDouble(param.get("nowPageCnt").toString()));
			totalCnt = Integer.parseInt(scmaStatusList.get(0).get("cnt").toString());
		}
		nowPage = Integer.parseInt(param.get("nowPage").toString());
		param.put("cnt", totalCnt);
		param.put("nowPage", nowPage);
		param.put("totalPage", totalPage);
		Map<String, Object> page = FrequentlyUtil.pageParam(param);
		
		modelAndView.addObject("page", page);	
		modelAndView.addObject("scmaStatusList", scmaStatusList);	
		
		return modelAndView;
	}
	
	/**
	 * 데이터 현황 검색데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/dataStatusSearchPage.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView dataStatusSearchPage(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		
		Map<String, Object> data = getContentsData(params);
		modelAndView.addObject("list", data.get("list"));
		modelAndView.addObject("page", data.get("page"));
		
		return modelAndView;
	}
	
	private Map<String, Object> getContentsData(Map<String, Object> params) throws SQLException, Exception {
		Map<String, Object> data = new HashMap<String, Object>();
		//테이블 int타입 컬럼 조회
		
		int totalPage = 0;
		int totalCnt = 0;
		int nowPage = 0;
		
		Map<String, Object> param = FrequentlyUtil.pageSetParam(params);
		List<Map<String, Object>> list = DataStatusMngService.selectScmaStatus(param);
		int minNo = 0;
		int maxNo = 0;
		for (int i = 0; i < list.size(); i++) {
			int no = Integer.parseInt(list.get(i).get("cnt").toString());
			if(i==0 || (minNo > no)) minNo = no;
			if(maxNo < no) maxNo = no;
		}
		param.put("minNo", minNo);
		param.put("maxNo", maxNo);
		if( list.size() > 0 ) {
			totalPage = (int)Math.ceil(Double.parseDouble(list.get(0).get("cnt").toString())/Double.parseDouble(param.get("nowPageCnt").toString()));
			totalCnt = Integer.parseInt(list.get(0).get("cnt").toString());
		}
		
		
		nowPage = Integer.parseInt(param.get("nowPage").toString());
		param.put("cnt", totalCnt);
		param.put("nowPage", nowPage);
		param.put("totalPage", totalPage);
		Map<String, Object> page = FrequentlyUtil.pageParam(param);
		data.put("list", list);
		data.put("page", page);
		
		return data;
	}
}
