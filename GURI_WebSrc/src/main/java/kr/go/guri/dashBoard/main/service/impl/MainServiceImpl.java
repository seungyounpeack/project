package kr.go.guri.dashBoard.main.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.dashBoard.main.service.MainService;

@Service("mainService")
public class MainServiceImpl implements MainService {

	@Resource(name = "mainMapper")
	private MainMapper mainMapper;

	@Override
	public List<Map<String, Object>> getMainCategoryList() {
		return mainMapper.getMainCategoryList();
	}

	@Override
	public List<Map<String, Object>> selectAdmdArea() {
		return mainMapper.selectAdmdArea();
	}

	@Override
	public List<Map<String, Object>> selectMainTpList(String tp) {
		return mainMapper.selectMainTpList(tp);
	}

	@Override
	public Map<String, Object> getCovidInfo() {
		return mainMapper.getCovidInfo();
	}

	@Override
	public Map<String, Object> getPopulationInfo() {
		return mainMapper.getPopulationInfo();
	}

	@Override
	public Map<String, Object> getPopulationFlowInfo() {
		return mainMapper.getPopulationFlowInfo();
	}

	@Override
	public List<Map<String, Object>> getBusinessList() {
		return mainMapper.getBusinessList();
	}

	@Override
	public List<Map<String, Object>> getComplaintList() {
		return mainMapper.getComplaintList();
	}

	@Override
	public List<Map<String, Object>> getOpinionList() {
		return mainMapper.getOpinionList();
	}

	@Override
	public Map<String, Object> getComplaintReceived() {
		return mainMapper.getComplaintReceived();
	}

	@Override
	public List<Map<String, Object>> getNewsList() {
		return mainMapper.getNewsList();
	}
	
	@Override
	public List<Map<String, Object>> selectCompWordcloud() {
		return mainMapper.selectCompWordcloud();
	}
	
	@Override
	public List<Map<String, Object>> selectCompStatus() {
		return mainMapper.selectCompStatus();
	}
	
	@Override
	public List<Map<String, Object>> selectDongAttribute() {
		return mainMapper.selectDongAttribute();
	}

	@Override
	public Map<String, Object> getWeatherInfo() {
		return mainMapper.getWeatherInfo();
	}

	@Override
	public Map<String, Object> getAirInfo() {
		return mainMapper.getAirInfo();
	}
}
