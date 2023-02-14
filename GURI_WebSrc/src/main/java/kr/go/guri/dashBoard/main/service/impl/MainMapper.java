package kr.go.guri.dashBoard.main.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

@Repository("mainMapper")
public class MainMapper extends ComAbstractDAO {
	
	public List<Map<String, Object>> getMainCategoryList() {
		return selectList("MainMapper.getMainCategoryList");
	}

	public List<Map<String, Object>> selectAdmdArea() {
		return selectList("MainMapper.selectAdmdArea");
	}

	public List<Map<String, Object>> selectMainTpList(String tp) {
		return selectList("MainMapper.selectMainTpList", tp);
	}
	
	public Map<String, Object> getCovidInfo() {
		return selectOne("MainMapper.getCovidInfo");
	}
	
	public Map<String, Object> getPopulationInfo() {
		return selectOne("MainMapper.getPopulationInfo");
	}
	
	public Map<String, Object> getPopulationFlowInfo() {
		return selectOne("MainMapper.getPopulationFlowInfo");
	}
	
	public List<Map<String, Object>> getBusinessList() {
		return selectList("MainMapper.getBusinessList");
	}

	public List<Map<String, Object>> getComplaintList() {
		return selectList("MainMapper.getComplaintList");
	}

	public List<Map<String, Object>> getOpinionList() {
		return selectList("MainMapper.getOpinionList");
	}

	public Map<String, Object> getComplaintReceived() {
		return selectOne("MainMapper.getComplaintReceived");
	}
	
	public List<Map<String, Object>> getNewsList() {
		return selectList("MainMapper.getNewsList");
	}
	
	public Map<String, Object> getWeatherInfo() {
		return selectOne("MainMapper.getWeatherInfo");
	}
	
	public Map<String, Object> getAirInfo() {
		return selectOne("MainMapper.getAirInfo");
	}
	
	public List<Map<String, Object>> selectCompWordcloud() {
		return selectList("MainMapper.selectCompWordcloud");
	}
	
	public List<Map<String, Object>> selectCompStatus() {
		return selectList("MainMapper.selectCompStatus");
	}
	
	public List<Map<String, Object>> selectDongAttribute() {
		return selectList("MainMapper.selectDongAttribute");
	}
	
}
