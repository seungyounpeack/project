package kr.go.guri.dashBoard.main.service;

import java.util.List;
import java.util.Map;

public interface MainService {
	
	List<Map<String, Object>> getMainCategoryList();
	List<Map<String, Object>> selectAdmdArea();
	List<Map<String, Object>> selectMainTpList(String tp);

	Map<String, Object> getCovidInfo();
	Map<String, Object> getPopulationInfo();
	Map<String, Object> getPopulationFlowInfo();
	List<Map<String, Object>> getBusinessList();
	List<Map<String, Object>> getComplaintList();
	List<Map<String, Object>> getOpinionList();
	Map<String, Object> getComplaintReceived();
	List<Map<String, Object>> getNewsList();
	List<Map<String, Object>> selectCompWordcloud();
	List<Map<String, Object>> selectCompStatus();
	List<Map<String, Object>> selectDongAttribute();

	Map<String, Object> getWeatherInfo();
	Map<String, Object> getAirInfo();
}
