package kr.go.guri.manager.noticeMng.detailNotice.web;

import java.io.File;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.service.ComFileMngUtil;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.util.GlobalProperties;
import kr.go.guri.manager.noticeMng.detailNotice.service.DetailNoticeService;
/**
 * 관리자 > 공지 상세 Controller 클래스
 * @author 권기완
 * @since 2022. 06. 25.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일			수정자			수정내용
 *  -------    		-------------   ----------------------
 *  2021.06.25.   	권기완          최초 생성
 *   
 * </pre>
 */
@RequestMapping(value = "/mamager/noticeMng/")
@Controller
public class DetailNoticeController {
	private static final Logger LOGGER = LoggerFactory.getLogger(DetailNoticeController.class);
	private static final String UPLOAD_PATH = GlobalProperties.getProperty("Globals.fileStorePath");
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "detailNoticeService")
	private DetailNoticeService DetailNoticeService;						// DB 서비스 호출
	
	/**
	 * 공지사항 디테일 페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "detailNotice.do")
	public String detailNotice(HttpServletRequest req, Model model) throws Exception {
		model.addAttribute("noticePk", req.getParameter("noticePk"));
		model.addAttribute("bsctSe", req.getParameter("bsctSe"));
		
		return "manager-content/manager/noticeMng/detailNotice";
	}
	
	
	/**
	 * 공지사항 디테일 페이지 데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "detailList.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView detailList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		String resultValue = "Y";
		String resultMsg = "";
		System.out.println("param :  " + params);
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		
		Map<String, Object> paramsInfo = new HashMap<String, Object>();
		try {
		//공지사항 리스트 조회
//		Map<String, Object> detailList = DetailNoticeService.selectDetailList(params);
		List<Map<String, Object>> detailList = DetailNoticeService.selectDetailInfo(params);

		System.out.println(" detailList ===================" + detailList);
//		System.out.println("detailList.get(0).get(\"bsctSe\").toString() " + detailList.get(0).get("bsctSe").toString());
//		System.out.println("detailList.get(0).get(\"bsctSe\").toString() " + detailList.get(0).get("bsctSe").toString());
		paramsInfo.put("bsctSe", detailList.get(0).get("bsctse").toString());
		paramsInfo.put("noticePk", detailList.get(0).get("noticePk").toString());
		paramsInfo.put("title", detailList.get(0).get("title").toString());
		paramsInfo.put("contents", detailList.get(0).get("contents").toString());
		paramsInfo.put("regId", detailList.get(0).get("regId").toString());
		paramsInfo.put("regDate", detailList.get(0).get("regDate").toString());
		System.out.println(" detailList.size()" + detailList.size());
		for(int i=0; i< detailList.size(); i++) {
			if(detailList.get(i).get("filePk")==null) {
				System.out.println(" null 값 ===== ");
			}else {
				paramsInfo.put("filePk_"+i,detailList.get(i).get("filePk").toString());
				paramsInfo.put("fileNm_"+i,detailList.get(i).get("fileNm").toString());
				paramsInfo.put("fileCount", detailList.size());
			}
		}

		
		
		if(detailList.size() > 0) {
		modelAndView.addObject("detailList", paramsInfo);
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		}else {
			resultValue="N";
			resultMsg="오류입니다. 관리자에게 문의하세요.";
			modelAndView.addObject("resultValue", resultValue);
			modelAndView.addObject("resultMsg", resultMsg);
		}
		}catch(SQLException e){
			LOGGER.info("error ============== : " + e);
		}catch(Exception e) {
			LOGGER.info("error ============== : " + e);
		}
		return modelAndView;
	}
	
	/**
	 * 공지사항 파일 다운로드
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	//첨부파일 다운로드
	@RequestMapping(value = "fileDown.do")
	public void fileDown(HttpServletRequest req, HttpServletResponse res) throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		Map<String, Object> fileInfo = new HashMap<String, Object>();
		String filePk = "";
		String fileNameOrgn = "";
		String fileNameChng = "";
		try {
		filePk = req.getParameter("filePk").toString();
		params.put("filePk", filePk);
		fileInfo = DetailNoticeService.selectFileInfo(params);
		fileNameOrgn = fileInfo.get("origFileNm").toString();
		fileNameChng = fileInfo.get("strgFileNm").toString();
		
		String fullPath = UPLOAD_PATH + File.separator + fileNameChng;
		System.out.println("fileNameOrgn : " + fileNameOrgn);
		System.out.println("fileNameChng : " + fileNameChng);
		System.out.println("fullPath : " + fullPath);
		
		ComFileMngUtil.downFile(req, res, fullPath, fileNameOrgn);
		
		}catch(SQLException e) {
			LOGGER.info("Exception : {}", e.toString());
		}catch(Exception e) {
			LOGGER.info("Exception : {}", e.toString());
		}
		
	}
}
