package kr.go.guri.manager.stopword.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

public interface StopwordService {

	// 키워드 목록
	List<Map<String, Object>> wordList(Map<String, Object> param) throws SQLException , IOException;
	
	// 키워드 추가
	int insertWord(Map<String, Object> param) throws SQLException , IOException;
	
	// 키워드 삭제
	int deleteWord(Map<String, Object> param) throws SQLException , IOException;
	
	// 날짜
	Map<String, Object> getDate() throws SQLException , IOException;
	
}
