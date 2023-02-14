package kr.go.guri.dashBoard.test.service;

import java.util.List;
import java.util.Map;

public interface DashBoardTestService {

	List<Map<String, Object>> selectChartDateList();

	List<Map<String, Object>> selectWordCloudList();

	List<Map<String, Object>> selectLineChartList();

	Map<String, Object> selectTable(Map<String, Object> params);

	List<Map<String, Object>> selectTableColumn(Map<String, Object> params);

	List<Map<String, Object>> selectTableRecentData(Map<String, Object> params);

	List<Map<String, Object>> selectTableAllData(Map<String, Object> params);

}
