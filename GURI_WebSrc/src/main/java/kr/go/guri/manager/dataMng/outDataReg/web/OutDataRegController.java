package kr.go.guri.manager.dataMng.outDataReg.web;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.service.ComFileMngUtil;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.dataMng.outDataReg.UploadDataUtil;
import kr.go.guri.manager.dataMng.outDataReg.service.OutDataRegService;
import kr.go.guri.manager.logMng.service.LogService;

@Controller
public class OutDataRegController {

	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출
	
	@Resource(name = "outDataRegService")
	private OutDataRegService outDataRegService;
	
	@Resource(name = "ComFileMngUtil")
	private ComFileMngUtil fileUtil;
	
	@RequestMapping(value = "/mamager/dataMng/outDataReg/outDataRegMain.do")
	public String outDataRegMain (HttpServletRequest request, ModelMap model) throws Exception {
		
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		paramInfo.put("loginId", loginVO.getId());
		logService.createMenuLog(paramInfo);
		String menuCode = request.getParameter("menuCode");
		if( menuCode == null ) {
        	return "manager-content/manager/dataMng/outDataReg/outDataRegMain";
		}else {
			
			return "/manager/dataMng/outDataReg/outDataRegMain";
		}
    }
	
	// 업로드 데이터 목록
	@RequestMapping(value = "/mamager/dataMng/outDataReg/getOutDataList.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getOutDataList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception {
		
		// Json Parameter에서 Map Type으로 변환
		Map<String, Object> paramInfo = CommonUtil.convertMapToJson(params, "paramInfo");

		System.out.println("u-paramInfo=====================" +  paramInfo);
		System.out.println("u-params=====================" +  params);
		
		// Upload 데이터 목록 조회
		List<Map<String, Object>> uploadDataList = outDataRegService.outDataList(paramInfo);
		
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("gridList", uploadDataList);

		return modelAndView;
	}
	
