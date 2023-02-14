package kr.go.guri.manager.stopword.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

@Repository("stopwordMapper")
public class StopwordMapper extends ComAbstractDAO{

	public List<Map<String, Object>> wordList(Map<String, Object> param) throws SQLException , IOException{
		return selectList("StopWordDAO.selectWordList", param);
	}

	public int insertWord(Map<String, Object> param) {
		return insert("StopWordDAO.insertWord", param);
	}

	public int deleteWord(Map<String, Object> param) {
		return delete("StopWordDAO.deleteWord", param);
	}

	public Map<String, Object> wordListDate() throws SQLException , IOException{
		return selectOne("StopWordDAO.selectWordDate");
	}
}
