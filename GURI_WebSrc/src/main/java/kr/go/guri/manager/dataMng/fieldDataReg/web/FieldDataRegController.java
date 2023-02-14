package kr.go.guri.manager.dataMng.fieldDataReg.web;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.go.guri.cmm.service.ComFileMngUtil;
import kr.go.guri.cmm.util.ComStringUtil;
import kr.go.guri.cmm.util.ComWebUtil;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.FileVO;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.dataMng.fieldDataReg.service.FieldDataRegService;
import kr.go.guri.manager.logMng.service.LogService;

@Controller
public class FieldDataRegController {
	
	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	@Resource(name = "logService")
	private LogService logService;				// DB 서비스 호출

	@Resource(name = "ComFileMngUtil")
	private ComFileMngUtil fileUtil;
	
	@Resource(name = "fieldDataRegService")
	private FieldDataRegService fieldDataRegService;
	
	char FILE_SEPARATOR = File.separatorChar;

	// DB연결
	private Connection getConnectionDB() throws Exception {
		
		Class.forName("org.postgresql.Driver");
		
		Connection con = DriverManager.getConnection("jdbc:log4jdbc:postgresql://192.168.1.210:5433/EZ_UJB","postgres","ezgis0424&&");
//		Connection con = DriverManager.getConnection("jdbc:postgresql://105.3.10.71:5433/ez_ujb","postgres","ezgis0424&&");
		
		con.setAutoCommit(false);
		
		return con;
	}
	
	//분야별 데이터 등록 메인 화면
	@RequestMapping(value = "/mamager/dataMng/fieldDataReg/fieldDataRegMain.do")
	public String fieldDataRegMain (HttpServletRequest request, ModelMap model) throws Exception {

		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		paramInfo.put("loginId", loginVO.getId());
		logService.createMenuLog(paramInfo);
		
		return "manager-content/manager/dataMng/fieldDataReg/fieldDataRegMain";
    }
	
	// 데이터 조회
	@RequestMapping(value = "/mamager/dataMng/fieldDataReg/fieldDataList.ajax")
	public ModelAndView fieldDataList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		List<Map<String, Object>> fieldDataList = fieldDataRegService.fieldDataList(params);
		List<Map<String, Object>> fieldDataCode = fieldDataRegService.fieldDataCode();
		
		System.out.println("params========== check ======" + params);
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		modelAndView.addObject("fieldDataList", fieldDataList);
		modelAndView.addObject("fieldDataCode",fieldDataCode);
		
		System.out.println("fieldDataList :::===================" + fieldDataList);
		System.out.println("fieldDataCode ::: ===================" + fieldDataCode);
		
