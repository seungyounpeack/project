package kr.go.guri.manager.dataMng.fieldDataReg.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface FieldDataRegService {

	//분야별 데이터 목록
	List<Map<String, Object>> fieldDataList(Map<String, Object> param) throws SQLException , IOException;
	
	//분야별 코드 값
	List<Map<String, Object>> fieldDataCode() throws SQLException , IOException;
	
	//선택한 데이터 값 불러오기
	Map<String, Object> selectData(Map<String, Object> param) throws SQLException , IOException;
	
	//분야별 데이터 추가
	int fieldDataInsert(Map<String, Object> param) throws SQLException , IOException;
	
	//분야별 데이터 수정
	int fieldDataUpdate(Map<String, Object> param) throws SQLException , IOException;
	
	//파일정보 조회하기
	Map<String, Object> fieldFileData (Map<String, Object> param) throws SQLException , IOException;
}
