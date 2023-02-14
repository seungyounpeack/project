package kr.go.guri.manager.stopword.service.impl;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.manager.stopword.service.StopwordService;

@Service("stopwordService")
public class StopwordServiceImpl implements StopwordService{
	
	@Resource( name = "stopwordMapper")
	private StopwordMapper stopwordMapper;

	@Override
	public List<Map<String, Object>> wordList(Map<String, Object> param) throws SQLException , IOException {
		
		return stopwordMapper.wordList(param);
	}

	@Override
	public int insertWord(Map<String, Object> param) throws SQLException , IOException {
		return stopwordMapper.insertWord(param);
	}

	@Override
	public int deleteWord(Map<String, Object> param) throws SQLException , IOException {
		return stopwordMapper.deleteWord(param);
	}
	
	@Override
	public Map<String, Object> getDate() throws SQLException , IOException {
		return stopwordMapper.wordListDate();
	}



	
}
