package kr.go.guri.manager.logDataMng.service;

import java.util.List;
import java.util.Map;

public interface LogDataMngService {

	// 선택기간 다운로드 수 통계
	Map<String, Object> selectLogDataDateTotal(Map<String, Object> param) throws Exception;
	
	// 누적 다운로드 수 통계
	Map<String, Object> selectLogDataAllTotal() throws Exception;
	
	// 월별 통계
	List<Map<String, Object>> selectLogDataMonthCnt(Map<String, Object> param) throws Exception;
	
	// 요일별 통계
	List<Map<String, Object>> selectLogDataDayCnt(Map<String, Object> param) throws Exception;

	// 분야별 다운로드 데이터 조회
	List<Map<String, Object>> selectLogDetailView(Map<String, Object> param) throws Exception;
	
	
}
