package kr.go.guri.manager.dataMng.dataReg.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import com.sun.star.lang.NullPointerException;

import kr.go.guri.cmm.service.ComFileMngUtil;
import kr.go.guri.cmm.util.ComResourceCloseHelper;
import kr.go.guri.cmm.util.ComWebUtil;
import kr.go.guri.cmm.util.CommonUtil;
import kr.go.guri.cmm.vo.LoginVO;
import kr.go.guri.manager.dataMng.dataReg.service.DataRegService;
import kr.go.guri.manager.logMng.service.LogService;

/**
 * 관리자 > 데이터 등록 Controller 클래스
 * 
 * @author 서미현
 * @since 2022. 10. 10.
 * @version 1.0
 * @see
 *
 *      <pre>
* << 개정이력(Modification Information) >>
*
*  수정일			        수정자			   수정내용
*  -------      -------------   ----------------------
*  2022.10.10.   	서미현                          최초 생성
 * 
 *      </pre>
 */

@Controller
@RequestMapping("/mamager/dataMng/dataReg")
public class DataRegController {

	private static final Logger LOGGER = LoggerFactory.getLogger(DataRegController.class);

	@Autowired
	private MappingJackson2JsonView jsonView; // Json 데이터를 Return 받기위해 Controller 마다 선언해준다

	@Resource(name = "logService")
	private LogService logService; // DB 서비스 호출

	@Resource(name = "dataRegService")
	private DataRegService dataRegService;

	@Resource(name = "ComFileMngUtil")
	private ComFileMngUtil fileUtil;

	char FILE_SEPARATOR = File.separatorChar;

	/**
	 * DB연결
	 * 
	 * @return
	 * @throws Exception
	 */
	private Connection getConnectionDB() throws Exception {

		Class.forName("org.postgresql.Driver");
		Connection con = DriverManager.getConnection("jdbc:log4jdbc:postgresql://192.168.1.210:5433/EZ_GURI", "postgres", "ezgis0424&&");
		con.setAutoCommit(false);

		return con;
	}

	/**
	 * 관리자 > 데이터 관리 > 데이터 등록 화면
	 * 
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	@RequestMapping(value = "/dataRegMain.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = {"application/json; charset=UTF-8" })
	public String main(HttpServletRequest request, ModelMap model) throws Exception, SQLException {
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 로그인 사용자 정보를 Session에서 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();
		logService.createMenuLog(paramInfo);
		String menuCode = request.getParameter("menuCode");
		try {
			paramInfo.put("loginId", loginVO.getId());
			paramInfo.put("menuCode", menuCode);

			logService.createMenuLog(paramInfo);
			logService.createUserLog(paramInfo);

			if (menuCode == null) {
				return "manager-content/manager/dataMng/dataReg/dataRegMain";
			} else {
				return "/manager/dataMng/dataReg/dataRegMain";
			}

		} catch (SQLException ex) {
			LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
			return "/common/errorPage/error";
		} catch (Exception e) {
			LOGGER.info("======== Exception Error Occurred =============  :  " + e);
			return "/common/errorPage/error";
		}

	}

	/**
	 * 부서 정보 리스트 가져오기
	 * 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	@RequestMapping(value = "/getDepList.ajax", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8" })
	public ModelAndView getDepList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception, SQLException {
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> getDepList = new ArrayList<Map<String, Object>>();

		try {
			// Upload 데이터 History 목록 조회
			getDepList = dataRegService.getDepList();

			// ModelAndView 객체 생성
			modelAndView = CommonUtil.makeModelAndView(jsonView);

		} catch (SQLException ex) {
			LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
		} catch (Exception e) {
			LOGGER.info("======== Exception Error Occurred =============  :  " + e);
		}

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("depList", getDepList);

		return modelAndView;
	}

	/**
	 * 테이블 목록 가져오기
	 * 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	@RequestMapping(value = "/getDataList.ajax", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8" })
	public ModelAndView getDataList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception, SQLException {
		// param : {}
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// ModelAndView 객체 생성
		ModelAndView modelAndView = new ModelAndView();

		List<Map<String, Object>> uploadDataList = new ArrayList<Map<String, Object>>();

		try {
			// Json Parameter에서 Map Type으로 변환
			paramInfo = CommonUtil.convertMapToJson(params, "paramInfo");
			// Upload 데이터 목록 조회
			uploadDataList = dataRegService.getDataList(paramInfo);
			// ModelAndView 객체 생성
			modelAndView = CommonUtil.makeModelAndView(jsonView);

		} catch (SQLException ex) {
			LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
		} catch (Exception e) {
			LOGGER.info("======== Exception Error Occurred =============  :  " + e);
		}

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("gridList", uploadDataList);

		return modelAndView;
	}

	/**
	 * 데이터 이력 가져오기
	 * 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	@RequestMapping(value = "/getDataHisList.ajax", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8" })
	public ModelAndView getOutDataHisList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception, SQLException {
		// params : tab-1 데이터 ---> 세부정보 데이터 가져옴

		Map<String, Object> paramInfo = new HashMap<String, Object>();
		ModelAndView modelAndView = new ModelAndView();
		List<Map<String, Object>> uploadDataList = new ArrayList<Map<String, Object>>();

		try {
			paramInfo = CommonUtil.convertMapToJson(params, "tab-1");

			// Upload 데이터 History 목록 조회
			uploadDataList = dataRegService.getDataHisList(paramInfo);

			// ModelAndView 객체 생성
			modelAndView = CommonUtil.makeModelAndView(jsonView);

		} catch (SQLException ex) {
			LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
		} catch (Exception e) {
			LOGGER.info("======== Exception Error Occurred =============  :  " + e);
		}

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("gridList", uploadDataList);

		return modelAndView;
	}

	/**
	 * 선택한 데이터 내용 100건만 가져오기(검색)
	 * 
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	@RequestMapping(value = "/getDataContentList.ajax", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8" })
	public ModelAndView getOutDataContentList(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception, SQLException {
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		Map<String, Object> param = new HashMap<String, Object>();
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();

		ModelAndView modelAndView = new ModelAndView();

		Map<String, Object> ContentAllCount = new HashMap<String, Object>();
		List<Map<String, Object>> selectGetColumnType = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> selectColCom = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> selectYearAll = new ArrayList<Map<String, Object>>();

		String target = "";
		try {

			paramInfo = CommonUtil.convertMapToJson(params, "tab-1");
			String flag = params.get("flag").toString();

			System.out.println(" flag 값 확인중 ======" + flag);

			// 코드 값으로 테이블 명 불러오기
			String schemaOri = "";
			String tableNm = "";
			String[] tableNmCut = (dataRegService.getDataTableNm(paramInfo).get("tblNm").toString()).split("\\.");
			if (tableNmCut.length == 1) {
				schemaOri = "public";
				tableNm = tableNmCut[0];
			} else {
				schemaOri = tableNmCut[0];
				tableNm = tableNmCut[1];
			}
			String schemaNum = "";

			// param 데이터에 schema 숫자 값 , 테이블 명 데이터 들어가 있음
			switch (schemaOri.trim().toUpperCase()) {
			case "PUBLIC":
				schemaNum = "4";
				param.put("schemaNum", schemaNum);
				break;
			case "WORK":
				schemaNum = "1";
				param.put("schemaNum", schemaNum);
				break;
			case "DATA":
				schemaNum = "2";
				param.put("schemaNum", schemaNum);
				break;
			}

			param.put("schemaOri", schemaOri);
			param.put("tableNm", tableNm);
			param.put("codeDesc", dataRegService.getDataTableNm(paramInfo).get("tblNm"));
			param.put("codeName", paramInfo.get("codeName"));

			if (params.get("date") != null) {
				param.put("targetMonth", params.get("date"));
				// 추가 수정
				target = (String) params.get("date");

			} else if (params.get("date") == null) {
				param.put("targetMonth", paramInfo.get("targetMonth"));
				// 추가 수정
				target = (String) paramInfo.get("targetMonth");
			}

			// 원본 테이블 컬럼명 검색
			selectGetColumnType = dataRegService.selectGetColumnType(param); // 원본 테이블 컬럼타입 조회

			// 원본 테이블 컬럼명 및 comment 검색
			selectColCom = dataRegService.selectColCom(param);

			// 수정 진행 중
			// 데이터 가져올때 쓰는 쿼리문
			// DB 쿼리문
			// 대상년월 데이터 추가로 기존 selectGetColumn.size() 값 강제 +1 처리
			String sql = "SELECT ROW_NUMBER() OVER(ORDER BY std_yr) AS no, * ";
				   sql += " FROM " + dataRegService.getDataTableNm(paramInfo).get("tblNm");
				   sql += " WHERE 1=1 ";
				   sql += " AND std_yr like '%'||" + target + "||'%'";
				   if (flag == "1") {
					   sql += " LIMIT 100";
				   }
			System.out.println("=================== DB 쿼리문 확인 =================" + sql);

			// 처리 결과 데이터 객체
			Connection con = getConnectionDB(); // DB Connection 객체

			PreparedStatement pstmt = null; // Prestatement 객체

			System.out.println("============================  DB Connection");
			pstmt = con.prepareStatement(sql);

			ResultSet rs = pstmt.executeQuery(); // query 실행 후 그 결과값을 rs에 저장

			int count = 1;
			// 결과값 불러오기
			while (rs.next()) {
				Map<String, Object> map = new HashMap<String, Object>();

				for (int i = 0; i < selectColCom.size(); i++) {
					if (i == 0) {
						map.put("no", String.valueOf(count));
					}
					map.put(convert2CamelCase(selectColCom.get(i).get("columnName").toString()),
							rs.getString(selectColCom.get(i).get("columnName").toString()));
				}
				// [List Map 에 배열에 데이터 삽입 실시]
				data.add(map);
				count++;
			}
			// 검색한 데이터 건수 확인
			ContentAllCount = dataRegService.getDataContentAllCount(param);

			// 선택한 데이터 년도 데이터 가져오기
			selectYearAll = dataRegService.getDataYearList(param);

			modelAndView = CommonUtil.makeModelAndView(jsonView);

		} catch (SQLException ex) {
			LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
		} catch (Exception e) {
			LOGGER.info("======== Exception Error Occurred =============  :  " + e);
		}

		/*
		 * data :: 테이블 데이터 리스트 값 selectGetColumnType :: 테이블 컬럼 타입(code) selectColCom ::
		 * 컬럼명(columnName), 컬럼comment(columnComment) param :: codeDesc(schema 포함한 전체
		 * 테이블명 ), schemaNum(schema 번호로 변경), schemOri(schema), codeName(테이블 한글 명),
		 * tableNm(테이블 명), targetMonth (대상년월) ContentAllCount :: 선택한 대상년월 전체 데이터 갯수
		 * selectYearAll :: 년도 리스트
		 */

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("content", data);
		modelAndView.addObject("tableAttr", selectGetColumnType);
		modelAndView.addObject("tableColumn", selectColCom);
		modelAndView.addObject("param", param);
		modelAndView.addObject("ContentAllCount", ContentAllCount);
		modelAndView.addObject("selectYearAll", selectYearAll);

