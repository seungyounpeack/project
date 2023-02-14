package kr.go.guri.dashBoard.test.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import kr.go.guri.cmm.service.impl.ComAbstractDAO;

@Repository("dashBoardTestMapper")
public class DashBoardTestMapper extends ComAbstractDAO {

	public List<Map<String, Object>> selectChartDateList() {
		// TODO Auto-generated method stub
		return selectList("dashBoardTest.selectChartDateList");
	}

	public List<Map<String, Object>> selectWordCloudList() {
		// TODO Auto-generated method stub
		return selectList("dashBoardTest.selectWordCloudList");
	}

	public List<Map<String, Object>> selectLineChartList() {
		// TODO Auto-generated method stub
		return selectList("dashBoardTest.selectLineChartList");
	}

	public Map<String, Object> selectTable(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return selectOne("dashBoardTest.selectTable", params);
	}

	public List<Map<String, Object>> selectTableColumn(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return selectList("dashBoardTest.selectTableColumn", params);
	}

	public List<Map<String, Object>> selectTableRecentData(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return selectList("dashBoardTest.selectTableRecentData", params);
	}

	public List<Map<String, Object>> selectTableAllData(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return selectList("dashBoardTest.selectTableAllData", params);
	}

}
