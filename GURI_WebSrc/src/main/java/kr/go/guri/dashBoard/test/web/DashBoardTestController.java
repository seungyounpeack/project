package kr.go.guri.dashBoard.test.web;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
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
import kr.go.guri.dashBoard.test.service.DashBoardTestService;
@Controller
public class DashBoardTestController {

	@Autowired
	private MappingJackson2JsonView jsonView;				// Json 데이터를 Return 받기위해 Controller 마다 선언해준다
	
	private static final Logger LOGGER = LoggerFactory.getLogger(DashBoardTestController.class);

	@Resource(name = "dashBoardTestService")
	private DashBoardTestService dashBoardTestService;
	
	@RequestMapping(value = "/dashBoardTest/main.do",method = {RequestMethod.GET, RequestMethod.POST}, produces={"application/json; charset=UTF-8"})
    public String testMain(/*@RequestBody Map<String, Object> params, */HttpServletRequest request, ModelMap model) throws NullPointerException, Exception {
				return "dashBoard/test/testBoard";
			}
	
	@RequestMapping(value = "/dashBoardTest/chartData.ajax", method = RequestMethod.POST, produces={"application/json; charset=UTF-8"})
	public ModelAndView chartData(@RequestBody Map<String, Object> params, HttpServletRequest request, ModelMap model) throws SQLException, Exception {
		
		List<Map<String, Object>> chartDateList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> wordCloudList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> lineChartList = new ArrayList<Map<String, Object>>();
		// ModelAndView 객체 생성
		ModelAndView modelAndView = CommonUtil.makeModelAndView(jsonView);		// ModelAndView 객체 생성
		try {
			chartDateList = dashBoardTestService.selectChartDateList();
			wordCloudList = dashBoardTestService.selectWordCloudList();
			lineChartList = dashBoardTestService.selectLineChartList();
		}catch(Exception e) {
			LOGGER.info("Exception : " + e);
			
		}

		// ModelAndView에 데이터 넣기
		modelAndView.addObject("chartDateList", chartDateList);
		modelAndView.addObject("wordCloudList", wordCloudList);
		modelAndView.addObject("lineChartList", lineChartList);
		return modelAndView;
	}
	
	/**
	 * 엑셀 파일 다운로드
	 * @param params
	 * @param request
	 * @param model
	 * @return
	 * @throws Exception
	 */
	//첨부파일 다운로드
	@RequestMapping(value = "/dashBoardTest/fileDown.do")
	public void fileDown(HttpServletRequest req, HttpServletResponse res) throws NullPointerException, Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		Map<String, Object> fileInfo = new HashMap<String, Object>();
		List<Map<String, Object>> tableDataList = new ArrayList<Map<String, Object>>();
		List<Map<String, Object>> tableDataListColumn = new ArrayList<Map<String, Object>>();
		String filePk = ""; //request 에서 받아온 filePK(다운받을 테이블 PK)
		String tableFullNm = "";//db에서 select 해온 테이블풀네임 (스키마.테이블명)
		String tableKrNm = "";//db에서 select 해온 테이블 한글명
		String schema = "";//테이블 앞 스키마명
		String tableNm = "";//스키마 제외한 테이블명
		String division = "";//request 에서 받아온 파라미터(최근 한달 = recent, 전체 = all)
		int rowNo = 0;//엑셀 row 초기값
		try {
		//PK값으로 스키마.테이블명 가져오기
		filePk = req.getParameter("filePk").toString();
		division = req.getParameter("division").toString();
		params.put("filePk", filePk);
		fileInfo = dashBoardTestService.selectTable(params);
				
		tableFullNm = fileInfo.get("tblNm").toString();
		tableKrNm = fileInfo.get("dataTpNm").toString();
		params.put("tableFullNm", tableFullNm);
		//테이블 풀 네임 중 스키마, 테이블명 분리
		String[] tableNmCut = (tableFullNm.toString()).split("\\.");
		if(tableNmCut.length == 1) {
			schema = "public";
			tableNm = tableNmCut[0];
		}else {
			schema = tableNmCut[0];
			tableNm = tableNmCut[1];	
		}
		params.put("schema",schema);
		params.put("tableNm",tableNm);
		//테이블 컬럼, 컬럼한글명 가져오기(DB Function) ->엑셀 헤드
		tableDataListColumn = dashBoardTestService.selectTableColumn(params);
		//엑셀에 넣을 데이터 가져오기
		if(division.equals("recent")) {
			tableDataList = dashBoardTestService.selectTableRecentData(params);
		}else{
			tableDataList = dashBoardTestService.selectTableAllData(params);
		}
		//엑셀로 만들기 시작
		Workbook wb = new XSSFWorkbook();
		Sheet sheet = wb.createSheet("sheet1");
		CellStyle Style = wb.createCellStyle();
		Font Font = wb.createFont();
		Font.setFontName("맑은 고딕");
		Style.setFont(Font);
		Cell cell = null;
		Row headerRow = sheet.createRow(rowNo++);
		for(int i=0; i<tableDataListColumn.size(); i++) {
			Style.setAlignment(CellStyle.ALIGN_CENTER);//가운데맞춤
			Style.setFillForegroundColor(HSSFColor.GREY_25_PERCENT.index);
			Style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);//얘를 꼭 해야함
			Style.setBorderTop(CellStyle.BORDER_THIN);
			Style.setBorderBottom(CellStyle.BORDER_THIN);
			Style.setBorderLeft(CellStyle.BORDER_THIN);
			Style.setBorderRight(CellStyle.BORDER_THIN);
			cell = headerRow.createCell(i);
			cell.setCellValue(tableDataListColumn.get(i).get("columnComment").toString());
			cell.setCellStyle(Style);  
		}
		CellStyle Style2 = wb.createCellStyle();
		Style2.setFont(Font);
		for(int i=0;i<tableDataList.size();i++) {
			Row row = sheet.createRow(rowNo++);
			for(int j=0; j<tableDataList.get(i).size(); j++) {
				Style2.setAlignment(CellStyle.ALIGN_LEFT);//왼쪽 정렬
				Style2.setFillForegroundColor(HSSFColor.WHITE.index);
				Style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);//얘를 꼭 해야함
				Style2.setBorderTop(CellStyle.BORDER_THIN);
				Style2.setBorderBottom(CellStyle.BORDER_THIN);
				Style2.setBorderLeft(CellStyle.BORDER_THIN);
				Style2.setBorderRight(CellStyle.BORDER_THIN);
				List<Object> listValue = new ArrayList<Object>(tableDataList.get(i).values());
				cell = row.createCell(j);
				cell.setCellValue(listValue.get(j).toString());
				cell.setCellStyle(Style2);
			}
		}
		
		
		String userAgent = req.getHeader("User-Agent");
		boolean ie = (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1); 
		res.setContentType("ms-vnd/excel");
		if ( ie ) { 
			tableKrNm = new String(tableKrNm.getBytes("UTF-8"), "ISO-8859-1");
			res.setHeader("Content-Disposition", "attachment; filename=\""+tableKrNm+"\""+".xls");
		} else { 
			tableKrNm = new String(tableKrNm.getBytes("UTF-8"), "ISO-8859-1");
			res.setHeader("Content-Disposition", "filename=\""+tableKrNm+"\""+".xls");
		};
		ServletOutputStream out = res.getOutputStream();
		wb.write(out);
		out.close();
		}catch(NullPointerException e) {
			LOGGER.info("NullPointerException : {}", e.toString());
		}catch(Exception e) {
			LOGGER.info("Exception : {}", e.toString());
		}
		
	}
}
