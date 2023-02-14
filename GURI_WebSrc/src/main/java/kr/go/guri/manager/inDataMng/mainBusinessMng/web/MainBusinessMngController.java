package kr.go.guri.manager.inDataMng.mainBusinessMng.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.service.ComFileMngUtil;
import kr.go.guri.cmm.util.ComResourceCloseHelper;
import kr.go.guri.cmm.util.ComWebUtil;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.inDataMng.mainBusinessMng.service.MainBusinessMngService;
import kr.go.guri.manager.logMng.service.LogService;
/**
 * @Description		: 주요사업 데이터 관리 Controller
 * @Source        	: MainBusinessController.java
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
public class MainBusinessMngController {
private static final Logger LOGGER = LoggerFactory.getLogger(MainBusinessMngController.class);
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다

	@Resource(name = "ComFileMngUtil")
	private ComFileMngUtil fileUtil;
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	
	@Resource(name = "mainBusinessMngService")
	private MainBusinessMngService mainBusinessMngService;						// DB 서비스 호출
	
	/**
	 * 주요 사업 메인페이지
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/mainBusinessMng.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public String mainBusinessMng(/*@RequestBody Map<String, Object> params,*/ HttpServletRequest request, ModelMap model) throws NullPointerException, Exception{
		
		
		//메뉴코드
		String menuCode = "MENU_00057";
		// Parameter 객체
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		paramInfo.put("loginId", loginVO.getId());
		paramInfo.put("menuCode", menuCode);
		logService.createMenuLog(paramInfo);
		return "/manager/inDataMng/mainBusinessMng";
	}
	
	
	/**
	 * 주요사업 초기데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/mainBusinessMngInit.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView mainBusinessMngInit(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		// Json Parameter에서 Map Type으로 변환
		List<Map<String, Object>> busiList = mainBusinessMngService.selectBusiList();
		params.put("busiName", busiList.get(0).get("code").toString());
		List<Map<String, Object>> busiDescList = mainBusinessMngService.selectBusiDesc(params);
		List<Map<String, Object>> busiDescData = new ArrayList<>();
		if( busiDescList.size() > 0 ) {
			
			params.put("goalName", busiDescList.get(0).get("goalName").toString());
			busiDescData = mainBusinessMngService.selectBusiDesc(params);
		}
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		
		
		modelAndView.addObject("busiList", busiList);	
		modelAndView.addObject("busiDescList", busiDescList);	
		modelAndView.addObject("busiDescData", busiDescData);	
		
		return modelAndView;
	}
	
	/**
	 * 주요사업 조회데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/mainBusinessMngSearch.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView mainBusinessMngSearch(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		// Json Parameter에서 Map Type으로 변환
		List<Map<String, Object>> busiDescList = mainBusinessMngService.selectBusiDesc(params);
		List<Map<String, Object>> busiDescData = new ArrayList<>();
		if( busiDescList.size() > 0 ) {
			
			params.put("goalName", busiDescList.get(0).get("goalName").toString());
			busiDescData = mainBusinessMngService.selectBusiDesc(params);
		}
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		
		
		modelAndView.addObject("busiDescList", busiDescList);	
		modelAndView.addObject("busiDescData", busiDescData);	
		
		return modelAndView;
	}
	
	/**
	 * 주요 사업검색 데이터 가져오기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/mainBusinessMngClick.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView mainBusinessMngClick(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		// Json Parameter에서 Map Type으로 변환
		List<Map<String, Object>> busiDescData = mainBusinessMngService.selectBusiDesc(params);
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		List<Map<String, Object>> busiList = mainBusinessMngService.selectBusiList();
		
		modelAndView.addObject("busiDescData", busiDescData);	
		modelAndView.addObject("busiList", busiList);	
		return modelAndView;
	}
	
	/**
	 * 주요 사업검색 데이터 삭제하기
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/mainBusinessMngDelete.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView mainBusinessMngDelete(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		// Json Parameter에서 Map Type으로 변환
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		
		String atchFileId = "";
		String resultValue = "Y";
		String resultMsg = "";
				
		try{
			Map<String, Object> busiFileInfo = mainBusinessMngService.selectBusiFileInfo(params);
			if( busiFileInfo != null && busiFileInfo.get("atchFileId") != null ) {
				atchFileId = busiFileInfo.get("atchFileId").toString();
				params.put("atchFileId", atchFileId);
				
			}
			
			//주요사업 현황 테이블에서 삭제
			int cnt = mainBusinessMngService.deleteBusiContents(params);
			
			if( cnt == 1 ) {
				
				mainBusinessMngService.deleteBusiDetailContents(params);
				if( busiFileInfo != null ) mainBusinessMngService.deleteFileDetail(params);
			}
			
		}catch(SQLException ex) {
			resultValue = "N";
			LOGGER.info("error ============== : " + ex);
			resultMsg = "오류가 발생하였습니다.";
			
		}catch(Exception ex) {
			resultValue = "N";
			LOGGER.info("error ============== : " + ex);
			resultMsg = "오류가 발생하였습니다.";
			
		}finally {
		}
				
		
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		return modelAndView;
	}
	
	/**
	 * 주요 사업 데이터 생성(저장)
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/mainBusinessCreate.ajax", method = RequestMethod.POST, consumes = { "multipart/form-data" })
	public ModelAndView mainBusinessCreate(final MultipartHttpServletRequest multiRequest/*, @RequestBody Map<String, Object> params*/, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		//int resultCnt = 0;
			String resultValue = "Y";
			String resultMsg = "";
			
			try{
				// DB 처리 Parameter 객체
				Map<String, Object> paramInfo = new HashMap<String, Object>();
				// 화면 데이터 받아오기
				String goalName = multiRequest.getParameter("goalName");
				String department = multiRequest.getParameter("dept");
				String busiName = multiRequest.getParameter("busiName");
				String dataName = multiRequest.getParameter("dataName");
				String term = multiRequest.getParameter("term");
				String contents = multiRequest.getParameter("contents");
				String subCost = multiRequest.getParameter("subCost");
				String totalCost = multiRequest.getParameter("totalCost");
				String effect = multiRequest.getParameter("effect");
				String goal = multiRequest.getParameter("goal");
				String rate = multiRequest.getParameter("rate");
				String listNo = mainBusinessMngService.selectBusiNo().get("no").toString();
				String fileId = ""; 
				MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
				CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("uploadFile");
				
				// Parameter 설정
				paramInfo.put("no", listNo);
				paramInfo.put("dataName", dataName);
				paramInfo.put("dept", department);
				paramInfo.put("goalName", goalName);
				paramInfo.put("busiName", busiName);
				paramInfo.put("term", term);
				paramInfo.put("contents", contents);
				paramInfo.put("subCost", subCost);
				paramInfo.put("totalCost", totalCost);
				paramInfo.put("effect", effect);
				paramInfo.put("goal", goal);
				paramInfo.put("rate", rate);
				
				final Map<String, MultipartFile> files = multiRequest.getFileMap();
				String uploadFileId = fileUtil.uploadFiles(files, "");
				paramInfo.put("atchFileId", uploadFileId);
				//params.put("uploadFileId", uploadFileId);
				//System.out.println("params : " + params);
				int statusCnt = mainBusinessMngService.createBusiStatus(paramInfo);
				
				if( statusCnt > 0 ) {
					//fileId = mainBusinessMngService.selectGetFileId().get("atchFileId").toString();
					int detailCnt = mainBusinessMngService.createBusiStatusDetail(paramInfo);
					if( detailCnt > 0 ) mainBusinessMngService.createBusiStatusStatic(paramInfo);
				}
				
			}catch(SQLException ex) {
				resultValue = "N";
				resultMsg = "오류가 발생하였습니다.";
				
			}catch(Exception ex) {
				resultValue = "N";
				resultMsg = "오류가 발생하였습니다.";
				
			}finally {
			}
			
			
			ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
			modelAndView.addObject("resultValue", resultValue);
			modelAndView.addObject("resultMsg", resultMsg);
			
		return modelAndView;
	}
	
	/**
	 * 주요 사업 데이터 수정(저장)
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/mainBusinessUpdate.ajax", method = RequestMethod.POST, consumes = { "multipart/form-data" })
	public ModelAndView mainBusinessUpdate(final MultipartHttpServletRequest multiRequest/*, @RequestBody Map<String, Object> params*/, HttpServletRequest request, ModelMap model) throws SQLException, Exception{
		//int resultCnt = 0;
		String resultValue = "Y";
		String resultMsg = "";
		
		try{
			// DB 처리 Parameter 객체
			Map<String, Object> paramInfo = new HashMap<String, Object>();
			// 화면 데이터 받아오기
			String goalName = multiRequest.getParameter("goalName");
			String department = multiRequest.getParameter("dept");
			String busiName = multiRequest.getParameter("busiName");
			String dataName = multiRequest.getParameter("dataName");
			String term = multiRequest.getParameter("term");
			String contents = multiRequest.getParameter("contents");
			String subCost = multiRequest.getParameter("subCost");
			String totalCost = multiRequest.getParameter("totalCost");
			String effect = multiRequest.getParameter("effect");
			String goal = multiRequest.getParameter("goal");
			String rate = multiRequest.getParameter("rate");
			String listNo = (multiRequest.getParameter("busiSeq")).toString();
			String fileId = ""; 
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("uploadFile");
			
			// Parameter 설정
			paramInfo.put("no", listNo);
			paramInfo.put("dataName", dataName);
			paramInfo.put("dept", department);
			paramInfo.put("goalName", goalName);
			paramInfo.put("busiName", busiName);
			paramInfo.put("term", term);
			paramInfo.put("contents", contents);
			paramInfo.put("subCost", subCost);
			paramInfo.put("totalCost", totalCost);
			paramInfo.put("effect", effect);
			paramInfo.put("goal", goal);
			paramInfo.put("rate", rate);
			
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			if( !files.isEmpty() ) {
				String uploadFileId = fileUtil.uploadFiles(files, "");
				paramInfo.put("atchFileId", uploadFileId);
				
			}
			//params.put("uploadFileId", uploadFileId);
			int statusCnt = mainBusinessMngService.updateBusiStatus(paramInfo);
			int detailCnt = mainBusinessMngService.updateBusiStatusDetail(paramInfo);
			if( detailCnt > 0 ) mainBusinessMngService.updateBusiStatusStatic(paramInfo);
			
		}catch(SQLException ex) {
			resultValue = "N";
			resultMsg = "오류가 발생하였습니다.";
			
		}catch(Exception ex) {
			resultValue = "N";
			resultMsg = "오류가 발생하였습니다.";
			
		}finally {
		}
		
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		
		return modelAndView;
	}
	
	/**
	 * Upload 데이터 다운로드
	 * @param multiRequest
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/mamager/inDataMng/mainBusinessDwonload.ajax", method = RequestMethod.POST)
	public void mainBusinessDwonload(HttpServletResponse response, HttpServletRequest request) throws SQLException, Exception {
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		String no = "";
		if( request.getParameter("no") != null ) no = request.getParameter("no").toString();
		if( request.getParameter("no").length() > 5 && Pattern.matches("[가-힣]*$", no) == false ) {
			no = request.getParameter("no");
			paramInfo.put("no", no);
			
			Map<String, Object> fileInfo = mainBusinessMngService.selectBusiFileInfo(paramInfo);
			String fileUrl = fileInfo.get("fileUrl").toString();
			String orignlFileNm = URLEncoder.encode( fileInfo.get("origAtchFileNm").toString(), "UTF-8" ).replaceAll( "\\+", "%20" );
			
			File file = new File(ComWebUtil.filePathBlackList(fileUrl));
			
			if (!file.exists()) {
				throw new FileNotFoundException(fileUrl);
			}
			
			if (!file.isFile()) {
				throw new FileNotFoundException(fileUrl);
			}
			
			byte[] b = new byte[8192];
			
			response.setContentType("application/octet-stream;");
			response.setHeader("Content-Disposition", "filename="+orignlFileNm+";");
			response.setHeader("Pragma", "no-cache;");
			response.setHeader("Expires", "-1;");
			
			BufferedInputStream fin = null;
			BufferedOutputStream outs = null;
			FileInputStream in = null;
			try {
				in =new FileInputStream(file);
				fin = new BufferedInputStream(in);
				outs = new BufferedOutputStream(response.getOutputStream());
				
				int read = 0;
				
				while ((read = fin.read(b)) != -1) {
					outs.write(b, 0, read);
				}
			} finally {
				if( outs != null ) ComResourceCloseHelper.close(outs);
				if( fin != null ) ComResourceCloseHelper.close(fin);
				if( in != null ) ComResourceCloseHelper.close(in);
			}
		}
	}
	
}
