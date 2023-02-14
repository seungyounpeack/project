package kr.go.guri.manager.dataMng.outDataReg.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface OutDataRegService {

	// 업로드 데이터 목록
	List<Map<String, Object>> outDataList(Map<String, Object> param) throws SQLException , IOException;
	
	// 데이터 이력 목록
	List<Map<String, Object>> outDataHisList(Map<String, Object> param) throws SQLException , IOException;
	
	// 파일 정보 목록
	Map<String, Object> selectUpliadFileInfo(Map<String, Object> param) throws SQLException , IOException;

	// 업로드 데이터 저장
	int insertFileUploadInfo(Map<String, Object> param) throws SQLException , IOException;
	
	// 이력 데이터 저장
	int insertFileUploadHistory(Map<String, Object> param) throws SQLException , IOException;

	//테스트 임시 테이블 생성
	int createSvcInfl(Map<String, Object> param) throws SQLException , IOException;
	
	//테스트 임시 테이블 데이터 추가
	int insertSvcInfl(Map<String, Object> param) throws SQLException , IOException;
	
	//테스트 임시 테이블 삭제
	int deleteSvcInfl(Map<String, Object> param) throws SQLException , IOException;

}