		return modelAndView;
	}

	/**
	 * 파일 업로드 처리 및 데이터 생성처리 파일 업로드 처리 -> 데이터 생성 처리
	 * 
	 * @param multiRequest
	 * @param request
	 * @return
	 * @throws SQLException
	 * @throws Exception
	 */
	@RequestMapping(value = "/dataRegInsert.ajax", method = RequestMethod.POST, produces = {"application/json; charset=utf8" })
	public ModelAndView dataInsert(final MultipartHttpServletRequest multiRequest, HttpServletRequest request) throws SQLException, Exception {
		// DB 처리 Parameter 객체
		Map<String, Object> param = new HashMap<String, Object>();
		Map<String, Object> paramInfo = new HashMap<String, Object>();
		// 데이터 처리 결과 객체
		Map<String, Object> resultCreateData = new HashMap<String, Object>();

		// 세션의 로그인 사용자 정보 가져오기
		LoginVO loginVO = CommonUtil.getLoginInfo();

		ModelAndView modelAndView = new ModelAndView();

		String strStartDateTime = "";
		String strEndDateTime = "";

		String resultValue = "Y";
		String resultMsg = "";

		try {
			strStartDateTime = CommonUtil.getDataTimeForLog(); // 처리 시작 시간

			// 화면 데이터 받아오기
			String codeId = multiRequest.getParameter("codeId");

			param.put("codeId", codeId);
			String[] tableNmCut = (dataRegService.getDataTableNm(param).get("tblNm").toString()).split("\\.");

			String schema = tableNmCut[0];
			String tableName = tableNmCut[1];

			String targetMonth = multiRequest.getParameter("targetMonth");

			// 업로드 파일 원본 명
			// String orignlFile =
			// URLEncoder.encode(multiRequest.getParameter("orignlFile"), "UTF-8");

			// 업로드 파일 원본 명
			String orignlFile = multiRequest.getParameter("orignlFile");
			// 파일 원본 명 encode 처리 === 해당 이름을 넘겨줘야함
			String encodeValue = new String(orignlFile.getBytes("ISO-8859-1"), "UTF-8");

			System.out.println(" 업로드 파일 원본명 ======" + orignlFile);
			System.out.println(" 업로드 파일 원본 encode 명 ======" + encodeValue);

			// 확장자 분리
			String extension = orignlFile.substring(orignlFile.lastIndexOf(".") + 1);

			// Parameter 설정
			paramInfo.put("codeId", codeId);
			paramInfo.put("codeDesc", dataRegService.getDataTableNm(param).get("tblNm").toString());

			paramInfo.put("schema", schema);
			paramInfo.put("tableName", tableName);

			paramInfo.put("targetMonth", targetMonth);
			paramInfo.put("createStartDate", strStartDateTime);
			paramInfo.put("createEndDate", strStartDateTime);

			// 기존 파일 원본명 보류 (한글 명 문제 생김)
			// paramInfo.put("orignlFile", orignlFile);
			paramInfo.put("orignlFile", orignlFile);

			// 파일 확장자
			paramInfo.put("extension", extension);

			paramInfo.put("loginId", loginVO.getId());

			// 첨부파일 데이터 받아오기
			final Map<String, MultipartFile> files = multiRequest.getFileMap();

			// 바로 확장자 확인후 파일 데이터 넘기기
			// 확장자에 따른 데이터 생성 다르게 처리
			if (extension.equals("csv")) {
				// 데이터 생성 프로세스
				System.out.println("해당 파일은 csv 파일 입니다. ======");
				// resultCreateData = createUploadData(paramInfo);
				resultCreateData = createUploadData(multiRequest, paramInfo, files);
			} else if (extension.equals("xlsx") || extension.equals("xls")) {
				// 데이터 생성 프로세스
				System.out.println("해당 파일은 xlsx/xls 파일 입니다. ======");
				resultCreateData = createUploadXlsData(multiRequest, paramInfo, files);
			} else {
				resultValue = "N";
				resultMsg = "엑셀 또는 csv 파일만 업로드 가능합니다.";
			}

			resultValue = resultCreateData.get("resultValue").toString();
			resultMsg = resultCreateData.get("resultMsg").toString();

			// 에러가 없으면 통계 생성
			// if(resultValue == "Y") {

			// Map<String, Object> resultAnalysisData = createAnalysisData(paramInfo);
			//
			// resultValue = resultAnalysisData.get("resultValue").toString();
			// resultMsg = resultAnalysisData.get("resultMsg").toString();
			// }

			strEndDateTime = CommonUtil.getDataTimeForLog(); // 처리 종료 시간
			paramInfo.put("createEndDate", strEndDateTime);

			// 업로드 데이터 정보 저장
			// dataRegService.insertFileUploadInfo(paramInfo);

			modelAndView = CommonUtil.makeModelAndView(jsonView);

		} catch (SQLException e) {
			resultValue = "N";
			resultMsg = e.getMessage();
			LOGGER.info("======== SQLException Error Occurred =============  :  " + e);
		} catch (Exception ex) {
			resultValue = "N";
			resultMsg = ex.getMessage();
			LOGGER.info("======== Exception Error Occurred =============  :  " + ex);
		} finally {

		}

		modelAndView.addObject("resultValue", resultValue);
		modelAndView.addObject("resultMsg", resultMsg);

		return modelAndView;
	}

	/**
	 * 파일 업로드 데이터 저장 및 이력 저장
	 * 
	 * @param paramInfo
	 * @param files
	 * @return
	 * @throws SQLException
	 * @throws Exception
	 */
	public Map<String, Object> fileDataUpload(Map<String, Object> paramInfo, Map<String, MultipartFile> files) throws SQLException, Exception {

		// 처리결과 객체
		Map<String, Object> resultMap = new HashMap<String, Object>();

		String resultValue = "Y"; // 처리 완료 여부
		String resultMsg = ""; // 처리 결과 메시지

		String strProcStartTime = ""; // 처리 시작 시간
		String strProcEndTime = ""; // 처리 종료 시간

		try {
			strProcStartTime = CommonUtil.getDataTimeForLog(); // 처리 시작 시간

			// 파일 업로드 처리
			// uploadFileId = fileUtil.uploadFiles(files, "");

			// 업로드 된 파일 ID 가져오기
			// 업로드 파일 ID 널처리
			paramInfo.put("atchFileId", "");

			strProcEndTime = CommonUtil.getDataTimeForLog(); // 처리 종료 시간

			paramInfo.put("procTypeCd", "U");
			paramInfo.put("procDesc", "파일 업로드 완료");
			paramInfo.put("resultMsg", "");
			paramInfo.put("procStartTime", strProcStartTime);
			paramInfo.put("procEndTime", strProcEndTime);
			paramInfo.put("totCnt", 0);
			paramInfo.put("suTotCnt", 0);

			// 업로드 데이터 정보 저장
			dataRegService.insertFileUploadInfo(paramInfo);

			// 업로드 데이터 History 정보 저장
			dataRegService.insertFileUploadHistory(paramInfo);

		} catch (SQLException e) {
			resultValue = "N";
			resultMsg = e.getMessage();
			LOGGER.info("======== SQLException Error Occurred =============  :  " + e);
		} catch (Exception ex) {
			resultValue = "N";
			resultMsg = ex.getMessage();
			LOGGER.info("======== Exception Error Occurred =============  :  " + ex);
		}

		resultMap.put("resultValue", resultValue);
		resultMap.put("resultMsg", resultMsg);

		return resultMap;
	}

	/**
	 * 엑셀 파일 업로드
	 * 
	 * @param paramInfo
	 * @return
	 * @throws SQLException
	 * @throws Exception
	 */
	public Map<String, Object> createUploadXlsData(final MultipartHttpServletRequest multiRequest, Map<String, Object> paramInfo, Map<String, MultipartFile> files) throws SQLException, Exception {
		Map<String, Object> param = new HashMap<String, Object>();
		// 처리결과 객체
		Map<String, Object> resultMap = new HashMap<String, Object>();

		// DB Insert 처리 결과 객체
		Map<String, Object> resultUploadMap = null;

		Map<String, Object> selectTableExist = new HashMap<String, Object>();
		String resultValue = "Y"; // 처리 완료 여부
		String resultMsg = ""; // 처리 결과 메시지

		String strProcStartTime = ""; // 처리 시작 시간
		String strProcEndTime = ""; // 처리 종료 시간

		String procDesc = ""; // 처리 결과 설명
		String procResultMsg = ""; // 처리 결과 메시지

		int procInsertCnt = 0; // 본 Table Insert Count
		int tableIfCnt = 0; // 임시 Table 생성여부

		try {

			strProcStartTime = CommonUtil.getDataTimeForLog(); // 처리 시작 시간

			String codeId = paramInfo.get("codeId").toString();
			param.put("codeId", codeId);

			// 원본 테이블 존재 확인
			// 1이면 존재O, 0이면 존재X
			selectTableExist = dataRegService.selectTableExist(paramInfo);

			int tableCount = Integer.parseInt(String.valueOf(selectTableExist.get("count")));

			// 테이블 존재 확인 완료
			try {
				if (tableCount == 1) {
					// 임시 테이블 생성
					tableIfCnt = dataRegService.createIfTable(paramInfo);
					if (tableIfCnt != 0)
						resultValue = "N";

					// 임시 테이블에 파일 데이터 삽입
					resultUploadMap = createIfXlsData(null, files, paramInfo);

					// 임시 테이블에 파일 데이터 삽입과 관련한 결과값 대입
					resultValue = resultUploadMap.get("resultValue").toString();

					if (resultValue == "Y") {
						// 임시 테이블 데이터 원본 테이블에 삽입
						procInsertCnt = dataRegService.InsertDataTable(paramInfo);
						// 데이터가 삽입 되지 않은 경우
						if (procInsertCnt == 0)
							resultValue = "N";
					}
					System.out.println("임시 테이블 데이터 원본 테이블에 삽입 ========================== " + resultValue);

					// 임시 테이블 삭제
					dataRegService.deleteIfTable(paramInfo);

				}
				// 원본테이블 정보가 없는 경우
				else {
					throw new NullPointerException();
				}
			} catch (SQLException ex) {
				resultValue = "N";
				LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
				resultMsg = ex.getMessage();
			} catch (Exception e) {
				resultValue = "N";
				LOGGER.info("======== Exception Error Occurred =============  :  " + e);
				resultMsg = e.getMessage();
			}

			// 데이터 Error Count
			int resultErrorCnt = Integer.parseInt(resultUploadMap.get("errorCnt").toString());

			// 데이터 Count
			Double dbProcDataCnt = Double.parseDouble(resultUploadMap.get("dataCnt").toString());

			// 콤마 Format
			DecimalFormat dc = new DecimalFormat("###,###,###,###");
			String procDataCnt = dc.format(dbProcDataCnt);

			if (resultErrorCnt == 0) {
				procDesc = "데이터 생성 완료 : " + procDataCnt + " 건";
				// procDesc = "데이터 생성 완료 : " + procDataCnt + " 건, Copy : " + procInsertCnt +
				// "건";
			} else {
				procDesc = "데이터 오류 : " + resultErrorCnt + "건";
			}

			procResultMsg = resultUploadMap.get("errorMsg").toString();

			strProcEndTime = CommonUtil.getDataTimeForLog(); // 처리 종료 시간

		} catch (SQLException ex) {
			resultValue = "N";
			resultMsg = ex.getMessage();

			procDesc = "데이터 생성 실패";
			procResultMsg = ex.getMessage();
			LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);

		} catch (Exception ex) {
			resultValue = "N";
			resultMsg = ex.getMessage();

			procDesc = "데이터 생성 실패";
			procResultMsg = ex.getMessage();

			LOGGER.info("======== Exception Error Occurred =============  :  " + ex);

		} finally {

			// 데이터 Error Count
			int resultErrorCnt = Integer.parseInt(resultUploadMap.get("errorCnt").toString());

			// 데이터 Count
			Double dbProcDataCnt = Double.parseDouble(resultUploadMap.get("dataCnt").toString());

			try {
				strProcEndTime = CommonUtil.getDataTimeForLog(); // 처리 종료 시간

				paramInfo.put("atchFileId", "");
				paramInfo.put("procTypeCd", "D");
				paramInfo.put("procDesc", procDesc);
				paramInfo.put("resultMsg", procResultMsg);
				paramInfo.put("procStartTime", strProcStartTime);
				paramInfo.put("procEndTime", strProcEndTime);
				paramInfo.put("totCnt", dbProcDataCnt);
				paramInfo.put("suTotCnt", (dbProcDataCnt - resultErrorCnt));

				// 업로드 데이터 History 정보 저장
				dataRegService.insertFileUploadHistory(paramInfo);

			} catch (SQLException ex) {
				resultValue = "N";
				resultMsg = ex.getMessage();
				LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);

			} catch (Exception e) {
				resultValue = "N";
				resultMsg = e.getMessage();
				LOGGER.info("======== Exception Error Occurred =============  :  " + e);

			}
		}

		resultMap.put("resultValue", resultValue);
		resultMap.put("resultMsg", resultMsg);

		return resultMap;
	}

	/**
	 * 데이터 생성
	 * 
	 * @param paramInfo
	 * @return
	 * @throws SQLException
	 * @throws Exception
	 */
	public Map<String, Object> createUploadData(final MultipartHttpServletRequest multiRequest, Map<String, Object> paramInfo, Map<String, MultipartFile> files) throws SQLException, Exception {

		// 처리결과 객체
		Map<String, Object> resultMap = new HashMap<String, Object>();

		Map<String, Object> uploadFileInfo = new HashMap<String, Object>();
		Map<String, Object> selectTableExist = new HashMap<String, Object>();

		// DB Insert 처리 결과 객체
		Map<String, Object> resultUploadMap = null;

		String resultValue = "Y"; // 처리 완료 여부
		String resultMsg = ""; // 처리 결과 메시지

		String strProcStartTime = ""; // 처리 시작 시간
		String strProcEndTime = ""; // 처리 종료 시간

		String procDesc = ""; // 처리 결과 설명
		String procResultMsg = ""; // 처리 결과 메시지

		int procInsertCnt = 0; // 본 Table Insert Count
		int tableIfCnt = 0; // 임시 Table 생성여부

		try {

			strProcStartTime = CommonUtil.getDataTimeForLog(); // 처리 시작 시간
			// 물리적 테이블명
			String codeDesc = paramInfo.get("codeDesc").toString();

			// Upload 파일 정보 조회하기
			// uploadFileInfo = dataRegService.selectUpliadFileInfo(paramInfo);

			// 파일 경로 구하기
			// String filePath = uploadFileInfo.get("fileStreCours").toString()
			// + uploadFileInfo.get("streFileNm").toString();
			// System.out.println("filePath" + filePath);

			// 데이터 유형 코드
			String strCodeId = paramInfo.get("codeId").toString().trim();
			System.out.println("strCodeId" + strCodeId);

			// 원본 테이블 존재 확인
			// 1이면 존재O, 0이면 존재X
			selectTableExist = dataRegService.selectTableExist(paramInfo);
			System.out.println("selectTableExist ==== " + selectTableExist);
			int tableCount = Integer.parseInt(String.valueOf(selectTableExist.get("count")));

			System.out.println("resultValue1-1 ========================== " + resultValue);

			// 테이블 존재 확인 완료 (try-catch 처리를 해야하나?)

			try {
				if (tableCount == 1) {
					// 임시 테이블 생성
					tableIfCnt = dataRegService.createIfTable(paramInfo);
					if (tableIfCnt != 0)
						resultValue = "N";

					// 임시 테이블에 파일 데이터 삽입
					// resultUploadMap = createIfData(filePath, paramInfo);
					resultUploadMap = createIfData(null, files, paramInfo);

					// 임시 테이블에 파일 데이터 삽입과 관련한 결과값 대입
					resultValue = resultUploadMap.get("resultValue").toString();

					if (resultValue == "Y") {
						// 임시 테이블 데이터 원본 테이블에 삽입
						procInsertCnt = dataRegService.InsertDataTable(paramInfo);
						// 데이터가 삽입 되지 않은 경우
						if (procInsertCnt == 0)
							resultValue = "N";
					}
					System.out.println("임시 테이블 데이터 원본 테이블에 삽입 ========================== " + resultValue);

					// 임시 테이블 삭제
					dataRegService.deleteIfTable(paramInfo);

				}
				// 원본테이블 정보가 없는 경우
				else {
					throw new NullPointerException();
				}
			} catch (SQLException ex) {
				resultValue = "N";
				LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
				resultMsg = ex.getMessage();
			} catch (Exception e) {
				resultValue = "N";
				LOGGER.info("======== Exception Error Occurred =============  :  " + e);
				resultMsg = e.getMessage();
			}

			// 데이터 Error Count
			int resultErrorCnt = Integer.parseInt(resultUploadMap.get("errorCnt").toString());

			// 데이터 Count
			Double dbProcDataCnt = Double.parseDouble(resultUploadMap.get("dataCnt").toString());

			// 콤마 Format
			DecimalFormat dc = new DecimalFormat("###,###,###,###");
			String procDataCnt = dc.format(dbProcDataCnt);

			if (resultErrorCnt == 0) {
				procDesc = "데이터 생성 완료 : " + procDataCnt + " 건";
				// procDesc = "데이터 생성 완료 : " + procDataCnt + " 건, Copy : " + procInsertCnt +
				// "건";
			} else {
				procDesc = "데이터 오류 : " + resultErrorCnt + "건";
			}

			procResultMsg = resultUploadMap.get("errorMsg").toString();

			strProcEndTime = CommonUtil.getDataTimeForLog(); // 처리 종료 시간

		} catch (SQLException e) {

			resultValue = "N";
			resultMsg = e.getMessage();

			procDesc = "데이터 생성 실패";
			procResultMsg = e.getMessage();

			LOGGER.info("======== SQLException Error Occurred =============  :  " + e);

		} catch (Exception ex) {

			resultValue = "N";
			resultMsg = ex.getMessage();

			procDesc = "데이터 생성 실패";
			procResultMsg = ex.getMessage();

			LOGGER.info("======== Exception Error Occurred =============  :  " + ex);

		} finally {
			// 데이터 Error Count
			int resultErrorCnt = Integer.parseInt(resultUploadMap.get("errorCnt").toString());

			// 데이터 Count
			Double dbProcDataCnt = Double.parseDouble(resultUploadMap.get("dataCnt").toString());

			try {
				strProcEndTime = CommonUtil.getDataTimeForLog(); // 처리 종료 시간

				paramInfo.put("atchFileId", "");
				paramInfo.put("procTypeCd", "D");
				paramInfo.put("procDesc", procDesc);
				paramInfo.put("resultMsg", procResultMsg);
				paramInfo.put("procStartTime", strProcStartTime);
				paramInfo.put("procEndTime", strProcEndTime);
				paramInfo.put("totCnt", dbProcDataCnt);
				paramInfo.put("suTotCnt", (dbProcDataCnt - resultErrorCnt));

				// 업로드 데이터 History 정보 저장
				dataRegService.insertFileUploadHistory(paramInfo);

			} catch (SQLException ex) {

				resultValue = "N";
				resultMsg = ex.getMessage();
				LOGGER.info("======== Exception Error Occurred =============  :  " + ex);

			} catch (Exception e) {
				resultValue = "N";
				resultMsg = e.getMessage();
				LOGGER.info("======== Exception Error Occurred =============  :  " + e);

			}
		}

		resultMap.put("resultValue", resultValue);
		resultMap.put("resultMsg", resultMsg);

		return resultMap;
	}

	/**
	 * CSV 데이터 DB에 삽입하기
	 * 
	 * @param filePath
	 * @param paramInfo
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	public Map<String, Object> createIfData(final MultipartHttpServletRequest multiRequest, Map<String, MultipartFile> files, Map<String, Object> paramInfo) throws Exception, SQLException {
		// 원본 테이블 컬럼 값 확인을 위한 param 따로 분리
		String resultValue = "Y";

		Map<String, Object> param = new HashMap<String, Object>();

		String schemaNum = null;

		// paramInfo 데이터 분리하기
		String schemaOri = paramInfo.get("schema").toString();
		String tableNm = paramInfo.get("tableName").toString();
		// String headerYn = paramInfo.get("headerYn").toString();

		// 대상년월 데이터
		String targetMonth = paramInfo.get("targetMonth").toString();

		// 원본 파일 명
		String orignlFile = paramInfo.get("orignlFile").toString();

		int columnCount = 0; // 원본 테이블 컬럼 갯수만 추출

		// 여기
		// param 데이터에 schema 숫자 값 , 테이블 명 데이터 들어가 있음
		switch (schemaOri.trim().toUpperCase()) {
		case "PUBLIC":
			schemaNum = "4";
			param.put("schemaNum", schemaNum);
			break;
		case "WORK":
			schemaNum = "1";
			param.put("schemaNum", schemaNum);
			break;
		case "DATA":
			schemaNum = "2";
			param.put("schemaNum", schemaNum);
			break;
		}
		param.put("tableNm", tableNm);

		List<Map<String, Object>> selectGetColumn = dataRegService.selectGetColumn(param); // 원본 테이블 컬럼명 조회
		List<Map<String, Object>> selectGetColumnType = dataRegService.selectGetColumnType(param); // 원본 테이블 컬럼타입 조회

		System.out.println("selectGetColumn ===" + selectGetColumn);
		System.out.println("selectGetColumnType ===" + selectGetColumnType);

		// 원본 컬럼 갯수 출력
		columnCount = selectGetColumn.size();

		String[] hParam = new String[selectGetColumn.size()];
		String[] TParam = new String[selectGetColumnType.size()];

		for (int i = 0; i < selectGetColumn.size(); i++) {
			// 원본테이블 컬럼이름 명
			hParam[i] = selectGetColumn.get(i).get("name").toString();

			// 원본테이블 컬럼 데이터 타입
			TParam[i] = selectGetColumnType.get(i).get("code").toString();
		}

		// DB 쿼리문
		// 대상년월 데이터 추가로 기존 selectGetColumn.size() 값 강제 +1 처리
		String sql = "INSERT INTO " + schemaOri + "." + tableNm + "_if VALUES (";
		for (int i = 0; i < columnCount; i++) {
			if (i == 0)
				sql += ("?" + "::" + TParam[i]);
			else
				sql += (", ?" + "::" + TParam[i]);
		}
		sql += ")";

		System.out.println("=================== DB 쿼리문 확인 =================" + sql);

		// 처리 결과 데이터 객체
		Map<String, Object> resultMap = new HashMap<String, Object>();

		StringBuilder errorMsg = new StringBuilder(); // 에러 메시지

		Connection con = getConnectionDB(); // DB Connection 객체

		PreparedStatement pstmt = null; // Prestatement 객체

		// 파일에서 읽어온 데이터 구분자
		// 임의의 구분자 선정
		// String charSplit = ",";

		int readLineCnt = 0; // 데이터 Row 수
		int batchCnt = 0; // 트랜잭션 단위
		int errorCnt = 0; // 에러 메시지 수

		try {

			System.out.println("============================  DB Connection");
			pstmt = con.prepareStatement(sql);
			System.out.println("pstmt" + pstmt);

			System.out.println("============================  File Read");

			// 파일 오픈
			// String parFile1 = filePath.replace('\\', FILE_SEPARATOR).replace('/',
			// FILE_SEPARATOR);
			// System.out.println("parFile1" + parFile1);

			// File file = new File(ComWebUtil.filePathBlackList(parFile1));
			BufferedReader br = null;
			// 파일이며, 존재하면 파싱 시작
			// if (file.exists() && file.isFile()) {
			if (files.get("uploadFile").toString() != "") {
				br = new BufferedReader(new InputStreamReader(files.get("uploadFile").getInputStream()));

				String line = "";

				while ((line = br.readLine()) != null) {

					// if (headerYn.equals("Y") == true) {
					if (line.length() > 0) {
						if (readLineCnt > 0) {

							String[] strFileline = line.split(",(?=([^\"]*\"[^\"]*\")*[^\"]*$)", -1);
							// String[] strFileline = ComStringUtil.split(line.toString(), charSplit);

							int strlength = strFileline.length + 1;

							System.out.println("strFileline.length 길이 확인 중 ========" + strFileline.length);

							// 원본테이블의 컬럼 개수 와 파일의 컬럼 개수 크기 비교
							if (columnCount == strlength) {

								System.out.println("=======================" + readLineCnt
										+ "번째 줄입니다 =================================");
								/*
								 * pstmt 종류 setString ::string setInt ::int setLong ::long setDouble ::double
								 * setFloat ::float setTimestamp ::timestamp setDate ::date setTime ::time
								 */

								// 데이터 null 값 count 처리
								int nullC = 0;

								// 대상년월 관련한 항목 데이터 넣는 부분 --- varchar 혹은 text 형식의 데이터년월 형식만 허용하게 처리함
								if (TParam[0].contains("varchar") || TParam[0].contains("text")) {
									pstmt.setString(1, targetMonth);
								}

								for (int i = 0; i < strFileline.length; i++) {
									if (TParam[(i + 1)].contains("text") || TParam[(i + 1)].contains("varchar")) {
										if (strFileline[i].length() == 0) {
											nullC++;
											System.out.println("null 값 길이 확인 중 ========" + nullC);
											System.out.println(i + "번째 데이터는 null 혹은 '' 값입니다.");
											pstmt.setString(i + 2, strFileline[i]);

											if (nullC == strFileline.length) {
												// 한줄의 데이터가 null 인경우 에러처리
												System.out.println("들어오나?" + nullC);

												errorMsg.append("L:" + readLineCnt + ",C|");
												errorCnt++; // 에러 수 증가하기
												resultValue = "N";
											}
										} else {
											System.out.println(i + "번째 데이터   " + strFileline[i]
													+ "    출력 됨 -------- 데이터 타입 ::" + TParam[(i + 1)]);
											pstmt.setString(i + 2, strFileline[i]);
										}
									} else if (TParam[(i + 1)].contains("int")) {
										if (strFileline[i].length() == 0) {
											nullC++;
											System.out.println("null 값 길이 확인 중 ========" + nullC);

											System.out.println(i + "번째 데이터는 null 혹은 '' 값입니다.");
											pstmt.setInt(i + 2, 0);

											if (nullC == strFileline.length) {
												// 한줄의 데이터가 null 인경우 에러처리
												System.out.println("들어오나?" + nullC);

												errorMsg.append("L:" + readLineCnt + ",C|");
												errorCnt++; // 에러 수 증가하기
												resultValue = "N";
											}
										} else {
											System.out.println(i + "번째 데이터   " + strFileline[i]
													+ "    출력 됨 -------- 데이터 타입 ::" + TParam[(i + 1)]);
											pstmt.setInt(i + 2, Integer.parseInt(strFileline[i]));
										}
									} else if (TParam[(i + 1)].contains("numeric")
											|| TParam[(i + 1)].contains("double")) {
										if (strFileline[i].length() == 0) {
											nullC++;
											System.out.println("null 값 길이 확인 중 ========" + nullC);

											System.out.println(i + "번째 데이터는 null 혹은 '' 값입니다.");
											pstmt.setString(i + 2, String.valueOf(strFileline[i]));

											if (nullC == strFileline.length) {
												// 한줄의 데이터가 null 인경우 에러처리
												System.out.println("들어오나?" + nullC);

												errorMsg.append("L:" + readLineCnt + ",C|");
												errorCnt++; // 에러 수 증가하기
												resultValue = "N";
											}
										} else {
											System.out.println(i + "번째 데이터   " + strFileline[i]
													+ "    출력 됨 -------- 데이터 타입 ::" + TParam[(i + 1)]);
											pstmt.setDouble(i + 2, Double.parseDouble(strFileline[i]));
										}
									} else if (TParam[(i + 1)].contains("timestamp")) {
										if (strFileline[i].length() == 0) {
											nullC++;
											System.out.println("null 값 길이 확인 중 ========" + nullC);

											System.out.println(i + "번째 데이터는 null 혹은 '' 값입니다.");
											pstmt.setString(i + 2, String.valueOf(strFileline[i]));

											if (nullC == strFileline.length) {
												// 한줄의 데이터가 null 인경우 에러처리
												errorMsg.append("L:" + readLineCnt + ",C|");
												errorCnt++; // 에러 수 증가하기
												resultValue = "N";
											}
										} else {
											System.out.println(i + "번째 데이터   " + strFileline[i]
													+ "    출력 됨 -------- 데이터 타입 ::" + TParam[(i + 1)]);
											pstmt.setTimestamp(i + 2, Timestamp.valueOf(strFileline[i]));
										}
									}
								}

								// addBatch에 담기
								pstmt.addBatch();

								// 파라미터 Clear
								pstmt.clearParameters();

								// Batch Count 증가
								batchCnt++;

								// OutOfMemory를 고려하여 만건 단위로 커밋
								if ((batchCnt % 10000) == 0) {
									// if( (batchCnt % 10) == 0){
									// Batch 실행
									pstmt.executeBatch();
									// Batch 초기화
									pstmt.clearBatch();
									// 커밋
									con.commit();
									batchCnt = 0;
								}
							} else {
								errorMsg.append("L:" + readLineCnt + ",C|");
								errorCnt++; // 에러 수 증가하기
								resultValue = "N";
							}
						}
						readLineCnt++; // Read Count 중가
					}
				}
				if (errorCnt == 0) {
					// 커밋되지 못한 나머지 구문에 대하여 커밋
					// 모든 데이터 commit 마무리
					pstmt.executeBatch();
					con.commit();
					System.out.println("SUCCESS 모든 데이터 정상 처리 하였습니다. ");
				} else {
					con.rollback();
					System.out.println("ERROR 데이터 비정상 처리 하였습니다.");
				}
			}

		} catch (IOException e) {
			resultValue = "N";
			con.rollback();
			LOGGER.info("======== IOException Error Occurred =============  :  " + e);
		} catch (SQLException e) {
			resultValue = "N";
			con.rollback();
			LOGGER.info("======== SQLException Error Occurred =============  :  " + e);
		} catch (Exception ex) {
			resultValue = "N";
			con.rollback();
			LOGGER.info("======== Exception Error Occurred =============  :  " + ex);
		} finally {

			if (pstmt != null)
				try {
					pstmt.close();
					pstmt = null;
				} catch (SQLException ex) {
					resultValue = "N";
					LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
				}
			if (con != null)
				try {
					con.close();
					con = null;
				} catch (SQLException ex) {
					resultValue = "N";
					LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
				}
			readLineCnt--;
		}

		resultMap.put("resultValue", resultValue);
		resultMap.put("dataCnt", readLineCnt);
		resultMap.put("errorMsg", errorMsg.toString());
		resultMap.put("errorCnt", errorCnt);

		return resultMap;
	}

	/**
	 * XLSX/XLS 데이터 DB에 삽입하기
	 * 
	 * @param filePath
	 * @param paramInfo
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	// public Map<String, Object> createIfXlsData(String filePath, Map<String,
	// Object> paramInfo) throws Exception, SQLException {
	public Map<String, Object> createIfXlsData(final MultipartHttpServletRequest multiRequest, Map<String, MultipartFile> files, Map<String, Object> paramInfo) throws Exception, SQLException {
		// 원본 테이블 컬럼 값 확인을 위한 param 따로 분리
		Map<String, Object> param = new HashMap<String, Object>();

		List<Map<String, Object>> selectGetColumn = new ArrayList<Map<String, Object>>(); // 원본 테이블 컬럼명 조회
		List<Map<String, Object>> selectGetColumnType = new ArrayList<Map<String, Object>>(); // 원본 테이블 컬럼타입 조회

		String schemaNum = null;
		String schemaOri = null;
		String tableNm = null;
		String extension = null;
		String targetMonth = null;
		String orignlFile = null;

		String[] hParam;
		String[] TParam;

		// 처리 결과 데이터 객체
		Map<String, Object> resultMap = new HashMap<String, Object>();
		StringBuilder errorMsg = new StringBuilder(); // 에러 메시지
		Connection con = getConnectionDB(); // DB Connection 객체
		PreparedStatement pstmt = null; // Prestatement 객체

		int readLineCnt = 0; // 데이터 Row 수
		int batchCnt = 0; // 트랜잭션 단위
		int errorCnt = 0; // 에러 메시지 수

		int columnCount = 0; // 원본 테이블 컬럼 갯수만 추출

		// 반복문사용으로 변수 사용
		int rows = 0;

		String yearChkResult = "N";
		String resultValue = "Y";

		try {

			// paramInfo 데이터 분리하기
			schemaOri = paramInfo.get("schema").toString();
			tableNm = paramInfo.get("tableName").toString();
			// String headerYn = paramInfo.get("headerYn").toString();

			extension = paramInfo.get("extension").toString();

			// 대상년월 데이터
			targetMonth = paramInfo.get("targetMonth").toString();

			// 원본 파일 명
			orignlFile = paramInfo.get("orignlFile").toString();

			// param 데이터에 schema 숫자 값 , 테이블 명 데이터 들어가 있음
			switch (schemaOri.trim().toUpperCase()) {
			case "PUBLIC":
				schemaNum = "4";
				param.put("schemaNum", schemaNum);
				break;
			case "WORK":
				schemaNum = "1";
				param.put("schemaNum", schemaNum);
				break;
			case "DATA":
				schemaNum = "2";
				param.put("schemaNum", schemaNum);
				break;
			}
			param.put("tableNm", tableNm);

			selectGetColumn = dataRegService.selectGetColumn(param); // 원본 테이블 컬럼명 조회
			selectGetColumnType = dataRegService.selectGetColumnType(param); // 원본 테이블 컬럼타입 조회

			System.out.println("selectGetColumn ===" + selectGetColumn);
			System.out.println("selectGetColumnType ===" + selectGetColumnType);

			// 원본 컬럼 갯수 출력
			columnCount = selectGetColumn.size();

			hParam = new String[selectGetColumn.size()];
			TParam = new String[selectGetColumnType.size()];

			for (int i = 0; i < selectGetColumn.size(); i++) {
				// 원본테이블 컬럼이름 명
				hParam[i] = selectGetColumn.get(i).get("name").toString();

				// 원본테이블 컬럼 데이터 타입
				TParam[i] = selectGetColumnType.get(i).get("code").toString();
			}

			// DB 쿼리문
			String sql = "INSERT INTO " + schemaOri + "." + tableNm + "_if VALUES (";
			for (int i = 0; i < columnCount; i++) {
				if (TParam[i] == "timestamp") {
					if (i == 0)
						sql += ("to_timestamp( ? , 'yyyy-mm-dd hh24:mi:ss)::date");
					else
						sql += (", to_timestamp( ? , 'yyyy-mm-dd hh24:mi:ss)::date");
				} else {
					if (i == 0)
						sql += ("?" + "::" + TParam[i]);
					else
						sql += (", ?" + "::" + TParam[i]);
				}
			}
			sql += ")";

			System.out.println("=================== DB 쿼리문 확인 =================" + sql);

			System.out.println("============================  DB Connection");

			pstmt = con.prepareStatement(sql);

			// System.out.println("============================ File Read" +filePath);

			// 파일 오픈
			// String parFile1 = filePath.replace('\\', FILE_SEPARATOR).replace('/',
			// FILE_SEPARATOR);

			// File file = new File(ComWebUtil.filePathBlackList(parFile1));

			// 첨부파일 데이터 받아오기
			// final Map<String, MultipartFile> files1 = multiRequest.getFileMap();

			// 여기서 저장했던 파일 경로
			// File file = new File(ComWebUtil.filePathBlackList(filePath));

			System.out.println("ComWebUtil.filePathBlackList(filePath) ============== ");
			// 엑셀 파일 선언

			// 파일이며, 존재하면 파싱 시작
			// if (file.exists() && file.isFile()) {
			if (files.get("uploadFile").toString() != "") {

				// 03년도 엑셀파일의경우 확장자 분리하여 체크해줘야함
				// xlsx 확장자 파일 데이터 읽기 시작
				// ============================================================================
				if (extension.equals("xlsx") == true) {
					XSSFWorkbook workbook = null;
					// workbook = new XSSFWorkbook(new FileInputStream(file));
					workbook = new XSSFWorkbook(files.get("uploadFile").getInputStream());

					// 첫번째 시트의 데이터만 확인한다.
					XSSFSheet worksheet = workbook.getSheetAt(0);
					rows = worksheet.getPhysicalNumberOfRows(); // 행 갯수 가져오기

					// ---------------------------------대상년월 데이터 확인 이후 데이터 읽기 시작
					// ---------------------------------
					// 데이터 전체 확인하기 전에 첫번째 줄에 데이터에서 대상년월 관련 데이터가 일치하는지 or 존재하는지 확인하는 과정 필요
					// header값을 제외한 1번째 row부터 데이터 확인
					XSSFRow yearChk = worksheet.getRow(1);
					System.out.println(" tagetMonth 데이터 확인 ======" + targetMonth);

					for (int i = 0; i < yearChk.getPhysicalNumberOfCells(); i++) {
						System.out.println(" 데이터 바로 확인 ====" + yearChk.getCell(i));

						// int 값이든 String 값이든 구분 없이 데이터 값 비교
						String ChkValue = String
								.valueOf(new Double(yearChk.getCell(i).getNumericCellValue()).intValue());

						ChkValue = replaceString(ChkValue);
						System.out.println(" 이거 잘 나오나 =====" + ChkValue);
						if (ChkValue.contains(targetMonth)) {
							yearChkResult = "Y";
							break;
						}
					}
					if (yearChkResult.equals("Y")) {
						for (int rowindex = 0; rowindex < rows; rowindex++) {
							// 행을읽는다( 강제 +1 처리 ) ---> 헤더값 제외하기 위해서 강제 +1 처리
							XSSFRow row = worksheet.getRow(rowindex + 1);

							if (row != null) {
								// 셀의 수 (컬럼 수)
								int cells = row.getPhysicalNumberOfCells();
								// 대상 년월 데이터 추가로 length 값 강제 +1 처리
								int cellsLength = cells + 1;
								// 기존 테이블 컬럼 수와 파일의 컬럼 수가 일치하면
								if (columnCount == cellsLength) {
									pstmt.setString(1, targetMonth);
									int nullC = 0;
									for (int i = 0; i < cells; i++) {
										// 셀값을 읽는다
										XSSFCell cell = row.getCell(i);

										if (cell.getCellType() == XSSFCell.CELL_TYPE_NUMERIC) {
											// 날짜 , 시간 데이터 처리를 따로 구분해서 처리해야하는 것인가.. !
											if (DateUtil.isCellDateFormatted(cell)) {
												java.util.Date utilDate = new java.util.Date();
												utilDate = cell.getDateCellValue();
												java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
												pstmt.setDate(i + 2, sqlDate);
											} else {
												pstmt.setDouble(i + 2, cell.getNumericCellValue());
											}
										} else if (cell.getCellType() == XSSFCell.CELL_TYPE_STRING) {
											pstmt.setString(i + 2, cell.getStringCellValue());
										} else if (cell.getCellType() == XSSFCell.CELL_TYPE_BLANK) {
											nullC++;
											if (nullC == cells) {
												System.out.println("데이터 전체 null 값 들어옴 =================="
														+ (readLineCnt + 2) + "번째 발생");
												errorMsg.append("L:" + (readLineCnt + 2) + ",C|");
												errorCnt++; // 에러 수 증가하기
												resultValue = "N";
											} else {
												pstmt.setString(i + 2, "");
											}
										}
									}
									// addBatch에 담기
									pstmt.addBatch();
									// 파라미터 Clear
									pstmt.clearParameters();
									// Batch Count 증가
									batchCnt++;

									// OutOfMemory를 고려하여 만건 단위로 커밋
									if ((batchCnt % 10000) == 0) {
										// if( (batchCnt % 10) == 0){
										// Batch 실행
										pstmt.executeBatch();
										// Batch 초기화
										pstmt.clearBatch();
										// 커밋
										con.commit();
										batchCnt = 0;
									}
									readLineCnt++;

								} else {
									errorMsg.append("L:" + readLineCnt + 2 + ",C|");
									errorCnt++; // 에러 수 증가하기
									resultValue = "N";
								}
								// 셀의 데이터가 null 값인 경우
							} else {
								System.out.println(" 해당 셀의 줄의 null 값이 존재합니다 ======= " + readLineCnt + "번째 줄 확인 바람");
							}
						}
					} else {
						resultValue = "N";
					}
					// xlsx 확장자 파일 데이터 읽기 끝
					// ============================================================================

					// xls 확장자 파일 데이터 읽기 시작
					// ============================================================================
				} else if (extension.equals("xls")) {
					HSSFWorkbook workbook = null;
					workbook = new HSSFWorkbook(files.get("uploadFile").getInputStream());
					// 첫번째 시트의 데이터만 확인한다.
					HSSFSheet worksheet = workbook.getSheetAt(0);
					rows = worksheet.getPhysicalNumberOfRows(); // 행 갯수 가져오기
					// 헤더 유무 (헤더 값 존재 O)
					// if (headerYn.equals("Y") == true) {

					HSSFRow yearChk = worksheet.getRow(1);
					System.out.println(" tagetMonth 데이터 확인 ======" + targetMonth);
					for (int i = 0; i < yearChk.getPhysicalNumberOfCells(); i++) {
						System.out.println(" 데이터 바로 확인 ====" + yearChk.getCell(i));

						// int 값이든 String 값이든 구분 없이 데이터 값 비교
						String ChkValue = String
								.valueOf(new Double(yearChk.getCell(i).getNumericCellValue()).intValue());

						ChkValue = replaceString(ChkValue);
						System.out.println(" 이거 잘 나오나 =====" + ChkValue);
						// 정규식 처리
						if (ChkValue.contains(targetMonth)) {
							yearChkResult = "Y";
							break;
						}
					}
					if (yearChkResult.equals("Y")) {
						for (int rowindex = 0; rowindex < rows; rowindex++) {

							// 행을읽는다( 강제 +1 처리 )
							HSSFRow row = worksheet.getRow(rowindex + 1);
							if (row != null) {
								// 셀의 수 (컬럼 수)
								int cells = row.getPhysicalNumberOfCells();

								// 대상 년월 데이터 추가로 length 값 강제 +1 처리
								int cellsLength = cells + 1;
								// 기존 테이블 컬럼 수와 파일의 컬럼 수가 일치하면
								if (columnCount == cellsLength) {

									pstmt.setString(1, targetMonth);

									int nullC = 0;
									for (int i = 0; i < cells; i++) {
										// 셀값을 읽는다
										HSSFCell cell = row.getCell(i);

										if (cell == null) {
											continue;
										} else if (cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC) {
											// 날짜 , 시간 데이터 처리를 따로 구분해서 처리해야하는 것인가.. !
											if (cell.getDateCellValue() != null) {
												java.util.Date utilDate = new java.util.Date();
												utilDate = cell.getDateCellValue();
												java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
												pstmt.setDate(i + 2, sqlDate);
											} else {
												pstmt.setDouble(i + 2, cell.getNumericCellValue());
											}
										} else if (cell.getCellType() == HSSFCell.CELL_TYPE_STRING) {
											pstmt.setString(i + 2, cell.getStringCellValue());
										} else if (cell.getCellType() == HSSFCell.CELL_TYPE_BLANK) {
											nullC++;
											if (nullC == cells) {
												System.out.println("데이터 전체 null 값 들어옴 =================="
														+ (readLineCnt + 2) + "번째 발생");
												errorMsg.append("L:" + (readLineCnt + 2) + ",C|");
												errorCnt++; // 에러 수 증가하기
												resultValue = "N";
											} else {
												pstmt.setString(i + 2, "");
											}
										}
									}
									// addBatch에 담기
									pstmt.addBatch();
									// 파라미터 Clear
									pstmt.clearParameters();
									// Batch Count 증가
									batchCnt++;
									// OutOfMemory를 고려하여 만건 단위로 커밋
									if ((batchCnt % 10000) == 0) {
										// if( (batchCnt % 10) == 0){
										// Batch 실행
										pstmt.executeBatch();
										// Batch 초기화
										pstmt.clearBatch();
										// 커밋
										con.commit();
										batchCnt = 0;
									}
									readLineCnt++;

								} else {
									errorMsg.append("L:" + (readLineCnt + 2) + ",C|");
									errorCnt++; // 에러 수 증가하기
									resultValue = "N";
								}
							}

						}
					} else {
						resultValue = "N";
					}
				}
				// xls 확장자 파일 데이터 읽기 끝
				// ============================================================================

				// 만건의 데이터를 넘지 못한 데이터들은 따로 commit 처리를 해준다.
				// 총 데이터 갯수 == readlineCnt
				if (errorCnt == 0) {
					// 커밋되지 못한 나머지 구문에 대하여 커밋
					// 모든 데이터 commit 마무리
					pstmt.executeBatch();
					con.commit();
					System.out.println("SUCCESS 모든 데이터 정상 처리 하였습니다. ");
				} else {
					con.rollback();
					System.out.println("ERROR 데이터 비정상 처리 하였습니다.");
					// throw new Exception();
				}
			}

		} catch (IOException e) {
			resultValue = "N";
			con.rollback();
			LOGGER.info("======== IOException Error Occurred =============  :  " + e);
		} catch (SQLException e) {
			resultValue = "N";
			con.rollback();
			LOGGER.info("======== SQLException Error Occurred =============  :  " + e);
		} catch (Exception ex) {
			resultValue = "N";
			con.rollback();
			LOGGER.info("======== Exception Error Occurred =============  :  " + ex);
		} finally {
			if (pstmt != null)
				try {
					pstmt.close();
					pstmt = null;
				} catch (SQLException ex) {
					resultValue = "N";
					LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
				}
			if (con != null)
				try {
					con.close();
					con = null;
				} catch (SQLException ex) {
					resultValue = "N";
					LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
				}
			readLineCnt--;
		}

		resultMap.put("resultValue", resultValue);
		resultMap.put("dataCnt", readLineCnt);
		resultMap.put("errorMsg", errorMsg.toString());
		resultMap.put("errorCnt", errorCnt);

		return resultMap;
	}

	/**
	 * 검색한 결과값 데이터 파일 다운로드
	 * 
	 * @param request
	 * @param response
	 * @throws SQLException
	 * @throws Exception
	 */
	@RequestMapping(value = "/selectDldFile.ajax", method = RequestMethod.POST, produces = {"application/json; charset=UTF-8" })
	public void selectDldFile(HttpServletRequest request, HttpServletResponse response) throws SQLException, Exception {
		String resultValue = "Y";
		String resultMsg = "";

		Map<String, Object> paramInfo = new HashMap<String, Object>();
		Map<String, Object> fileInfo = new HashMap<String, Object>();

		BufferedInputStream fin = null;
		BufferedOutputStream outs = null;
		FileInputStream in = null;

		String no = "";
		String fileUrl = "";
		String orignlFileNm = "";

		int fSize = 0;
		int read = 0;

		byte[] b = new byte[8192];

		try {
			no = request.getParameter("no");
			paramInfo.put("no", no);

			// 파일정보 불러옴
			// file_url, strgFileNm, origAtchFileNm
			// 파일 저장 경로 + 저장된 파일명 , 실제 저장된 파일명, 원본파일명
			fileInfo = dataRegService.selectDldFile(paramInfo);

			// 파일 경로
			fileUrl = fileInfo.get("fileUrl").toString();
			System.out.println(" fileUrl ==== 데이터 확인 " + fileUrl);

			// 원래 파일 명
			orignlFileNm = URLEncoder.encode(fileInfo.get("origAtchFileNm").toString(), "UTF-8").replaceAll("\\+","%20");
			System.out.println(" origAtchFileNm ==== 데이터 확인 " + orignlFileNm);

			File file = new File(ComWebUtil.filePathBlackList(fileUrl));

			fSize = (int) file.length();
			System.out.println(" fSize ===== 데이터 확인 " + fSize);

			response.setContentType("application/octet-stream;");
			response.setHeader("Content-Disposition", "filename=" + orignlFileNm + ";");
			response.setHeader("Pragma", "no-cache;");
			response.setHeader("Expires", "-1;");

			in = new FileInputStream(file);
			fin = new BufferedInputStream(in);
			outs = new BufferedOutputStream(response.getOutputStream());

			while ((read = fin.read(b)) != -1) {
				outs.write(b, 0, read);
			}
		} catch (SQLException ex) {
			LOGGER.info("======== SQLException Error Occurred =============  :  " + ex);
		} catch (Exception e) {
			LOGGER.info("======== Exception Error Occurred =============  :  " + e);
		} finally {
			if (outs != null)
				ComResourceCloseHelper.close(outs);
			if (fin != null)
				ComResourceCloseHelper.close(fin);
			if (in != null)
				ComResourceCloseHelper.close(in);
		}
	}

	// 한글 ,영어 , 숫자, 띄어쓰기를 제외하고 모든 패턴 공백으로 변환 하여 출력
	public String replaceString(String str) {
		String match = "[^\uAC00-\uD7A30-9a-zA-Z]";
		str = str.replaceAll(match, "");
		return str;
	}

	// camel 기법으로 바꾸기
	public static String convert2CamelCase(String underScore) {

		// '_' 가 나타나지 않으면 이미 camel case 로 가정함.
		// 단 첫째문자가 대문자이면 camel case 변환 (전체를 소문자로) 처리가
		// 필요하다고 가정함. --> 아래 로직을 수행하면 바뀜
		if (underScore.indexOf('_') < 0 && Character.isLowerCase(underScore.charAt(0))) {
			return underScore;
		}
		StringBuilder result = new StringBuilder();
		boolean nextUpper = false;
		int len = underScore.length();

		for (int i = 0; i < len; i++) {
			char currentChar = underScore.charAt(i);
			if (currentChar == '_') {
				nextUpper = true;
			} else {
				if (nextUpper) {
					result.append(Character.toUpperCase(currentChar));
					nextUpper = false;
				} else {
					result.append(Character.toLowerCase(currentChar));
				}
			}
		}
		return result.toString();
	}
}