	// 데이터 이력 목록
	@RequestMapping(value = "/mamager/dataMng/outDataReg/getOutDataHisList.do", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView getOutDataHisList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception {
		
		// Json Parameter에서 Map Type으로 변환
		System.out.println("params" +  params);
		
		System.out.println("params" +  params.get("tab-1"));
		Map<String, Object> paramInfo = CommonUtil.convertMapToJson(params, "tab-1");
		
		System.out.println("h-paramInfo=====================" +  paramInfo);
		
		// Upload 데이터 History 목록 조회
		List<Map<String, Object>> uploadDataList = outDataRegService.outDataHisList(paramInfo);
		
		
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("gridList", uploadDataList);

		return modelAndView;
	}
	
	// 업로드 데이터 저장
	@RequestMapping(value = "/mamager/dataMng/outDataReg/createUploadData.do")
	public ModelAndView createUploadData(final MultipartHttpServletRequest multiRequest, HttpServletRequest request) throws Exception {
		
		//int resultCnt = 0;
		String resultValue = "Y";
		String resultMsg = "";
		
		try{
			
			// DB 처리 Parameter 객체
			Map<String, Object> paramInfo = new HashMap<String, Object>();
			
			String strStartDateTime = "";
			String strEndDateTime = "";
			
			strStartDateTime = CommonUtil.getDataTimeForLog();			// 처리 시작 시간
			
			// 화면 데이터 받아오기
			String codeId = multiRequest.getParameter("codeId");
			String targetMonth = multiRequest.getParameter("targetMonth");
			
			// Parameter 설정
			paramInfo.put("codeId", codeId);
			paramInfo.put("targetMonth", targetMonth);
			paramInfo.put("createStartDate", strStartDateTime);
			paramInfo.put("createEndDate", strStartDateTime);
			
			// 세션의 로그인 사용자 정보 가져오기
			LoginVO loginVO = CommonUtil.getLoginInfo();
			
			paramInfo.put("loginId", loginVO.getId());
			
			
			// 첨부파일 데이터 받아오기
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			
			System.out.println("files : " + files);
			// 파일 업로드 처리하기
			Map<String, Object> resultFileUpload = fileDataUpload(paramInfo, files);
			
			// 파일 업로드 처리 결과 받아오기
			resultValue = resultFileUpload.get("resultValue").toString();
			resultMsg = resultFileUpload.get("resultMsg").toString();
			System.out.println("resultValue1 ========================== " + resultValue);
			// 에러가 업으면 데이터 생성
			if(resultValue == "Y") {

				// 데이터 생성 프로세스
				Map<String, Object> resultCreateData = createUploadData(paramInfo);
				
				resultValue = resultCreateData.get("resultValue").toString();
				resultMsg = resultCreateData.get("resultMsg").toString();
			}
			
			
			System.out.println("resultValue2 ========================== " + resultValue);
			// 에러가 없으면 통계 생성
			if(resultValue == "Y") {
				
//				Map<String, Object> resultAnalysisData = createAnalysisData(paramInfo);
//				
//				resultValue = resultAnalysisData.get("resultValue").toString();
//				resultMsg = resultAnalysisData.get("resultMsg").toString();
			}
			
			strEndDateTime = CommonUtil.getDataTimeForLog();			// 처리 종료 시간
			paramInfo.put("createEndDate", strEndDateTime);
			System.out.println("======================================3 paramInfo : " + paramInfo);
			// 업로드 데이터 정보 저장
			//outDataService.insertFileUploadInfo(paramInfo);
			
		}catch(Exception ex) {
			
			resultValue = "N";
			resultMsg = ex.getMessage();
			
		}finally {
			
			//System.out.println("============================================ Start Date Time : " + strStartDateTime + "============================================");
			//System.out.println("============================================   End Date Time : " + strEndDateTime + "============================================");
		}
		
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);

		//modelAndView.addObject("atchFileId", uploadFileId);
		//modelAndView.addObject("resultCnt", resultCnt);
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		
		return modelAndView;
	}
	
	
	//파일 업로드
	private Map<String, Object> fileDataUpload(Map<String, Object> paramInfo, Map<String, MultipartFile> files) {
		
		// 처리결과 객체
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		String resultValue = "Y";			// 처리 완료 여부
		String resultMsg = "";				// 처리 결과 메시지
		
		String strProcStartTime = "";		// 처리 시작 시간
		String strProcEndTime = "";			// 처리 종료 시간
		
		try {
			
			strProcStartTime = CommonUtil.getDataTimeForLog();			// 처리 시작 시간
			
			// 파일 업로드 처리
			String uploadFileId = fileUtil.uploadFiles(files, "");
			System.out.println("======================================1");
			// 업로드 된 파일 ID 가져오기
			paramInfo.put("atchFileId", uploadFileId);
			
			strProcEndTime = CommonUtil.getDataTimeForLog();			// 처리 종료 시간
			
			paramInfo.put("procTypeCd", "U");
			paramInfo.put("procDesc", "파일 업로드 완료");
			paramInfo.put("resultMsg", "");
			paramInfo.put("procStartTime", strProcStartTime);
			paramInfo.put("procEndTime", strProcEndTime);
			paramInfo.put("totCnt", 0);
			paramInfo.put("suTotCnt", 0);
			System.out.println("======================================2 paramInfo : " + paramInfo);
			// 업로드 데이터 정보 저장
			outDataRegService.insertFileUploadInfo(paramInfo);
			
			// 업로드 데이터 History 정보 저장
			outDataRegService.insertFileUploadHistory(paramInfo);
			
		}catch(Exception ex) {
			
			resultValue = "N";
			resultMsg = ex.getMessage();

		}
		
		resultMap.put("resultValue", resultValue);
		resultMap.put("resultMsg", resultMsg);
		
		return resultMap;
	}	
	