		return modelAndView;
	}
	
	// 데이터 선택
	@RequestMapping(value = "/mamager/dataMng/fieldDataReg/selectData.ajax")
	public ModelAndView selectData(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception{
		Map<String, Object> selectData = fieldDataRegService.selectData(params);
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		modelAndView.addObject("selectData", selectData);
		
		System.out.println("selectData :::===================" + selectData);
		
		return modelAndView;
	}
	
	// 데이터 등록
	@RequestMapping(value = "/mamager/dataMng/fieldDataReg/fieldDataInsert.ajax")
	public ModelAndView fieldDataInsert(final MultipartHttpServletRequest multiRequest, HttpServletRequest request, ModelMap model, HttpSession session) throws Exception{

		System.out.println("=============================== INSERT");

		String resultValue = "Y";
		String resultMsg = "";
		String usrid = (String)session.getAttribute("userId");
		// 로그인한 사용자 아이디 값 가져오기
		System.out.println("사용자 아이디 체크중 ======" + usrid);

		try {
			Map<String, Object> paramInfo = new HashMap<String, Object>();
			String fldCd = multiRequest.getParameter("fldCd");
			String instNm = multiRequest.getParameter("instNm");
			String startDate = multiRequest.getParameter("startDate");
			String endDate = multiRequest.getParameter("endDate");
			String dataNm = multiRequest.getParameter("dataNm");
			String tableYn = multiRequest.getParameter("tableYn");
			String headerYn = multiRequest.getParameter("headerYn");
			String fileSe = multiRequest.getParameter("fileSe");
			String sourceNm = multiRequest.getParameter("sourceNm");
			String fileId = ""; 
			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("uploadFile");
			
			
			paramInfo.put("userId", usrid);
			paramInfo.put("fldCd", fldCd);
			paramInfo.put("instNm", instNm);
			paramInfo.put("startDate", startDate);
			paramInfo.put("endDate", endDate);
			paramInfo.put("dataNm", dataNm);
			paramInfo.put("tableYn", tableYn);
			paramInfo.put("headerYn", headerYn);
			paramInfo.put("fileSe", fileSe);
			paramInfo.put("sourceNm", sourceNm);
			
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			System.out.println("files : " + files);
			String uploadFileId = fileUtil.uploadFiles(files, "");
			List<FileVO> fileinfo = fileUtil.parseFileInf(files, "", uploadFileId, "");
			
			paramInfo.put("atchFileId", uploadFileId);
			// 사용자가 입력한 데이터 값 paramInfo에 저장=======================================
			
			System.out.println("paramInfo" +  paramInfo);
			
			System.out.println("uploadFileId" + uploadFileId);
			System.out.println("fileinfo" + fileinfo);
			String filePath = "";
			String fileNm = "";
			String fileEx = "";
			for( int i = 0; i < fileinfo.size(); i++) {
				//DB 저장된 아이디값
				System.out.println(fileinfo.get(i).getAtchFileId());
				// 확장자
				System.out.println(fileinfo.get(i).getFileExtsn());
				fileEx = fileinfo.get(i).getFileExtsn();
				// 파일 경로
				System.out.println(fileinfo.get(i).getFileStreCours());
				filePath = fileinfo.get(i).getFileStreCours();
				// 원본 파일 명 
				System.out.println(fileinfo.get(i).getOrignlFileNm());
				// 저장 파일 명 
				System.out.println(fileinfo.get(i).getStreFileNm());
				fileNm = fileinfo.get(i).getStreFileNm();
			}
			// 파일에서 읽어온 데이터 구분자
			String charSplit = fileSe;

			System.out.println("charSplit.getClass().getName()" + charSplit.getClass().getName());
			System.out.println("fileSe.getClass().getName()" + fileSe.getClass().getName());
		
			int readLineCnt = 0;		// 데이터 Row 수
			int batchCnt = 0;			// 트랜잭션 단위
			int errorCnt = 0;			// 에러 메시지 수
			
			int count = 0;
			//파일 오픈
    		String parFile1 = filePath.replace('\\', FILE_SEPARATOR).replace('/', FILE_SEPARATOR)+'\\'+fileNm;
    		File Refile = new File(ComWebUtil.filePathBlackList(parFile1));
    		BufferedReader br = null;
    		
    		System.out.println(" 파일 오픈 parFile1 ====" + parFile1);
    		
    		//파일이면서, 존재하면 파싱 시작
    		if (Refile.exists() && Refile.isFile()) {
    			// 파일에서 내용을 읽어서 StringBuffer에 쌓는다.
    			br = new BufferedReader(new InputStreamReader(new FileInputStream(Refile), "UTF-8"));
    			String line = "";
    			while ((line = br.readLine()) != null) {
	                String[] lineArr = ComStringUtil.split(line.toString(), fileSe); // 파일의 한 줄을 fileSe 로 나누어 배열에 저장 후 리스트로 변환한다.

	                System.out.println("현재 "+readLineCnt+"번째 줄입니다=========================================");
	            	System.out.println(line);
	            	
	            	count = line.split(charSplit).length;

	                if(readLineCnt == 0) {
                		List<String> headerList = new ArrayList<>(Arrays.asList(lineArr));
                		System.out.println("headerList=====" +headerList);
	    				
	                } else if(readLineCnt > 0){
	    				List<String> DataList = new ArrayList<>(Arrays.asList(lineArr));
	                	System.out.println("DataList=====" +DataList);
	                }
	                readLineCnt ++;
	                
    			}
    		}
    		
//            // 파일 입력스트림 생성
//            FileReader fileReader = new FileReader(Refile);
//            
//            // 입력 버퍼 생성
////            BufferedReader bufferedReader = new BufferedReader(fileReader);
//
//            try (BufferedReader bufferedReader = new BufferedReader(fileReader))
//		        {
//            		String content = "";
//
//		            while ((content = bufferedReader.readLine()) != null) {
//		            	
//		            	List<String> aLine = new ArrayList<String>();
//		            	// 헤더가 있는경우
//		            	// 0번째 줄 ======> headerMap에 데이터 삽입
//		            	Map<String, Object > headerMap = new HashMap<>();
//		            	Map<String, Object > dataList = new HashMap<>();
//		            	
//		            	
//		            	
//		            	// 헤더가 없는경우
//		            	// 0번째 줄 ======> dataListmap에 데이터 삽입
//		            	// 공통 내용 넣기
//		            	List<Map<String, Object>> dataListMap = new ArrayList<Map<String, Object>>();
//		            	
//		            	// 전체 데이터 불러오기
//		            	System.out.println("현재 "+readLineCnt+"번째 줄입니다=========================================");
//		            	System.out.println(content);
//		            	count = content.split(charSplit).length;
//		                String[] lineArr = ComStringUtil.split(content.toString(), charSplit); // 파일의 한 줄을 ,로 나누어 배열에 저장 후 리스트로 변환한다.
//		                aLine = Arrays.asList(lineArr);
//
////		                for(int i=0; i< count; i++) {
////		                	System.out.println("lineArr["+i+"]============" + lineArr[i] );
////		                }
//		                
//		                if(readLineCnt == 0) {
//		                	for (int i = 0; i< count; i++) {
//		                		headerMap.put(lineArr[i], lineArr[i]);
//		                	}
//		                	System.out.println("headerMap=====" +headerMap);
//		                } else {
//		                	for (int j = 0; j < count; j++) {
//		                		dataList.put(lineArr[j], lineArr[j]);
//		                		dataListMap.add(dataList);
//		                	}
//		                	System.out.println("dataList======" + dataList);
//		                	System.out.println("dataListMap=======" + dataListMap);
//		                }
//		                
//		                readLineCnt ++;
//
//		            }
//		        } catch (IOException e) {
//		            e.printStackTrace();
//		        }
////			int fieldDataInsert = fieldDataRegService.fieldDataInsert(paramInfo);
//
		}catch (Exception e) {
			resultValue = "N";
			resultMsg = e.getMessage();
		}
		
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		
		return modelAndView;
	}
	
	// 데이터 수정
	@RequestMapping(value = "/mamager/dataMng/fieldDataReg/fieldDataUpdate.ajax")
	public ModelAndView fieldDataUpdate(final MultipartHttpServletRequest multiRequest, HttpServletRequest request, ModelMap model, HttpSession session) throws Exception{

		System.out.println("=============================== UPDATE");
		String resultValue = "Y";
		String resultMsg = "";
		String usrid = (String)session.getAttribute("userId");
		// 로그인한 사용자 아이디 값 가져오기
		System.out.println("사용자 아이디 체크중 ======" + usrid);

		try {
			Map<String, Object> paramInfo = new HashMap<String, Object>();
			int selectNo = Integer.parseInt(multiRequest.getParameter("selectNo"));
			String fldCd = multiRequest.getParameter("fldCd");
			String instNm = multiRequest.getParameter("instNm");
			String startDate = multiRequest.getParameter("startDate");
			String endDate = multiRequest.getParameter("endDate");
			String dataNm = multiRequest.getParameter("dataNm");
			String tableYn = multiRequest.getParameter("tableYn");
			String headerYn = multiRequest.getParameter("headerYn");
			String fileSe = multiRequest.getParameter("fileSe");
			String sourceNm = multiRequest.getParameter("sourceNm");
			String fileId = ""; 

			MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
			CommonsMultipartFile file = (CommonsMultipartFile) multipartRequest.getFile("uploadFile");

			paramInfo.put("selectNo", selectNo);
			paramInfo.put("userId", usrid);
			paramInfo.put("fldCd", fldCd);
			paramInfo.put("instNm", instNm);
			paramInfo.put("startDate", startDate);
			paramInfo.put("endDate", endDate);
			paramInfo.put("dataNm", dataNm);

//			paramInfo.put("tableYn", tableYn);
//			paramInfo.put("headerYn", headerYn);
//			paramInfo.put("fileSe", fileSe);
//			paramInfo.put("sourceNm", sourceNm);
//			
			final Map<String, MultipartFile> files = multiRequest.getFileMap();
			System.out.println("files : " + files);
			String uploadFileId = fileUtil.uploadFiles(files, "");
			paramInfo.put("atchFileId", uploadFileId);

			System.out.println("uploadFileId" + uploadFileId);
			
			
//			int fieldDataUpdate = fieldDataRegService.fieldDataUpdate(paramInfo);
//			System.out.println("==== check1");

		}catch (Exception e) {
			resultValue = "N";
			resultMsg = e.getMessage();
		}

		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);
		
		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);
		
		return modelAndView;
	}
}
