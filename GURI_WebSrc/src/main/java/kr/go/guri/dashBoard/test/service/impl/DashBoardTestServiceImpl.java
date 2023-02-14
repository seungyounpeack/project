package kr.go.guri.dashBoard.test.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.guri.dashBoard.test.service.DashBoardTestService;

@Service("dashBoardTestService")
public class DashBoardTestServiceImpl implements DashBoardTestService{
	@Resource(name = "dashBoardTestMapper")
	private DashBoardTestMapper dashBoardTestMapper;
	@Override
	public List<Map<String, Object>> selectChartDateList() {
		// TODO Auto-generated method stub
		return dashBoardTestMapper.selectChartDateList();
	}

	@Override
	public List<Map<String, Object>> selectWordCloudList() {
		// TODO Auto-generated method stub
		return dashBoardTestMapper.selectWordCloudList();
	}

	@Override
	public List<Map<String, Object>> selectLineChartList() {
		// TODO Auto-generated method stub
		return dashBoardTestMapper.selectLineChartList();
	}

	@Override
	public Map<String, Object> selectTable(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return dashBoardTestMapper.selectTable(params);
	}

	@Override
	public List<Map<String, Object>> selectTableColumn(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return dashBoardTestMapper.selectTableColumn(params);
	}

	@Override
	public List<Map<String, Object>> selectTableRecentData(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return dashBoardTestMapper.selectTableRecentData(params);
	}

	@Override
	public List<Map<String, Object>> selectTableAllData(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return dashBoardTestMapper.selectTableAllData(params);
	}

}