	//데이터 생성
	private Map<String, Object> createUploadData(Map<String, Object> paramInfo) {
		
		// 처리결과 객체
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		// 데이터 생성 클래스 생성
		UploadDataUtil uploadDataUtil = new UploadDataUtil();
		
		// DB Insert 처리 결과 객체
		Map<String, Object> resultUploadMap = null;					
		
		String resultValue = "Y";			// 처리 완료 여부
		String resultMsg = "";				// 처리 결과 메시지
		
		String strProcStartTime = "";		// 처리 시작 시간
		String strProcEndTime = "";			// 처리 종료 시간
		
		String procDesc = "";			// 처리 결과 설명
		String procResultMsg = "";		// 처리 결과 메시지
		
		int procInsertCnt = 0;			// 본 Table Insert Count
		int tableIfCnt = 0;			// 임시 Table 생성여부
		
		try {
			
			strProcStartTime = CommonUtil.getDataTimeForLog();			// 처리 시작 시간
			
			// Upload 파일 정보 조회하기
			Map<String, Object> uploadFileInfo = outDataRegService.selectUpliadFileInfo(paramInfo);
			System.out.println("uploadFileInfo" + uploadFileInfo);
		
			// 파일 경로 구하기
			String filePath = uploadFileInfo.get("fileStreCours").toString() +'/'+uploadFileInfo.get("streFileNm").toString();
			System.out.println("filePath" + filePath);
			
			// 데이터 유형 코드 
			String strCodeId = paramInfo.get("codeId").toString().trim();
			System.out.println("strCodeId" +  strCodeId);
			
			// 데이터 유형에 따라 프로세스 분리
			switch(strCodeId.trim().toUpperCase()) {
				case "TEST_00007":
					tableIfCnt = outDataRegService.createSvcInfl(paramInfo);			// IF 테이블 생성
//					
					resultUploadMap = uploadDataUtil.makeSvcInfl(filePath);		// IF 데이터 생성
//					
					procInsertCnt = outDataRegService.insertSvcInfl(paramInfo);					// 데이터 추가 IF -> 대상 데이블
//					
					outDataRegService.deleteSvcInfl(paramInfo);					// 대상 Table 데이터 삭제
					
					break;
			}
			
			
			
			// 데이터 Error Count
			int resultErrorCnt = Integer.parseInt(resultUploadMap.get("errorCnt").toString());
			
			// 데이터 Count
			Double dbProcDataCnt = Double.parseDouble(resultUploadMap.get("dataCnt").toString());
			
			// 콤마 Format
			DecimalFormat dc = new DecimalFormat("###,###,###,###");   
	        String procDataCnt = dc.format(dbProcDataCnt);

			if(resultErrorCnt == 0) {
				procDesc = "데이터 생성 완료 : " + procDataCnt + " 건";
				//procDesc = "데이터 생성 완료 : " + procDataCnt + " 건, Copy : " + procInsertCnt + "건";
			}else {
				procDesc = "데이터 오류 : " + resultErrorCnt + "건";
			}
			
			procResultMsg = resultUploadMap.get("errorMsg").toString();
			
			strProcEndTime = CommonUtil.getDataTimeForLog();			// 처리 종료 시간
			
			
			
		}catch(Exception ex) {
			
			resultValue = "N";
			resultMsg = ex.getMessage();
			
			procDesc = "데이터 생성 실패";
			procResultMsg = ex.getMessage();
			
		}finally {
			
			uploadDataUtil = null;
			// 데이터 Error Count
			int resultErrorCnt = Integer.parseInt(resultUploadMap.get("errorCnt").toString());
			
			// 데이터 Count
			Double dbProcDataCnt = Double.parseDouble(resultUploadMap.get("dataCnt").toString());
			
			try{
				strProcEndTime = CommonUtil.getDataTimeForLog();			// 처리 종료 시간
				
				paramInfo.put("procTypeCd", "D");
				paramInfo.put("procDesc", procDesc);
				paramInfo.put("resultMsg", procResultMsg);
				paramInfo.put("procStartTime", strProcStartTime);
				paramInfo.put("procEndTime", strProcEndTime);
				paramInfo.put("totCnt", dbProcDataCnt);
				paramInfo.put("suTotCnt", (dbProcDataCnt-resultErrorCnt));
				
				// 업로드 데이터 History 정보 저장
				outDataRegService.insertFileUploadHistory(paramInfo);
				
			}catch(Exception e) {
				
				resultValue = "N";
				resultMsg = e.getMessage();
			}
		}
		
		resultMap.put("resultValue", resultValue);
		resultMap.put("resultMsg", resultMsg);
		
		return resultMap;
	}

}
