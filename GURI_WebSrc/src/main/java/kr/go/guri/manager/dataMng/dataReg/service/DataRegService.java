package kr.go.guri.manager.dataMng.dataReg.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * 관리자 > 데이터 등록 Service 클래스
* @author 서미현
* @since 2022. 10. 10.
* @version 1.0
* @see
*
* <pre>
* << 개정이력(Modification Information) >>
*
*  수정일			        수정자			   수정내용
*  -------      -------------   ----------------------
*  2022.10.10.   	서미현                          최초 생성
*   
* </pre>
*/
public interface DataRegService {

	// 테이블 내용 가져오기
	List<Map<String, Object>> getDataList(Map<String, Object> param) throws Exception, SQLException;
	
	// 데이터 이력 내용 가져오기
	List<Map<String, Object>> getDataHisList(Map<String, Object> param) throws Exception, SQLException;
	
	// 부서정보 가져오기
	List<Map<String, Object>> getDepList() throws Exception, SQLException; 
	
	// 코드값으로 테이블명 가져오기 
	Map<String, Object> getDataTableNm(Map<String, Object> param) throws Exception, SQLException;
	
	// 선택한 데이터 전체 건수 가져오기
	Map<String ,Object> getDataContentAllCount(Map<String, Object> param) throws Exception ,SQLException;
	
	// 선택한 데이터 전체 년도 데이터 가져오기
	List<Map<String ,Object>> getDataYearList (Map<String ,Object> param) throws Exception, SQLException;
	
	// 테이블 컬럼명 및 컬럼 comment 데이터 가져오기
	List<Map<String, Object>> selectColCom (Map<String, Object> param) throws Exception, SQLException;
	
	// 업로드 데이터 저장
	int insertFileUploadInfo(Map<String, Object> param) throws SQLException , IOException;
	
	// 이력 데이터 저장
	int insertFileUploadHistory(Map<String, Object> param) throws SQLException , IOException;
	
	// 파일 정보 목록
	Map<String, Object> selectUpliadFileInfo(Map<String, Object> param) throws SQLException , IOException;

	// 테이블 존재여부 확인
	Map<String, Object> selectTableExist(Map<String, Object> param) throws SQLException , IOException;

	// 임시 테이블 생성
	int createIfTable(Map<String, Object> param) throws SQLException , IOException;
	
	// 원본테이블 컬럼 확인
	List<Map<String, Object>> selectGetColumn(Map<String, Object> param) throws SQLException, IOException;
	
	// 원본테이블 컬럼 데이터타입 확인
	List<Map<String, Object>> selectGetColumnType(Map<String, Object> param) throws SQLException, IOException;

	// 임시테이블 삭제하기
	int deleteIfTable(Map<String, Object> param) throws SQLException, IOException;
	
	// 원본테이블에 임시테이블 데이터 넣기
	int InsertDataTable(Map<String, Object> param) throws SQLException, IOException;
	
	// 파일 다운로드
	Map<String, Object> selectDldFile(Map<String ,Object> param) throws SQLException, IOException; 
	
 }
